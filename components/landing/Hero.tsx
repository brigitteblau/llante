"use client";

import {useRef, useEffect} from "react";
import {useTranslations} from "next-intl";
import gsap from "gsap";

export default function Hero() {
  const t = useTranslations("hero");
  const heroRef = useRef<HTMLDivElement | null>(null);
  const orb1 = useRef<HTMLDivElement | null>(null);
  const orb2 = useRef<HTMLDivElement | null>(null);
  const orb3 = useRef<HTMLDivElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const ctaRef = useRef<HTMLAnchorElement | null>(null);

  useEffect(() => {
    // entrada suave del título y botón
    gsap.fromTo(
      titleRef.current,
      {y: 24, opacity: 0},
      {y: 0, opacity: 1, duration: 0.9, ease: "power3.out"}
    );
    gsap.fromTo(
      ctaRef.current,
      {y: 16, opacity: 0},
      {y: 0, opacity: 1, duration: 0.8, delay: 0.2, ease: "power3.out"}
    );

    // orbes flotando (loop infinito, lento)
    const floats = [
      {ref: orb1, dx: 60, dy: 40, d: 14},
      {ref: orb2, dx: 80, dy: 60, d: 18},
      {ref: orb3, dx: 50, dy: 70, d: 22},
    ];
    floats.forEach(({ref, dx, dy, d}, i) => {
      if (!ref.current) return;
      gsap.to(ref.current, {
        x: `+=${dx}`,
        y: `-=${dy}`,
        duration: d,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        delay: i * 0.2,
      });
    });

    // parallax muy sutil al hacer scroll
    const onScroll = () => {
      const y = window.scrollY;
      if (orb1.current) orb1.current.style.transform += ` translateY(${y * -0.02}px)`;
      if (orb2.current) orb2.current.style.transform += ` translateY(${y * -0.04}px)`;
      if (orb3.current) orb3.current.style.transform += ` translateY(${y * -0.01}px)`;
    };
    window.addEventListener("scroll", onScroll, {passive: true});
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-[100vh] flex items-center justify-center overflow-hidden"
      style={{background: "linear-gradient(180deg, #0b1024 0%, #0e1430 60%, #11173a 100%)"}}
    >
      {/* Orbes (círculos) con blur suave y blend bonito */}
      <div className="pointer-events-none absolute inset-0">
        <div
          ref={orb1}
          className="absolute w-[42vw] max-w-[640px] aspect-square rounded-full blur-3xl opacity-70 mix-blend-screen"
          style={{
            left: "8%",
            top: "14%",
            background:
              "radial-gradient(closest-side, rgba(255,77,178,0.55), rgba(255,77,178,0) 70%)",
          }}
        />
        <div
          ref={orb2}
          className="absolute w-[46vw] max-w-[720px] aspect-square rounded-full blur-3xl opacity-70 mix-blend-screen"
          style={{
            right: "-6%",
            top: "8%",
            background:
              "radial-gradient(closest-side, rgba(91,107,255,0.55), rgba(91,107,255,0) 70%)",
          }}
        />
        <div
          ref={orb3}
          className="absolute w-[54vw] max-w-[820px] aspect-square rounded-full blur-3xl opacity-60 mix-blend-screen"
          style={{
            left: "28%",
            bottom: "-12%",
            background:
              "radial-gradient(closest-side, rgba(0,245,212,0.45), rgba(0,245,212,0) 70%)",
          }}
        />
        {/* halo central muy suave */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(900px 420px at 50% 58%, rgba(255,255,255,0.06), transparent 70%)",
          }}
        />
      </div>

      {/* Contenido */}
      <div className="relative z-10 px-6 max-w-6xl mx-auto text-center">
        <h1
          ref={titleRef}
          className="font-extrabold leading-[0.95] text-[56px] sm:text-[88px] md:text-[112px] text-white tracking-[-0.02em]"
        >
          <span className="block">
            <span className="px-4 py-1 rounded-md bg-white/10">
              {t("big1", {default: "Sistemas"})}
            </span>{" "}
            {t("big2", {default: "que"})}
          </span>
          <span className="block mt-2">{t("big3", {default: "entregan resultados"})}</span>
          <span
            className="block mt-2"
            style={{
              background: "linear-gradient(90deg, var(--hot), var(--cool))",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            {t("big4", {default: "para tu organización."})}
          </span>
        </h1>

        <div className="mt-10">
    <a
  ref={ctaRef}
  href="#contact"
  className="inline-flex items-center justify-center rounded-full bg-white text-black font-semibold text-base sm:text-lg px-8 py-3 transition-all duration-300 ease-out 
             hover:scale-170 hover:-translate-y-1 hover:shadow-[0_0_25px_rgba(255,255,255,0.5)]
             hover:rotate-[1deg] active:scale-95"
>
  {t("cta.call", { default: "Llámanos por lo que necesitás" })}
</a>

        </div>
      </div>
    </section>
  );
}