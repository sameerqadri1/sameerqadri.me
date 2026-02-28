const STATS = [
  { value: '50+', label: 'Projects Delivered' },
  { value: '3', label: 'SaaS Products Built' },
  { value: '30+', label: 'Happy Clients' },
  { value: '10+', label: 'Countries Served' },
];

export function Stats() {
  return (
    <section className="py-12 bg-background">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {STATS.map(({ value, label }, index) => (
            <div
              key={label}
              className="p-6 md:p-8 rounded-2xl border bg-card border-border/70 text-center shadow-sm animate-fade-up"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <p className="text-4xl font-bold text-foreground mb-1">
                {value}
              </p>
              <p className="text-muted-foreground text-sm uppercase tracking-widest font-bold">
                {label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
