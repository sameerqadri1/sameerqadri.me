const STEPS = [
  {
    icon: 'search',
    title: 'Discovery',
    description:
      'We start with a deep-dive into your goals, constraints, and existing systems. I ask the uncomfortable questions early so we build the right thing.',
  },
  {
    icon: 'architecture',
    title: 'Scope',
    description:
      'Together we define a clear scope, stack decisions, and timeline. No surprises later — everything is agreed before a single line of code is written.',
  },
  {
    icon: 'code',
    title: 'Build',
    description:
      'I build iteratively with regular check-ins. You see real progress every week, not a big reveal at the end. Clean code, tested, documented.',
  },
  {
    icon: 'rate_review',
    title: 'Review',
    description:
      'A structured review phase where we test edge cases, gather feedback, and polish the experience before going live.',
  },
  {
    icon: 'rocket_launch',
    title: 'Launch',
    description:
      'Smooth deployment with proper monitoring in place. I stay close around launch day to handle anything that comes up immediately.',
  },
  {
    icon: 'autorenew',
    title: 'Iterate',
    description:
      'For ongoing engagements — I help you evolve the product based on real user data. Speed, reliability, and new features without breaking what works.',
    optional: true,
  },
];

export function Process() {
  return (
    <section className="py-24 bg-background" id="process">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 animate-fade-up">
          <p className="text-primary font-bold tracking-[0.2em] uppercase text-sm mb-4">
            How I Work
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            My <span className="text-gradient">Process</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            A clear, repeatable process that delivers predictable outcomes —
            every time.
          </p>
        </div>

        <div className="relative">
          {/* Connecting line — desktop only */}
          <div className="hidden lg:block absolute top-10 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {STEPS.map(({ icon, title, description, optional }, index) => (
              <div
                key={title}
                className="relative glow-card p-6 rounded-2xl animate-fade-up group hover:-translate-y-1.5 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300"
                style={{ animationDelay: `${index * 0.08}s` }}
              >
                {optional && (
                  <span className="absolute top-4 right-4 text-[10px] font-bold text-primary/70 border border-primary/30 rounded-full px-2 py-0.5 uppercase tracking-widest">
                    Optional
                  </span>
                )}
                <div className="mb-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary animate-zoom-in group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300" style={{ animationDelay: `${index * 0.08 + 0.15}s` }}>
                    <span className="material-symbols-outlined text-xl">
                      {icon}
                    </span>
                  </div>
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">
                  {title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
