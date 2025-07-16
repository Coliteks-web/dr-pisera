import pl from "./locales/pl.json";
import en from "./locales/en.json";

export type Locale = "pl" | "en";

export const dictionaries = {
  pl,
  en
};

export function getDictionary(locale: Locale) {
  return dictionaries[locale] || dictionaries["pl"];
}
