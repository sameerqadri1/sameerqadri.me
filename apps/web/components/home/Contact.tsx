'use client';

export function Contact() {
  return (
    <section className="py-24 bg-background" id="contact">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div className="space-y-8 animate-fade-up">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground leading-tight">
              Let&apos;s build something{' '}
              <span className="text-primary">extraordinary</span>.
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed max-w-lg">
              I specialize in high-stakes digital transitions. Whether
              you&apos;re moving to Shopify Plus or scaling a custom app,
              let&apos;s talk about your goals.
            </p>
            <div className="space-y-6">
              <div className="flex items-center gap-4 group">
                <div className="w-12 h-12 bg-muted rounded-xl flex items-center justify-center border border-border group-hover:border-primary/50 transition-colors">
                  <span className="material-icons text-primary">mail</span>
                </div>
                <div>
                  <h4 className="text-foreground font-bold text-sm">
                    Email Me
                  </h4>
                  <p className="text-muted-foreground">hello@stacksmith.dev</p>
                </div>
              </div>
              <div className="flex items-center gap-4 group">
                <div className="w-12 h-12 bg-muted rounded-xl flex items-center justify-center border border-border group-hover:border-primary/50 transition-colors">
                  <span className="material-icons text-primary">
                    calendar_today
                  </span>
                </div>
                <div>
                  <h4 className="text-foreground font-bold text-sm">
                    Technical Audit
                  </h4>
                  <p className="text-muted-foreground">
                    Book a 15-min discovery session
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-card border border-border p-8 rounded-3xl relative shadow-sm animate-fade-up">
            <div className="absolute -top-3 -right-3 bg-primary text-primary-foreground text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest shadow-lg">
              Responds within 12h
            </div>
            <form action="#" className="space-y-6" method="post">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label
                    className="text-xs font-bold uppercase tracking-widest text-muted-foreground"
                    htmlFor="contact-name"
                  >
                    Your Name
                  </label>
                  <input
                    id="contact-name"
                    className="w-full bg-background border border-input rounded-xl px-4 py-3 text-foreground focus:ring-1 focus:ring-ring focus:border-ring outline-none transition-all"
                    placeholder="John Doe"
                    type="text"
                  />
                </div>
                <div className="space-y-2">
                  <label
                    className="text-xs font-bold uppercase tracking-widest text-muted-foreground"
                    htmlFor="contact-company"
                  >
                    Company
                  </label>
                  <input
                    id="contact-company"
                    className="w-full bg-background border border-input rounded-xl px-4 py-3 text-foreground focus:ring-1 focus:ring-ring focus:border-ring outline-none transition-all"
                    placeholder="Acme Inc"
                    type="text"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label
                  className="text-xs font-bold uppercase tracking-widest text-muted-foreground"
                  htmlFor="contact-email"
                >
                  Work Email
                </label>
                <input
                  id="contact-email"
                  className="w-full bg-background border border-input rounded-xl px-4 py-3 text-foreground focus:ring-1 focus:ring-ring focus:border-ring outline-none transition-all"
                  placeholder="john@company.com"
                  type="email"
                />
              </div>
              <div className="space-y-2">
                <label
                  className="text-xs font-bold uppercase tracking-widest text-slate-500"
                  htmlFor="contact-message"
                >
                  How can I help?
                </label>
                <textarea
                  id="contact-message"
                  className="w-full bg-background border border-input rounded-xl px-4 py-3 text-foreground focus:ring-1 focus:ring-ring focus:border-ring outline-none transition-all resize-none"
                  placeholder="Briefly describe your project..."
                  rows={4}
                />
              </div>
              <button
                className="w-full py-4 bg-primary text-primary-foreground font-bold rounded-xl shadow-xl shadow-primary/20 hover:bg-primary/90 transition-all flex items-center justify-center gap-2"
                type="submit"
              >
                Send Message
                <span className="material-icons text-sm">send</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
