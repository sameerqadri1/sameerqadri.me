'use client';

import Link from 'next/link';

export function Footer() {
  return (
    <footer className="border-t border-border bg-background py-14">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-12">
          
          {/* Wordmark & Persona */}
          <div className="md:col-span-6 space-y-3">
            <Link
              href="/"
              className="text-base font-medium text-foreground tracking-tight hover:text-accent transition-colors block"
            >
              Sameer Qadri
            </Link>
            <p className="text-xs sm:text-sm text-muted-foreground max-w-md leading-relaxed">
              Full Stack &amp; AI Systems Engineer. Headless architectures, autonomous agents, and production SaaS platforms built for scale.
            </p>
          </div>

          {/* Sitemaps */}
          <div className="md:col-span-3 space-y-2">
            <p className="font-mono text-xs text-foreground mb-3">Navigation</p>
            <ul className="space-y-1.5 text-xs text-muted-foreground font-mono">
              <li>
                <Link href="/case-studies" className="hover:text-foreground transition-colors">
                  Case Studies
                </Link>
              </li>
              <li>
                <a href="/#architecture" className="hover:text-foreground transition-colors">
                  Architecture &amp; Standards
                </a>
              </li>
              <li>
                <a href="/#proof" className="hover:text-foreground transition-colors">
                  Client Endorsements
                </a>
              </li>
              <li>
                <a href="/#faq" className="hover:text-foreground transition-colors">
                  FAQ
                </a>
              </li>
              <li>
                <a href="/#contact" className="hover:text-foreground transition-colors">
                  Direct Inquiry
                </a>
              </li>
            </ul>
          </div>

          {/* Social / Channels */}
          <div className="md:col-span-3 space-y-2">
            <p className="font-mono text-xs text-foreground mb-3">Channels</p>
            <ul className="space-y-1.5 text-xs text-muted-foreground font-mono">
              <li>
                <a
                  href="https://github.com/sameerqadri1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-foreground transition-colors"
                >
                  GitHub // @sameerqadri1
                </a>
              </li>
              <li>
                <a
                  href="https://linkedin.com/in/sameerqadri"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-foreground transition-colors"
                >
                  LinkedIn // in/sameerqadri
                </a>
              </li>
              <li>
                <a
                  href="https://x.com/coder_qadri"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-foreground transition-colors"
                >
                  X // @coder_qadri
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Colophon Line */}
        <div className="pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} Sameer Qadri. Engineered with Next.js, Node.js, and PostgreSQL.</p>
          <p className="text-muted-foreground/80">Islamabad, PK // Operating globally</p>
        </div>
      </div>
    </footer>
  );
}
