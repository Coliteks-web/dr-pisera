import "./globals.css";
export const metadata = {
  title: "Dr Paweł Pisera – doświadczony chirurg plastyczny i ogólny z Łodzi",
  description: "Dr Paweł Pisera to ekspert chirurgii plastycznej i ogólnej w Łodzi. Oferuje zabiegi estetyczne i rekonstrukcyjne z indywidualnym podejściem i ponad 30-letnim doświadczeniem."
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
      <body>{children}</body>
    </html>
  );
}
