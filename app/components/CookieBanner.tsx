"use client";

import { useEffect, useState } from "react";
import Script from "next/script";

export default function CookieBanner() {
  const [cookieConsent, setCookieConsent] = useState<"granted" | "denied" | null>(null);
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("cookie_consent") as "granted" | "denied" | null;
    if (saved) {
      setCookieConsent(saved);
    } else {
      setShowBanner(true);
    }
  }, []);

  const handleConsent = (value: "granted" | "denied") => {
    localStorage.setItem("cookie_consent", value);
    setCookieConsent(value);
    setShowBanner(false);

    // Odśwież stronę, by komponenty (Analytics / fbq) zadziałały
    if (typeof window !== "undefined") {
      window.location.reload();
    }
  };

  return (
    <>
      {cookieConsent === "granted" && (
        <>
          {/* Google Analytics */}
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
            strategy="afterInteractive"
          />
          <Script id="ga-init" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
            `}
          </Script>

          {/* Meta Pixel */}
          <Script id="fb-pixel" strategy="afterInteractive">
            {`
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '${process.env.NEXT_PUBLIC_FB_PIXEL_ID}');
              fbq('track', 'PageView');
            `}
          </Script>
        </>
      )}

      {showBanner && (
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
      )}
    </>
  );
}
