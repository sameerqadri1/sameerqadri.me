'use client';

import { useEffect } from 'react';

export function ScrollHandler() {
  useEffect(() => {
    const section = sessionStorage.getItem('scrollTo');
    if (!section) return;
    sessionStorage.removeItem('scrollTo');

    let attempts = 0;
    const maxAttempts = 40; // 40 × 50ms = 2s max

    const poll = setInterval(() => {
      attempts++;
      const el = document.getElementById(section);
      if (el) {
        clearInterval(poll);
        const headerHeight = 64;
        const targetPosition = el.getBoundingClientRect().top + window.scrollY - headerHeight;
        window.scrollTo({ top: targetPosition, behavior: 'smooth' });
      } else if (attempts >= maxAttempts) {
        clearInterval(poll);
      }
    }, 50);

    return () => clearInterval(poll);
  }, []);

  return null;
}
