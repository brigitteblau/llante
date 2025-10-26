"use client";

import React, { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function TrustedBy() {
  const t = useTranslations("info");
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);

  const brands = [
    { name: "Secure Track", logo: "/others/secure.png" },
    { name: "Ort", logo: "/others/ort.png" },
    { name: "Mirrow", logo: "/others/mirrow.png" },
    { name: "La Copia", logo: "/others/la-copia.png" },
  ];

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Reveal del bloque
      gsap.fromTo(
        sectionRef.current,
        { autoAlpha: 0, y: 60 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 1.0,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current!,
            start: "top 80%",
            // markers: true,
          },
        }
      );

      // Marquee infinito, pero pausado fuera de viewport para performance
      if (trackRef.current) {
        const track = trackRef.current;
        const w = track.scrollWidth / 2; // duplicamos para bucle
        const tween = gsap.to(track, {
          x: -w,
          duration: 28,
          ease: "none",
          repeat: -1,
          paused: true, // lo controlamos con ST
        });

        ScrollTrigger.create({
          trigger: sectionRef.current!,
          start: "top 90%",
          end: "bottom 10%",
          onEnter: () => tween.play(),
          onEnterBack: () => tween.play(),
          onLeave: () => tween.pause(),
          onLeaveBack: () => tween.pause(),
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      data-ll-layer="2"
      data-ll-motion="down"
      className="relative overflow-hidden py-15 bg-black flex flex-col items-center justify-center text-center"
    >
      <h2 className="text-white/60 text-sm tracking-[0.25em] uppercase mb-6">
        {t("trusted.tittle", { default: "Trusted by leading brands" })}
      </h2>

      <div className="relative w-full overflow-hidden">
        <div
          ref={trackRef}
          className="flex gap-16 whitespace-nowrap w-max will-change-transform"
        >
          {[...brands, ...brands].map((b, i) => (
            <div
              key={`${b.name}-${i}`}
              className="flex-shrink-0 grayscale opacity-70 hover:opacity-100 hover:grayscale-0 transition-all duration-300"
            >
              <Image
                src={b.logo}
                alt={b.name}
                width={160}
                height={64}
                className="object-contain mx-6"
              />
            </div>
          ))}
        </div>

        <div className="absolute left-0 top-0 h-full w-40 bg-gradient-to-r from-black via-black/80 to-transparent pointer-events-none" />
        <div className="absolute right-0 top-0 h-full w-40 bg-gradient-to-l from-black via-black/80 to-transparent pointer-events-none" />
      </div>
    </section>
  );
}
