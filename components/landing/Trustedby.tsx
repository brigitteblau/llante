"use client";

import {useRef, useEffect} from "react";
import Image from "next/image";
import gsap from "gsap";
import {useTranslations} from "next-intl";

export default function TrustedBy() {
    const t = useTranslations("info");
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const trackRef   = useRef<HTMLDivElement | null>(null);

  // Reemplazá estas rutas por tus logos
  const brands = [
    { name: "Secure Track", logo: "/others/secure.png" },
    { name: "Ort",          logo: "/others/ort.png" },
    { name: "Mirrow",       logo: "/others/mirrow.png" },
    { name: "La Copia",     logo: "/others/la-copia.png" },
  ];

  useEffect(() => {
    if (sectionRef.current) {
      gsap.fromTo(
        sectionRef.current,
        { opacity: 0, y: 60 },
        { opacity: 1, y: 0, duration: 1.1, ease: "power3.out" }
      );
    }

    const track = trackRef.current;
    if (track) {
      const w = track.scrollWidth / 2; // duplicamos para bucle
      gsap.to(track, { x: -w, ease: "none", duration: 28, repeat: -1 });
    }
  }, []);

  return (


    <section
      ref={sectionRef}
      className="relative overflow-hidden py-15 bg-black flex flex-col items-center justify-center text-center difuminado"
    >
      <h2 className="text-white/60 text-sm tracking-[0.25em] uppercase mb-6">
   
        {t("trusted.tittle", {default: "Trusted by leading brands"})}
      </h2>

      <div className="relative w-full overflow-hidden">
        <div ref={trackRef} className="flex gap-16 whitespace-nowrap w-max will-change-transform">
          {[...brands, ...brands].map((b, i) => (
            <div
              key={`${b.name}-${i}`}
              className="flex-shrink-0 grayscale opacity-70 hover:opacity-100 hover:grayscale-0 transition-all duration-300"
              // si querés SIEMPRE gris, quitá el hover y dejá 'grayscale' fijo
            >
              <Image src={b.logo} alt={b.name} width={160} height={64} className="object-contain mx-6" />
            </div>
          ))}
        </div>

     
        <div className="absolute left-0 top-0 h-full w-40 bg-gradient-to-r from-black via-black/80 to-transparent pointer-events-none" />
        <div className="absolute right-0 top-0 h-full w-40 bg-gradient-to-l from-black via-black/80 to-transparent pointer-events-none" />
      </div>
      
    </section>

  );
}
