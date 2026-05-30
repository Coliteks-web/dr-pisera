import Navbar from '@/components/navigation/Navbar';
import { getDictionary } from '@/i18n/getDictionary';

export default async function LocaleLayout({
  children,
  params,
}: any) {
  const { locale } = await params;

  const dict = await getDictionary(locale);

  return (
    <>
      <Navbar dict={dict} locale={locale} />

      <main>{children}</main>
    </>
  );
}