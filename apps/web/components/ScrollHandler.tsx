'use client';

import { useEffect } from 'react';

/**
 * Reads a pending `scrollTo` section from sessionStorage (set by Nav when
 * navigating from another page) and scrolls to that section after the home
 * page mounts. Keeps URLs clean — no hashes.
 */
export function ScrollHandler() {
  useEffect(() => {
    const section = sessionStorage.getItem('scrollTo');
    if (!section) return;
    sessionStorage.removeItem('scrollTo');

    // Small delay to ensure all sections are rendered and RevealObserver ran
    const id = setTimeout(() => {
      const el = document.getElementById(section);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 120);

    return () => clearTimeout(id);
  }, []);

  return null;
}
