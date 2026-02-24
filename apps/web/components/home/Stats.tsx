const STATS = [
  { value: '20+', label: 'Projects Built' },
  { value: '10k+', label: 'Daily Orders' },
  { value: '100/100', label: 'Lighthouse Score' },
  { value: '$50M+', label: 'Client Revenue' },
];

export function Stats() {
  return (
    <section className="py-12 bg-background">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {STATS.map(({ value, label }, index) => (
            <div
              key={label}
              className="p-8 rounded-2xl border bg-card border-border/70 text-center shadow-sm animate-fade-up"
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
