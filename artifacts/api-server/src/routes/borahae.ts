import { Router, type IRouter, type Request } from "express";
import { and, desc, eq, gte, sql } from "drizzle-orm";
import { randomUUID } from "node:crypto";
import { db, armProfilesTable, streamsTable, videosTable } from "@workspace/db";
import {
  AddVideoBody,
  ListHistoryQueryParams,
  RecordStreamBody,
  SaveProfileBody,
  DeleteHistoryParams,
} from "@workspace/api-zod";

const router: IRouter = Router();
const DEMO_USER_ID = "anonymous-army-demo";

const MISSION_IDS = [
  "gdZLi9oWNZg", // Dynamite
  "XsX3ATc3FbA", // Boy With Luv
  "MBdVXkSdhwU", // DNA
  "kTlv5_Bs8aw", // MIC Drop
  "WMweEpGlu_U", // Butter
  "7C2z4GqqS5E", // Fake Love
  "hmE9f-TEutc", // Blood Sweat & Tears
  "xEeFrLSkMm8", // Spring Day
];

type YoutubeItem = {
  id: string | { videoId?: string };
  snippet: {
    title: string;
    channelTitle: string;
    thumbnails?: { high?: { url: string }; medium?: { url: string } };
  };
  contentDetails?: { duration?: string };
  statistics?: { viewCount?: string };
};

function youtubeItemId(item: YoutubeItem): string | null {
  return typeof item.id === "string" ? item.id : (item.id.videoId ?? null);
}

function parseYoutubeId(value: string): string | null {
  try {
    const url = new URL(value);
    if (url.hostname === "youtu.be")
      return url.pathname.slice(1).split("/")[0] || null;
    if (url.searchParams.get("v")) return url.searchParams.get("v");
    if (url.pathname.startsWith("/shorts/"))
      return url.pathname.split("/")[2] || null;
    if (url.pathname.startsWith("/embed/"))
      return url.pathname.split("/")[2] || null;
  } catch {
    return null;
  }
  return null;
}

function parseDuration(value: string | undefined): number {
  if (!value) return 0;
  const match = value.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!match) return 0;
  return (
    Number(match[1] ?? 0) * 3600 +
    Number(match[2] ?? 0) * 60 +
    Number(match[3] ?? 0)
  );
}

async function youtubeVideos(ids: string[]): Promise<YoutubeItem[]> {
  const key = process.env.YOUTUBE_API_KEY;
  if (!key || ids.length === 0) return [];
  const url = new URL("https://www.googleapis.com/youtube/v3/videos");
  url.searchParams.set("part", "snippet,contentDetails,statistics");
  url.searchParams.set("id", ids.join(","));
  url.searchParams.set("key", key);
  const response = await fetch(url);
  if (!response.ok)
    throw new Error(`YouTube metadata request failed: ${response.status}`);
  const body = (await response.json()) as { items?: YoutubeItem[] };
  return body.items ?? [];
}

async function youtubeSearch(query: string): Promise<YoutubeItem[]> {
  const key = process.env.YOUTUBE_API_KEY;
  if (!key) return [];
  const url = new URL("https://www.googleapis.com/youtube/v3/search");
  url.searchParams.set("part", "snippet");
  url.searchParams.set("type", "video");
  url.searchParams.set("maxResults", "12");
  url.searchParams.set("q", query);
  url.searchParams.set("key", key);
  const response = await fetch(url);
  if (!response.ok)
    throw new Error(`YouTube search request failed: ${response.status}`);
  const body = (await response.json()) as { items?: YoutubeItem[] };
  const items = body.items ?? [];
  const hydrated = await youtubeVideos(
    items.map(youtubeItemId).filter(Boolean) as string[],
  );
  return hydrated.map((item) => ({
    ...item,
    snippet: item.snippet,
  }));
}

function videoResponse(video: typeof videosTable.$inferSelect) {
  return {
    id: video.id,
    youtubeId: video.youtubeId,
    title: video.title,
    thumbnailUrl: video.thumbnailUrl,
    channelTitle: video.channelTitle,
    durationSeconds: video.durationSeconds,
    viewCount: video.viewCount,
    isMission: video.isMission === 1,
    addedAt: video.addedAt,
    isNew: video.addedAt.getTime() > Date.now() - 3 * 24 * 60 * 60 * 1000,
  };
}

async function upsertYoutubeVideos(items: YoutubeItem[], isMission: boolean) {
  const results = [];
  for (const item of items) {
    const youtubeId = youtubeItemId(item);
    if (!youtubeId) continue;
    const existing = await db
      .select()
      .from(videosTable)
      .where(eq(videosTable.youtubeId, youtubeId))
      .limit(1);
    const values = {
      id: existing[0]?.id ?? `yt_${youtubeId}`,
      youtubeId,
      title: item.snippet.title,
      thumbnailUrl:
        item.snippet.thumbnails?.high?.url ??
        item.snippet.thumbnails?.medium?.url ??
        `https://i.ytimg.com/vi/${youtubeId}/hqdefault.jpg`,
      channelTitle: item.snippet.channelTitle,
      durationSeconds: parseDuration(item.contentDetails?.duration),
      viewCount: Number(item.statistics?.viewCount ?? 0),
      isMission: isMission ? 1 : (existing[0]?.isMission ?? 0),
    };
    if (existing[0]) {
      const [updated] = await db
        .update(videosTable)
        .set(values)
        .where(eq(videosTable.id, existing[0].id))
        .returning();
      results.push(updated);
    } else {
      const [created] = await db.insert(videosTable).values(values).returning();
      results.push(created);
    }
  }
  return results;
}

async function ensureMissions() {
  const existing = await db
    .select()
    .from(videosTable)
    .where(eq(videosTable.isMission, 1))
    .orderBy(desc(videosTable.viewCount));
  const present = new Set(existing.map((video) => video.youtubeId));
  const missing = MISSION_IDS.filter((id) => !present.has(id));
  if (missing.length > 0) {
    try {
      await upsertYoutubeVideos(await youtubeVideos(missing), true);
    } catch {
      // Cached mission rows remain usable if YouTube is temporarily unavailable.
    }
  }
  return db
    .select()
    .from(videosTable)
    .where(eq(videosTable.isMission, 1))
    .orderBy(desc(videosTable.viewCount));
}

async function profileFor(userId: string) {
  const [profile] = await db
    .select()
    .from(armProfilesTable)
    .where(eq(armProfilesTable.id, userId))
    .limit(1);
  return (
    profile ?? {
      id: userId,
      email: "",
      name: "ARMY",
      avatarUrl: "",
      joinedAt: new Date(),
    }
  );
}

async function leaderboard() {
  const rows = await db
    .select({ member: streamsTable.member, streams: sql<number>`count(*)` })
    .from(streamsTable)
    .groupBy(streamsTable.member)
    .orderBy(desc(sql`count(*)`));
  return rows.map((row) => ({
    member: row.member,
    streams: Number(row.streams),
  }));
}

async function historyFor(userId: string, member?: string) {
  const conditions = [eq(streamsTable.userId, userId)];
  if (member) conditions.push(eq(streamsTable.member, member));
  const rows = await db
    .select()
    .from(streamsTable)
    .where(and(...conditions))
    .orderBy(desc(streamsTable.watchedAt));
  const counts = new Map<string, number>();
  for (const row of rows)
    counts.set(row.videoId, (counts.get(row.videoId) ?? 0) + 1);
  return rows.map((row) => ({
    id: row.id,
    videoId: row.videoId,
    youtubeId: row.youtubeId,
    title: row.title,
    thumbnailUrl: row.thumbnailUrl,
    member: row.member,
    watchedAt: row.watchedAt,
    streamCount: counts.get(row.videoId) ?? 1,
  }));
}

router.get("/profile", async (req, res): Promise<void> => {
  res.json(await profileFor(DEMO_USER_ID));
});

router.put("/profile", async (req, res): Promise<void> => {
  const parsed = SaveProfileBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }
  const [saved] = await db
    .insert(armProfilesTable)
    .values({ id: DEMO_USER_ID, ...parsed.data })
    .onConflictDoUpdate({ target: armProfilesTable.id, set: parsed.data })
    .returning();
  res.json(saved);
});

router.get("/missions", async (req, res): Promise<void> => {
  res.json((await ensureMissions()).map(videoResponse));
});

router.get("/videos", async (req, res): Promise<void> => {
  const query = typeof req.query.q === "string" ? req.query.q.trim() : "";
  if (query) {
    try {
      res.json(
        (await upsertYoutubeVideos(await youtubeSearch(query), false)).map(
          videoResponse,
        ),
      );
      return;
    } catch (error) {
      req.log.warn({ error }, "YouTube search unavailable");
    }
  }
  const rows = await db
    .select()
    .from(videosTable)
    .orderBy(desc(videosTable.addedAt));
  res.json(rows.map(videoResponse));
});

router.post("/videos", async (req, res): Promise<void> => {
  const parsed = AddVideoBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }
  const youtubeId = parseYoutubeId(parsed.data.url);
  if (!youtubeId) {
    res.status(400).json({ error: "Paste a valid YouTube link." });
    return;
  }
  const existing = await db
    .select()
    .from(videosTable)
    .where(eq(videosTable.youtubeId, youtubeId))
    .limit(1);
  if (existing[0]) {
    res.status(409).json({
      error: "This video is already in your tracker.",
      video: videoResponse(existing[0]),
    });
    return;
  }
  const [item] = await youtubeVideos([youtubeId]);
  if (!item) {
    res.status(404).json({ error: "We couldn't find that YouTube video." });
    return;
  }
  const duration = parseDuration(item.contentDetails?.duration);
  if (duration < 60) {
    res.status(400).json({
      error: "Videos must be at least 1 minute long to count as a stream.",
    });
    return;
  }
  const [added] = await upsertYoutubeVideos([item], false);
  res.status(201).json(videoResponse(added));
});

router.get("/history", async (req, res): Promise<void> => {
  const parsed = ListHistoryQueryParams.safeParse(req.query);
  const member = parsed.success ? parsed.data.member : undefined;
  res.json({
    entries: await historyFor(DEMO_USER_ID, member),
    leaderboard: await leaderboard(),
  });
});

router.post("/history", async (req, res): Promise<void> => {
  const parsed = RecordStreamBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }
  const [stream] = await db
    .insert(streamsTable)
    .values({ id: randomUUID(), userId: DEMO_USER_ID, ...parsed.data })
    .returning();
  res.status(201).json({ ...stream, streamCount: 1 });
});

router.delete("/history/:videoId", async (req, res): Promise<void> => {
  const parsed = DeleteHistoryParams.safeParse(req.params);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }
  await db
    .delete(streamsTable)
    .where(
      and(
        eq(streamsTable.userId, DEMO_USER_ID),
        eq(streamsTable.videoId, parsed.data.videoId),
      ),
    );
  res.sendStatus(204);
});

router.get("/dashboard", async (req, res): Promise<void> => {
  const entries = await historyFor(DEMO_USER_ID);
  const startOfDay = new Date();
  startOfDay.setHours(0, 0, 0, 0);
  const today = await db
    .select({ count: sql<number>`count(*)` })
    .from(streamsTable)
    .where(
      and(
        eq(streamsTable.userId, DEMO_USER_ID),
        gte(streamsTable.watchedAt, startOfDay),
      ),
    );
  res.json({
    profile: await profileFor(DEMO_USER_ID),
    continueWatching: entries.slice(0, 7),
    totalStreams: entries.length,
    todayStreams: Number(today[0]?.count ?? 0),
    dailyGoal: 10,
    leaderboard: await leaderboard(),
  });
});

export default router;
