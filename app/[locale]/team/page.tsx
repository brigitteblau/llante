

"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTranslations } from "next-intl";
import BePart from "@/components/landing/BePart"; 

gsap.registerPlugin(ScrollTrigger);


export default function AboutUs() {
  const t = useTranslations("about");

  const heroRef = useRef<HTMLDivElement | null>(null);
  const missionRef = useRef<HTMLDivElement | null>(null);
  const valuesRef = useRef<HTMLDivElement | null>(null);
  const teamRef = useRef<HTMLDivElement | null>(null);
  const ribbonRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".hero-word", { y: 24, opacity: 0, ease: "power3.out", duration: 0.8, stagger: 0.05 });
      if (heroRef.current) {
        gsap.to(heroRef.current.querySelector(".hero-img"), {
          yPercent: -8,
          ease: "none",
          scrollTrigger: { trigger: heroRef.current, start: "top top", end: "+=60%", scrub: true },
        });
      }
      if (ribbonRef.current) {
        const width = ribbonRef.current.scrollWidth / 2;
        gsap.to(ribbonRef.current, { x: -width, repeat: -1, ease: "none", duration: 18 });
      }
      if (missionRef.current) {
        gsap.from(missionRef.current.querySelectorAll("[data-fade-up]"), {
          y: 20,
          opacity: 0,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.1,
          scrollTrigger: { trigger: missionRef.current, start: "top 75%" },
        });
      }
      if (valuesRef.current) {
        gsap.from(valuesRef.current.querySelectorAll("[data-card]"), {
          y: 30,
          opacity: 0,
          rotate: 1.5,
          duration: 0.8,
          ease: "power2.out",
          stagger: 0.12,
          scrollTrigger: { trigger: valuesRef.current, start: "top 80%" },
        });
      }
      if (teamRef.current) {
        gsap.from(teamRef.current.querySelectorAll("img[data-team]"), {
          scale: 0.92,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.08,
          scrollTrigger: { trigger: teamRef.current, start: "top 80%" },
        });
      }
    });
    return () => ctx.revert();
  }, []);

  const words = (str: string) =>
    str.split(" ").map((w, i) => (
      <span key={i} className="hero-word inline-block mr-2">{w}</span>
    ));

  return (
    <main className="relative min-h-screen w-full bg-[#0d0f12] text-white">
      {/* BG blobs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-[#00F5D4]/20 blur-3xl" />
        <div className="absolute top-1/3 -right-16 h-80 w-80 rounded-full bg-[#B517FF]/20 blur-3xl" />
        <div className="absolute bottom-0 left-1/4 h-56 w-56 rounded-full bg-cyan-400/10 blur-3xl" />
      </div>

      {/* HERO */}
      <section ref={heroRef} className="relative isolate">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-8 px-6 pt-28 pb-20 text-center md:pt-36">
          <h1 className="text-4xl font-semibold leading-tight tracking-tight md:text-6xl">
            {words(t("hero.headline"))}
          </h1>
          <p className="max-w-2xl text-base text-white/70 md:text-lg">{t("hero.sub")}</p>

          <div className="hero-img relative aspect-[16/9] w-full max-w-5xl overflow-hidden rounded-3xl border border-white/10 shadow-2xl">
            <img src={t("hero.image")} alt="Llante hero" className="h-full w-full object-cover" />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-[#0d0f12] via-transparent to-transparent opacity-60" />
            <div className="absolute bottom-4 left-4 rounded-full bg-white/10 px-3 py-1 text-xs backdrop-blur">Llante • Since 2025</div>
          </div>
        </div>

        {/* Scrolling ribbon */}
        <div className="relative mb-16 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent" />
          <div className="whitespace-nowrap">
            <div ref={ribbonRef} className="flex gap-8 py-3 text-sm uppercase tracking-widest text-white/70">
              {[...t.raw("ribbon"), ...t.raw("ribbon")].map((txt: string, i: number) => (
                <span key={i}>{txt}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* MISSION */}
      <section ref={missionRef} className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-6 pb-20 md:grid-cols-2">
        <div className="order-2 md:order-1" data-fade-up>
          <h2 className="text-2xl font-semibold md:text-4xl">{t("mission.title")}</h2>
          <p className="mt-4 text-white/80" data-fade-up>{t("mission.text")}</p>
          <ul className="mt-6 space-y-3 text-white/70" data-fade-up>
            {t.raw("mission.bullets").map((b: string, i: number) => (
              <li key={i}>• {b}</li>
            ))}
          </ul>
          <div className="mt-6 flex gap-4" data-fade-up>
            <a className="rounded-2xl bg-white px-4 py-2 text-sm font-medium text-black" href={t("cta.href")}>
              {t("cta.label")}
            </a>
          </div>
        </div>
        <div className="order-1 md:order-2" data-fade-up>
          <div className="relative overflow-hidden rounded-3xl border border-white/10">
            <img src={t("mission.image")} alt="Mission" className="aspect-[4/3] w-full object-cover" />
            <div className="absolute right-4 top-4 rounded-lg bg-black/40 px-3 py-1 text-xs text-white backdrop-blur">Research → Build → Ship</div>
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section ref={valuesRef} className="mx-auto max-w-6xl px-6 pb-20">
        <h3 className="mb-6 text-2xl font-semibold md:text-3xl">{t("values.title")}</h3>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {t.raw("values.items").map((v: { title: string; text: string }, i: number) => (
            <article key={i} data-card className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 shadow-xl backdrop-blur">
              <h4 className="text-lg font-semibold">{v.title}</h4>
              <p className="mt-2 text-sm text-white/70">{v.text}</p>
            </article>
          ))}
        </div>
      </section>

      {/* TEAM / GALLERY */}
      <section ref={teamRef} className="mx-auto max-w-6xl px-6 pb-28">
        <div className="mb-6 flex items-end justify-between">
          <h3 className="text-2xl font-semibold md:text-3xl">{t("team.title")}</h3>
          <span className="text-xs uppercase tracking-widest text-white/60">{t("team.subtitle")}</span>
        </div>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {t.raw("team.images").map((img: { src: string; alt?: string }, i: number) => (
            <img key={i} data-team src={img.src} alt={img.alt || `team-${i}`} className="aspect-[4/5] w-full rounded-2xl object-cover" />
          ))}
        </div>
        <p className="mt-6 max-w-3xl text-sm text-white/70">{t("team.directorLine")}</p>
      </section>

      {/* CTA comunidad: Be Part */}
      <BePart />

    </main>
  );
}
