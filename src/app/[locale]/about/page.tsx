import AboutSection from '@/components/sections/AboutSection';
import { getDictionary } from '@/i18n/getDictionary';
import type { Locale } from '@/i18n';

export default async function Page({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;

  const dict = await getDictionary(locale);

  return <AboutSection dict={dict}/>;
}