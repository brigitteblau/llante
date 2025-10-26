"use client";

import { useTranslations } from "next-intl";
import { Bowlby_One } from "next/font/google";
import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const bowlby = Bowlby_One({ weight: "400", subsets: ["latin"] });

type QA = { q: string; a: string };

export default function FAQServices() {
  const t = useTranslations("info");
  const root = useRef<HTMLElement | null>(null);
  const headerRef = useRef<HTMLDivElement | null>(null);

  const faqs: QA[] = [
    { q: t("faq.q1"), a: t("faq.a1") },
    { q: t("faq.q2"), a: t("faq.a2") },
    { q: t("faq.q3"), a: t("faq.a3") },
    { q: t("faq.q4"), a: t("faq.a4") },
    { q: t("faq.q5"), a: t("faq.a5") }
  ];

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // header
      gsap.fromTo(
        headerRef.current,
        { autoAlpha: 0, y: 24 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: headerRef.current!, start: "top 85%" }
        }
      );
      // items (stagger)
      const items = gsap.utils.toArray<HTMLElement>(".faq-item");
      gsap.fromTo(
        items,
        { autoAlpha: 0, y: 18 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.08,
          ease: "power2.out",
          scrollTrigger: { trigger: root.current!, start: "top 70%" }
        }
      );
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <div className="absolute bottom-0 left-0 right-0 h-70 bg-gradient-to-t from-black via-black/40 to-transparent" />

      <section
        id="faq"
        ref={root}
        className="relative py-24 overflow-hidden mt-[-1px]"
        style={{
          background:
            "linear-gradient(180deg, #0b1024 0%, #0e1430 60%, #11173a 100%)"
        }}
      >
        {/* halos tipo Hero */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div
            className="absolute w-[480px] h-[480px] rounded-full blur-[160px] opacity-30"
            style={{
              background: "radial-gradient(circle, var(--hot) 0%, transparent 70%)",
              top: "-120px",
              left: "5%"
            }}
          />
          <div
            className="absolute w-[480px] h-[480px] rounded-full blur-[160px] opacity-25"
            style={{
              background: "radial-gradient(circle, #00f5d4 0%, transparent 70%)",
              bottom: "-160px",
              right: "10%"
            }}
          />
        </div>

        {/* contenido */}
        <div className="relative z-10 max-w-6xl mx-auto px-6">
          <header ref={headerRef} className="text-center mb-10">
            <h2 className="text-white text-3xl sm:text-5xl font-extrabold">
              {t("faq.title")}
            </h2>
            <p className="text-white/70 mt-3">{t("faq.subtitle")}</p>
          </header>

          <div className="space-y-4">
            {faqs.map(({ q, a }, i) => (
              <details
                key={i}
                className="faq-item group rounded-3xl border border-white/10 bg-white/[0.03] px-6 py-5 backdrop-blur-sm hover:bg-white/[0.06] transition-all duration-300 open:shadow-[0_0_40px_rgba(255,255,255,0.05)]"
              >
                <summary className="list-none flex items-center justify-between gap-4 cursor-pointer select-none">
                  <h3 className="text-white/90 text-lg sm:text-xl font-semibold tracking-tight">
                    {q}
                  </h3>
                  <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/15 text-white/70 text-xl transition-transform duration-300 group-open:rotate-45 group-open:border-white/40">
                    +
                  </span>
                </summary>
                <div className="mt-10 text-white/80 leading-relaxed text-base">
                  {a}
                </div>
              </details>
            ))}
          </div>
        </div>

        {/* difuminado inferior */}
        <div className="absolute bottom-0 left-0 right-0 h-70 bg-gradient-to-t from-black via-black/40 to-transparent" />
      </section>
    </>
  );
}
