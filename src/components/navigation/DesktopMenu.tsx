'use client';

import Link from 'next/link';
import { useRef, useState } from 'react';
import { ChevronDown } from 'lucide-react';

export default function DesktopMenu({ dict, locale }: any) {
  const [open, setOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const openMenu = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setOpen(true);
  };

  const closeMenu = () => {
    timeoutRef.current = setTimeout(() => {
      setOpen(false);
    }, 180);
  };

  const menu = dict.navbar.proceduresMenu;

  return (
    <div className="hidden items-center gap-10 lg:flex">
      <Link href={`/${locale}/about`}>
        {dict.navbar.about}
      </Link>

      {/* PROCEDURES */}
      <div
        className="relative"
        onMouseEnter={openMenu}
        onMouseLeave={closeMenu}
      >
        <button
          onClick={() => setOpen((v) => !v)}
          className="flex items-center gap-1"
        >
          <span>{dict.navbar.procedures}</span>

          <ChevronDown
            size={16}
            className={`transition-transform duration-200 ${
              open ? 'rotate-180' : ''
            }`}
          />
        </button>

        {/* DROPDOWN */}
        <div
          className={`
            absolute left-0 top-full z-50 mt-6
            w-[900px] grid grid-cols-3 gap-10
            rounded-3xl border border-white/20
            bg-white/90 backdrop-blur-2xl p-10
            shadow-2xl

            transition-all duration-200

            ${
              open
                ? 'opacity-100 visible translate-y-0'
                : 'opacity-0 invisible translate-y-2 pointer-events-none'
            }
          `}
        >
          {Object.entries(menu).map(([key, section]: any) => (
            <div key={key}>
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-neutral-400">
                {section.title}
              </h3>

              <div className="space-y-3">
                {section.items.map((itemKey: string) => (
                  <Link
                    key={itemKey}
                    href={`/${locale}/procedures/${itemKey}`}
                    className="block text-sm transition hover:translate-x-1"
                    onClick={() => setOpen(false)}
                  >
                    {dict.navbar[itemKey]}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <Link href={`/${locale}/pricing`}>
        {dict.navbar.pricing}
      </Link>

      <Link href={`/${locale}/clinics`}>
        {dict.navbar.clinics}
      </Link>

      <Link href={`/${locale}/contact`}>
        {dict.navbar.contact}
      </Link>
    </div>
  );
}