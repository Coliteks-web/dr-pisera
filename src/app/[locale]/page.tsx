import { getDictionary } from '@/i18n/getDictionary';
import type { Locale } from '@/i18n';
import HeroSection from '@/components/sections/HeroSection';

export default async function Page() {
  const dict = await getDictionary('pl');

  return (
    <main>
      <HeroSection dict={dict} />
    </main>
  );
}