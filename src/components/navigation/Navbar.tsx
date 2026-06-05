import Logo from './Logo';
import DesktopMenu from './DesktopMenu';
import MobileMenu from './MobileMenu';
import LanguageSwitcher from './LanguageSwitcher';

import type { Dictionary } from '@/types/dictionary';
type NavbarProps = {
  locale: string;
  dict: Dictionary;
};

export default function Navbar({
  dict,
  locale,
}: NavbarProps) {
  return (
    <header className="sticky top-0 z-50 border-b border-white/20 bg-white/70 backdrop-blur-2xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        <Logo locale={locale} />

        <DesktopMenu
          dict={dict}
          locale={locale}
        />

        <div className="flex items-center gap-6">
          <LanguageSwitcher />

          <a
            href="https://www.znanylekarz.pl/pawel-pisera/chirurg-plastyczny-chirurg/lodz"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden rounded-full bg-black px-5 py-3 text-sm text-white transition hover:bg-neutral-800 lg:block"
          >
            {dict.navbar.consultation}
          </a>

          <MobileMenu
            dict={dict}
            locale={locale}
          />
        </div>
      </div>
    </header>
  );
}