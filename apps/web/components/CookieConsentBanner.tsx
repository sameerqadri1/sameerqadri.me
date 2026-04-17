'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

type ConsentChoice = 'accepted' | 'rejected';

const CONSENT_STORAGE_KEY = 'sq_cookie_consent_v1';

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    dataLayer?: unknown[];
  }
}

function applyConsent(choice: ConsentChoice) {
  const granted = choice === 'accepted' ? 'granted' : 'denied';

  if (typeof window.gtag === 'function') {
    window.gtag('consent', 'update', {
      ad_storage: granted,
      analytics_storage: granted,
      ad_user_data: granted,
      ad_personalization: granted,
      functionality_storage: 'granted',
      security_storage: 'granted',
    });
  } else {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: 'consent_update',
      consent_choice: choice,
      ad_storage: granted,
      analytics_storage: granted,
      ad_user_data: granted,
      ad_personalization: granted,
    });
  }
}

export function CookieConsentBanner() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (pathname?.startsWith('/panel-sq8701')) {
      setVisible(false);
      return;
    }

    const stored = localStorage.getItem(CONSENT_STORAGE_KEY) as ConsentChoice | null;
    if (stored === 'accepted' || stored === 'rejected') {
      applyConsent(stored);
      setVisible(false);
      return;
    }

    setVisible(true);
  }, [pathname]);

  function handleChoice(choice: ConsentChoice) {
    localStorage.setItem(CONSENT_STORAGE_KEY, choice);
    applyConsent(choice);
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-[120] p-4 sm:p-6">
      <div className="mx-auto max-w-3xl rounded-2xl border border-border bg-card/95 p-4 shadow-2xl backdrop-blur-md sm:p-5">
        <p className="text-sm font-semibold text-foreground sm:text-base">
          Cookie consent
        </p>
        <p className="mt-1 text-xs text-muted-foreground sm:text-sm">
          We use analytics and advertising cookies to improve performance and marketing. You can accept or reject optional tracking cookies.
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => handleChoice('accepted')}
            className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Accept
          </button>
          <button
            type="button"
            onClick={() => handleChoice('rejected')}
            className="rounded-lg border border-border bg-background px-4 py-2 text-sm font-semibold text-foreground transition-colors hover:bg-muted"
          >
            Reject
          </button>
        </div>
      </div>
    </div>
  );
}
