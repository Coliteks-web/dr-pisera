export type EventName =
  | 'page_view'
  | 'lead'
  | 'purchase'
  | 'contact'
  | 'custom';

export type EventData = Record<
  string,
  string | number | boolean | null
>;

export type EventPayload = {
  event: EventName;
  eventId?: string;
  data?: EventData;
};