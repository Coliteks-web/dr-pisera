import type { Dictionary } from "@/types/dictionary";

export default function ProceduresPage({
  dict,
}: {
  dict: Dictionary;
}) {
  const proceduresPage = dict.proceduresPage;

  const title = proceduresPage?.title ?? "";
  const categories = proceduresPage?.categories ?? {};

  return (
    <section className="pt-28 pb-24 bg-white">
      <div className="max-w-5xl mx-auto px-6">
        <h1 className="mb-16 text-4xl font-semibold">
          {title}
        </h1>

        <div className="space-y-20">
          {Object.entries(categories).map(([categoryKey, category]) => {
            const typedCategory = category as {
              title?: string;
              procedures?: Record<
                string,
                {
                  title?: string;
                  description?: string;
                  recommendations?: {
                    title?: string;
                    items?: string[];
                  };
                }
              >;
            };

            const categoryTitle = typedCategory?.title ?? "";
            const procedures = typedCategory?.procedures ?? {};

            return (
              <div key={categoryKey} className="space-y-10">
                {/* CATEGORY TITLE */}
                <h2 className="text-2xl font-semibold border-b pb-3">
                  {categoryTitle}
                </h2>

                {/* PROCEDURES */}
                <div className="space-y-16">
                  {Object.entries(procedures).map(([slug, item]) => {
                    const title = item?.title ?? "";
                    const description = item?.description ?? "";
                    const recommendations = item?.recommendations;

                    return (
                      <article key={slug} id={slug} className="scroll-mt-32">
                        {/* TITLE */}
                        <h3 className="mb-5 text-3xl font-semibold">
                          {title}
                        </h3>

                        {/* DESCRIPTION */}
                        <p className="text-neutral-700 leading-relaxed mb-8 whitespace-pre-line">
                          {description}
                        </p>

                        {/* RECOMMENDATIONS */}
                        {recommendations?.items?.length ? (
                          <div className="border-t pt-6">
                            <h4 className="text-lg font-semibold mb-3">
                              {recommendations.title}
                            </h4>

                            <ul className="space-y-2">
                              {recommendations.items.map((r, i) => (
                                <li
                                  key={i}
                                  className="text-neutral-700 flex gap-2"
                                >
                                  <span>•</span>
                                  <span>{r}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ) : null}
                      </article>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}