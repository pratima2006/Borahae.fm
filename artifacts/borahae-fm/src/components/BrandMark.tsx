import { Sparkles } from 'lucide-react';

export function BrandMark({ compact = false }: { compact?: boolean }) {
  return (
    <div className="flex items-center gap-3" data-testid="brand-mark">
      <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-[14px] bg-primary text-primary-foreground shadow-[0_7px_18px_hsl(272_72%_49%/.25)]">
        <span className="font-display text-2xl leading-none">b</span>
        <Sparkles className="absolute -right-1 -top-1 h-3.5 w-3.5 text-accent" />
      </div>
      {!compact && <span className="text-lg font-extrabold tracking-[-.04em]">borahae<span className="text-primary">.fm</span></span>}
    </div>
  );
}