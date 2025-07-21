'use client';

import { useEffect, useState } from 'react';

export default function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const savedConsent = localStorage.getItem('cookie_consent');
    if (!savedConsent) {
      setShowBanner(true);
    }
  }, []);

  const handleConsent = (value: 'granted' | 'denied') => {
    localStorage.setItem('cookie_consent', value);
    setShowBanner(false);

    // Odśwież stronę – Analytics i fb-events uruchomią się automatycznie
    if (typeof window !== 'undefined') {
      window.location.reload();
    }
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
            onClick={() => handleConsent('granted')}
            className="bg-gray-800 text-white text-sm px-4 py-2 rounded hover:bg-gray-700 transition"
          >
            Akceptuję
          </button>
          <button
            onClick={() => handleConsent('denied')}
            className="bg-gray-200 text-gray-800 text-sm px-4 py-2 rounded hover:bg-gray-300 transition"
          >
            Odrzucam
          </button>
        </div>
      </div>
    </div>
  );
}
