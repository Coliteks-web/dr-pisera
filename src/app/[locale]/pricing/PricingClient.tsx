'use client';

import { useState } from 'react';

type PricingItem = {
  name: string;
  price: string;
};

type PricingGroupItem = {
  title: string;
  items?: PricingItem[];
};

type PricingDict = {
  title: string;
  showPrice: string;
  consultation: PricingItem;
  face: {
    title: string;
    [groupKey: string]: PricingGroupItem | string;
  };
  breast: {
    title: string;
    items: PricingItem[];
  };
  body: {
    title: string;
    items: PricingItem[];
  };
};

type Props = {
  dict: {
    pricing: PricingDict;
  };
};

export default function PricingClient({ dict }: Props) {
  const [opened, setOpened] = useState<Record<string, boolean>>({});

  const pricing = dict?.pricing;

  if (!pricing?.consultation || !pricing?.face || !pricing?.breast || !pricing?.body) {
    return <div className="p-6">Pricing data missing</div>;
  }

  const togglePrice = (key: string, name: string) => {
    setOpened((prev) => {
      const isOpening = !prev[key];

      if (isOpening) {
        console.log('PRICE REVEAL:', name);
      }

      return {
        ...prev,
        [key]: isOpening,
      };
    });
  };

  return (
    <main className="mx-auto max-w-5xl px-6 py-16">
      <h1 className="text-3xl font-semibold mb-10">{pricing.title}</h1>

      {/* CONSULTATION */}
      <section className="mb-12">
        <div className="flex justify-between border-b py-4">
          <span>{pricing.consultation.name}</span>

          <button
            onClick={() => togglePrice('consultation', pricing.consultation.name)}
            className="text-sm text-blue-600 hover:underline"
          >
            {opened['consultation']
              ? pricing.consultation.price
              : pricing.showPrice}
          </button>
        </div>
      </section>

      {/* FACE */}
      <section className="mb-12">
        <h2 className="text-xl font-medium mb-6">{pricing.face.title}</h2>

        {Object.entries(pricing.face)
          .filter(([key]) => key !== 'title')
          .map(([groupKey, group]) => {
            const typedGroup = group as PricingGroupItem;

            return (
              <div key={groupKey} className="mb-10">
                <h3 className="font-semibold mb-4">{typedGroup.title}</h3>

                <div className="space-y-3">
                  {(typedGroup.items ?? []).map((item: PricingItem, idx: number) => {
                    const key = `face-${groupKey}-${idx}`;

                    return (
                      <div key={key} className="flex justify-between border-b py-3">
                        <span>{item.name}</span>

                        <button
                          onClick={() => togglePrice(key, item.name)}
                          className="text-sm text-blue-600 hover:underline"
                        >
                          {opened[key] ? item.price : pricing.showPrice}
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
      </section>

      {/* BREAST */}
      <section className="mb-12">
        <h2 className="text-xl font-medium mb-6">{pricing.breast.title}</h2>

        <div className="space-y-3">
          {pricing.breast.items.map((item: PricingItem, idx: number) => {
            const key = `breast-${idx}`;

            return (
              <div key={key} className="flex justify-between border-b py-3">
                <span>{item.name}</span>

                <button
                  onClick={() => togglePrice(key, item.name)}
                  className="text-sm text-blue-600 hover:underline"
                >
                  {opened[key] ? item.price : pricing.showPrice}
                </button>
              </div>
            );
          })}
        </div>
      </section>

      {/* BODY */}
      <section>
        <h2 className="text-xl font-medium mb-6">{pricing.body.title}</h2>

        <div className="space-y-3">
          {pricing.body.items.map((item: PricingItem, idx: number) => {
            const key = `body-${idx}`;

            return (
              <div key={key} className="flex justify-between border-b py-3">
                <span>{item.name}</span>

                <button
                  onClick={() => togglePrice(key, item.name)}
                  className="text-sm text-blue-600 hover:underline"
                >
                  {opened[key] ? item.price : pricing.showPrice}
                </button>
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
}