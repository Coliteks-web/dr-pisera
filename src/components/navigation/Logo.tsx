'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import type { Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/getDictionary';
import { qwigley, greatVibes } from '@/app/fonts';

type LogoProps = {
  locale: Locale;
};

export default function Logo({ locale }: LogoProps) {
  const dict = getDictionary(locale);

  const fullText = dict.logo.name;

  const [text, setText] = useState(fullText);

  const isUkrainian = locale === 'ua';

  useEffect(() => {
    const consent = localStorage.getItem('cookie_consent');
    const seen = localStorage.getItem('logo_signature_seen');

    // Jeśli użytkownik zaakceptował cookies
    // i animacja była już pokazana
    if (consent === 'granted' && seen) {
      setText(fullText);
      return;
    }

    // Uruchamiamy animację
    setText('');

    let i = 0;
    let timeoutId: ReturnType<typeof setTimeout>;

    const typeNextCharacter = () => {
      i++;

      setText(fullText.slice(0, i));

      if (i >= fullText.length) {
        // zapisujemy tylko przy zgodzie
        if (consent === 'granted') {
          localStorage.setItem('logo_signature_seen', 'true');
        }

        return;
      }

      // naturalne tempo pisania
      const nextDelay = 55 + Math.random() * 45;

      timeoutId = setTimeout(typeNextCharacter, nextDelay);
    };

    timeoutId = setTimeout(typeNextCharacter, 150);

    return () => clearTimeout(timeoutId);
  }, [fullText]);

  return (
    <Link
      href={`/${locale}`}
      className="flex items-center gap-4 min-w-[320px] shrink-0"
    >
      <Image
        src="/images/webp/logo_wb_min.webp"
        alt={dict.logo.name}
        width={70}
        height={70}
        priority
        className="h-12 w-auto shrink-0"
      />

      <div className="flex flex-col justify-end leading-none min-h-[48px]">
        <span
          className={`
            ${isUkrainian ? greatVibes.className : qwigley.className}
            ${isUkrainian ? 'text-xl' : 'text-3xl'}
            text-neutral-900
            whitespace-nowrap
            inline-block
          `}
        >
          {text}
        </span>

        <span className="text-xs text-neutral-500 whitespace-nowrap mt-1">
          {dict.logo.specialty}
        </span>
      </div>
    </Link>
  );
}