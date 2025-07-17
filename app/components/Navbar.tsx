"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useI18n } from "../i18n/I18nContext";

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
      className={`fixed top-0 left-0 w-full bg-white shadow-md z-50
        transition-none md:transition-all md:duration-700
        ${navbarVisible ? "md:opacity-100 md:translate-y-0" : "md:opacity-0 md:-translate-y-4"}
      `}
    >
      <div className="max-w-6xl mx-auto px-4 flex justify-between items-center h-16">
        {/* Logo */}
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
        <div className="hidden md:flex space-x-8 items-center">
          <Link href="/about" className="hover:text-gray-500">{dictionary.menu.about}</Link>
          <Link href="/gallery" className="hover:text-gray-500">{dictionary.menu.gallery}</Link>
          <Link href="/contact" className="hover:text-gray-500">{dictionary.menu.contact}</Link>
          <select
            value={locale}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
              setLocale(e.target.value as "pl" | "en")
            }
            className="border border-gray-300 rounded px-2 py-1"
          >
            <option value="pl">PL</option>
            <option value="en">EN</option>
          </select>
        </div>

        {/* Hamburger */}
        <div className="md:hidden flex items-center z-50 relative">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="w-14 h-14 relative focus:outline-none"
          >
            <div className="block w-5 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <span
                className={`block absolute h-0.5 w-7 bg-gray-800 transform transition duration-500 ease-in-out
                  ${menuOpen ? "rotate-45" : "-translate-y-1.5"}`}
              ></span>
              <span
                className={`block absolute h-0.5 w-5 bg-gray-800 transform transition duration-500 ease-in-out
                  ${menuOpen ? "opacity-0" : ""}`}
              ></span>
              <span
                className={`block absolute h-0.5 w-7 bg-gray-800 transform transition duration-500 ease-in-out
                  ${menuOpen ? "-rotate-45" : "translate-y-1.5"}`}
              ></span>
            </div>
          </button>
        </div>
      </div>

      {/* Overlay */}
      <div
        onClick={() => setMenuOpen(false)}
        className={`fixed inset-0 bg-black/30 backdrop-blur-sm transition-opacity duration-300 ease-in-out
          ${menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
      ></div>

      {/* Mobile menu */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out 
          ${menuOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex flex-col space-y-6 p-6 pt-20">
          <Link href="/about" onClick={() => setMenuOpen(false)} className="text-gray-800 hover:text-gray-500">
            {dictionary.menu.about}
          </Link>
          <Link href="/gallery" onClick={() => setMenuOpen(false)} className="text-gray-800 hover:text-gray-500">
            {dictionary.menu.gallery}
          </Link>
          <Link href="/contact" onClick={() => setMenuOpen(false)} className="text-gray-800 hover:text-gray-500">
            {dictionary.menu.contact}
          </Link>
          <select
            value={locale}
           onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            setLocale(e.target.value as "pl" | "en")
          }

            className="border border-gray-300 rounded px-2 py-1"
          >
            <option value="pl">PL</option>
            <option value="en">EN</option>
          </select>
        </div>
      </div>
    </nav>
  );
}
