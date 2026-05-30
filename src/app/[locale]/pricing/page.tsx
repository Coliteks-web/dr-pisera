import { getDictionary } from '@/i18n/getDictionary';
import PricingClient from './PricingClient';
import type { Locale } from '@/i18n';

type PageProps = {
  params: Promise<{
    locale: Locale;
  }>;
};

export default async function Page({ params }: PageProps) {
  const { locale } = await params;

  const dict = await getDictionary(locale);

  return <PricingClient dict={dict} />;
}