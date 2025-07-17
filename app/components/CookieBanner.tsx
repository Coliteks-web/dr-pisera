"use client";

import { useEffect, useState } from "react";

export default function CookieBanner() {
  const [consent, setConsent] = useState<null | "granted" | "denied" | "unset">("unset");

  useEffect(() => {
    const savedConsent = localStorage.getItem("cookie_consent") as "granted" | "denied" | null;
    if (savedConsent === "granted" || savedConsent === "denied") {
      setConsent(savedConsent);
    } else {
      setConsent(null); // pokaż banner
    }
  }, []);

  useEffect(() => {
    if (consent === "granted") {
      // Google Analytics
      const gtagScript = document.createElement("script");
      gtagScript.src = "https://www.googletagmanager.com/gtag/js?id=G-P2X5YKRSGJ";
      gtagScript.async = true;
      document.head.appendChild(gtagScript);

      const inlineScript = document.createElement("script");
      inlineScript.innerHTML = `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-P2X5YKRSGJ');
      `;
      document.head.appendChild(inlineScript);
    }
  }, [consent]);

  const handleConsent = (value: "granted" | "denied") => {
    localStorage.setItem("cookie_consent", value);
    setConsent(value);
  };

  // ⛔️ Nic nie renderujemy dopóki nie odczytamy consent
  if (consent === "unset") return null;
  if (consent !== null) return null;

  return (
    <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-300 p-4 shadow-lg z-[100]">
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between space-y-2 md:space-y-0">
        <p className="text-sm text-gray-700">
          Używamy plików cookies do analizy ruchu i personalizacji treści. Możesz zaakceptować lub odrzucić ich użycie.
        </p>
        <div className="flex space-x-4">
          <button
            onClick={() => handleConsent("granted")}
            className="bg-black text-white text-sm px-4 py-2 rounded hover:bg-neutral-800 transition"
          >
            Akceptuję
          </button>
          <button
            onClick={() => handleConsent("denied")}
            className="bg-neutral-200 text-sm px-4 py-2 rounded hover:bg-neutral-300 transition"
          >
            Odrzucam
          </button>
        </div>
      </div>
    </div>
  );
}
