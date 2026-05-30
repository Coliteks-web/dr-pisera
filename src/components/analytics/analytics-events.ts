export const trackPriceReveal = (procedure: string) => {
  if (typeof window === 'undefined') return;
  if (!window.gtag) return;

  window.gtag('event', 'price_reveal', {
    event_category: 'pricing',
    event_label: procedure
  });
};