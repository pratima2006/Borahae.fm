import { Link } from 'wouter';
import { ArrowLeft, Compass } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="paper-grid flex min-h-[100dvh] items-center justify-center bg-background p-6">
      <div className="max-w-md text-center">
        <Compass className="mx-auto h-10 w-10 text-primary" />
        <p className="mt-6 font-mono text-[10px] uppercase tracking-[.2em] text-primary">page missing from the scrapbook</p>
        <h1 className="mt-3 font-display text-6xl tracking-[-.04em]">Not this page.</h1>
        <p className="mt-4 text-sm leading-6 text-muted-foreground">That little corner of borahae.fm hasn’t been saved yet.</p>
        <Link href="/" className="mt-7 inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-bold text-primary-foreground" data-testid="link-not-found-home"><ArrowLeft className="h-4 w-4" /> Back to the light</Link>
      </div>
    </div>
  );
}
