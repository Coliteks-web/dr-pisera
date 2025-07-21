'use client';
import Script from 'next/script';
import { useEffect, useState } from 'react';

export function Analytics() {
  const [consent, setConsent] = useState<string | null>(null);

  useEffect(() => {
    setConsent(localStorage.getItem('cookie_consent'));
  }, []);

  if (consent !== 'granted') return null;

  const gaId = process.env.NEXT_PUBLIC_GA_ID;

  return gaId ? (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
        strategy="afterInteractive"
      />
      <Script id="ga-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${gaId}', { page_path: window.location.pathname });
        `}
      </Script>
    </>
  ) : null;
}
