"use client";

import Link from "next/link";

export default function PreviewPage() {
  return (
    <main className="min-h-screen bg-[#f8f6f2] text-[#1a1a1a]">
      {/* NAVBAR */}
      <header className="sticky top-0 z-50 border-b border-black/5 bg-white/80 backdrop-blur-xl">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
          {/* LOGO */}
          <Link
            href="/"
            className="text-xl font-light tracking-[0.25em] uppercase"
          >
            Dr Pisera
          </Link>

          {/* MENU */}
          <nav className="hidden items-center gap-10 md:flex">
            <a
              href="#o-mnie"
              className="text-sm tracking-wide transition hover:opacity-60"
            >
              O mnie
            </a>

            <a
              href="#zabiegi"
              className="text-sm tracking-wide transition hover:opacity-60"
            >
              Zabiegi
            </a>

            <a
              href="#cennik"
              className="text-sm tracking-wide transition hover:opacity-60"
            >
              Cennik
            </a>

            <a
              href="#kontakt"
              className="text-sm tracking-wide transition hover:opacity-60"
            >
              Kontakt
            </a>
          </nav>

          {/* CTA */}
          <button className="rounded-full border border-black px-5 py-2 text-sm transition hover:bg-black hover:text-white">
            Umów wizytę
          </button>
        </div>
      </header>

      {/* HERO */}
      <section className="flex min-h-[calc(100vh-80px)] items-center">
        <div className="mx-auto grid max-w-7xl gap-16 px-6 lg:grid-cols-2">
          {/* LEWA */}
          <div className="flex flex-col justify-center">
            <span className="mb-6 text-sm uppercase tracking-[0.3em] text-neutral-500">
              Chirurgia plastyczna
            </span>

            <h1 className="text-5xl font-light leading-tight md:text-7xl">
              Naturalne efekty.
              <br />
              Indywidualne podejście.
            </h1>

            <p className="mt-8 max-w-xl text-lg leading-relaxed text-neutral-600">
              Chirurgia plastyczna twarzy, piersi oraz sylwetki
              wykonywana z dbałością o bezpieczeństwo,
              proporcje i estetykę.
            </p>

            <div className="mt-10 flex gap-4">
              <button className="rounded-full bg-black px-8 py-4 text-white transition hover:opacity-90">
                Umów konsultację
              </button>

              <button className="rounded-full border border-black px-8 py-4 transition hover:bg-black hover:text-white">
                Zobacz zabiegi
              </button>
            </div>
          </div>

          {/* PRAWA */}
          <div className="relative flex items-center justify-center">
            <div className="aspect-[4/5] w-full max-w-md overflow-hidden rounded-[2rem] bg-neutral-200" />
          </div>
        </div>
      </section>
    </main>
  );
}