'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

/**
 * Attaches an IntersectionObserver to every `.animate-fade-up` element on the
 * page. Re-runs on every route change so navigating back to the homepage after
 * visiting another page correctly reveals all sections again.
 */
export function RevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    const SELECTOR =
      '.animate-fade-up, .animate-fade-up-delayed, .animate-fade-up-slow';

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
        { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
      );

      const elements = document.querySelectorAll(SELECTOR);
      elements.forEach((el) => {
        const rect = el.getBoundingClientRect();
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
