const QUOTES = [
  {
    quote:
      '"The performance optimization on our Shopify store was transformative. Our conversion rate increased by 24% within the first month."',
    name: 'James Mitchell',
    role: 'CEO, TrendFlow',
    initials: 'JM',
  },
  {
    quote:
      '"A rare talent who understands both technical architecture and the commercial needs of a high-growth media agency."',
    name: 'Sarah Chen',
    role: 'Product Lead, NexaMedia',
    initials: 'SC',
  },
  {
    quote:
      '"The migration to headless was flawless. Our PageSpeed score is now 100/100, and mobile conversion is up 32%."',
    name: 'Marcus Thorne',
    role: 'Founder, CoreRetail',
    initials: 'MT',
  },
];

const AVATAR_COLORS = [
  'from-violet-500 to-purple-600',
  'from-sky-500 to-indigo-600',
  'from-emerald-500 to-teal-600',
];

export function Testimonials() {
  return (
    <section
      className="relative py-24 bg-muted overflow-hidden"
      id="testimonials"
    >
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none opacity-30">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary rounded-full filter blur-[120px]" />
      </div>
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16 animate-fade-up">
          <h2 className="text-primary font-bold tracking-[0.2em] uppercase text-sm mb-4">
            Client Feedback
          </h2>
          <h3 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Proven <span className="text-gradient">Reliability</span>
          </h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {QUOTES.map(({ quote, name, role, initials }, index) => (
            <div
              key={name}
              className="bg-card border border-border p-8 rounded-2xl shadow-sm animate-fade-up"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <span className="material-icons text-primary text-4xl mb-6 opacity-40">
                format_quote
              </span>
              <p className="text-muted-foreground mb-8 italic leading-relaxed text-lg">
                {quote}
              </p>
              <div className="flex items-center gap-4">
                <div
                  className={`w-12 h-12 rounded-full bg-gradient-to-br ${AVATAR_COLORS[index % AVATAR_COLORS.length]} flex items-center justify-center text-white font-bold text-sm shadow-lg`}
                >
                  {initials}
                </div>
                <div>
                  <h4 className="font-bold text-foreground">{name}</h4>
                  <p className="text-[10px] text-primary uppercase tracking-widest font-bold">
                    {role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
