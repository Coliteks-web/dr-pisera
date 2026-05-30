'use client';

import { useEffect } from 'react';
import { trackEvent } from './trackEvent';

export function useTracking() {
  useEffect(() => {
    const consent = localStorage.getItem('cookie_consent');
    if (consent !== 'granted') return;

    trackEvent({
      event: 'page_view',
    });
  }, []);

  const track = (event: string, data?: any) => {
    trackEvent({
      event: event as any,
      data,
    });
  };

  return { track };
}