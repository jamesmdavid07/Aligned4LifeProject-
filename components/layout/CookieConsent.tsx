'use client';

import { useEffect, useState } from 'react';

type GtagFn = (command: string, ...args: unknown[]) => void;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: GtagFn;
  }
}

const CONSENT_COOKIE = 'cookie_consent';

function readConsent(): string | null {
  if (typeof document === 'undefined') return null;
  const match = document.cookie.match(new RegExp(`(?:^|; )${CONSENT_COOKIE}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : null;
}

function storeConsent(value: string) {
  document.cookie = `${CONSENT_COOKIE}=${value}; path=/; max-age=31536000; SameSite=Lax`;
}

function updateGtagConsent(analyticsStorage: 'granted' | 'denied') {
  if (typeof window === 'undefined') return;
  window.dataLayer = window.dataLayer || [];
  if (typeof window.gtag === 'function') {
    window.gtag('consent', 'update', { analytics_storage: analyticsStorage });
  } else {
    window.dataLayer.push(['consent', 'update', { analytics_storage: analyticsStorage }]);
  }
}

export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!readConsent()) {
      setVisible(true);
    }
  }, []);

  function handleAccept() {
    storeConsent('granted');
    updateGtagConsent('granted');
    setVisible(false);
  }

  function handleDecline() {
    storeConsent('declined');
    updateGtagConsent('denied');
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Cookie consent"
      className="fixed inset-x-0 bottom-4 z-50 flex justify-center px-4"
    >
      <div className="w-full max-w-2xl rounded-2xl border border-white/15 bg-navy-700/95 p-5 shadow-2xl shadow-black/40 backdrop-blur sm:p-6">
        <p className="font-roboto text-sm leading-relaxed text-navy-50">
          We use cookies to understand how visitors use this site so we can share the
          Gospel more effectively. By accepting, you allow Google Analytics to store
          cookies on your device.
        </p>
        <div className="mt-4 flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={handleAccept}
            className="rounded-xl bg-gold px-5 py-2.5 text-sm font-semibold text-white transition hover:brightness-110"
          >
            Accept all
          </button>
          <button
            type="button"
            onClick={handleDecline}
            className="rounded-xl border border-white/25 px-5 py-2.5 text-sm font-semibold text-navy-100 transition hover:border-gold hover:text-gold"
          >
            Decline
          </button>
        </div>
      </div>
    </div>
  );
}
