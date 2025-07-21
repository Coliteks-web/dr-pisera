import '../app/globals.css';
import { I18nProvider } from './i18n/I18nContext';
import CookieBanner from './components/CookieBanner';
import { Analytics } from './components/Analytics';

export const metadata = { /* … */ };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pl">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@1,100&display=swap" rel="stylesheet" />
      </head>
      <body>
        <I18nProvider>
          {children}
          <CookieBanner />
          <Analytics /> {/* Ładowanie GA po zatwierdzeniu zgody */}
        </I18nProvider>
      </body>
    </html>
  );
}
