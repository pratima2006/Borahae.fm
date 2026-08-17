import { Heart, SearchX } from 'lucide-react';

export function EmptyState({ title, body, action }: { title: string; body: string; action?: React.ReactNode }) {
  return (
    <div className="paper-grid flex min-h-64 flex-col items-center justify-center rounded-3xl border border-dashed border-primary/25 bg-card p-8 text-center" data-testid="state-empty">
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-secondary text-primary">
        <Heart className="h-5 w-5" />
      </div>
      <h3 className="font-display text-2xl text-foreground">{title}</h3>
      <p className="mt-2 max-w-sm text-sm leading-6 text-muted-foreground">{body}</p>
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}

export function ErrorState({ onRetry }: { onRetry: () => void }) {
  return (
    <div className="flex min-h-48 flex-col items-center justify-center rounded-3xl border border-destructive/20 bg-destructive/5 p-8 text-center" data-testid="state-error">
      <SearchX className="mb-3 h-7 w-7 text-destructive" />
      <p className="text-sm text-muted-foreground">The scrapbook page missed a beat.</p>
      <button onClick={onRetry} className="mt-3 text-sm font-bold text-primary underline underline-offset-4" data-testid="button-retry">Try again</button>
    </div>
  );
}

export function LoadingState({ rows = 3 }: { rows?: number }) {
  return <div className="space-y-3" data-testid="state-loading">{Array.from({ length: rows }).map((_, i) => <div className="skeleton h-20 rounded-2xl" key={i} />)}</div>;
}