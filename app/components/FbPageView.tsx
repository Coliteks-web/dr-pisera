'use client';
import { useEffect } from 'react';

export function FbPageView() {
  useEffect(() => {
    const consent = localStorage.getItem('cookie_consent');
    if (consent !== 'granted') return;

    fetch('/api/fb-event', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ eventName: 'PageView' }),
    });
  }, []);

  return null;
}
