'use client';

import { useEffect } from 'react';

/**
 * Attaches an IntersectionObserver to every `.animate-fade-up` element on the
 * page. When an element enters the viewport it gets the `is-visible` class
 * which triggers its CSS transition. Elements already in the viewport on mount
 * are revealed immediately (covers above-the-fold Hero content).
 *
 * Drop this once inside RootLayout — no other component changes needed.
 */
export function RevealObserver() {
  useEffect(() => {
    const SELECTOR = '.animate-fade-up, .animate-fade-up-delayed, .animate-fade-up-slow';

    const reveal = (el: Element) => el.classList.add('is-visible');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            reveal(entry.target);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.08,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    const elements = document.querySelectorAll(SELECTOR);
    elements.forEach((el) => {
      // Already visible on load (above the fold) → reveal right away
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        reveal(el);
      } else {
        observer.observe(el);
      }
    });

    return () => observer.disconnect();
  }, []);

  return null;
}
