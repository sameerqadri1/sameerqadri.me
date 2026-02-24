import Link from 'next/link';

export function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center pt-12 pb-24 overflow-hidden">
      <div className="pointer-events-none absolute top-0 right-0 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/4" />
      <div className="pointer-events-none absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary/10 rounded-full blur-[100px]" />
      <div className="container mx-auto px-6 relative z-10 animate-fade-up">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-primary font-bold tracking-[0.3em] uppercase text-sm mb-6">
            Senior Full-Stack Architect
          </h2>
          <h1 className="text-5xl md:text-7xl font-bold leading-[1.1] mb-8">
            I Build <span className="text-gradient">Digital Businesses</span>,
            Not Just Websites.
          </h1>
          <p className="text-muted-foreground text-xl mb-10 leading-relaxed">
            Transforming complex requirements into high-conversion Shopify Plus
            and custom full-stack ecosystems. Scaling brands from 0 to 10k+
            daily orders.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              className="px-8 py-4 bg-primary text-primary-foreground font-bold rounded-xl shadow-xl shadow-primary/20 hover:bg-primary/90 transition-all flex items-center gap-2"
              href="#contact"
            >
              Start Your Project
              <span className="material-icons text-sm">arrow_forward</span>
            </Link>
            <Link
              className="px-8 py-4 bg-secondary text-secondary-foreground font-bold rounded-xl border border-border/70 hover:bg-secondary/80 transition-all"
              href="#projects"
            >
              View Case Studies
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
