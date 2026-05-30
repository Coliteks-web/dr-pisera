declare global {
  interface Window {
    gtag?: (
      command: 'event' | 'config' | 'js',
      eventName: string,
      params?: Record<string, unknown>
    ) => void;
  }
}

export {};

export const trackPriceReveal = (procedure: string) => {
  if (typeof window === 'undefined') return;
  if (!window.gtag) return;

  window.gtag('event', 'price_reveal', {
    event_category: 'pricing',
    event_label: procedure
  });
};