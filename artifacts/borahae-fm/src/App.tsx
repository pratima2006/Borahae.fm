import { QueryClient, QueryClientProvider, useQueryClient } from '@tanstack/react-query';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, Redirect, Route, Router as WouterRouter, Switch } from 'wouter';
import { ArrowRight, Check, ChevronDown, Clock3, ExternalLink, Flame, Heart, History, Instagram, Link2, Loader2, Medal, Play, Plus, Search, Sparkles, Star, Target, Trophy, Users, Youtube } from 'lucide-react';
import { getGetDashboardQueryKey, getGetProfileQueryKey, getListHistoryQueryKey, getListMissionsQueryKey, getListVideosQueryKey, useAddVideo, useDeleteHistory, useGetDashboard, useGetProfile, useListHistory, useListMissions, useListVideos, useRecordStream, useSaveProfile } from '@workspace/api-client-react';
import type { HistoryEntry, LeaderboardEntry, Video } from '@workspace/api-client-react';
import { AppShell } from '@/components/AppShell';
import { BrandMark } from '@/components/BrandMark';
import { EmptyState, ErrorState, LoadingState } from '@/components/EmptyState';
import { PageHeader } from '@/components/PageHeader';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import NotFound from '@/pages/not-found';
import type { FormEvent, ReactNode } from 'react';

const queryClient = new QueryClient();
const basePath = import.meta.env.BASE_URL.replace(/\/$/, '');

function formatDuration(seconds = 0) { return `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, '0')}`; }
function formatCount(value = 0) { return new Intl.NumberFormat('en', { notation: 'compact', maximumFractionDigits: 1 }).format(value); }
function formatDate(value?: string) { return value ? new Intl.DateTimeFormat('en', { month: 'short', day: 'numeric', year: 'numeric' }).format(new Date(value)) : 'recently'; }
function memberLabel(member?: string) { return member || 'OT7'; }

function AppLink({ children, href, className = '', testId }: { children: ReactNode; href: string; className?: string; testId: string }) {
  return <Link href={href} className={className} data-testid={testId}>{children}</Link>;
}

function Landing() {
  return <div className="noise min-h-[100dvh] overflow-hidden bg-background">
    <header className="mx-auto flex max-w-7xl items-center px-5 py-6 sm:px-8"><BrandMark /></header>
    <section className="relative mx-auto max-w-7xl px-5 pb-20 pt-14 sm:px-8 sm:pb-28 sm:pt-20"><div className="pointer-events-none absolute -right-40 -top-20 h-[520px] w-[520px] rounded-full bg-accent/20 blur-3xl" /><div className="pointer-events-none absolute -left-48 bottom-0 h-[390px] w-[390px] rounded-full bg-primary/10 blur-3xl" /><div className="relative grid items-center gap-14 lg:grid-cols-[1.03fr_.97fr]"><div className="animate-rise"><p className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-secondary/60 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[.15em] text-primary"><Sparkles className="h-3 w-3" />For every comeback, together</p><h1 className="max-w-3xl font-display text-6xl leading-[.95] tracking-[-.055em] text-foreground sm:text-8xl">Keep the light.<br /><span className="text-primary">Stream with heart.</span></h1><p className="mt-7 max-w-lg text-base leading-7 text-muted-foreground sm:text-lg">borahae.fm is your lovingly kept ARMY scrapbook — a place to discover missions, make every stream count, and watch the purple light grow.</p><div className="mt-9 flex flex-wrap gap-3"><AppLink href="/home" className="group inline-flex items-center gap-3 rounded-2xl bg-primary px-5 py-3.5 text-sm font-bold text-primary-foreground transition hover:-translate-y-1 hover:shadow-[0_16px_30px_hsl(272_72%_49%/.25)]" testId="link-hero-start">Open your scrapbook <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" /></AppLink><a href="#how-it-works" className="inline-flex items-center rounded-2xl border border-border bg-card px-5 py-3.5 text-sm font-bold text-foreground transition hover:bg-secondary" data-testid="link-hero-learn">See how it works</a></div><div className="mt-10 flex items-center gap-4 text-xs text-muted-foreground"><div className="flex -space-x-2">{['A','J','M','S'].map((x) => <div key={x} className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-background bg-secondary text-[10px] font-extrabold text-primary">{x}</div>)}</div><span><strong className="text-foreground">12,480 ARMY</strong> keeping watch together</span></div></div><div className="animate-rise relative [animation-delay:120ms]"><div className="paper-grid relative mx-auto max-w-[520px] rotate-2 rounded-[2.25rem] border border-primary/15 bg-[#fcf9ff] p-3 shadow-[0_30px_70px_hsl(272_42%_28%/.16)] sm:p-5"><div className="overflow-hidden rounded-[1.7rem] bg-[#2e1d50]"><div className="relative aspect-[1.1] overflow-hidden bg-[radial-gradient(circle_at_65%_24%,#bc7fdc,transparent_22%),linear-gradient(135deg,#301b58,#56338e_56%,#1d1734)] p-7 text-white sm:p-10"><div className="absolute -right-8 top-8 h-40 w-40 rounded-full border border-white/20" /><div className="absolute -right-2 top-16 h-28 w-28 rounded-full border border-white/15" /><p className="font-mono text-[10px] uppercase tracking-[.22em] text-white/60">mission 001 / bangtantv</p><h2 className="mt-14 max-w-xs font-display text-5xl leading-[.9]">The purple<br />hour.</h2><p className="mt-5 max-w-[220px] text-xs leading-5 text-white/65">A little place to leave your mark on the streams that mean something.</p><div className="absolute bottom-7 left-7 flex items-center gap-2 text-xs font-bold sm:bottom-10 sm:left-10"><span className="flex h-9 w-9 items-center justify-center rounded-full bg-accent text-foreground"><Play className="h-3.5 w-3.5 fill-current" /></span>Watch together</div></div><div className="flex items-center justify-between bg-[#22163c] px-5 py-4 text-white"><span className="font-mono text-[9px] uppercase tracking-[.15em] text-white/45">your stream journal</span><span className="flex items-center gap-1.5 text-xs font-bold text-accent"><Heart className="h-3.5 w-3.5 fill-current" /> borahae</span></div></div></div><div className="absolute -bottom-6 -left-4 flex rotate-[-8deg] items-center gap-2 rounded-xl bg-accent px-4 py-2.5 text-xs font-extrabold text-foreground shadow-lg sm:-left-8"><Star className="h-3.5 w-3.5 fill-current" /> love notes, not numbers</div></div></div></section>
    <section id="how-it-works" className="border-y border-border/70 bg-card/60"><div className="mx-auto grid max-w-7xl gap-0 px-5 sm:px-8 md:grid-cols-3">{[['01','Find your mission','Start with hand-picked BANGTANTV moments, or bring in a favorite YouTube video.'],['02','Watch with intention','The in-app player keeps your watch flow in one place, without losing the feeling.'],['03','Leave your mark','One completed stream, recorded. Your personal progress and our shared leaderboard grow together.']].map(([num,title,body],i) => <div className={`py-12 md:px-8 md:py-16 ${i > 0 ? 'border-t border-border md:border-l md:border-t-0' : ''}`} key={num}><span className="font-mono text-xs text-primary">{num}</span><h3 className="mt-5 font-display text-3xl">{title}</h3><p className="mt-3 max-w-xs text-sm leading-6 text-muted-foreground">{body}</p></div>)}</div></section>
    <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28"><div className="grid items-end gap-10 md:grid-cols-[1fr_1.3fr]"><div><p className="font-mono text-[10px] uppercase tracking-[.2em] text-primary">A soft place for loud love</p><h2 className="mt-4 max-w-md font-display text-5xl leading-[.95] tracking-[-.04em]">The comeback energy, kept close.</h2></div><div className="grid gap-5 sm:grid-cols-2"><div className="rounded-3xl bg-secondary p-7"><Target className="h-6 w-6 text-primary" /><h3 className="mt-8 font-bold">Your daily rhythm</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">A gentle daily goal makes showing up feel like a ritual, not a chore.</p></div><div className="rounded-3xl border border-border bg-card p-7 scrap-shadow"><Users className="h-6 w-6 text-accent-foreground" /><h3 className="mt-8 font-bold">Our purple light</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">Celebrate milestones with ARMY around the world, one stream at a time.</p></div></div></div></section>
    <footer className="border-t border-border px-5 py-8 sm:px-8"><div className="mx-auto flex max-w-7xl flex-col justify-between gap-4 text-xs text-muted-foreground sm:flex-row sm:items-center"><BrandMark compact /><span>Made with purple light for ARMY, everywhere.</span><div className="flex gap-4"><Instagram className="h-4 w-4" /><Youtube className="h-4 w-4" /></div></div></footer>
  </div>;
}

function DashboardPage() {
  const { data, isLoading, isError, refetch } = useGetDashboard();
  const user = { firstName: 'ARMY' };
  const remove = useDeleteHistory();
  const client = useQueryClient();
  if (isLoading) return <LoadingState rows={5} />;
  if (isError || !data) return <ErrorState onRetry={() => refetch()} />;
  const progress = Math.min(100, Math.round((data.todayStreams / Math.max(1, data.dailyGoal)) * 100));
  return <AppShell><div className="animate-rise"><div className="mb-9 flex flex-col justify-between gap-5 sm:flex-row sm:items-end"><div><p className="font-mono text-[10px] uppercase tracking-[.2em] text-primary">Your scrapbook · {formatDate(data.profile?.joinedAt)}</p><h1 className="mt-2 font-display text-5xl leading-none tracking-[-.04em] sm:text-6xl">Welcome back, <span className="text-primary">{data.profile?.name || user?.firstName || 'ARMY'}</span>.</h1><p className="mt-4 text-sm text-muted-foreground">The purple light is on. What shall we watch today?</p></div><AppLink href="/missions" className="inline-flex items-center justify-center gap-2 rounded-2xl bg-primary px-5 py-3 text-sm font-bold text-primary-foreground transition hover:-translate-y-0.5" testId="link-dashboard-missions"><Play className="h-4 w-4 fill-current" /> Continue a mission</AppLink></div><div className="grid gap-5 xl:grid-cols-[1.35fr_.65fr]"><section className="relative overflow-hidden rounded-[2rem] bg-[linear-gradient(125deg,#311957,#7441a8)] p-7 text-white sm:p-9"><div className="absolute -right-10 -top-20 h-64 w-64 rounded-full border border-white/10" /><div className="relative"><div className="flex items-center justify-between"><span className="rounded-full bg-white/12 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[.15em] text-white/70">Dynamite · today’s goal</span><Flame className="h-5 w-5 text-accent" /></div><div className="mt-8 flex items-end gap-3"><span className="font-display text-7xl leading-none">{data.todayStreams}</span><span className="mb-2 text-sm text-white/55">/ {data.dailyGoal} streams</span></div><div className="mt-6 h-2 overflow-hidden rounded-full bg-black/20"><div className="h-full rounded-full bg-accent transition-all duration-700" style={{ width: `${progress}%` }} /></div><p className="mt-4 text-sm text-white/65">{progress >= 100 ? 'Goal kept. That love is showing.' : `${data.dailyGoal - data.todayStreams} more to keep today's promise.`}</p></div></section><section className="rounded-[2rem] border border-border bg-card p-7 scrap-shadow sm:p-9"><div className="flex items-center justify-between"><p className="font-mono text-[10px] uppercase tracking-[.15em] text-muted-foreground">All-time streams</p><Heart className="h-4 w-4 text-accent-foreground" /></div><p className="mt-8 font-display text-6xl leading-none text-primary" data-testid="text-total-streams">{formatCount(data.totalStreams)}</p><p className="mt-3 text-sm text-muted-foreground">Every count is a little love note.</p><div className="mt-8 flex items-center gap-2 text-xs font-bold text-primary"><span className="h-2 w-2 rounded-full bg-accent" /> {data.leaderboard?.length || 0} members in your light circle</div></section></div><div className="mt-8 grid gap-8 lg:grid-cols-[1.25fr_.75fr]"><section><div className="mb-4 flex items-end justify-between"><div><p className="font-mono text-[10px] uppercase tracking-[.15em] text-primary">Pick up where you left off</p><h2 className="mt-1 font-display text-3xl">Continue watching</h2></div><AppLink href="/history" className="text-xs font-bold text-primary hover:underline" testId="link-dashboard-history">See all history</AppLink></div>{data.continueWatching?.length ? <div className="space-y-3">{data.continueWatching.slice(0,7).map((entry) => <HistoryCard key={entry.id} entry={entry} compact onDelete={() => remove.mutate({ videoId: entry.videoId }, { onSuccess: () => { client.invalidateQueries({ queryKey: getGetDashboardQueryKey() }); client.invalidateQueries({ queryKey: getListHistoryQueryKey() }); } })} />)}</div> : <EmptyState title="Your next memory is waiting" body="Choose a mission and start the first page of your stream journal." action={<AppLink href="/missions" className="rounded-xl bg-primary px-4 py-2 text-xs font-bold text-primary-foreground" testId="link-empty-missions">Browse missions</AppLink>} />}</section><Leaderboard entries={data.leaderboard || []} /></div></div></AppShell>;
}

function VideoThumb({ video, className = '' }: { video: Pick<Video, 'thumbnailUrl' | 'title'>; className?: string }) { return <div className={`relative overflow-hidden bg-secondary ${className}`}><img src={video.thumbnailUrl} alt="" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" /><div className="absolute inset-0 bg-gradient-to-t from-foreground/55 to-transparent opacity-70" /><div className="absolute bottom-3 left-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-primary"><Play className="h-3.5 w-3.5 fill-current" /></div></div>; }

function YouTubePlayer({ video, onEnded }: { video: Video; onEnded: () => void }) {
  const [ready, setReady] = useState(false);
  const recorded = useRef(false);
  const onEndedRef = useRef(onEnded);
  onEndedRef.current = onEnded;
  const playerRef = useRef<{ destroy: () => void } | null>(null);
  const hostRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    setReady(false);
    recorded.current = false;
    playerRef.current?.destroy();
    playerRef.current = null;
    const w = window as Window & {
      YT?: { Player: new (element: HTMLElement, options: Record<string, unknown>) => { destroy: () => void }; PlayerState: { ENDED: number } };
      onYouTubeIframeAPIReady?: () => void;
    };
    const createPlayer = () => {
      if (!hostRef.current || !w.YT) return;
      playerRef.current = new w.YT.Player(hostRef.current, {
        videoId: video.youtubeId,
        playerVars: { enablejsapi: 1, rel: 0, modestbranding: 1 },
        events: {
          onReady: () => setReady(true),
          onStateChange: (event: { data: number }) => {
            if (w.YT && event.data === w.YT.PlayerState.ENDED && !recorded.current) {
              recorded.current = true;
              onEndedRef.current();
            }
          },
        },
      });
    };
    if (w.YT) createPlayer();
    else {
      const previousReady = w.onYouTubeIframeAPIReady;
      w.onYouTubeIframeAPIReady = () => {
        previousReady?.();
        createPlayer();
      };
      if (!document.querySelector('script[src="https://www.youtube.com/iframe_api"]')) {
        const script = document.createElement('script');
        script.src = 'https://www.youtube.com/iframe_api';
        document.body.appendChild(script);
      }
    }
    return () => {
      playerRef.current?.destroy();
      playerRef.current = null;
    };
  }, [video.youtubeId]);
  const handleEnded = () => { if (!recorded.current) { recorded.current = true; onEndedRef.current(); } };
  return <div className="relative aspect-video overflow-hidden rounded-2xl bg-[#211333]"><div ref={hostRef} className={`h-full w-full transition-opacity duration-300 ${ready ? 'opacity-100' : 'opacity-0'}`} title={video.title} /><div className={`absolute inset-0 flex items-center justify-center bg-[#211333] transition-opacity ${ready ? 'pointer-events-none opacity-0' : 'opacity-100'}`}><Loader2 className="h-6 w-6 animate-spin text-accent" /></div><button className="absolute bottom-3 right-3 rounded-lg bg-black/40 px-2 py-1 text-[10px] text-white/70" onClick={handleEnded} data-testid={`button-record-stream-${video.id}`}>Mark complete</button></div>;
}

function MissionCard({ video, onPlay, openYoutube = false }: { video: Video; onPlay: (video: Video) => void; openYoutube?: boolean }) {
  return <article className="group overflow-hidden rounded-3xl border border-border bg-card scrap-shadow transition duration-300 hover:-translate-y-1" data-testid={`card-mission-${video.id}`}><button className="block w-full text-left" onClick={() => onPlay(video)} data-testid={`button-play-mission-${video.id}`}><VideoThumb video={video} className="aspect-video" /></button><div className="p-5"><div className="flex items-center justify-between gap-3"><span className={`font-mono text-[10px] uppercase tracking-[.14em] ${video.isNew ? 'font-bold text-accent-foreground' : 'text-primary'}`}>{video.isNew ? 'NEW · added within 3 days' : 'starter mission'}</span><span className="text-[10px] text-muted-foreground">{formatDuration(video.durationSeconds)}</span></div><h3 className="mt-2 line-clamp-2 text-sm font-bold leading-5">{video.title}</h3><p className="mt-2 text-xs text-muted-foreground">{video.channelTitle} · {formatCount(video.viewCount)} views</p>{openYoutube && <a href={`https://www.youtube.com/watch?v=${video.youtubeId}`} target="_blank" rel="noreferrer" className="mt-4 inline-flex items-center gap-1.5 text-xs font-extrabold text-primary hover:underline" data-testid={`link-open-youtube-${video.id}`}>Open YouTube <ExternalLink className="h-3 w-3" /></a>}</div></article>;
}

function MissionsPage() {
  const { data, isLoading, isError, refetch } = useListMissions();
  const [selected, setSelected] = useState<Video | null>(null);
  const record = useRecordStream();
  const client = useQueryClient();
  const selectedRef = useRef<Video | null>(null);
  const handleEnded = () => {
    if (selectedRef.current) {
      record.mutate(
        { data: { videoId: selectedRef.current.id, youtubeId: selectedRef.current.youtubeId, title: selectedRef.current.title, thumbnailUrl: selectedRef.current.thumbnailUrl, member: 'OT7' } },
        {
          onSuccess: () => {
            client.invalidateQueries({ queryKey: getGetDashboardQueryKey() });
            client.invalidateQueries({ queryKey: getListHistoryQueryKey() });
          },
        },
      );
    }
  };
  const play = (video: Video) => { selectedRef.current = video; setSelected(video); };
  return <AppShell><PageHeader eyebrow="starter missions / bangtantv" title="A little mission for today." body="Begin with the moments ARMY has kept close. Watch in the player, then let your completed stream find its place in your journal." />{isLoading ? <LoadingState rows={4} /> : isError ? <ErrorState onRetry={() => refetch()} /> : !data?.length ? <EmptyState title="The mission shelf is quiet" body="Check back soon for the next page from BANGTANTV." /> : <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">{data.map((video) => <MissionCard key={video.id} video={video} onPlay={play} />)}</div>}{selected && <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/65 p-4 backdrop-blur-sm" role="dialog" aria-modal="true" data-testid="dialog-player"><div className="w-full max-w-3xl overflow-hidden rounded-3xl bg-card shadow-2xl"><div className="flex items-center justify-between border-b border-border px-5 py-4"><div className="min-w-0"><p className="font-mono text-[10px] uppercase tracking-[.15em] text-primary">now playing</p><h2 className="truncate text-sm font-bold">{selected.title}</h2></div><button onClick={() => setSelected(null)} className="rounded-xl px-3 py-1 text-sm font-bold text-muted-foreground hover:bg-secondary" aria-label="Close player" data-testid="button-close-player">Close</button></div><YouTubePlayer video={selected} onEnded={handleEnded} /><div className="flex items-center justify-between px-5 py-4 text-xs text-muted-foreground"><span>{record.isPending ? 'Saving your stream...' : 'Watch to the end to record your stream.'}</span><a href={`https://www.youtube.com/watch?v=${selected.youtubeId}`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 font-bold text-primary" data-testid="link-open-youtube-player">Open YouTube <ExternalLink className="h-3 w-3" /></a></div></div></div>}</AppShell>;
}

function VideosPage() {
  const [query, setQuery] = useState('');
  const [submitted, setSubmitted] = useState('');
  const [url, setUrl] = useState('');
  const { data, isLoading, isError, refetch } = useListVideos(submitted ? { q: submitted } : undefined, { query: { queryKey: getListVideosQueryKey(submitted ? { q: submitted } : undefined), enabled: Boolean(submitted) } });
  const add = useAddVideo();
  const client = useQueryClient();
  const submitSearch = (event: FormEvent) => { event.preventDefault(); setSubmitted(query.trim()); };
  const submitAdd = (event: FormEvent) => { event.preventDefault(); if (url.trim()) add.mutate({ data: { url: url.trim() } }, { onSuccess: () => { setUrl(''); client.invalidateQueries({ queryKey: getListVideosQueryKey() }); } }); };
  const addError = add.error as { status?: number; data?: { error?: string } } | null;
  const addMessage = addError?.data?.error || (addError?.status === 409 ? 'Duplicate link — this video is already on the shared shelf.' : 'We couldn’t validate that link. Check the URL and try again.');
  return <AppShell><PageHeader eyebrow="your video shelf" title="Bring a favorite in." body="Search the videos already on your shelf, or paste a YouTube link. We’ll check the metadata before it joins your scrapbook." /><div className="grid gap-5 lg:grid-cols-[1.35fr_.65fr]"><form onSubmit={submitSearch} className="rounded-3xl border border-border bg-card p-5 scrap-shadow sm:p-7" data-testid="form-search-videos"><div className="mb-5 flex items-center gap-2 text-sm font-bold"><Search className="h-4 w-4 text-primary" /> Search your added videos</div><div className="flex gap-2"><Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Try “Black Swan”" className="h-11 rounded-xl bg-background" data-testid="input-video-search" /><Button type="submit" className="h-11 rounded-xl px-5" data-testid="button-search-videos">Search</Button></div></form><form onSubmit={submitAdd} className="rounded-3xl bg-secondary p-5 sm:p-7" data-testid="form-add-video"><div className="mb-5 flex items-center gap-2 text-sm font-bold"><Link2 className="h-4 w-4 text-primary" /> Add MVs / videos for all</div><Input value={url} onChange={(e) => setUrl(e.target.value)} placeholder="youtube.com/watch?v=..." className="h-11 rounded-xl border-primary/15 bg-card" data-testid="input-youtube-url" /><Button type="submit" disabled={add.isPending || !url.trim()} variant="default" className="mt-3 w-full rounded-xl" data-testid="button-add-video">{add.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4" />} {add.isPending ? 'Checking link...' : 'Add to my shelf'}</Button>{add.isError && <p className="mt-3 text-xs font-bold text-destructive" data-testid="status-add-error">{addMessage}</p>}{add.isSuccess && <p className="mt-3 flex items-center gap-1 text-xs font-bold text-emerald-600" data-testid="status-add-success"><Check className="h-3.5 w-3.5" /> Added to your shelf.</p>}</form></div><div className="mt-10">{submitted && <div className="mb-4 flex items-center justify-between"><h2 className="font-display text-3xl">Search notes</h2><span className="font-mono text-[10px] uppercase tracking-[.16em] text-muted-foreground">{data?.length || 0} found</span></div>}{isLoading ? <LoadingState rows={3} /> : isError ? <ErrorState onRetry={() => refetch()} /> : submitted && !data?.length ? <EmptyState title="No page with that title yet" body="Try another search, or paste the YouTube link above to start a new page." /> : data?.length ? <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">{data.map((video) => <MissionCard key={video.id} video={video} openYoutube onPlay={() => window.open(`https://www.youtube.com/watch?v=${video.youtubeId}`, '_blank', 'noopener,noreferrer')} />)}</div> : <div className="rounded-3xl border border-dashed border-primary/25 p-10 text-center"><Youtube className="mx-auto h-7 w-7 text-primary" /><p className="mt-3 text-sm text-muted-foreground">Search your shelf whenever a song gets stuck in your head.</p></div>}</div></AppShell>;
}

function HistoryCard({ entry, compact = false, onDelete }: { entry: HistoryEntry; compact?: boolean; onDelete?: () => void }) {
  return <article className={`group flex gap-4 rounded-2xl border border-border bg-card p-3 transition hover:border-primary/30 hover:shadow-sm ${compact ? '' : 'items-center'}`} data-testid={`row-history-${entry.id}`}><div className={`relative shrink-0 overflow-hidden rounded-xl ${compact ? 'h-16 w-24' : 'h-20 w-32 sm:h-24 sm:w-40'}`}><img src={entry.thumbnailUrl} alt="" className="h-full w-full object-cover" /><span className="absolute bottom-1.5 left-1.5 rounded-md bg-black/60 px-1.5 py-0.5 text-[9px] font-bold text-white">{entry.streamCount}×</span></div><div className="min-w-0 flex-1"><p className="line-clamp-2 text-sm font-bold leading-5">{entry.title}</p><p className="mt-1 text-xs text-muted-foreground">{memberLabel(entry.member)} · {formatDate(entry.watchedAt)}</p>{!compact && <p className="mt-2 inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-[.12em] text-primary"><Clock3 className="h-3 w-3" /> stream {entry.streamCount}</p>}</div>{onDelete && <button onClick={onDelete} className="self-start rounded-lg p-1.5 text-muted-foreground opacity-0 transition hover:bg-destructive/10 hover:text-destructive group-hover:opacity-100" aria-label={`Remove ${entry.title}`} data-testid={`button-delete-history-${entry.id}`}>×</button>}</article>;
}

function Leaderboard({ entries }: { entries: LeaderboardEntry[] }) {
  return <section className="rounded-3xl border border-border bg-card p-6 scrap-shadow"><div className="flex items-center justify-between"><div><p className="font-mono text-[10px] uppercase tracking-[.15em] text-primary">light circle</p><h2 className="mt-1 font-display text-3xl">Leaderboard</h2></div><Trophy className="h-5 w-5 text-accent-foreground" /></div><div className="mt-5 space-y-2">{entries.slice(0,5).map((item, i) => <div className="flex items-center gap-3 rounded-xl px-2 py-2.5 transition hover:bg-secondary" key={`${item.member}-${i}`} data-testid={`row-leaderboard-${i}`}><span className={`flex h-7 w-7 items-center justify-center rounded-lg text-xs font-extrabold ${i === 0 ? 'bg-accent text-foreground' : 'bg-secondary text-primary'}`}>{i + 1}</span><span className="flex-1 text-sm font-bold">{item.member}</span><span className="font-mono text-xs text-muted-foreground">{formatCount(item.streams)}</span></div>)}{!entries.length && <p className="py-8 text-center text-sm text-muted-foreground">The light circle is waiting for its first streams.</p>}</div></section>;
}

function HistoryPage() {
  const [member, setMember] = useState('');
  const params = member ? { member } : undefined;
  const { data, isLoading, isError, refetch } = useListHistory(params, { query: { queryKey: getListHistoryQueryKey(params) } });
  const remove = useDeleteHistory();
  const members = useMemo(() => [...new Set((data?.entries || []).map((entry) => entry.member).filter(Boolean))], [data?.entries]);
  return <AppShell><PageHeader eyebrow="stream journal" title="The pages you’ve left behind." body="Every completed stream stays here as a small record of showing up. Filter by member, revisit a memory, or clear a page." action={<select value={member} onChange={(e) => setMember(e.target.value)} className="h-10 rounded-xl border border-border bg-card px-3 text-xs font-bold text-foreground" aria-label="Filter history by member" data-testid="select-history-member"><option value="">All members</option>{members.map((name) => <option key={name} value={name}>{name}</option>)}</select>} />{isLoading ? <LoadingState rows={5} /> : isError ? <ErrorState onRetry={() => refetch()} /> : <div className="grid gap-8 lg:grid-cols-[1.1fr_.9fr]"><section>{data?.entries?.length ? <div className="space-y-3">{data.entries.map((entry) => <HistoryCard key={entry.id} entry={entry} onDelete={() => { if (window.confirm('Remove this page from your history?')) remove.mutate({ videoId: entry.videoId }, { onSuccess: () => refetch() }); }} />)}</div> : <EmptyState title="No streams recorded yet" body="Your journal begins when a video reaches the end in the player." action={<AppLink href="/missions" className="rounded-xl bg-primary px-4 py-2 text-xs font-bold text-primary-foreground" testId="link-history-missions">Find a mission</AppLink>} />}</section><Leaderboard entries={data?.leaderboard || []} /></div>}</AppShell>;
}

const faqs = [['What counts as a stream?', 'A stream is recorded when you finish a video in our in-app player. You can also mark a completed watch from the player controls.'],['Can I add any YouTube video?', 'Yes. Paste a public YouTube watch link and we’ll validate its metadata before adding it to your shelf.'],['Why do missions come from BANGTANTV?', 'Missions are a welcoming starting point: official moments with the kind of rewatch energy ARMY already knows.'],['How does the leaderboard work?', 'It reflects recorded streams across members in the light circle. It is a celebration, never a competition.'],['Can I filter my history?', 'Use the member filter on Stream history to focus your journal on OT7 or an individual member.'],['Will my YouTube account be connected?', 'No. borahae.fm uses the public YouTube player and does not ask for your YouTube credentials.'],['How do I change my profile?', 'Update your display name and avatar URL here in Settings. Your current demo scrapbook stores these details in the shared tracker.']];

function SettingsPage() {
  const { data: profile, isLoading } = useGetProfile();
  const save = useSaveProfile();
  const [name, setName] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');
  const [open, setOpen] = useState<number | null>(null);
  const initialized = useRef(false);
  useEffect(() => { if (profile && !initialized.current) { initialized.current = true; setName(profile.name); setAvatarUrl(profile.avatarUrl); } }, [profile]);
  const submit = (event: FormEvent) => { event.preventDefault(); save.mutate({ data: { name, avatarUrl, email: profile?.email || '' } }); };
  return <AppShell><PageHeader eyebrow="your details" title="Keep your page yours." body="A few quiet settings for the person behind the streams. Your profile is only as public as the light circle needs it to be." /><div className="grid gap-8 lg:grid-cols-[.85fr_1.15fr]"><form onSubmit={submit} className="rounded-3xl border border-border bg-card p-6 scrap-shadow sm:p-8" data-testid="form-profile-settings"><div className="mb-7 flex items-center gap-4"><div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-2xl bg-secondary text-2xl font-extrabold text-primary">{avatarUrl ? <img src={avatarUrl} alt="" className="h-full w-full object-cover" /> : name?.[0] || 'A'}</div><div><p className="font-bold">{name || 'ARMY'}</p><p className="text-xs text-muted-foreground">Joined {formatDate(profile?.joinedAt)}</p></div></div><label className="mb-4 block text-xs font-bold">Display name<Input value={name} onChange={(e) => setName(e.target.value)} disabled={isLoading} className="mt-2 h-11 rounded-xl bg-background" data-testid="input-settings-name" /></label><label className="mb-4 block text-xs font-bold">Avatar URL <span className="font-normal text-muted-foreground">(optional)</span><Input value={avatarUrl} onChange={(e) => setAvatarUrl(e.target.value)} className="mt-2 h-11 rounded-xl bg-background" placeholder="https://..." data-testid="input-settings-avatar" /></label><label className="mb-6 block text-xs font-bold">Email address<Input value={profile?.email || ''} readOnly className="mt-2 h-11 rounded-xl bg-muted text-muted-foreground" data-testid="input-settings-email" /></label><Button type="submit" disabled={save.isPending || !name.trim()} className="w-full rounded-xl" data-testid="button-save-profile">{save.isPending ? 'Saving...' : save.isSuccess ? 'Saved to your scrapbook' : 'Save profile'}</Button></form><section><div className="mb-5"><p className="font-mono text-[10px] uppercase tracking-[.15em] text-primary">little questions</p><h2 className="mt-1 font-display text-3xl">FAQ, with care.</h2></div><div className="divide-y divide-border rounded-3xl border border-border bg-card px-5">{faqs.map(([question, answer], i) => <div key={question}><button onClick={() => setOpen(open === i ? null : i)} className="flex w-full items-center justify-between gap-4 py-5 text-left text-sm font-bold" aria-expanded={open === i} data-testid={`button-faq-${i}`}><span>{question}</span><ChevronDown className={`h-4 w-4 shrink-0 text-primary transition-transform ${open === i ? 'rotate-180' : ''}`} /></button><div className={`grid transition-[grid-template-rows] duration-300 ${open === i ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}><p className="overflow-hidden pb-0 text-sm leading-6 text-muted-foreground">{answer}</p></div></div>)}</div></section></div></AppShell>;
}

function Router() {
  return <Switch>
    <Route path="/welcome" component={Landing} />
    <Route path="/sign-in/*?" component={() => <Redirect to="/home" />} />
    <Route path="/sign-up/*?" component={() => <Redirect to="/home" />} />
    <Route path="/home" component={DashboardPage} />
    <Route path="/missions" component={MissionsPage} />
    <Route path="/videos" component={VideosPage} />
    <Route path="/history" component={HistoryPage} />
    <Route path="/settings" component={SettingsPage} />
    <Route path="/" component={Landing} />
    <Route component={NotFound} />
  </Switch>;
}

function App() {
  return <QueryClientProvider client={queryClient}><WouterRouter base={basePath}><Router /></WouterRouter></QueryClientProvider>;
}
export default App;