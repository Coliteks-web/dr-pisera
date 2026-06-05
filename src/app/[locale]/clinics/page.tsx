import ClinicsSection from '@/components/sections/ClinicsSection';
import { getDictionary } from '@/i18n/getDictionary';
import type { Locale } from '@/i18n';

type PageProps = {
  params: Promise<{
    locale: Locale;
  }>;
};

export default async function ClinicsPage({ params }: PageProps) {
  const { locale } = await params;

  const dict = await getDictionary(locale);

  return (
    <main>
      <ClinicsSection dict={dict} />
    </main>
  );
}