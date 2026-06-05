type ContactDict = {
  contact: {
    badge: string;
    title: string;
    description: string;

    phoneLabel: string;
    emailLabel: string;

    appointmentsTitle: string;
    appointmentsDescription: string;

    clinicsTitle: string;
    operationsTitle: string;
  };
};

type Props = {
  dict: ContactDict;
};

export default function ContactSection({ dict }: Props) {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-5xl mx-auto px-6">

        <p className="text-xs tracking-[0.3em] uppercase text-neutral-400">
          {dict.contact.badge}
        </p>

        <h1 className="text-4xl md:text-5xl font-semibold mt-4">
          {dict.contact.title}
        </h1>

        <p className="mt-6 text-neutral-600 leading-relaxed max-w-2xl">
          {dict.contact.description}
        </p>

        <div className="grid md:grid-cols-2 gap-8 mt-12">

          <div className="border rounded-3xl p-8">
            <h2 className="font-medium text-lg mb-6">
              {dict.contact.clinicsTitle}
            </h2>

            <div className="space-y-4">
              <div>
                <p className="text-neutral-400 text-sm">
                  {dict.contact.phoneLabel}
                </p>
                <a
                  href="tel:+48502302660"
                  className="text-lg font-medium"
                >
                  +48 502 302 660
                </a>
              </div>

              <div>
                <p className="text-neutral-400 text-sm">
                  {dict.contact.emailLabel}
                </p>
                <a
                  href="mailto:pawpis@poczta.onet.pl"
                  className="text-lg font-medium"
                >
                  pawpis@poczta.onet.pl
                </a>
              </div>
            </div>
          </div>

          <div className="border rounded-3xl p-8">
            <h2 className="font-medium text-lg mb-4">
              {dict.contact.appointmentsTitle}
            </h2>

            <p className="text-neutral-600">
              {dict.contact.appointmentsDescription}
            </p>

            <a
            href="https://www.znanylekarz.pl/pawel-pisera/chirurg-plastyczny-chirurg/lodz"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden lg:inline-flex w-fit items-center rounded-full bg-black px-5 py-3 text-sm text-white transition hover:bg-neutral-800"
            >
            ZnanyLekarz
            </a>
          </div>

        </div>

      </div>
    </section>
  );
}