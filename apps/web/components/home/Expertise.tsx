const ITEMS = [
  {
    icon: 'layers',
    title: 'Headless Systems',
    description:
      'Decoupled frontends using Next.js connected to robust backend APIs — fast, scalable, and fully custom.',
    accent: 'from-violet-500/20 to-violet-500/5',
    tag: 'Architecture',
  },
  {
    icon: 'smart_toy',
    title: 'AI Agents',
    description:
      'Intelligent automation pipelines, LLM-powered tools, and AI-driven workflows that save time and scale operations.',
    accent: 'from-blue-500/20 to-blue-500/5',
    tag: 'Automation',
  },
  {
    icon: 'rocket_launch',
    title: 'SaaS Products',
    description:
      'End-to-end SaaS development from architecture to launch — multi-tenant apps, billing, auth, and beyond.',
    accent: 'from-emerald-500/20 to-emerald-500/5',
    tag: 'Full-cycle',
  },
  {
    icon: 'speed',
    title: 'Performance Audit',
    description:
      'Systematic optimisation of Core Web Vitals, reducing TTI and improving conversion rates with measurable results.',
    accent: 'from-amber-500/20 to-amber-500/5',
    tag: 'Optimisation',
  },
];

export function Expertise() {
  return (
    <section className="py-24 bg-muted/40" id="expertise">
      <div className="container mx-auto px-6 max-w-6xl">

        {/* Header */}
        <div className="max-w-xl mb-14 animate-fade-up">
          <p className="text-primary font-bold tracking-[0.2em] uppercase text-sm mb-3">
            Services
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground tracking-tight">
            Full-Stack Expertise
          </h2>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {ITEMS.map(({ icon, title, description, accent, tag }, index) => (
            <div
              key={title}
              className="group relative rounded-2xl border border-border/70 bg-card overflow-hidden transition-all duration-300 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-0.5 animate-fade-up"
              style={{ animationDelay: `${index * 0.07}s` }}
            >
              {/* Gradient bg tint */}
              <div className={`absolute inset-0 bg-gradient-to-br ${accent} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

              <div className="relative p-6 flex flex-col h-full">
                {/* Top row: icon + tag */}
                <div className="flex items-start justify-between mb-5">
                  <div className="w-11 h-11 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                    <span className="material-symbols-outlined text-2xl">{icon}</span>
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground border border-border rounded-full px-2.5 py-0.5">
                    {tag}
                  </span>
                </div>

                <h3 className="text-base font-bold text-foreground mb-2 leading-snug">
                  {title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed flex-1">
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
