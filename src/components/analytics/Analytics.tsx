'use client';

import Script from 'next/script';
import { useCookieConsent } from '@/components/cookies/CookieConsentContext';

export function Analytics() {
  const { consent } = useCookieConsent();
  const gaId = process.env.NEXT_PUBLIC_GA_ID;

  if (consent !== 'granted' || !gaId) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
        strategy="afterInteractive"
      />

      <Script id="ga">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${gaId}');
        `}
      </Script>
    </>
  );
}