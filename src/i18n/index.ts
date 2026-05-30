import pl from "./locales/pl.json";
import en from "./locales/en.json";
import ua from "./locales/ua.json";

export const dictionaries = {
  pl,
  en,
  ua
};

export type Locale = keyof typeof dictionaries;
