import pl from './locales/pl.json';
import en from './locales/en.json';
import ua from './locales/ua.json';
import de from './locales/de.json';

import type { Dictionary } from '@/types/dictionary';
import type { Locale } from './config';

// partial → bo tłumaczenia mogą być niepełne
const dictionaries: Record<Locale, Partial<Dictionary>> = {
  pl,
  en,
  ua,
  de,
};

// 🔥 deep merge (fallback PL + override)
function deepMerge<T>(base: T, override?: Partial<T>): T {
  if (!override) return base;

  const result: any = { ...base };

  for (const key in override) {
    const baseValue = (base as any)[key];
    const overrideValue = (override as any)[key];

    if (
      baseValue &&
      typeof baseValue === 'object' &&
      !Array.isArray(baseValue) &&
      typeof overrideValue === 'object'
    ) {
      result[key] = deepMerge(baseValue, overrideValue);
    } else {
      result[key] = overrideValue;
    }
  }

  return result;
}

// 🔥 główna funkcja
export function getDictionary(locale: Locale): Dictionary {
  const override = dictionaries[locale] ?? {};
  return deepMerge(pl as Dictionary, override);
}