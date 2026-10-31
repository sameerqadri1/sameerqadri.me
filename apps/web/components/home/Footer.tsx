'use client';

import Link from 'next/link';
import { type MouseEvent } from 'react';
import { usePathname, useRouter } from 'next/navigation';

export function Footer() {
  const pathname = usePathname();
  const router = useRouter();

  function navigateToSection(e: MouseEvent, section: string) {
    e.preventDefault();
    if (pathname === '/') {
      const el = document.getElementById(section);
      if (el) {
        const headerHeight = 64;
        const targetPosition =
          el.getBoundingClientRect().top + window.scrollY - headerHeight;
        window.scrollTo({ top: targetPosition, behavior: 'smooth' });
      }
    } else {
      sessionStorage.setItem('scrollTo', section);
      router.push('/');
    }
  }

  return (
    <footer className="border-t border-border bg-background pt-16 pb-12">
      <div className="container mx-auto px-6">
        
        {/* Main 4-Column Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 mb-16">
          
          {/* Column 1: Persona & Availability (5 cols) */}
          <div className="sm:col-span-2 lg:col-span-5 space-y-4">
            <div>
              <Link
                href="/"
                className="text-base font-semibold text-foreground tracking-tight hover:text-accent transition-colors inline-block"
              >
                Sameer Qadri
              </Link>
              <p className="font-mono text-xs text-muted-foreground mt-0.5">
                Full Stack &amp; AI Systems Engineer
              </p>
            </div>

            <p className="text-xs sm:text-sm text-muted-foreground max-w-sm leading-relaxed">
              Engineering headless architectures, autonomous LLM pipelines, and scalable multi-tenant SaaS products.
            </p>

            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-[6px] border border-border bg-muted/60 text-xs font-mono text-muted-foreground">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>Available for new projects</span>
            </div>
          </div>

          {/* Column 2: Navigation (3 cols) */}
          <div className="lg:col-span-3 space-y-3.5">
            <h3 className="font-mono text-xs font-medium text-foreground">
              Navigation
            </h3>
            <ul className="space-y-2.5 text-xs sm:text-sm text-muted-foreground">
              <li>
                <Link
                  href="/case-studies"
                  className="hover:text-foreground transition-colors inline-block"
                >
                  Selected Case Studies
                </Link>
              </li>
              <li>
                <a
                  href="/#architecture"
                  onClick={(e) => navigateToSection(e, 'architecture')}
                  className="hover:text-foreground transition-colors inline-block cursor-pointer"
                >
                  Architecture &amp; Standards
                </a>
              </li>
              <li>
                <a
                  href="/#proof"
                  onClick={(e) => navigateToSection(e, 'proof')}
                  className="hover:text-foreground transition-colors inline-block cursor-pointer"
                >
                  Client Endorsements
                </a>
              </li>
              <li>
                <a
                  href="/#faq"
                  onClick={(e) => navigateToSection(e, 'faq')}
                  className="hover:text-foreground transition-colors inline-block cursor-pointer"
                >
                  Frequently Asked Questions
                </a>
              </li>
              <li>
                <a
                  href="/#contact"
                  onClick={(e) => navigateToSection(e, 'contact')}
                  className="hover:text-accent font-medium text-foreground transition-colors inline-block cursor-pointer"
                >
                  Initiate consultation
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Channels (2 cols) */}
          <div className="lg:col-span-2 space-y-3.5">
            <h3 className="font-mono text-xs font-medium text-foreground">
              Channels
            </h3>
            <ul className="space-y-2.5 text-xs sm:text-sm text-muted-foreground">
              <li>
                <a
                  href="https://github.com/sameerqadri1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-foreground transition-colors inline-flex items-center gap-1.5 group"
                >
                  <span>GitHub</span>
                  <span className="material-icons text-xs text-muted-foreground group-hover:text-foreground group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" aria-hidden="true">
                    arrow_outward
                  </span>
                </a>
              </li>
              <li>
                <a
                  href="https://linkedin.com/in/sameerqadri"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-foreground transition-colors inline-flex items-center gap-1.5 group"
                >
                  <span>LinkedIn</span>
                  <span className="material-icons text-xs text-muted-foreground group-hover:text-foreground group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" aria-hidden="true">
                    arrow_outward
                  </span>
                </a>
              </li>
              <li>
                <a
                  href="https://x.com/coder_qadri"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-foreground transition-colors inline-flex items-center gap-1.5 group"
                >
                  <span>X / Twitter</span>
                  <span className="material-icons text-xs text-muted-foreground group-hover:text-foreground group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" aria-hidden="true">
                    arrow_outward
                  </span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@sameerqadri.me"
                  className="hover:text-foreground transition-colors inline-flex items-center gap-1.5 group"
                >
                  <span>Direct Email</span>
                  <span className="material-icons text-xs text-muted-foreground group-hover:text-foreground group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" aria-hidden="true">
                    arrow_outward
                  </span>
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: System Specs & Telemetry (2 cols) */}
          <div className="lg:col-span-2 space-y-3.5">
            <h3 className="font-mono text-xs font-medium text-foreground">
              System specs
            </h3>
            <div className="space-y-2 font-mono text-xs text-muted-foreground">
              <div>
                <span className="text-foreground/80 block">Timezone</span>
                <span>PKT (UTC+5)</span>
              </div>
              <div>
                <span className="text-foreground/80 block">Response SLA</span>
                <span className="text-accent">&lt; 24 Hours</span>
              </div>
              <div>
                <span className="text-foreground/80 block">Database</span>
                <span>Neon Postgres</span>
              </div>
              <div>
                <span className="text-foreground/80 block">Hosting</span>
                <span>Vercel Global Edge</span>
              </div>
            </div>
          </div>

        </div>

        {/* Colophon Separator */}
        <div className="pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} Sameer Qadri. Engineered with Next.js, Node.js, and PostgreSQL.</p>
          <p className="text-muted-foreground/80">Islamabad, PK · Available Worldwide</p>
        </div>

      </div>
    </footer>
  );
}
