import '../app/globals.css';
import { I18nProvider } from './i18n/I18nContext';
import CookieBanner from './components/CookieBanner';
import { Analytics } from './components/Analytics';

export const metadata = {
  title: 'Twoja Strona',
  description: 'Opis meta dla Twojej strony',
  openGraph: {
    title: 'Twoja Strona',
    description: 'Opis OG',
    url: 'https://twojastrona.pl',
    siteName: 'Twoja Strona',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630 }],
    type: 'website',
  },
  robots: { index: true, follow: true },
  other: { 'theme-color': '#ffffff' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pl">
      <body>
        <I18nProvider>
          {children}
          <CookieBanner />
          <Analytics />
        </I18nProvider>
      </body>
    </html>
  );
}
