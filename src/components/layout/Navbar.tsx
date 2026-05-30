"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useI18n } from "@/i18n/I18nContext";

export default function Navbar() {
  const { dictionary, locale, setLocale } = useI18n();

  const [menuOpen, setMenuOpen] = useState(false);
  const [navbarVisible, setNavbarVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setNavbarVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 z-50 w-full bg-white shadow-md
        transition-none md:transition-all md:duration-700
        ${
          navbarVisible
            ? "md:translate-y-0 md:opacity-100"
            : "md:-translate-y-4 md:opacity-0"
        }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link href="/" className="flex items-center">
          <Image
            src="/images/webp/logo_wb_min.webp"
            alt="Logo"
            width={100}
            height={20}
            priority
            className="object-contain"
          />
        </Link>

        {/* Desktop */}
        <div className="hidden items-center space-x-8 md:flex">
          <Link href="/about" className="hover:text-gray-500">
            {dictionary.navbar.about}
          </Link>

          <Link href="/pricing" className="hover:text-gray-500">
            {dictionary.navbar.pricing}
          </Link>

          <Link href="/clinics" className="hover:text-gray-500">
            {dictionary.navbar.clinics}
          </Link>

          <Link href="/contact" className="hover:text-gray-500">
            {dictionary.navbar.contact}
          </Link>

          <select
            value={locale}
            onChange={(e) =>
              setLocale(e.target.value as "pl" | "en" | "ua")
            }
            className="rounded border border-gray-300 px-2 py-1"
          >
            <option value="pl">PL</option>
            <option value="en">EN</option>
            <option value="ua">UA</option>
          </select>
        </div>

        {/* Hamburger */}
        <div className="relative z-50 flex items-center md:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="relative h-14 w-14 focus:outline-none"
          >
            <div className="absolute left-1/2 top-1/2 block w-5 -translate-x-1/2 -translate-y-1/2">
              <span
                className={`absolute block h-0.5 w-7 bg-gray-800 transition duration-500 ease-in-out ${
                  menuOpen ? "rotate-45" : "-translate-y-1.5"
                }`}
              />

              <span
                className={`absolute block h-0.5 w-5 bg-gray-800 transition duration-500 ease-in-out ${
                  menuOpen ? "opacity-0" : ""
                }`}
              />

              <span
                className={`absolute block h-0.5 w-7 bg-gray-800 transition duration-500 ease-in-out ${
                  menuOpen ? "-rotate-45" : "translate-y-1.5"
                }`}
              />
            </div>
          </button>
        </div>
      </div>

      {/* Overlay */}
      <div
        onClick={() => setMenuOpen(false)}
        className={`fixed inset-0 bg-black/30 backdrop-blur-sm transition-opacity duration-300 ${
          menuOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
      />

      {/* Mobile Menu */}
      <div
        className={`fixed right-0 top-0 h-full w-64 bg-white shadow-lg transition-transform duration-300 ease-in-out ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col space-y-6 p-6 pt-20">
          <Link
            href="/about"
            onClick={() => setMenuOpen(false)}
            className="text-gray-800 hover:text-gray-500"
          >
            {dictionary.navbar.about}
          </Link>

          <Link
            href="/pricing"
            onClick={() => setMenuOpen(false)}
            className="text-gray-800 hover:text-gray-500"
          >
            {dictionary.navbar.pricing}
          </Link>

          <Link
            href="/clinics"
            onClick={() => setMenuOpen(false)}
            className="text-gray-800 hover:text-gray-500"
          >
            {dictionary.navbar.clinics}
          </Link>

          <Link
            href="/contact"
            onClick={() => setMenuOpen(false)}
            className="text-gray-800 hover:text-gray-500"
          >
            {dictionary.navbar.contact}
          </Link>

          <select
            value={locale}
            onChange={(e) =>
              setLocale(e.target.value as "pl" | "en" | "ua")
            }
            className="rounded border border-gray-300 px-2 py-1"
          >
            <option value="pl">PL</option>
            <option value="en">EN</option>
            <option value="ua">UA</option>
          </select>
        </div>
      </div>
    </nav>
  );
}