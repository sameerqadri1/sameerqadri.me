'use client';

import { useEffect, useState, type MouseEvent } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

const NAV_LINKS = [
  { label: 'Work', section: 'projects' },
  { label: 'Architecture', section: 'architecture' },
  { label: 'Proof', section: 'proof' },
  { label: 'FAQ', section: 'faq' },
  { label: 'Contact', section: 'contact' },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 32);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  function navigateToSection(e: MouseEvent, section: string) {
    e.preventDefault();
    if (pathname === '/') {
      const el = document.getElementById(section);
      if (el) {
        const headerHeight = 64;
        const targetPosition = el.getBoundingClientRect().top + window.scrollY - headerHeight;
        window.scrollTo({ top: targetPosition, behavior: 'smooth' });
      }
    } else {
      sessionStorage.setItem('scrollTo', section);
      router.push('/');
    }
    setMenuOpen(false);
  }

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-200 border-b ${
          scrolled
            ? 'bg-background/95 border-border'
            : 'bg-background/80 border-border/60'
        }`}
      >
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          {/* Brand & telemetry status */}
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="text-sm font-semibold text-foreground tracking-tight hover:text-primary transition-colors flex items-center gap-2"
            >
              <span>Sameer Qadri</span>
              <span className="text-muted-foreground/60 text-xs">/</span>
              <span className="text-xs text-muted-foreground font-normal">Systems &amp; AI</span>
            </Link>

            <div className="hidden lg:flex items-center gap-2 px-2.5 py-1 rounded-[6px] border border-border bg-muted text-xs text-muted-foreground font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
              <span>Available for hire</span>
            </div>
          </div>

          {/* Desktop Links */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map(({ label, section }) => (
              section === 'projects' ? (
                <Link
                  key={label}
                  href="/case-studies"
                  className="px-3 py-1.5 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors rounded-[6px]"
                >
                  {label}
                </Link>
              ) : (
                <a
                  key={label}
                  href={`/#${section}`}
                  className="px-3 py-1.5 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors rounded-[6px]"
                  onClick={(e) => navigateToSection(e, section)}
                >
                  {label}
                </a>
              )
            ))}
          </nav>

          {/* Action */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="/#contact"
              onClick={(e) => navigateToSection(e, 'contact')}
              className="px-4 py-2 rounded-[6px] text-xs font-medium bg-primary text-primary-foreground hover:opacity-90 transition-opacity cursor-pointer"
            >
              Start a Project
            </a>
          </div>

          {/* Mobile hamburger */}
          <div className="flex md:hidden items-center gap-2">
            <a
              href="/#contact"
              onClick={(e) => navigateToSection(e, 'contact')}
              className="px-3 py-1.5 rounded-[6px] text-xs font-medium bg-primary text-primary-foreground cursor-pointer"
            >
              Start
            </a>
            <button
              onClick={() => setMenuOpen((v) => !v)}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              className="w-8 h-8 flex flex-col items-center justify-center gap-1 rounded-[6px] border border-border bg-card text-foreground"
            >
              <span
                className={`block h-0.5 w-4 bg-foreground transition-transform duration-200 ${
                  menuOpen ? 'rotate-45 translate-y-1.5' : ''
                }`}
              />
              <span
                className={`block h-0.5 w-4 bg-foreground transition-opacity duration-200 ${
                  menuOpen ? 'opacity-0' : ''
                }`}
              />
              <span
                className={`block h-0.5 w-4 bg-foreground transition-transform duration-200 ${
                  menuOpen ? '-rotate-45 -translate-y-1.5' : ''
                }`}
              />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 md:hidden bg-background/95 pt-20 px-6 pb-8 border-b border-border">
          <nav className="flex flex-col gap-2">
            {NAV_LINKS.map(({ label, section }) => (
              section === 'projects' ? (
                <Link
                  key={label}
                  href="/case-studies"
                  onClick={() => setMenuOpen(false)}
                  className="px-3 py-2 rounded-[6px] text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                >
                  {label}
                </Link>
              ) : (
                <a
                  key={label}
                  href={`/#${section}`}
                  onClick={(e) => navigateToSection(e, section)}
                  className="px-3 py-2 rounded-[6px] text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                >
                  {label}
                </a>
              )
            ))}
          </nav>
          <div className="mt-6 pt-6 border-t border-border flex flex-col gap-4">
            <a
              href="/#contact"
              onClick={(e) => navigateToSection(e, 'contact')}
              className="py-2.5 text-center text-xs font-medium bg-primary text-primary-foreground rounded-[6px]"
            >
              Start a Project
            </a>
          </div>
        </div>
      )}
    </>
  );
}
