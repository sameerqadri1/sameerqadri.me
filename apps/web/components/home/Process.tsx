const STEPS = [
  {
    num: '01',
    title: 'Discovery & Systems Audit',
    description:
      'We assess your existing systems, bottlenecks, and user requirements to establish clear technical constraints.',
  },
  {
    num: '02',
    title: 'Architecture & Scope Contract',
    description:
      'We define data schemas, API contracts, and milestone deliverables with measurable acceptance criteria.',
  },
  {
    num: '03',
    title: 'Iterative Implementation',
    description:
      'Continuous shipping with weekly PR reviews, automated tests, and live staging previews.',
  },
  {
    num: '04',
    title: 'Verification & Production Launch',
    description:
      'Pre-launch load testing, Core Web Vitals verification, and telemetry monitoring around cutover.',
  },
];

export function Process() {
  return (
    <section className="py-20 bg-background border-b border-border" id="process">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="max-w-2xl mb-12">
          <h2 className="text-3xl sm:text-4xl font-medium text-foreground tracking-tight mb-2">
            Engineering Lifecycle
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground">
            A structured deployment process delivering predictable, verified production outcomes.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {STEPS.map(({ num, title, description }) => (
            <div
              key={title}
              className="rounded-[10px] border border-border bg-card p-6 flex flex-col justify-between hover:bg-muted/40 transition-colors"
            >
              <div>
                <span className="font-mono text-xs text-accent mb-3 block">STAGE // {num}</span>
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
