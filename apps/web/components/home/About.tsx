import Image from 'next/image';

export function About() {
  return (
    <section className="py-24 bg-muted" id="about">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Photo */}
          <div className="flex justify-center lg:justify-start animate-fade-up order-first lg:order-none">
            <div className="relative">
              <div className="absolute -inset-4 bg-primary/20 rounded-3xl blur-2xl" />
              <div className="relative w-72 h-72 sm:w-96 sm:h-96 lg:w-[420px] lg:h-[480px] rounded-3xl overflow-hidden border-2 border-primary/30 shadow-2xl">
                <Image
                  src="/sameer.svg"
                  alt="Sameer Qadri — Full Stack Engineer"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              {/* Floating badge */}
              <div className="absolute -bottom-4 -right-4 bg-card border border-border rounded-2xl px-4 py-3 shadow-xl">
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
                  Based in
                </p>
                <p className="text-sm font-bold text-foreground">
                  Islamabad, PK 🇵🇰
                </p>
              </div>
            </div>
          </div>

          {/* Bio */}
          <div className="space-y-6 animate-fade-up">
            <div>
              <p className="text-primary font-bold tracking-[0.3em] uppercase text-sm mb-4">
                About Me
              </p>
              <h2 className="text-4xl md:text-5xl font-bold text-foreground leading-tight mb-6">
                Engineer with a{' '}
                <span className="text-gradient">builder&apos;s mindset</span>
              </h2>
            </div>

            <div className="space-y-4 text-muted-foreground text-base leading-relaxed">
              <p>
                I&apos;m Sameer Qadri — a Full Stack Engineer with 3 years of
                hands-on experience building things that real businesses depend
                on. My core work is custom headless website development for
                WordPress and Shopify — designing and building fast, scalable
                storefronts and business sites that convert.
              </p>
              <p>
                Beyond the web, I build SaaS products end-to-end and
                AI-powered chatbots for ecommerce — intelligent systems that
                handle customer queries, drive sales, and cut support costs.
                50+ projects shipped across 10+ countries.
              </p>
              <p>
                I take ownership from architecture to deployment. Clean code,
                documented, and built to last — not just to demo.
              </p>
            </div>

            <div className="flex flex-wrap gap-3 pt-2">
              {[
                'React / Next.js',
                'Headless Shopify',
                'WordPress',
                'Node.js',
                'Django',
                'AI Chatbots',
                'SaaS Architecture',
                'PostgreSQL',
              ].map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1.5 bg-card border border-border rounded-full text-xs font-semibold text-muted-foreground hover:border-primary/50 hover:text-foreground transition-colors"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
