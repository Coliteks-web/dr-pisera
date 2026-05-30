import pl from './locales/pl.json';
import en from './locales/en.json';
import ua from './locales/ua.json';

export type Locale =
  | 'pl'
  | 'en'
  | 'ua';

export const dictionaries = {
  pl,
  en,
  ua,
};

export function getDictionary(locale: Locale) {
  return dictionaries[locale] || dictionaries.pl;
}