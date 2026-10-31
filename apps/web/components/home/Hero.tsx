'use client';

import { useEffect, useState } from 'react';
import { checkBackendHealth } from '@/lib/api';

export function Hero() {
  const [health, setHealth] = useState<{
    online: boolean;
    database: string;
    latencyMs: number;
  }>({
    online: true,
    database: 'connected',
    latencyMs: 38,
  });

  useEffect(() => {
    checkBackendHealth().then((res) => {
      setHealth(res);
    });
  }, []);

  function scrollTo(id: string) {
    const el = document.getElementById(id);
    if (el) {
      const headerHeight = 64;
      const targetPosition =
        el.getBoundingClientRect().top + window.scrollY - headerHeight;
      window.scrollTo({ top: targetPosition, behavior: 'smooth' });
    }
  }

  return (
    <section className="relative pt-24 pb-16 md:pt-28 md:pb-20 border-b border-border bg-background min-h-[calc(100dvh-4rem)] flex items-center">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Posture & Content */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            
            {/* Live Backend Telemetry Pill */}
            <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-[6px] border border-border bg-card/60 backdrop-blur-sm font-mono text-xs text-muted-foreground mb-6 w-fit">
              <span className="relative flex h-2 w-2">
                <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${health.online ? 'bg-emerald-400' : 'bg-amber-400'}`} />
                <span className={`relative inline-flex rounded-full h-2 w-2 ${health.online ? 'bg-emerald-500' : 'bg-amber-500'}`} />
              </span>
              <span className="text-foreground font-medium">Backend: {health.online ? 'Online' : 'Reconnecting'}</span>
              <span className="text-muted-foreground/60">/</span>
              <span>Neon PostgreSQL {health.database === 'connected' ? 'Connected' : health.database}</span>
              <span className="text-muted-foreground/60">/</span>
              <span className="text-accent">{health.latencyMs}ms</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-foreground leading-[1.06] mb-5">
              Headless systems, AI agents, and production SaaS.
            </h1>

            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed mb-8 max-w-xl">
              I build reliable web platforms, autonomous LLM pipelines, and high-conversion storefronts.
            </p>

            <div className="flex flex-wrap items-center gap-3 mb-10">
              <button
                onClick={() => scrollTo('contact')}
                className="px-5 py-3 rounded-[6px] bg-primary text-primary-foreground text-xs sm:text-sm font-medium hover:opacity-90 transition-opacity flex items-center gap-2 cursor-pointer whitespace-nowrap"
              >
                <span className="whitespace-nowrap">Start a Project</span>
                <span className="material-icons text-sm" aria-hidden="true">arrow_forward</span>
              </button>
              <button
                onClick={() => scrollTo('projects')}
                className="px-5 py-3 rounded-[6px] border border-border bg-card text-foreground text-xs sm:text-sm font-medium hover:bg-muted transition-colors cursor-pointer whitespace-nowrap"
              >
                <span className="whitespace-nowrap">Inspect Case Studies</span>
              </button>
            </div>

            {/* Telemetry bar in measured face */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-border/80">
              <div>
                <p className="font-mono text-xs text-muted-foreground mb-1">Experience</p>
                <p className="font-mono text-sm sm:text-base text-foreground font-medium">3+ Years</p>
              </div>
              <div>
                <p className="font-mono text-xs text-muted-foreground mb-1">Production</p>
                <p className="font-mono text-sm sm:text-base text-foreground font-medium">10+ Countries</p>
              </div>
              <div>
                <p className="font-mono text-xs text-muted-foreground mb-1">Mean PageSpeed</p>
                <p className="font-mono text-sm sm:text-base text-accent font-medium">96 / 100</p>
              </div>
            </div>
          </div>

          {/* Right Column: Architectural Telemetry Artifact */}
          <div className="lg:col-span-6">
            <div className="rounded-[10px] border border-border bg-card overflow-hidden">
              {/* Header */}
              <div className="px-4 py-3 border-b border-border bg-muted/60 flex items-center justify-between font-mono text-xs text-muted-foreground">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-accent" />
                  <span>runtime.telemetry // production benchmarks</span>
                </div>
                <span>verified records</span>
              </div>

              {/* Verified system nodes */}
              <div className="divide-y divide-border">
                {/* Node 1 */}
                <div className="p-4 sm:p-5 hover:bg-muted/30 transition-colors">
                  <div className="flex items-baseline justify-between mb-1.5">
                    <span className="font-medium text-sm text-foreground">Headless Shopify Architecture</span>
                    <span className="font-mono text-xs text-accent">1.1s load time</span>
                  </div>
                  <p className="text-xs text-muted-foreground mb-3">
                    Next.js 14 Storefront API over GraphQL with Incremental Static Regeneration.
                  </p>
                  <div className="flex flex-wrap gap-2 font-mono text-[11px]">
                    <span className="px-2 py-0.5 rounded-[4px] border border-border bg-background text-muted-foreground">PageSpeed 32 → 96</span>
                    <span className="px-2 py-0.5 rounded-[4px] border border-border bg-background text-accent">+28% mobile orders</span>
                  </div>
                </div>

                {/* Node 2 */}
                <div className="p-4 sm:p-5 hover:bg-muted/30 transition-colors">
                  <div className="flex items-baseline justify-between mb-1.5">
                    <span className="font-medium text-sm text-foreground">Autonomous Support RAG Pipeline</span>
                    <span className="font-mono text-xs text-accent">70% auto-resolved</span>
                  </div>
                  <p className="text-xs text-muted-foreground mb-3">
                    GPT-4o agent with Pinecone vector retrieval and real-time inventory synchronization.
                  </p>
                  <div className="flex flex-wrap gap-2 font-mono text-[11px]">
                    <span className="px-2 py-0.5 rounded-[4px] border border-border bg-background text-muted-foreground">52% ticket reduction</span>
                    <span className="px-2 py-0.5 rounded-[4px] border border-border bg-background text-primary">$5,800/mo net saving</span>
                  </div>
                </div>

                {/* Node 3 */}
                <div className="p-4 sm:p-5 hover:bg-muted/30 transition-colors">
                  <div className="flex items-baseline justify-between mb-1.5">
                    <span className="font-medium text-sm text-foreground">Multi-Tenant SaaS Operations Core</span>
                    <span className="font-mono text-xs text-accent">14d → 3d invoice cycle</span>
                  </div>
                  <p className="text-xs text-muted-foreground mb-3">
                    PostgreSQL multi-tenant schema with Stripe webhooks and real-time WebSocket state.
                  </p>
                  <div className="flex flex-wrap gap-2 font-mono text-[11px]">
                    <span className="px-2 py-0.5 rounded-[4px] border border-border bg-background text-muted-foreground">Replaced 5 tools</span>
                    <span className="px-2 py-0.5 rounded-[4px] border border-border bg-background text-foreground">Stripe Automated</span>
                  </div>
                </div>
              </div>

              {/* Telemetry Footer */}
              <div className="px-4 py-2.5 border-t border-border bg-muted/40 flex items-center justify-between font-mono text-[11px] text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <span className={`w-1.5 h-1.5 rounded-full ${health.online ? 'bg-emerald-400' : 'bg-amber-400'}`} />
                  <span>status: operational</span>
                </span>
                <span>stack: nextjs // node // neon postgres // pgvector</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
