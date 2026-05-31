"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import type { Locale } from "./config";
import type { Dictionary } from "@/types/dictionary";
import { getDictionary } from "./getDictionary";

type I18nContextType = {
  locale: Locale;
  dictionary: Dictionary;
  setLocale: (locale: Locale) => void;
};

const I18nContext = createContext<I18nContextType>({
  locale: "pl",
  dictionary: getDictionary("pl"),
  setLocale: () => {},
});

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>("pl");

  const dictionary = getDictionary(locale);

  return (
    <I18nContext.Provider
      value={{
        locale,
        dictionary,
        setLocale,
      }}
    >
      {children}
    </I18nContext.Provider>
  );
}

export const useI18n = () => useContext(I18nContext);