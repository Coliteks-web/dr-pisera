import HeroSection from '@/components/sections/HeroSection';
import { getDictionary } from '@/i18n/getDictionary';
import type { Locale } from '@/i18n';

type PageProps = {
  params: {
    locale: Locale;
  };
};

export default async function Page({ params }: PageProps) {
  const { locale } = params;

  const dict = await getDictionary(locale);

  return (
    <main>
      <HeroSection dict={dict} />
    </main>
  );
}