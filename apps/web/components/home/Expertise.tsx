const ITEMS = [
  {
    icon: 'layers',
    title: 'Headless Systems',
    description:
      'Decoupled frontends using Next.js connected to robust backend APIs — fast, scalable, and fully custom.',
  },
  {
    icon: 'smart_toy',
    title: 'AI Agents',
    description:
      'Intelligent automation pipelines, LLM-powered tools, and AI-driven workflows that save time and scale operations.',
  },
  {
    icon: 'rocket_launch',
    title: 'SaaS Products',
    description:
      'End-to-end SaaS development from architecture to launch — multi-tenant apps, billing, auth, and beyond.',
  },
  {
    icon: 'speed',
    title: 'Performance Audit',
    description:
      'Systematic optimization of Core Web Vitals, reducing TTI and improving conversion rates with measurable results.',
  },
];

export function Expertise() {
  return (
    <section className="py-24 bg-muted" id="expertise">
      <div className="container mx-auto px-6">
        <div className="mb-16 animate-fade-up text-center">
          <h2 className="text-primary font-bold tracking-[0.2em] uppercase text-sm mb-4">
            Service Menu
          </h2>
          <h3 className="text-4xl md:text-5xl font-bold text-foreground">
            Full-Stack Expertise
          </h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {ITEMS.map(({ icon, title, description }, index) => (
            <div
              key={title}
              className="glow-card p-6 md:p-8 rounded-2xl animate-fade-up"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-6">
                <span className="material-symbols-outlined text-3xl">
                  {icon}
                </span>
              </div>
              <h4 className="text-xl font-bold text-foreground mb-3">
                {title}
              </h4>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
