"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { dictionaries, Locale } from "./index";

type TranslationDictionary = typeof dictionaries.pl;

type I18nContextType = {
  locale: Locale;
  dictionary: TranslationDictionary;
  setLocale: (locale: Locale) => void;
};

const I18nContext = createContext<I18nContextType>({
  locale: "pl",
  dictionary: dictionaries.pl,
  setLocale: () => {},
});

export function I18nProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [locale, setLocale] = useState<Locale>("pl");

  const dictionary = dictionaries[locale];

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