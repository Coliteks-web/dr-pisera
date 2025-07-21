'use client';

import Script from 'next/script';
import { useEffect, useState } from 'react';

export function Analytics() {
  const [consent, setConsent] = useState<string | null>(null);

  useEffect(() => {
    const storedConsent = localStorage.getItem('cookie_consent');
    setConsent(storedConsent);
  }, []);

  if (consent !== 'granted') {
    return null;
  }

  return (
    <>
      {/* Ładowanie gtag.js */}
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
      />
      {/* Inicjalizacja GA */}
      <Script
        id="ga-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}', {
              debug_mode: false
            });
          `,
        }}
      />
    </>
  );
}
