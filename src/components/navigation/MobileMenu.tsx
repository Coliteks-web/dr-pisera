'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

export default function MobileMenu({
  dict,
  locale,
}: any) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  if (!mounted) return null;

  const nav = [
    { href: 'about', label: dict?.navbar?.about },
    { href: 'procedures', label: dict?.navbar?.procedures },
    { href: 'pricing', label: dict?.navbar?.pricing },
    { href: 'clinics', label: dict?.navbar?.clinics },
    { href: 'contact', label: dict?.navbar?.contact },
  ];

  return (
    <>
      {/* HAMBURGER (clean + always visible) */}
      <button
        className="lg:hidden w-10 h-10 flex items-center justify-center"
        onClick={() => setOpen(true)}
        aria-label="Open menu"
      >
        <div className="w-6 h-4 flex flex-col justify-between">
          <span className="h-[2px] bg-black w-full" />
          <span className="h-[2px] bg-black w-full" />
          <span className="h-[2px] bg-black w-full" />
        </div>
      </button>

      {mounted &&
        createPortal(
          <AnimatePresence>
            {open && (
              <div className="fixed inset-0 z-[99999]">
                
                {/* BACKDROP (iOS blur + dim) */}
                <motion.div
                  className="absolute inset-0 bg-black/40 backdrop-blur-md"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setOpen(false)}
                />

                {/* DRAWER */}
                <motion.div
                  className="absolute right-0 top-0 h-full w-full bg-white shadow-2xl"
                  initial={{ x: '100%' }}
                  animate={{ x: 0 }}
                  exit={{ x: '100%' }}
                  transition={{
                    type: 'spring',
                    stiffness: 260,
                    damping: 30,
                  }}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.2}
                  onDragEnd={(_, info) => {
                    if (info.offset.x > 120) setOpen(false);
                  }}
                >
                  
                  {/* HEADER */}
                  <div className="flex items-center justify-between border-b p-6 bg-white/70 backdrop-blur-xl">
                    <span className="text-lg font-semibold">
                      Menu
                    </span>

                    <button
                      onClick={() => setOpen(false)}
                      className="text-black text-xl"
                    >
                      ✕
                    </button>
                  </div>

                  {/* CONTENT */}
                  <div className="h-[calc(100vh-73px)] overflow-y-auto px-6 py-4">
                    <nav className="flex flex-col">

                      {nav.map((item) => {
                        const isActive =
                          pathname?.includes(item.href);

                        return (
                          <Link
                            key={item.href}
                            href={`/${locale}/${item.href}`}
                            onClick={() => setOpen(false)}
                            className={`
                              py-5 text-lg font-medium border-b
                              transition-all duration-200
                              ${
                                isActive
                                  ? 'text-black pl-2'
                                  : 'text-neutral-600'
                              }
                            `}
                          >
                            {item.label}
                          </Link>
                        );
                      })}

                    </nav>
                  </div>
                </motion.div>
              </div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </>
  );
}