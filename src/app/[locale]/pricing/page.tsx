import { getDictionary } from '@/i18n/getDictionary';
import PricingClient from './PricingClient';
import type { Locale } from '@/i18n';

export default async function Page({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  const typedLocale = locale as Locale;

  const dict = await getDictionary(typedLocale);

  return <PricingClient dict={dict} locale={typedLocale} />;
}

