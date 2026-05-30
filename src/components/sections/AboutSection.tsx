'use client';

type AboutDict = {
  about: {
    title: string;
    paragraphs: string[];
    highlight: string;
    cards: {
      specialization: {
        title: string;
        value: string;
        subtitle: string;
      };
      experience: {
        title: string;
        value: string;
        subtitle: string;
      };
      position: {
        title: string;
        value: string;
        subtitle: string;
      };
    };
  };
};

type Props = {
  dict: AboutDict;
};

export default function AboutSection({ dict }: Props) {
  return (
    <section className="pt-28 pb-20 bg-white">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-3 gap-14">
        {/* LEFT CONTENT */}
        <div className="lg:col-span-2 space-y-6 text-neutral-700 leading-relaxed">
          <h1 className="text-3xl font-semibold text-black">
            {dict.about.title}
          </h1>

          {dict.about.paragraphs.map((text, i) => (
            <p key={i}>{text}</p>
          ))}

          <p className="font-medium text-black">
            {dict.about.highlight}
          </p>
        </div>

        {/* RIGHT SIDEBAR */}
        <div className="lg:col-span-1">
          <div className="sticky top-28 space-y-6">
            <Card
              title={dict.about.cards.specialization.title}
              value={dict.about.cards.specialization.value}
              subtitle={dict.about.cards.specialization.subtitle}
            />

            <Card
              title={dict.about.cards.experience.title}
              value={dict.about.cards.experience.value}
              subtitle={dict.about.cards.experience.subtitle}
            />

            <Card
              title={dict.about.cards.position.title}
              value={dict.about.cards.position.value}
              subtitle={dict.about.cards.position.subtitle}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function Card({
  title,
  value,
  subtitle,
}: {
  title: string;
  value: string;
  subtitle: string;
}) {
  return (
    <div className="rounded-2xl border border-black/10 p-6 shadow-sm bg-white">
      <h3 className="text-xs uppercase tracking-wider text-neutral-400 mb-3">
        {title}
      </h3>

      <p className="text-lg font-semibold text-black">
        {value}
      </p>

      <p className="text-sm text-neutral-500">
        {subtitle}
      </p>
    </div>
  );
}