type ClinicsDict = {
  clinics: {
    badge: string;
    title: string;
    description: string;

    consultationsTitle: string;
    operationsTitle: string;

    registrationLabel: string;
    addressLabel: string;
  };
};

type Props = {
  dict: ClinicsDict;
};

const consultationClinics = [
  {
    name: 'Klinika Parkowa-Med',
    address: 'Łódź, ul. 3 Maja 46',
    phone: '42 207 39 92',
  },
  {
    name: 'AGAMED',
    address: 'Łódź, ul. Traugutta 8',
    phone: '+48 504 550 264',
  },
  {
    name: 'MelissaMed',
    address: 'Łódź, ul. Narutowicza 42',
    phone: '42 636 69 45',
  },
  {
    name: 'Uniwersytecki Szpital Kliniczny Nr 1 im. Norberta Barlickiego',
    address: 'Łódź, ul. Kopcińskiego 22',
    phone: '42 677 67 41',
  },
];

const operationClinics = [
  'Klinika Parkowa-Med',
  'AGAMED',
  'Uniwersytecki Szpital Kliniczny Nr 1 im. Norberta Barlickiego',
];

export default function ClinicsSection({ dict }: Props) {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <p className="text-xs tracking-[0.3em] uppercase text-neutral-400">
          {dict.clinics.badge}
        </p>

        <h1 className="text-4xl md:text-5xl font-semibold mt-4">
          {dict.clinics.title}
        </h1>

        <p className="mt-6 text-neutral-600 max-w-3xl leading-relaxed">
          {dict.clinics.description}
        </p>

        <div className="mt-16">
          <h2 className="text-2xl font-semibold mb-8">
            {dict.clinics.consultationsTitle}
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            {consultationClinics.map((clinic) => (
              <div
                key={clinic.name}
                className="border border-black/10 rounded-3xl p-8"
              >
                <h3 className="font-medium text-lg">
                  {clinic.name}
                </h3>

                <p className="text-neutral-500 mt-4 text-sm">
                  {dict.clinics.addressLabel}
                </p>

                <p>{clinic.address}</p>

                <p className="text-neutral-500 mt-4 text-sm">
                  {dict.clinics.registrationLabel}
                </p>

                <a
                  href={`tel:${clinic.phone.replace(/\s/g, '')}`}
                  className="font-medium"
                >
                  {clinic.phone}
                </a>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-20">
          <h2 className="text-2xl font-semibold mb-8">
            {dict.clinics.operationsTitle}
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {operationClinics.map((clinic) => (
              <div
                key={clinic}
                className="border border-black/10 rounded-3xl p-8"
              >
                <p className="font-medium">
                  {clinic}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}