import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-background border-t border-border/60 pt-20 pb-12">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center font-bold text-primary-foreground">
                S
              </div>
              <span className="text-lg font-bold text-foreground">
                StackSmith
              </span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Expert digital architect focusing on ROI-driven development and
              high-performance commerce ecosystems.
            </p>
            <div className="flex gap-4">
              <a
                className="w-10 h-10 bg-muted border border-border rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary transition-all"
                href="#"
                aria-label="LinkedIn"
              >
                <svg
                  className="w-5 h-5 fill-current"
                  viewBox="0 0 24 24"
                  aria-hidden
                >
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
              <a
                className="w-10 h-10 bg-muted border border-border rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary transition-all"
                href="#"
                aria-label="GitHub"
              >
                <svg
                  className="w-5 h-5 fill-current"
                  viewBox="0 0 24 24"
                  aria-hidden
                >
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.041-1.412-4.041-1.412-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </a>
            </div>
          </div>
          <div>
            <h4 className="text-foreground font-bold mb-6 text-xs uppercase tracking-[0.2em]">
              Sitemap
            </h4>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li>
                <Link className="hover:text-primary transition-colors" href="#expertise">
                  Expertise
                </Link>
              </li>
              <li>
                <Link className="hover:text-primary transition-colors" href="#projects">
                  Projects
                </Link>
              </li>
              <li>
                <Link className="hover:text-primary transition-colors" href="#testimonials">
                  Testimonials
                </Link>
              </li>
              <li>
                <Link className="hover:text-primary transition-colors" href="#contact">
                  Hire Me
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-foreground font-bold mb-6 text-xs uppercase tracking-[0.2em]">
              Verticals
            </h4>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li>Shopify Plus Migration</li>
              <li>Headless Commerce</li>
              <li>Custom ERP Integrations</li>
              <li>Performance Audits</li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="text-foreground font-bold mb-2 text-xs uppercase tracking-[0.2em]">
              Verified Performance
            </h4>
            <div className="p-4 bg-muted border border-border rounded-xl">
              <div className="flex justify-between items-center mb-2">
                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                  PageSpeed
                </span>
                <span className="text-emerald-500 font-bold text-xs">
                  100/100
                </span>
              </div>
              <div className="h-1 bg-secondary rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 w-full" />
              </div>
            </div>
            <div className="p-4 bg-muted border border-border rounded-xl">
              <div className="flex justify-between items-center mb-2">
                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                  Shopify Vitals
                </span>
                <span className="text-primary font-bold text-xs">
                  A+ Rating
                </span>
              </div>
              <div className="h-1 bg-secondary rounded-full overflow-hidden">
                <div className="h-full bg-primary w-[95%]" />
              </div>
            </div>
          </div>
        </div>
        <div className="pt-10 border-t border-border/60 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-muted-foreground text-xs font-medium">
            © 2026 StackSmith Studio. All systems operational.
          </p>
          <div className="flex gap-8">
            <Link
              className="text-muted-foreground hover:text-foreground text-xs transition-colors"
              href="#"
            >
              Privacy Policy
            </Link>
            <Link
              className="text-muted-foreground hover:text-foreground text-xs transition-colors"
              href="#"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
