/* eslint-disable react/jsx-no-comment-textnodes */
'use client';

import { useEffect, useState, MouseEvent } from 'react';
import Link from 'next/link';

export function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 48);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  function handleNavLinkMouseMove(e: MouseEvent<HTMLAnchorElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    e.currentTarget.style.setProperty('--mouse-x', `${x}%`);
    e.currentTarget.style.setProperty('--mouse-y', `${y}%`);
  }

  return (
    <nav className="fixed top-4 left-1/2 z-50 -translate-x-1/2">
      <div
        className={`nav-pill w-[min(94vw,960px)] transition-transform transition-opacity ${
          scrolled ? 'nav-pill-scrolled' : ''
        }`}
      >
        <div className="hidden md:flex w-full items-center justify-between">
          <div className="flex items-center gap-2 text-sm font-semibold tracking-tight text-foreground">
            Sameer Qadri
          </div>
          <div className="flex items-center gap-4">
            <nav className="flex items-center gap-1">
              <Link
                href="#expertise"
                className="nav-link"
                onMouseMove={handleNavLinkMouseMove}
              >
                Expertise
              </Link>
              <Link
                href="#projects"
                className="nav-link"
                onMouseMove={handleNavLinkMouseMove}
              >
                Projects
              </Link>
              <Link
                href="#testimonials"
                className="nav-link"
                onMouseMove={handleNavLinkMouseMove}
              >
                Testimonials
              </Link>
              <Link
                href="#contact"
                className="nav-link"
                onMouseMove={handleNavLinkMouseMove}
              >
                Contact
              </Link>
            </nav>
            <Link
              className="px-5 py-2 rounded-full text-xs font-semibold tracking-wide bg-primary text-primary-foreground shadow-md shadow-primary/40 hover:bg-primary/90 transition-colors"
              href="/case-studies"
            >
              View Work
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
