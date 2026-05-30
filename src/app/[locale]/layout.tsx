import Navbar from '@/components/navigation/Navbar';
import { getDictionary } from '@/i18n/getDictionary';
import { notFound } from 'next/navigation';
import { locales, type Locale } from '@/i18n/config';

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  const typedLocale = locale as Locale;
  const dict = await getDictionary(typedLocale);

  return (
    <>
      <Navbar
        dict={dict}
        locale={typedLocale}
      />
      <main>{children}</main>
    </>
  );
}