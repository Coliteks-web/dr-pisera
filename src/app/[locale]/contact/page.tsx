import ContactSection from '@/components/sections/ContactSection';
import { getDictionary } from '@/i18n/getDictionary';
import type { Locale } from '@/i18n';

type PageProps = {
  params: Promise<{
    locale: Locale;
  }>;
};

export default async function ContactPage({ params }: PageProps) {
  const { locale } = await params;

  const dict = await getDictionary(locale);

  return (
    <main>
      <ContactSection dict={dict} />
    </main>
  );
}