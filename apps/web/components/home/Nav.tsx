'use client';

import { useEffect, useState, MouseEvent } from 'react';
import Link from 'next/link';

const NAV_LINKS = [
  { label: 'About', href: '/#about' },
  { label: 'Expertise', href: '/#expertise' },
  { label: 'Process', href: '/#process' },
  { label: 'Projects', href: '/#projects' },
  { label: 'Testimonials', href: '/#testimonials' },
  { label: 'FAQ', href: '/#faq' },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 48);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  function handleNavLinkMouseMove(e: MouseEvent<HTMLAnchorElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    e.currentTarget.style.setProperty('--mouse-x', `${x}%`);
    e.currentTarget.style.setProperty('--mouse-y', `${y}%`);
  }

  return (
    <>
      <nav className="fixed top-4 left-1/2 z-50 -translate-x-1/2 w-[min(94vw,960px)]">
        <div
          className={`nav-pill transition-all duration-300 ${
            scrolled ? 'nav-pill-scrolled' : ''
          }`}
        >
          {/* Desktop */}
          <div className="hidden md:flex w-full items-center justify-between">
            <div className="flex items-center gap-1">
              {NAV_LINKS.map(({ label, href }) => (
                <Link
                  key={label}
                  href={href}
                  className="nav-link"
                  onMouseMove={handleNavLinkMouseMove}
                >
                  {label}
                </Link>
              ))}
            </div>
            <Link
              className="px-5 py-2 rounded-full text-xs font-semibold tracking-wide bg-primary text-primary-foreground shadow-md shadow-primary/30 hover:bg-primary/90 transition-colors flex-shrink-0"
              href="/#contact"
            >
              Book Meeting
            </Link>
          </div>

          {/* Mobile */}
          <div className="flex md:hidden w-full items-center justify-between">
            <span className="text-sm font-bold text-foreground tracking-tight">
              Sameer Qadri
            </span>
            <div className="flex items-center gap-3">
              <Link
                className="px-4 py-1.5 rounded-full text-[11px] font-semibold tracking-wide bg-primary text-primary-foreground shadow-md shadow-primary/30 hover:bg-primary/90 transition-colors"
                href="/#contact"
              >
                Book Meeting
              </Link>
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
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-background/80 backdrop-blur-sm"
          onClick={() => setMenuOpen(false)}
        />
        {/* Panel */}
        <div
          className={`absolute top-0 left-0 right-0 bg-card/95 backdrop-blur-2xl border-b border-border/60 shadow-2xl pt-24 pb-8 px-6 transition-transform duration-300 ${
            menuOpen ? 'translate-y-0' : '-translate-y-full'
          }`}
        >
          <nav className="flex flex-col gap-1">
            {NAV_LINKS.map(({ label, href }) => (
              <Link
                key={label}
                href={href}
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-muted-foreground hover:text-foreground hover:bg-white/5 transition-all text-base font-medium"
              >
                {label}
              </Link>
            ))}
          </nav>
          <div className="mt-6 pt-6 border-t border-border/60">
            <Link
              href="/#contact"
              onClick={() => setMenuOpen(false)}
              className="flex items-center justify-center gap-2 w-full py-3 bg-primary text-primary-foreground font-semibold rounded-xl shadow-lg shadow-primary/20 hover:bg-primary/90 transition-colors"
            >
              <span className="material-icons text-sm">calendar_today</span>
              Book a Meeting
            </Link>
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
