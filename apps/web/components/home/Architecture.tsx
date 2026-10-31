export function Architecture() {
  const PILLARS = [
    {
      num: '01',
      title: 'Headless Storefronts & Edge Systems',
      metric: '96+ Core Web Vitals',
      summary:
        'Decoupled Next.js architectures integrated with Shopify Storefront API and GraphQL. Sub-second TTFB, edge caching, and zero client hydration waste.',
      tech: ['Next.js 15', 'Shopify GraphQL', 'Edge ISR', 'Web Vitals'],
    },
    {
      num: '02',
      title: 'Autonomous AI Agents & RAG',
      metric: '70% Ticket Automation',
      summary:
        'Production RAG pipelines with Pinecone vector retrieval and deterministic tool execution. Real-time catalog queries without hallucinations.',
      tech: ['OpenAI GPT-4o', 'Pinecone', 'LangChain', 'Tool Calling'],
    },
    {
      num: '03',
      title: 'Multi-Tenant SaaS Infrastructure',
      metric: '14d → 3d Invoice Cycle',
      summary:
        'Relational database architecture, Stripe billing webhooks, real-time WebSocket state synchronization, and strict environment validation.',
      tech: ['Node.js', 'PostgreSQL', 'Prisma', 'Stripe API'],
    },
  ];

  return (
    <section className="py-20 md:py-24 border-b border-border bg-background" id="architecture">
      <div className="container mx-auto px-6">
        
        {/* Section Head Block */}
        <div className="max-w-2xl mb-12">
          <h2 className="text-3xl sm:text-4xl font-medium text-foreground tracking-tight mb-2">
            Architecture &amp; Standards
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground">
            Disciplined software engineering practices designed to deliver measurable speed, stability, and operational leverage.
          </p>
        </div>

        {/* 3-Column Hairline Panel Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 rounded-[10px] border border-border bg-border overflow-hidden gap-[1px]">
          {PILLARS.map((pillar) => (
            <div
              key={pillar.title}
              className="bg-card p-6 sm:p-8 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between font-mono text-xs text-muted-foreground mb-4">
                  <span>SPEC // {pillar.num}</span>
                  <span className="text-accent">{pillar.metric}</span>
                </div>

                <h3 className="text-lg font-medium text-foreground tracking-tight mb-3">
                  {pillar.title}
                </h3>

                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mb-6">
                  {pillar.summary}
                </p>
              </div>

              <div className="pt-4 border-t border-border/80 flex flex-wrap gap-1.5 font-mono text-[11px]">
                {pillar.tech.map((t) => (
                  <span
                    key={t}
                    className="px-2 py-0.5 rounded-[4px] border border-border bg-background text-muted-foreground"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

