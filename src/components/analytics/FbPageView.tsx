'use client';

import { useEffect } from 'react';
import { trackEvent } from '@/lib/tracking/trackEvent';
import { useCookieConsent } from '@/components/cookies/CookieConsentContext';

export default function FbPageView() {
  const { consent } = useCookieConsent();

  useEffect(() => {
    if (consent !== 'granted') return;

    trackEvent({
      event: 'page_view',
    });
  }, [consent]);

  return null;
}