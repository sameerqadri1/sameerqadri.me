'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

/**
 * Attaches an IntersectionObserver to every scroll-reveal element on the page.
 * Re-runs on every route change so navigating back correctly reveals all sections.
 *
 * Supported classes:
 *   .animate-fade-up / .animate-fade-up-delayed / .animate-fade-up-slow
 *   .animate-slide-left   → slides in from the left
 *   .animate-slide-right  → slides in from the right
 *   .animate-zoom-in      → scales up with a slight bounce
 *   .animate-fade-in      → opacity only, no movement
 */
export function RevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    const SELECTOR = [
      '.animate-fade-up',
      '.animate-fade-up-delayed',
      '.animate-fade-up-slow',
      '.animate-slide-left',
      '.animate-slide-right',
      '.animate-zoom-in',
      '.animate-fade-in',
    ].join(', ');

    const reveal = (el: Element) => el.classList.add('is-visible');

    let observer: IntersectionObserver;

    const run = () => {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              reveal(entry.target);
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.12, rootMargin: '0px 0px -10px 0px' }
      );

      const elements = document.querySelectorAll(SELECTOR);
      elements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        // Immediately reveal anything already in the viewport
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          reveal(el);
        } else {
          observer.observe(el);
        }
      });
    };

    // rAF ensures the new page's DOM is painted before we observe
    const rafId = requestAnimationFrame(run);

    return () => {
      cancelAnimationFrame(rafId);
      observer?.disconnect();
    };
  }, [pathname]);

  return null;
}
