'use client';

import { useEffect, useState, type MouseEvent } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

const NAV_LINKS = [
  { label: 'About', section: 'about' },
  { label: 'Expertise', section: 'expertise' },
  { label: 'Process', section: 'process' },
  { label: 'Projects', section: 'projects' },
  { label: 'Testimonials', section: 'testimonials' },
  { label: 'FAQ', section: 'faq' },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 48);
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
      document.getElementById(section)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      sessionStorage.setItem('scrollTo', section);
      router.push('/');
    }
    setMenuOpen(false);
  }

  function handleNavLinkMouseMove(e: MouseEvent<HTMLAnchorElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    e.currentTarget.style.setProperty('--mouse-x', `${x}%`);
    e.currentTarget.style.setProperty('--mouse-y', `${y}%`);
  }

  return (
    <>
      <nav className="fixed top-4 left-1/2 z-50 -translate-x-1/2 w-[min(94vw,1040px)]">
        <div
          className={`nav-pill transition-all duration-300 ${
            scrolled ? 'nav-pill-scrolled' : ''
          }`}
        >
          {/* Desktop */}
          <div className="hidden md:flex w-full items-center justify-between gap-2">
            <Link
              href="/"
              className="text-sm font-bold text-foreground tracking-tight flex-shrink-0 hover:text-primary transition-colors pr-2"
            >
              SQ
            </Link>

            <div className="flex items-center gap-1">
              {NAV_LINKS.map(({ label, section }) => (
                label === 'Projects' ? (
                  <Link
                    key={label}
                    href="/case-studies"
                    className="nav-link"
                    onMouseMove={handleNavLinkMouseMove}
                    onClick={() => setMenuOpen(false)}
                  >
                    {label}
                  </Link>
                ) : (
                  <a
                    key={label}
                    href={`/#${section}`}
                    className="nav-link"
                    onMouseMove={handleNavLinkMouseMove}
                    onClick={(e) => navigateToSection(e, section)}
                  >
                    {label}
                  </a>
                )
              ))}
            </div>
            <a
              className="px-5 py-2 rounded-full text-xs font-semibold tracking-wide bg-primary text-primary-foreground shadow-md shadow-primary/30 hover:bg-primary/90 transition-colors flex-shrink-0 cursor-pointer"
              href="/#contact"
              onClick={(e) => navigateToSection(e, 'contact')}
            >
              Book Meeting
            </a>
          </div>

          {/* Mobile */}
          <div className="flex md:hidden w-full items-center justify-between">
            <Link
              href="/"
              className="text-sm font-bold text-foreground tracking-tight hover:text-primary transition-colors"
            >
              Sameer Qadri
            </Link>
            <div className="flex items-center gap-3">
              <a
                className="px-4 py-1.5 rounded-full text-[11px] font-semibold tracking-wide bg-primary text-primary-foreground shadow-md shadow-primary/30 hover:bg-primary/90 transition-colors cursor-pointer"
                href="/#contact"
                onClick={(e) => navigateToSection(e, 'contact')}
              >
                Book Meeting
              </a>
              <button
                onClick={() => setMenuOpen((v) => !v)}
                aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={menuOpen}
                className="w-8 h-8 flex flex-col items-center justify-center gap-1.5 rounded-lg hover:bg-white/5 transition-colors"
              >
                <span
                  className={`block h-0.5 w-5 bg-foreground rounded-full transition-all duration-300 origin-center ${
                    menuOpen ? 'rotate-45 translate-y-2' : ''
                  }`}
                />
                <span
                  className={`block h-0.5 w-5 bg-foreground rounded-full transition-all duration-300 ${
                    menuOpen ? 'opacity-0 scale-x-0' : ''
                  }`}
                />
                <span
                  className={`block h-0.5 w-5 bg-foreground rounded-full transition-all duration-300 origin-center ${
                    menuOpen ? '-rotate-45 -translate-y-2' : ''
                  }`}
                />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile slide-down panel */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-all duration-300 ${
          menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div
          className="absolute inset-0 bg-background/80 backdrop-blur-sm"
          onClick={() => setMenuOpen(false)}
        />
        <div
          className={`absolute top-0 left-0 right-0 bg-card/95 backdrop-blur-2xl border-b border-border/60 shadow-2xl pt-24 pb-8 px-6 transition-transform duration-300 ${
            menuOpen ? 'translate-y-0' : '-translate-y-full'
          }`}
        >
          <nav className="flex flex-col gap-1">
            {NAV_LINKS.map(({ label, section }) => (
              label === 'Projects' ? (
                <Link
                  key={label}
                  href="/case-studies"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl text-muted-foreground hover:text-foreground hover:bg-white/5 transition-all text-base font-medium cursor-pointer"
                >
                  {label}
                </Link>
              ) : (
                <a
                  key={label}
                  href={`/#${section}`}
                  onClick={(e) => navigateToSection(e, section)}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl text-muted-foreground hover:text-foreground hover:bg-white/5 transition-all text-base font-medium cursor-pointer"
                >
                  {label}
                </a>
              )
            ))}
          </nav>
          <div className="mt-6 pt-6 border-t border-border/60">
            <a
              href="/#contact"
              onClick={(e) => navigateToSection(e, 'contact')}
              className="flex items-center justify-center gap-2 w-full py-3 bg-primary text-primary-foreground font-semibold rounded-xl shadow-lg shadow-primary/20 hover:bg-primary/90 transition-colors cursor-pointer"
            >
              <span className="material-icons text-sm">calendar_today</span>
              Book a Meeting
            </a>
            <div className="flex justify-center gap-6 mt-5">
              <a
                href="https://linkedin.com/in/sameerqadri"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors text-sm font-medium"
              >
                LinkedIn
              </a>
              <a
                href="https://github.com/sameerqadri1"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors text-sm font-medium"
              >
                GitHub
              </a>
              <a
                href="https://x.com/coder_qadri"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors text-sm font-medium"
              >
                X / Twitter
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
