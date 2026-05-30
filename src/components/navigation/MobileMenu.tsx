'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

type MobileMenuProps = {
  locale: string;
  dict: {
    navbar: {
      about: string;
      pricing: string;
      clinics: string;
      contact: string;
    };
  };
};

export default function MobileMenu({ dict, locale }: MobileMenuProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button className="lg:hidden" onClick={() => setOpen(true)}>
        <Menu />
      </button>

      {open && (
        <div className="fixed inset-0 z-50 bg-white">
          <div className="flex items-center justify-between border-b p-6">
            <span className="font-semibold">Menu</span>

            <button onClick={() => setOpen(false)}>
              <X />
            </button>
          </div>

          <div className="flex flex-col gap-6 p-6 text-lg">
            <Link href={`/${locale}/about`}>{dict.navbar.about}</Link>
            <Link href={`/${locale}/pricing`}>{dict.navbar.pricing}</Link>
            <Link href={`/${locale}/clinics`}>{dict.navbar.clinics}</Link>
            <Link href={`/${locale}/contact`}>{dict.navbar.contact}</Link>
          </div>
        </div>
      )}
    </>
  );
}