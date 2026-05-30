import MegaLink from './MegaLink';

export default function MegaMenu({
  locale,
  t,
}: any) {
  return (
    <div className="absolute left-1/2 top-full mt-6 w-[900px] -translate-x-1/2 rounded-3xl border border-neutral-200 bg-white p-8 shadow-2xl">
      <div className="grid grid-cols-3 gap-10">

        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-neutral-400">
            {t.face}
          </h3>

          <div className="space-y-3">
            <MegaLink
              href={`/${locale}/zabiegi/plastyka-powiek-gornych`}
              label={t.upperEyelids}
            />

            <MegaLink
              href={`/${locale}/zabiegi/plastyka-powiek-dolnych`}
              label={t.lowerEyelids}
            />
          </div>
        </div>

      </div>
    </div>
  );
}