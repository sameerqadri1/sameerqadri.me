const QUOTES = [
  {
    quote:
      '"The performance optimization on our Shopify store was transformative. Our conversion rate increased by 24% within the first month."',
    name: 'James Mitchell',
    role: 'CEO, TrendFlow',
    avatar:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCw5-7D4MiFz7S1Gwnm9lmSUEFFiVKwiTIhEjaGrAmtrcGRLmaGIziNjdRCRFHwB84VRrEmU1CBWDYgcGvnl8T8Tywboyi9rCV4KgNU4V1s1D2bKGcHPsMfQ1NryZ_RBBsutdLnZesrONsrDrh5hExMrWrpb0lv_XEvcSFVxuOD1p-22pXK891ngoVTZhNZMbm9NdMJKg5o7vSXuzCfTa3ENcZxp3Fem77sQb42oiAjOyzeSAgTleHdDH47vUeLZ6wlwzWb1NitjJA',
  },
  {
    quote:
      '"A rare talent who understands both technical architecture and the commercial needs of a high-growth media agency."',
    name: 'Sarah Chen',
    role: 'Product Lead, NexaMedia',
    avatar:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCj4KFh7BeOlLRO0VHqmw6HkOlVcABmGN6mRZT-is8IU0TcXjgDTvjUIJ7JTkR1imafaAhQK9vcjemVjKprkhN_CukcUC_SuCS34huao8WmyOyw8I-uTbSRCz5lGMUIeTIAcvvh5oZiy-nlykvnQqoVLCBVO4QmhxQpZ-MWIJuV8KbDr5X7Gzy3RJ1Bcip1ADP1cA7Kjw9XV-P41RyYQVrc9sDqNICDYtoqiHtSdIhLgWrk_yToYAlwIcc1fR7lSGrjOGvL-_Ow-cI',
  },
  {
    quote:
      '"The migration to headless was flawless. Our PageSpeed score is now 100/100, and mobile conversion is up 32%."',
    name: 'Marcus Thorne',
    role: 'Founder, CoreRetail',
    avatar:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCpW4DjL3GsUkpOUNK76lO8H6_L5UV2QdNDdWKOrkul8CnITDLGJvlfKvXHJ3eUJ5pSHXnQHK1GrEn91JLSw6MINfex6s1GWhVKaGLPTUW4UYVlyAAs0voqkqMlt_YWHoq6YavPXdW6312hWIjrnJdyTJ-E8nTLaW5lTyojsgXwNHoJ2gMLk8PhQWVuDmKVZMlcQ9EzRFBz5UP3bJA93OfFwxhQgiVw4n6C-lz_gcHbzlJsI_-FKVeFbtyWLpxE0kWj27VOxG8Dl4w',
  },
];

export function Testimonials() {
  return (
    <section
      className="relative py-24 bg-muted overflow-hidden"
      id="testimonials"
    >
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none opacity-20">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[var(--color-primary)] rounded-full filter blur-[120px]" />
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {QUOTES.map(({ quote, name, role, avatar }, index) => (
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
                <div className="w-12 h-12 rounded-full border border-blue-500/30 p-1">
                  <img
                    alt=""
                    className="w-full h-full rounded-full object-cover"
                    src={avatar}
                  />
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
