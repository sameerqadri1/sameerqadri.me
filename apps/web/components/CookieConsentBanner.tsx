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
  const consentPayload = {
    ad_storage: granted,
    analytics_storage: granted,
    ad_user_data: granted,
    ad_personalization: granted,
    functionality_storage: 'granted' as const,
    security_storage: 'granted' as const,
  };

  const gtag =
    typeof window.gtag === 'function'
      ? window.gtag
      : (...args: unknown[]) => {
          window.dataLayer = window.dataLayer || [];
          window.dataLayer.push(args);
        };

  // Queue the exact consent command even if GTM is still loading.
  gtag('consent', 'update', consentPayload);
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event: 'consent_update', consent_choice: choice });
}

export function CookieConsentBanner() {
  const pathname = usePathname();
  const [initialized, setInitialized] = useState(false);
  const [isAdminRoute, setIsAdminRoute] = useState(false);
  const [storedChoice, setStoredChoice] = useState<ConsentChoice | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (pathname?.startsWith('/panel-sq8701')) {
      setIsAdminRoute(true);
      setStoredChoice(null);
      setIsOpen(false);
      setInitialized(true);
      return;
    }
    setIsAdminRoute(false);

    const stored = localStorage.getItem(CONSENT_STORAGE_KEY) as ConsentChoice | null;
    if (stored === 'accepted' || stored === 'rejected') {
      applyConsent(stored);
      setStoredChoice(stored);
      setIsOpen(false);
    } else {
      setStoredChoice(null);
      setIsOpen(true);
    }
    setInitialized(true);
  }, [pathname]);

  function handleChoice(choice: ConsentChoice) {
    localStorage.setItem(CONSENT_STORAGE_KEY, choice);
    applyConsent(choice);
    setStoredChoice(choice);
    setIsOpen(false);
  }

  useEffect(() => {
    const shouldLock = !isAdminRoute && initialized && (storedChoice === null || isOpen);
    if (!shouldLock) {
      document.body.style.overflow = '';
      return;
    }
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, [initialized, isAdminRoute, isOpen, storedChoice]);

  if (isAdminRoute) return null;
  if (!initialized) {
    return <div className="fixed inset-0 z-[120] bg-background/70 backdrop-blur-sm" />;
  }

  return (
    <>
      {storedChoice !== null && !isOpen ? (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="fixed bottom-4 right-4 z-[110] rounded-full border border-border bg-card/95 px-4 py-2 text-xs font-semibold text-foreground shadow-lg backdrop-blur-sm hover:bg-muted"
        >
          Cookie settings
        </button>
      ) : (
        <div className="fixed inset-0 z-[120] bg-background/70 backdrop-blur-sm">
          <div className="absolute inset-x-3 top-3 sm:inset-x-auto sm:right-6 sm:top-6 sm:w-[30rem]">
            <div className="rounded-2xl border border-border bg-card/95 p-4 shadow-2xl backdrop-blur-md sm:p-5">
              <p className="text-sm font-semibold text-foreground sm:text-base">
                Cookie consent
              </p>
              <p className="mt-1 text-xs text-muted-foreground sm:text-sm">
                We use analytics and advertising cookies to improve performance and marketing. Choose Accept or Reject to continue.
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
                {storedChoice !== null ? (
                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="rounded-lg border border-border bg-transparent px-4 py-2 text-sm font-semibold text-muted-foreground transition-colors hover:bg-muted"
                  >
                    Close
                  </button>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
