import Navbar from '@/components/navigation/Navbar';
import { getDictionary } from '@/i18n/getDictionary';
import type { Locale } from '@/i18n';

type Props = {
  children: React.ReactNode;
  params: Promise<{
    locale: Locale;
  }>;
};

export default async function LocaleLayout({
  children,
  params,
}: Props) {
  const { locale } = await params;

  const dict = await getDictionary(locale);

  return (
    <>
      <Navbar dict={dict} locale={locale} />
      <main>{children}</main>
    </>
  );
}