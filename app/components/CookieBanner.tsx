"use client";

import { useEffect, useState } from "react";

export default function CookieBanner() {
  const [consent, setConsent] = useState<null | string>(null);
  const [isReady, setIsReady] = useState(false); // ⬅️ kontrola inicjalizacji

  useEffect(() => {
    const savedConsent = localStorage.getItem("cookie_consent");
    setConsent(savedConsent);
    setIsReady(true); // ⬅️ ustawiamy dopiero po odczytaniu
  }, []);

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
        gtag('config', 'G-XXXXXXX');
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

  if (!isReady || consent) return null; // ⬅️ dopóki nie gotowy albo zgoda ustawiona — nic nie pokazuj

  return (
    <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 p-4 shadow-[0_-2px_10px_rgba(0,0,0,0.05)] z-[100]">
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm text-gray-800 leading-snug">
          Ta strona wykorzystuje pliki cookies w celach analitycznych i marketingowych. Możesz zaakceptować lub odrzucić ich użycie.
        </p>
        <div className="flex space-x-3">
          <button
            onClick={() => handleConsent("granted")}
            className="bg-black text-white text-sm px-4 py-2 rounded-full hover:bg-neutral-800 transition"
          >
            Akceptuję
          </button>
          <button
            onClick={() => handleConsent("denied")}
            className="bg-gray-100 text-sm px-4 py-2 rounded-full hover:bg-gray-200 text-gray-800 transition"
          >
            Odrzucam
          </button>
        </div>
      </div>
    </div>
  );
}
