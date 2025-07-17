"use client";

import { useEffect, useState } from "react";

export default function CookieBanner() {
  const [consent, setConsent] = useState<string | null>(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("cookie_consent");
    }
    return null;
  });

  useEffect(() => {
    if (consent === "granted") {
      // Google Analytics
      const script = document.createElement("script");
      script.src = "https://www.googletagmanager.com/gtag/js?id=G-P2X5YKRSGJ";
      script.async = true;
      document.head.appendChild(script);

      const inlineScript = document.createElement("script");
      inlineScript.innerHTML = `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-P2X5YKRSGJ');
      `;
      document.head.appendChild(inlineScript);

      // Meta Pixel
      const fbScript = document.createElement("script");
      fbScript.innerHTML = `
        !function(f,b,e,v,n,t,s)
        {if(f.fbq)return;n=f.fbq=function(){n.callMethod ?
        n.callMethod.apply(n,arguments) : n.queue.push(arguments)};
        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
        n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t,s)}(window, document,'script',
        'https://connect.facebook.net/en_US/fbevents.js');
        fbq('init', '123456789012345'); 
        fbq('track', 'PageView');
      `;
      document.head.appendChild(fbScript);
    }
  }, [consent]);

  const handleConsent = (value: "granted" | "denied") => {
    localStorage.setItem("cookie_consent", value);
    setConsent(value);
  };

  if (consent) return null;

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
