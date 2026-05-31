import type { Dictionary } from "@/types/dictionary";

export default function ProceduresPage({
  dict,
}: {
  dict: Dictionary;
}) {
  const { title, ...procedures } = dict.proceduresPage;

  return (
    <section className="pt-28 pb-24 bg-white">
      <div className="max-w-5xl mx-auto px-6">
        <h1 className="mb-16 text-4xl font-semibold">
          {title}
        </h1>

        <div className="space-y-20">
          {Object.entries(procedures).map(([slug, item]) => {
            const typedItem = item as {
              title: string;
              description: string;
            };

            return (
              <article
                key={slug}
                id={slug}
                className="scroll-mt-32"
              >
                <h2 className="mb-6 text-3xl font-semibold">
                  {typedItem.title}
                </h2>

                <p className="text-neutral-700 leading-relaxed whitespace-pre-line">
                  {typedItem.description}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}