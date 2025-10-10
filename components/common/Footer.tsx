// components/common/Footer.tsx
"use client";
import {useTranslations} from "next-intl";

export default function Footer(){
  const t = useTranslations("footer");
  return (
    <footer className="bg-[#0f1221] text-white py-10 border-t border-white/10">
      <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row justify-between items-center gap-6">
        <p className="text-sm text-white/70">
          © {new Date().getFullYear()} Llante. {t("copyright", {default:"Todos los derechos reservados."})}
        </p>
        <a href="mailto:brigitteblau20@gmail.com" className="rounded-full bg-white text-black px-5 py-2 text-sm font-medium hover:opacity-90 transition">
       contacto
        </a>
      </div>
    </footer>
  );
}
