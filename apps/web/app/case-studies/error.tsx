'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { Nav } from '@/components/home/Nav';
import { Footer } from '@/components/home/Footer';
import { Button } from '@/components/ui/Button';

export default function CaseStudiesError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Case studies error:', error);
  }, [error]);

  return (
    <>
      <Nav />
      <main className="min-h-screen bg-background pt-28 pb-24">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="max-w-lg mx-auto text-center py-16 animate-enter">
            <span className="material-icons text-muted-foreground/40 text-6xl mb-4 block" aria-hidden>
              error_outline
            </span>
            <h1 className="text-2xl font-bold text-foreground mb-2">
              Something went wrong
            </h1>
            <p className="text-muted-foreground mb-6">
              We couldn&apos;t load the case studies. This might be a temporary issue.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Button type="button" onClick={reset} variant="primary" size="md">
                Try again
              </Button>
              <Button asChild variant="secondary" size="md">
                <Link href="/">Back to home</Link>
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
