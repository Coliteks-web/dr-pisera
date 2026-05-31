'use client';

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
};

export default function HeroSection({ dict }: Props) {
  return (
    <section className="relative min-h-[90vh] flex items-center bg-gradient-to-b from-white via-neutral-50 to-white overflow-hidden">
      {/* subtle luxury glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(0,0,0,0.06),transparent_60%)]" />

      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 relative z-10">
        
        {/* LEFT */}
        <div className="space-y-6">
          <p className="text-xs tracking-[0.3em] uppercase text-neutral-400">
            Klinika medycyny estetycznej
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
          <div className="flex gap-4 pt-4">
            <button className="px-6 py-3 rounded-full bg-black text-white text-sm tracking-wide hover:opacity-90 transition">
              {dict.hero.ctaPrimary}
            </button>

            <button className="px-6 py-3 rounded-full border border-black/20 text-sm tracking-wide hover:border-black/40 transition">
              {dict.hero.ctaSecondary}
            </button>
          </div>

          {/* highlight */}
          <p className="pt-6 text-sm text-neutral-400 italic border-l border-black/10 pl-4">
            {dict.hero.highlight}
          </p>
        </div>

        {/* RIGHT – LUXURY VISUAL BLOCK */}
        <div className="relative flex items-center justify-center">
          <div className="w-[320px] h-[420px] rounded-[2rem] bg-gradient-to-br from-neutral-900 to-neutral-700 shadow-2xl relative overflow-hidden">
            
            {/* decorative shine */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.15),transparent_60%)]" />

            <div className="absolute bottom-6 left-6 right-6 text-white">
              <p className="text-xs uppercase tracking-[0.2em] text-white/60">
                Estetyka premium
              </p>
              <p className="text-lg font-light mt-2">
                Naturalne efekty<br />i precyzja wykonania
              </p>
            </div>
          </div>

          {/* floating card */}
          <div className="absolute -bottom-6 -left-6 bg-white border border-black/10 shadow-lg rounded-2xl p-4 w-48">
            <p className="text-xs text-neutral-400 uppercase tracking-wider">
              Standard
            </p>
            <p className="text-sm font-medium text-black mt-1">
              Kliniczna precyzja
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}