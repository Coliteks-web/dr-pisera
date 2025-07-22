import '../app/globals.css';
import { I18nProvider } from './i18n/I18nContext';
import CookieBanner from './components/CookieBanner';
import { Analytics } from './components/Analytics';
import { FbPageView } from './components/FbPageView';

export const metadata = {
  title: 'Twoja strona',
  description: 'Opis strony',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pl">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@1,100&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <I18nProvider>
          {children}
          <CookieBanner />
          <Analytics />      {/* ✅ GA tylko po zgodzie */}
          <FbPageView />     {/* ✅ Meta CAPI PageView – server-side */}
        </I18nProvider>
      </body>
    </html>
  );
}
