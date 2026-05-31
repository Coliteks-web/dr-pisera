export const locales = ['pl', 'en', 'ua', 'de'] as const;

export type Locale = (typeof locales)[number];