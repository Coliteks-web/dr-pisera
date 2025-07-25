import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import pl from './locales/pl.json';
import en from './locales/en.json';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      pl: { translation: pl },
      en: { translation: en },
    },
    lng: 'pl',              // domyślny język
    fallbackLng: 'pl',      // jak coś nie ma w EN, bierze z PL
    interpolation: {
      escapeValue: false,   // React sam to ogarnia
    },
  });

export default i18n;
