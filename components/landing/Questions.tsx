"use client";

import { useTranslations } from "next-intl";

type QA = { q: string; a: string };

export default function FAQServices() {
  const t = useTranslations("info");
  const faqs: QA[] = [
    { q: t("faq.q1"), a: t("faq.a1") },
    { q: t("faq.q2"), a: t("faq.a2") },
    { q: t("faq.q3"), a: t("faq.a3") },
    { q: t("faq.q4"), a: t("faq.a4") },
    { q: t("faq.q5"), a: t("faq.a5") },
  ];

  return (
    <section className="bg-black py-20">
      <div className="max-w-5xl mx-auto px-6">
        <header className="text-center mb-10">
          <h2 className="text-white text-3xl sm:text-5xl font-extrabold">{t("faq.title")}</h2>
          <p className="text-white/70 mt-3">{t("faq.subtitle")}</p>
        </header>

        <div className="space-y-4">
          {faqs.map(({ q, a }, i) => (
            <details
              key={i}
              className="group rounded-2xl border border-white/10 bg-neutral-900/60 px-5 sm:px-6 py-4 open:bg-neutral-900/90 transition"
            >
              <summary className="list-none flex items-center justify-between gap-4 cursor-pointer">
                <h3 className="text-white/90 text-base sm:text-lg font-medium">{q}</h3>
                <span className="shrink-0 rounded-full border border-white/15 w-8 h-8 grid place-items-center text-white/70 transition group-open:rotate-45">
                  +
                </span>
              </summary>
              <div className="mt-3 text-white/75 leading-relaxed">{a}</div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
