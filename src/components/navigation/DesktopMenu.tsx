'use client';

import Link from 'next/link';
import { useRef, useState } from 'react';
import { ChevronDown } from 'lucide-react';

type ProceduresMenuItem = {
  title: string;
  items: string[];
};

type NavbarDict = {
  about: string;
  procedures: string;
  pricing: string;
  clinics: string;
  contact: string;

  labels?: Record<string, string>; // 👈 optional safety fix
  proceduresMenu: Record<string, ProceduresMenuItem>;
};

type Props = {
  dict: {
    navbar: NavbarDict;
  };
  locale: string;
};

export default function DesktopMenu({ dict, locale }: Props) {
  const [open, setOpen] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

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
          {Object.entries(menu).map(([key, section]) => {
            const group = section as ProceduresMenuItem;

            return (
              <div key={key}>
                <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-neutral-400">
                  {group.title}
                </h3>

                <div className="space-y-3">
                  {group.items.map((itemKey) => {
                    const label =
                      dict.navbar.labels?.[itemKey] ?? itemKey;

                    return (
                      <Link
                        key={itemKey}
                        href={`/${locale}/procedures/${itemKey}`}
                        className="block text-sm transition hover:translate-x-1"
                        onClick={() => setOpen(false)}
                      >
                        {label}
                      </Link>
                    );
                  })}
                </div>
              </div>
            );
          })}
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