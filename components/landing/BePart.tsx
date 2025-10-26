"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTranslations } from "next-intl";


gsap.registerPlugin(ScrollTrigger);



export default function BePart() {
const t = useTranslations("about.bePart");
const sectionRef = useRef<HTMLDivElement | null>(null);


useEffect(() => {
if (!sectionRef.current) return;
const ctx = gsap.context(() => {
gsap.from(sectionRef.current!.querySelectorAll("[data-fade]"), {
y: 40,
opacity: 0,
duration: 1,
ease: "power3.out",
stagger: 0.15,
scrollTrigger: { trigger: sectionRef.current!, start: "top 80%" },
});
});
return () => ctx.revert();
}, []);


// imágenes opcionales (pequeña tira de mood)
const thumbs = ["/about/join-1.jpg", "/about/join-2.jpg", "/about/join-3.jpg"]; // reemplazá si querés


return (
<section
ref={sectionRef}
className="relative overflow-hidden bg-gradient-to-b from-[#11121A] via-[#181A22] to-[#0d0f12] py-28 text-center text-white"
>
<div className="absolute inset-0 pointer-events-none">
<div className="absolute left-1/4 top-0 h-72 w-72 rounded-full bg-[#00F5D4]/10 blur-3xl" />
<div className="absolute right-1/3 bottom-0 h-80 w-80 rounded-full bg-[#B517FF]/10 blur-3xl" />
</div>


<div className="relative z-10 mx-auto max-w-3xl px-6">
<h2 data-fade className="text-3xl font-semibold md:text-4xl">{t("title")}</h2>
<p data-fade className="mt-4 text-white/80 md:text-lg">{t("text")}</p>
<p data-fade className="mt-3 text-white/70 text-sm md:text-base">{t("altLine")}</p>


<a
data-fade
href={t("href")}
className="mt-8 inline-block rounded-2xl bg-white px-6 py-3 text-sm font-medium text-black shadow-md transition-transform hover:scale-105"
>
{t("ctala")}
</a>


<div data-fade className="mt-10 flex flex-wrap justify-center gap-4 opacity-80">
{thumbs.map((src, i) => (
<img key={i} src={src} alt={`join-${i}`} className="h-40 w-32 rounded-2xl object-cover" />
))}
</div>
</div>
</section>
);
}