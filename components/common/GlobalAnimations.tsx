"use client";
import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

// Componente que registra animaciones globales usando GSAP + ScrollTrigger.
// Se monta en el layout para aplicar efectos a selectores ya presentes en la app.
export default function GlobalAnimations() {
  const root = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    if (!root.current) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Hero parallax (aplica si hay .st-hero en la página)
      gsap.to(".st-hero-gradient", {
        yPercent: 25,
        scale: 1.08,
        scrollTrigger: {
          trigger: ".st-hero",
          start: "top top",
          end: "+=400",
          scrub: 0.6,
        },
      });

      gsap.from(".st-hero-title", {
        y: 40,
        autoAlpha: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".st-hero",
          start: "top 70%",
          toggleActions: "play none none reverse",
        },
      });

      // Navbar: simple hide/show on scroll (works alongside existing scrolled state)
      gsap.fromTo(
        "header",
        { y: 0 },
        {
          y: 0,
          scrollTrigger: {
            start: 0,
            end: 99999,
            onUpdate: () => {
              // Añade una clase cuando scrollY>10 para reforzar estilos
              if (typeof window === "undefined") return;
              const h = document.querySelector("header");
              if (!h) return;
              if (window.scrollY > 10) h.classList.add("ll-scrolled");
              else h.classList.remove("ll-scrolled");
            },
          },
        }
      );

      // Batch reveal para elementos con clase .reveal
      ScrollTrigger.batch(".reveal", {
        start: "top 85%",
        onEnter: (batch) =>
          gsap.to(batch, { autoAlpha: 1, y: 0, duration: 0.6, stagger: 0.08, overwrite: true }),
        onLeave: (batch) => gsap.to(batch, { autoAlpha: 0, y: -20, duration: 0.4, overwrite: true }),
        onEnterBack: (batch) =>
          gsap.to(batch, { autoAlpha: 1, y: 0, duration: 0.6, stagger: 0.06, overwrite: true }),
        onLeaveBack: (batch) => gsap.to(batch, { autoAlpha: 0, y: 20, duration: 0.4, overwrite: true }),
      });

      // Small parallax for elements with data-ll-parallax attribute
      gsap.utils.toArray<HTMLElement>("[data-ll-parallax]").forEach((el) => {
        gsap.to(el, {
          yPercent: (i, target) => {
            const v = Number(target.getAttribute("data-ll-parallax") || 12);
            return v;
          },
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      });

      // Layer system: detecta secciones con data-ll-layer y las anima en parallax
      const layers = gsap.utils.toArray<HTMLElement>("[data-ll-layer]")
        .map((el) => ({
          el,
          layer: Number(el.getAttribute("data-ll-layer") || 0),
          motion: (el.getAttribute("data-ll-motion") || "side") as string,
        }))
        .sort((a, b) => a.layer - b.layer);

  layers.forEach(({ el, layer, motion }) => {
        // magnitude grows slightly with layer index
        const mag = Math.min(6 + layer * 3, 40);
        const dir = motion === "side" ? (layer % 2 === 0 ? -1 : 1) : 1;

        if (motion === "side") {
          gsap.fromTo(
            el,
            { xPercent: 0 },
            {
              xPercent: dir * mag,
              ease: "none",
              scrollTrigger: {
                trigger: el,
                start: "top bottom",
                end: "bottom top",
                scrub: 0.6,
              },
            }
          );
        } else {
          // motion === 'down' => layers se desplazan hacia abajo al hacer scroll
          gsap.fromTo(
            el,
            { yPercent: 0 },
            {
              yPercent: mag,
              ease: "none",
              scrollTrigger: {
                trigger: el,
                start: "top bottom",
                end: "bottom top",
                scrub: 0.6,
              },
            }
          );
        }
      });

      // Refresh on load (images/fonts)
      const refresh = () => ScrollTrigger.refresh();
      window.addEventListener("load", refresh);
    }, root);

    return () => {
      ctx.revert();
    };
  }, []);

  return <div ref={root} className="ll-global-animations" />;
}
