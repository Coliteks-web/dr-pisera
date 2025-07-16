import pl from "./locales/pl.json";
import en from "./locales/en.json";

export const dictionaries = {
  pl,
  en
};

export type Locale = keyof typeof dictionaries;
