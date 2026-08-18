import { pgTable, text, integer, timestamp, uniqueIndex } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const armProfilesTable = pgTable(
  "borahae_profiles",
  {
    id: text("id").primaryKey(),
    email: text("email").notNull(),
    name: text("name").notNull(),
    avatarUrl: text("avatar_url").notNull(),
    joinedAt: timestamp("joined_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => ({
    emailIdx: uniqueIndex("borahae_profiles_email_idx").on(table.email),
  }),
);

export const videosTable = pgTable("borahae_videos", {
  id: text("id").primaryKey(),
  youtubeId: text("youtube_id").notNull().unique(),
  title: text("title").notNull(),
  thumbnailUrl: text("thumbnail_url").notNull(),
  channelTitle: text("channel_title").notNull(),
  durationSeconds: integer("duration_seconds").notNull(),
  viewCount: integer("view_count").notNull().default(0),
  isMission: integer("is_mission").notNull().default(0),
  addedAt: timestamp("added_at", { withTimezone: true }).notNull().defaultNow(),
});

export const streamsTable = pgTable("borahae_streams", {
  id: text("id").primaryKey(),
  userId: text("user_id").notNull(),
  videoId: text("video_id").notNull(),
  youtubeId: text("youtube_id").notNull(),
  title: text("title").notNull(),
  thumbnailUrl: text("thumbnail_url").notNull(),
  member: text("member").notNull(),
  watchedAt: timestamp("watched_at", { withTimezone: true }).notNull().defaultNow(),
});

export const insertProfileSchema = createInsertSchema(armProfilesTable);
export const insertVideoSchema = createInsertSchema(videosTable);
export const insertStreamSchema = createInsertSchema(streamsTable);

export type ArmProfile = typeof armProfilesTable.$inferSelect;
export type Video = typeof videosTable.$inferSelect;
export type Stream = typeof streamsTable.$inferSelect;
export type InsertProfile = z.infer<typeof insertProfileSchema>;
export type InsertVideo = z.infer<typeof insertVideoSchema>;
export type InsertStream = z.infer<typeof insertStreamSchema>;