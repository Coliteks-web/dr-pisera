'use client';

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react';

type Consent = 'pending' | 'granted' | 'denied';

type CookieConsentContextType = {
  consent: Consent;
  setConsent: (value: Consent) => void;
};

const Ctx = createContext<CookieConsentContextType | undefined>(undefined);

type ProviderProps = {
  children: ReactNode;
};

export function CookieConsentProvider({ children }: ProviderProps) {
  const [mounted, setMounted] = useState(false);
  const [consent, setConsent] = useState<Consent>('pending');

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem('cookie_consent') as Consent | null;
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

export function useCookieConsent() {
  const ctx = useContext(Ctx);

  if (!ctx) {
    throw new Error('useCookieConsent must be used within CookieConsentProvider');
  }

  return ctx;
}