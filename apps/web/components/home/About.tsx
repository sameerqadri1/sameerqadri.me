export function About() {
  const STACK = [
    'Next.js 15',
    'TypeScript',
    'Headless Shopify',
    'Node.js',
    'PostgreSQL',
    'Prisma',
    'AI Agents / RAG',
    'Stripe',
  ];

  return (
    <section className="py-20 md:py-24 border-b border-border bg-background" id="about">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">

          {/* Portrait: crisp hairline framing, no glow orbs */}
          <div className="lg:col-span-5 flex justify-center lg:justify-start">
            <div className="relative w-full max-w-sm rounded-[10px] overflow-hidden border border-border bg-card">
              <div className="aspect-[4/5] overflow-hidden">
                <img
                  src="/sameer.jpg"
                  alt="Sameer Qadri, Full Stack Engineer"
                  width={420}
                  height={525}
                  className="w-full h-full object-cover grayscale contrast-110"
                />
              </div>
              <div className="p-4 border-t border-border bg-muted/60 flex items-center justify-between font-mono text-xs text-muted-foreground">
                <span>Sameer Qadri</span>
                <span className="text-foreground">Islamabad, PK // Remote</span>
              </div>
            </div>
          </div>

          {/* Bio & Philosophy */}
          <div className="lg:col-span-7">
            <h2 className="text-3xl sm:text-4xl font-medium text-foreground tracking-tight mb-6">
              Engineering systems built to endure production load.
            </h2>

            <div className="space-y-4 text-sm sm:text-base text-muted-foreground leading-relaxed mb-8 max-w-2xl">
              <p>
                I am a Full Stack and AI Software Engineer with 3 years of production experience shipping platforms that commercial businesses run on. My primary domain is high-speed headless storefronts for Shopify, custom Next.js web applications, and autonomous LLM agents that resolve customer operations.
              </p>
              <p>
                Having shipped 50+ projects across 10+ countries, I manage software from database schema design and edge caching to end-to-end security verification. Every system is built with typed contracts, rigorous documentation, and measurable performance standards.
              </p>
            </div>

            {/* Stack Tags */}
            <div className="pt-6 border-t border-border">
              <p className="font-mono text-xs text-muted-foreground mb-3">Primary Tech Stack</p>
              <div className="flex flex-wrap gap-2">
                {STACK.map((item) => (
                  <span
                    key={item}
                    className="font-mono text-xs px-2.5 py-1 rounded-[4px] border border-border bg-card text-foreground"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
