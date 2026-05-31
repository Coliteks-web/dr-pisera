import './globals.css';

import { CookieConsentProvider } from '@/components/cookies/CookieConsentContext';
import CookieBanner from '@/components/cookies/CookieBanner';
import { Analytics } from '@/components/analytics/Analytics';
import FbPageView from '@/components/analytics/FbPageView';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pl" className="scroll-smooth" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <CookieConsentProvider>
          {children}

          <CookieBanner />
          <Analytics />
          <FbPageView />
        </CookieConsentProvider>
      </body>
    </html>
  );
}