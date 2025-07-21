'use client';

import Script from 'next/script';
import { useEffect, useState } from 'react';

export function Analytics() {
  const [consent, setConsent] = useState<string | null>(null);

  useEffect(() => {
    const storedConsent = localStorage.getItem('cookie_consent');
    //console.log("GA: Cookie consent =", storedConsent); // 👈 DODANE
    setConsent(storedConsent);
  }, []);

  if (consent !== 'granted') {
    //console.log("GA: Brak zgody, nie ładuję Analytics"); // 👈 DODANE
    return null;
  }

  console.log("GA: Ładuję Analytics!"); // 👈 DODANE

  return (
    <>
      <Script
        strategy="afterInteractive"
        src="https://www.googletagmanager.com/gtag/js?id=G-R6LW837FKS"
      />
      <Script
        id="ga-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-R6LW837FKS');
          `,
        }}
      />
    </>
  );
}
