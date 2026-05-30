type EventName =
  | 'page_view'
  | 'lead'
  | 'purchase'
  | 'contact'
  | 'custom';

type EventPayload = {
  event: EventName;
  eventId?: string;
  data?: Record<string, unknown>;
};

export async function trackEvent(payload: EventPayload) {
  const consent = localStorage.getItem('cookie_consent');

  if (consent !== 'granted') return;

  await fetch('/api/meta/event', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      ...payload,
      eventId: payload.eventId ?? crypto.randomUUID(),
      url: window.location.href,
      timestamp: Date.now(),
    }),
  });
}