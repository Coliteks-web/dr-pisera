import Image from 'next/image';
import Link from 'next/link';
import type { Locale } from '@/i18n/config';

type LogoProps = {
  locale: Locale;
};

export default function Logo({ locale }: LogoProps) {
  return (
    <Link
      href={`/${locale}`}
      className="flex items-center gap-4"
    >
      <Image
        src="/images/webp/logo_wb_min.webp"
        alt="Paweł Pisera"
        width={70}
        height={70}
        priority
        className="h-12 w-auto"
      />

      <div className="flex flex-col leading-tight">
        <span className="text-lg font-semibold tracking-wide">
          Dr n. med. Paweł Pisera
        </span>

        <span className="text-sm text-neutral-500">
          Chirurgia Plastyczna
        </span>
      </div>
    </Link>
  );
}