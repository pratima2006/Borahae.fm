import { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { BarChart3, BookOpen, Home, Menu, PlaySquare, Settings, Sparkles, X } from 'lucide-react';
import { BrandMark } from './BrandMark';

const nav = [
  { href: '/home', label: 'Home', icon: Home },
  { href: '/missions', label: 'Missions', icon: Sparkles },
  { href: '/videos', label: 'Videos', icon: PlaySquare },
  { href: '/history', label: 'My History', icon: BookOpen },
];

export function AppShell({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [location] = useLocation();
  return (
    <div className="noise min-h-[100dvh] bg-background">
      <aside className={`fixed inset-y-0 left-0 z-40 flex w-[270px] flex-col bg-[hsl(var(--sidebar))] px-5 py-6 text-[hsl(var(--sidebar-foreground))] transition-transform duration-300 lg:translate-x-0 ${open ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="mb-10 flex items-center justify-between px-2"><BrandMark /><button onClick={() => setOpen(false)} className="lg:hidden" aria-label="Close navigation" data-testid="button-close-nav"><X /></button></div>
        <p className="mb-3 px-3 font-mono text-[10px] uppercase tracking-[.2em] text-white/45">Your scrapbook</p>
        <nav className="space-y-1" aria-label="Main navigation">{nav.map(({ href, label, icon: Icon }) => <Link href={href} onClick={() => setOpen(false)} key={href} data-testid={`link-nav-${label.toLowerCase().replaceAll(' ', '-')}`} className={`group flex items-center gap-3 rounded-2xl px-3 py-3 text-sm font-semibold transition-all hover:translate-x-1 hover:bg-white/10 ${location === href ? 'bg-white/15 text-white shadow-inner' : 'text-white/65'}`}><Icon className={`h-4 w-4 ${location === href ? 'text-accent' : ''}`} />{label}{location === href && <span className="ml-auto h-1.5 w-1.5 rounded-full bg-accent" />}</Link>)}</nav>
         <div className="mt-auto space-y-1 border-t border-white/10 pt-5"><Link href="/settings" className="flex items-center gap-3 rounded-2xl px-3 py-3 text-sm font-semibold text-white/65 transition hover:bg-white/10" data-testid="link-nav-settings"><Settings className="h-4 w-4" />Settings</Link></div>
         <div className="mt-6 flex items-center gap-3 rounded-2xl bg-white/8 p-3"><div className="flex h-9 w-9 items-center justify-center rounded-full bg-accent font-bold text-foreground">A</div><div className="min-w-0"><p className="truncate text-xs font-bold">ARMY demo</p><p className="truncate text-[10px] text-white/45">keeping the purple light on</p></div></div>
      </aside>
      {open && <button className="fixed inset-0 z-30 bg-foreground/30 lg:hidden" onClick={() => setOpen(false)} aria-label="Close navigation overlay" data-testid="button-nav-overlay" />}
      <div className="lg:pl-[270px]"><header className="sticky top-0 z-20 flex h-20 items-center justify-between border-b border-border/60 bg-background/85 px-5 backdrop-blur-xl sm:px-8"><button className="rounded-xl p-2 hover:bg-secondary lg:hidden" onClick={() => setOpen(true)} aria-label="Open navigation" data-testid="button-open-nav"><Menu /></button><div className="lg:hidden"><BrandMark compact /></div><div className="ml-auto flex items-center gap-3"><div className="hidden items-center gap-2 text-right sm:flex"><p className="text-xs font-bold">ARMY demo</p><BarChart3 className="h-4 w-4 text-primary" /></div></div></header><main className="mx-auto max-w-[1280px] px-5 py-8 sm:px-8 sm:py-10">{children}</main></div>
    </div>
  );
}