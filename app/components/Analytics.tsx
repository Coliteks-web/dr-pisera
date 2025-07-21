'use client';
import Script from 'next/script';
import { useEffect, useState } from 'react';

export function Analytics() {
  const [consent, setConsent] = useState<string | null>(null);

  useEffect(() => {
    const c = localStorage.getItem('cookie_consent');
    console.log('🟡 cookie_consent:', c);
    setConsent(c);
  }, []);

  const gaId = process.env.NEXT_PUBLIC_GA_ID;
  console.log('🟢 gaId:', gaId);

  if (consent !== 'granted') {
    console.log('🔴 Consent not granted → not loading GA');
    return null;
  }

  if (!gaId) {
    console.log('🔴 GA ID not found');
    return null;
  }

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
        strategy="afterInteractive"
      />
      <Script id="ga-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${gaId}', { page_path: window.location.pathname });
        `}
      </Script>
    </>
  );
}
