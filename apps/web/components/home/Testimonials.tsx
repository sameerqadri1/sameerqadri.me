export function Testimonials() {
  const QUOTES = [
    {
      quote:
        'The performance optimization on our Shopify store was transformative. Our conversion rate increased by 24% within the first month after deployment.',
      name: 'James Mitchell',
      role: 'CEO, TrendFlow',
      initials: 'JM',
    },
    {
      quote:
        'A rare engineering talent who understands both low-level backend architecture and the commercial speed needed by high-growth founders.',
      name: 'Sarah Chen',
      role: 'Product Lead, NexaMedia',
      initials: 'SC',
    },
    {
      quote:
        'The headless migration was completely seamless. Our PageSpeed score reached 96/100, and mobile checkout conversion surged by 28%.',
      name: 'Marcus Thorne',
      role: 'Founder, CoreRetail',
      initials: 'MT',
    },
  ];

  return (
    <section className="py-20 md:py-24 border-b border-border bg-background" id="proof">
      <div className="container mx-auto px-6">
        
        {/* Section Head Block */}
        <div className="max-w-2xl mb-12">
          <h2 className="text-3xl sm:text-4xl font-medium text-foreground tracking-tight mb-2">
            Client Endorsements
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground">
            Direct feedback from founders and engineering leaders who rely on my systems.
          </p>
        </div>

        {/* 3-Column Testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {QUOTES.map(({ quote, name, role, initials }) => (
            <div
              key={name}
              className="rounded-[10px] border border-border bg-card p-6 sm:p-7 flex flex-col justify-between"
            >
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-6">
                &ldquo;{quote}&rdquo;
              </p>

              <div className="pt-4 border-t border-border/80 flex items-center gap-3">
                <div className="w-9 h-9 rounded-full border border-border bg-muted flex items-center justify-center font-mono text-xs text-foreground font-medium">
                  {initials}
                </div>
                <div>
                  <h3 className="text-sm font-medium text-foreground">{name}</h3>
                  <p className="font-mono text-xs text-muted-foreground">{role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
