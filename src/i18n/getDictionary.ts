import pl from './locales/pl.json';
import en from './locales/en.json';
import ua from './locales/ua.json';
import de from './locales/de.json';

import type { Dictionary } from '@/types/dictionary';
import type { Locale } from './config';

const dictionaries: Record<Locale, Partial<Dictionary>> = {
  pl,
  en,
  ua,
  de,
};

type DictionaryValue = string | number | boolean | null | Dictionary | DictionaryValue[];

// 🔥 type guard
function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

// 🔥 deep merge bez any
function deepMerge<T extends Record<string, unknown>>(
  base: T,
  override?: Partial<T>
): T {
  if (!override) return base;

  const result: Record<string, unknown> = { ...base };

  for (const key in override) {
    const baseValue = base[key];
    const overrideValue = override[key];

    if (isObject(baseValue) && isObject(overrideValue)) {
      result[key] = deepMerge(
        baseValue as Record<string, unknown>,
        overrideValue as Record<string, unknown>
      );
    } else if (overrideValue !== undefined) {
      result[key] = overrideValue;
    }
  }

  return result as T;
}

// 🔥 główna funkcja
export function getDictionary(locale: Locale): Dictionary {
  const override = dictionaries[locale] ?? {};
  return deepMerge(pl as Dictionary, override);
}