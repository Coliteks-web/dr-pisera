"use client";

import { useEffect, useState } from "react";

export default function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const savedConsent = localStorage.getItem("cookie_consent");
    if (!savedConsent) {
      setShowBanner(true);
    } else if (savedConsent === "granted") {
      loadAnalyticsScripts();
    }
  }, []);

  const handleConsent = (value: "granted" | "denied") => {
    localStorage.setItem("cookie_consent", value);
    if (value === "granted") {
      loadAnalyticsScripts();
    }
    setShowBanner(false); // Ukryj baner po decyzji
  };

  const loadAnalyticsScripts = () => {
    // Google Analytics
    const gaScript = document.createElement("script");
    gaScript.src = "https://www.googletagmanager.com/gtag/js?id=G-P2X5YKRSGJ";
    gaScript.async = true;
    document.head.appendChild(gaScript);

    const gaInlineScript = document.createElement("script");
    gaInlineScript.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-P2X5YKRSGJ');
    `;
    document.head.appendChild(gaInlineScript);

    // Meta Pixel
    const fbScript = document.createElement("script");
    fbScript.innerHTML = `
      !function(f,b,e,v,n,t,s)
      {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
      n.callMethod.apply(n,arguments):n.queue.push(arguments)};
      if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
      n.queue=[];t=b.createElement(e);t.async=!0;
      t.src=v;s=b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t,s)}(window, document,'script',
      'https://connect.facebook.net/en_US/fbevents.js');
      fbq('init', '1109474984377538');
      fbq('track', 'PageView');
    `;
    document.head.appendChild(fbScript);

    // noscript pixel fallback
    const noscriptImg = document.createElement("noscript");
    noscriptImg.innerHTML = `
      <img height="1" width="1" style="display:none"
        src="https://www.facebook.com/tr?id=1109474984377538&ev=PageView&noscript=1"
      />
    `;
    document.body.appendChild(noscriptImg);
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-300 px-4 py-3 shadow-lg z-[100]">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
        <p className="text-sm text-gray-700">
          Używamy plików cookies do analizy ruchu i personalizacji treści. Możesz zaakceptować lub odrzucić ich użycie.
        </p>
        <div className="flex space-x-4">
          <button
            onClick={() => handleConsent("granted")}
            className="bg-gray-800 text-white text-sm px-4 py-2 rounded hover:bg-gray-700 transition"
          >
            Akceptuję
          </button>
          <button
            onClick={() => handleConsent("denied")}
            className="bg-gray-200 text-gray-800 text-sm px-4 py-2 rounded hover:bg-gray-300 transition"
          >
            Odrzucam
          </button>
        </div>
      </div>
    </div>
  );
}
