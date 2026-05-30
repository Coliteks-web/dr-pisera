'use client';

import { createContext, useContext, useEffect, useState } from 'react';

type Consent = 'pending' | 'granted' | 'denied';

const Ctx = createContext<any>(null);

export function CookieConsentProvider({ children }: any) {
  const [mounted, setMounted] = useState(false);
  const [consent, setConsent] = useState<Consent>('pending');

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem('cookie_consent') as Consent;
    if (saved) setConsent(saved);
  }, []);

  const update = (value: Consent) => {
    localStorage.setItem('cookie_consent', value);
    setConsent(value);
    window.dispatchEvent(new Event('cookie_consent_change'));
  };

  if (!mounted) {
    return (
      <Ctx.Provider value={{ consent: 'pending', setConsent: update }}>
        {children}
      </Ctx.Provider>
    );
  }

  return (
    <Ctx.Provider value={{ consent, setConsent: update }}>
      {children}
    </Ctx.Provider>
  );
}

export const useCookieConsent = () => useContext(Ctx);