import "../app/globals.css";
import { I18nProvider } from "./i18n/I18nContext";
import CookieBanner from "./components/CookieBanner"; // 👈 dodany import

export const metadata = {
  title: "Dr Paweł Pisera – doświadczony chirurg plastyczny i ogólny z Łodzi",
  description:
    "Dr Paweł Pisera to ekspert chirurgii plastycznej i ogólnej w Łodzi. Oferuje zabiegi estetyczne i rekonstrukcyjne z indywidualnym podejściem i ponad 30-letnim doświadczeniem.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
          <CookieBanner /> {/* 👈 Cookie consent banner */}
        </I18nProvider>

        {/* 👇 noscript Meta Pixel (statyczny, widoczny dla Facebooka) */}
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=1109474984377538&ev=PageView&noscript=1"
          />
        </noscript>
      </body>
    </html>
  );
}
