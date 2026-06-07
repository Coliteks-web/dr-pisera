'use client';

import Image from 'next/image';
import Link from 'next/link';

type HeroDict = {
  hero: {
    title: string;
    subtitle: string;
    description: string;
    descriptionSecondary: string;
    ctaPrimary: string;
    ctaSecondary: string;
    highlight: string;
  };
};

type Props = {
  dict: HeroDict;
  locale?: string;
};

export default function HeroSection({ dict, locale = 'pl' }: Props) {
  return (
    <section className="relative min-h-[90vh] flex items-center bg-gradient-to-b from-white via-neutral-50 to-white overflow-hidden">

      {/* BACKGROUND GLOW (non-blocking) */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(0,0,0,0.05),transparent_55%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-20 relative z-10">

        {/* LEFT */}
        <div className="space-y-6">

          <p className="text-xs tracking-[0.35em] uppercase text-neutral-400">
            Klinika chirurgii plastycznej
          </p>

          <h1 className="text-4xl md:text-5xl font-semibold text-black leading-tight">
            {dict.hero.title}
          </h1>

          <h2 className="text-lg text-neutral-500 font-light">
            {dict.hero.subtitle}
          </h2>

          <p className="text-neutral-600 leading-relaxed">
            {dict.hero.description}
          </p>

          <p className="text-neutral-500 leading-relaxed">
            {dict.hero.descriptionSecondary}
          </p>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">

            {/* PRIMARY CTA (external) */}
            <a
              href="https://www.znanylekarz.pl/pawel-pisera/chirurg-plastyczny-chirurg/lodz"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-full bg-black text-white text-sm text-center hover:opacity-90 transition"
            >
              {dict.hero.ctaPrimary}
            </a>

            {/* SECONDARY CTA (internal) */}
            <Link
              href={`/${locale}/procedures`}
              className="px-6 py-3 rounded-full border border-black/20 text-sm text-center hover:border-black/40 transition"
            >
              {dict.hero.ctaSecondary}
            </Link>

          </div>

          {/* highlight */}
          <p className="pt-6 text-sm text-neutral-400 italic border-l border-black/10 pl-4">
            {dict.hero.highlight}
          </p>

        </div>

        {/* RIGHT */}
        <div className="relative flex items-center justify-center">

          {/* glow */}
          <div className="absolute w-[420px] h-[520px] bg-black/5 blur-3xl rounded-full pointer-events-none" />

          {/* IMAGE CARD */}
          <div className="relative w-[340px] h-[460px] rounded-[2.2rem] overflow-hidden shadow-2xl border border-black/10 bg-white">

            <Image
              src="/images/jpg/foto1.JPG"
              alt="Doctor"
              fill
              priority
              className="
                object-cover object-center
                scale-[1.02]
                filter
                brightness-[1.05]
                contrast-[0.95]
                saturate-[0.75]
              "
              sizes="(max-width: 768px) 100vw, 340px"
            />

            {/* COLOR CORRECTION (removes yellow tone) */}
            <div className="absolute inset-0 bg-slate-500/10 mix-blend-multiply pointer-events-none" />
            <div className="absolute inset-0 bg-white/10 pointer-events-none" />

            {/* GRADIENT */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent pointer-events-none" />

            {/* TEXT */}
            <div className="absolute bottom-6 left-6 right-6 text-white pointer-events-none">
              <p className="text-xs uppercase tracking-[0.25em] text-white/70">
                Chirurgia plastyczna
              </p>
              <p className="text-lg font-light mt-2 leading-snug">
                Naturalne efekty<br />i medyczna precyzja
              </p>
            </div>

          </div>

          {/* TRUST CARD */}
          <div className="absolute -bottom-8 -left-10 bg-white border border-black/10 shadow-xl rounded-2xl p-4 w-56 pointer-events-none">

            <p className="text-xs text-neutral-400 uppercase tracking-wider">
              Standard kliniczny
            </p>

            <p className="text-sm font-medium text-black mt-1">
              Bezpieczeństwo i certyfikacja
            </p>

          </div>

        </div>
      </div>
    </section>
  );
}