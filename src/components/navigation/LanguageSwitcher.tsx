'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronDown } from 'lucide-react';

const languages = [
  {
    code: 'pl',
    label: 'Polski',
  },
  {
    code: 'en',
    label: 'English',
  },
  {
    code: 'ua',
    label: 'Українська',
  },
];

export default function LanguageSwitcher() {
  const pathname = usePathname();

  const [open, setOpen] = useState(false);

  const ref = useRef<HTMLDivElement>(null);

  const currentLocale =
    pathname.split('/')[1] || 'pl';

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        ref.current &&
        !ref.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener(
      'mousedown',
      handleClickOutside
    );

    return () => {
      document.removeEventListener(
        'mousedown',
        handleClickOutside
      );
    };
  }, []);

  return (
    <div
      ref={ref}
      className="relative"
    >
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 rounded-full border border-neutral-200 bg-white/80 px-4 py-2 text-sm font-medium uppercase tracking-widest backdrop-blur-xl transition hover:bg-white"
      >
        {currentLocale}

        <ChevronDown
          size={14}
          className={`transition ${
            open ? 'rotate-180' : ''
          }`}
        />
      </button>

      <div
        className={`absolute right-0 mt-3 w-52 overflow-hidden rounded-2xl border border-white/20 bg-white/90 backdrop-blur-2xl shadow-2xl transition-all duration-300 ${
          open
            ? 'visible translate-y-0 opacity-100'
            : 'invisible -translate-y-2 opacity-0'
        }`}
      >
        {languages.map((lang) => {
          const href = pathname.replace(
            /^\/(pl|en|ua)/,
            `/${lang.code}`
          );

          const active =
            currentLocale === lang.code;

          return (
            <Link
              key={lang.code}
              href={href}
              onClick={() => setOpen(false)}
              className={`flex items-center justify-between px-5 py-4 text-sm transition hover:bg-neutral-100 ${
                active
                  ? 'bg-neutral-100 font-semibold'
                  : ''
              }`}
            >
              <span>{lang.label}</span>

              <span className="text-xs uppercase text-neutral-400">
                {lang.code}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}