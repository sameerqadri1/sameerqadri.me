const ITEMS = [
  {
    icon: 'layers',
    title: 'Headless Systems',
    description:
      'Decoupled frontends using Next.js connected to backend APIs. Fast, scalable, and fully custom.',
    tag: 'Architecture',
  },
  {
    icon: 'smart_toy',
    title: 'AI Agents',
    description:
      'Intelligent automation pipelines, LLM-powered tools, and AI workflows that scale operations.',
    tag: 'Automation',
  },
  {
    icon: 'rocket_launch',
    title: 'SaaS Products',
    description:
      'End-to-end SaaS development from architecture to launch. Multi-tenant apps, billing, and auth.',
    tag: 'Full-cycle',
  },
  {
    icon: 'speed',
    title: 'Performance Audit',
    description:
      'Systematic optimization of Core Web Vitals, reducing TTI and improving conversion rates.',
    tag: 'Optimization',
  },
];

export function Expertise() {
  return (
    <section className="py-20 bg-background border-b border-border" id="expertise">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="max-w-xl mb-12">
          <h2 className="text-3xl sm:text-4xl font-medium text-foreground tracking-tight">
            Full-Stack Domain Expertise
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {ITEMS.map(({ icon, title, description, tag }) => (
            <div
              key={title}
              className="rounded-[10px] border border-border bg-card p-6 flex flex-col justify-between hover:bg-muted/40 transition-colors"
            >
              <div>
                <div className="flex items-start justify-between mb-4">
                  <span className="material-symbols-outlined text-xl text-accent">{icon}</span>
                  <span className="font-mono text-[10px] text-muted-foreground border border-border rounded-[4px] px-2 py-0.5">
                    {tag}
                  </span>
                </div>

                <h3 className="text-base font-medium text-foreground mb-2">
                  {title}
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  {description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
