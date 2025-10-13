"use client";

import Link from "next/link";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { usePathname } from "next/navigation";
import { useTransition, useState, useEffect } from "react";
import Modal from "./Modal";

type Doc = {
  title?: string;
  intro?: string;
  sections?: { heading?: string; body: string }[]; // para privacy/terms
  list?: string[];                                   // para work
  note?: string;                                     // para contact
};

export default function Footer() {
  const t = useTranslations("footer");
  const locale = useLocale();
  const year = new Date().getFullYear();

  const [open, setOpen] = useState<null | "work" | "services" | "contact" | "privacy" | "terms">(null);
  const [doc, setDoc] = useState<Doc | null>(null);

  // WhatsApp (Escribinos)
  const waPhone = "5491161213881";
  const waText = encodeURIComponent(
    t("contactPrefill", { default: "Hola, me gustaría consultar por un servicio." })
  );
  const waHref = `https://wa.me/${waPhone}?text=${waText}`;

  const emailTo = "brigitteblau20@gmail.com";
  const mailHref = `mailto:${emailTo}?subject=${encodeURIComponent(
    t("emailSubject", { default: "Consulta desde la web" })
  )}`;

  // Cargar texto desde UN solo archivo: /local/<locale>/legal.json
  useEffect(() => {
    async function loadDoc(kind: "privacy" | "terms" | "work" | "contact") {
      try {
        const mod = await import(`@/local/${locale}/legal.json`);
        const all = mod.default as Record<string, Doc>;
        setDoc(all[kind] || { sections: [{ body: "No se encontró el documento." }] });
      } catch (e) {
        console.error("No se pudo cargar legal.json", e);
        setDoc({ sections: [{ body: "No se encontró el documento." }] });
      }
    }
    if (open === "privacy") loadDoc("privacy");
    if (open === "terms") loadDoc("terms");
    if (open === "work") loadDoc("work");
    if (open === "contact") loadDoc("contact");
  }, [open, locale]);

  return (
    <footer className="text-white difuminado">
      {/* Top */}
      <div className="bg-[var(--bg)]">
        <div className="max-w-6xl mx-auto px-6 py-16 grid gap-14 md:grid-cols-2">
          {/* Izquierda */}
          <div>
            <h3 className="text-3xl sm:text-4xl font-semibold leading-tight">
              {t("title", { default: "Construimos tu próxima experiencia digital" })}
            </h3>
            <p className="mt-3 text-white/70">
              {t("subtitle", { default: "Webs, branding y producto con foco en conversión." })}
            </p>
          </div>

          {/* Derecha */}
          <div className="grid grid-cols-2 gap-10 sm:gap-16">
            <FooterCol
              title="Llante"
              links={[
                { label: t("links.showcase"), onClick: () => setOpen("work") },
                { label: t("links.learn"), onClick: () => setOpen("services") },
                { label: t("links.contact"), onClick: () => setOpen("contact") },
              ]}
            />

            <FooterColExternal
              title={t("connect")}
              links={[
                { label: "LinkedIn", href: "https://www.linkedin.com/" },
                { label: "GitHub", href: "https://github.com/" },
                { label: "CodePen", href: "https://codepen.io/" },
                { label: "X", href: "https://x.com/" },
              ]}
            />
            <div className="col-span-2">
              <LanguageSwitcher />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="bg-[var(--bg)]">
        <div className="max-w-6xl mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Image src="/logo.png" alt="logo llante" height={58} width={66} />
            <span className="text-sm text-white/70">
              © {year} Llante {t("copyright")}
            </span>
          </div>

          <nav className="flex items-center gap-5 text-sm">
            <button onClick={() => setOpen("privacy")} className="hover:underline text-white/70">
              {t("privacy")}
            </button>
            <span className="text-white/20">•</span>
            <button onClick={() => setOpen("terms")} className="hover:underline text-white/70">
              {t("terms")}
            </button>
            <span className="text-white/20">•</span>
            <a
              href={waHref}
              className="rounded-full bg-white text-black px-4 py-2 text-sm font-medium hover:opacity-90 transition"
            >
              {t("contactCta")} {/* Escribinos → WhatsApp */}
            </a>
          </nav>
        </div>
      </div>

      {/* Modales */}
      <Modal
        open={open === "work"}
        onClose={() => setOpen(null)}
        title={doc?.title || t("modals.work.title", { default: "Trabajos" })}
      >
        {doc?.intro && <p className="mb-4">{doc.intro}</p>}
        {doc?.list ? (
          <ul className="space-y-2 list-disc pl-5">
            {doc.list.map((item, i) => <li key={i}>{item}</li>)}
          </ul>
        ) : (
          <p className="text-white/70">{t("modals.work.desc", { default: "Algunos proyectos recientes y casos de estudio." })}</p>
        )}
        <div className="mt-6 flex gap-3">
          <button
            onClick={() => setOpen("services")}
            className="rounded-full border border-white/20 px-4 py-2 text-sm hover:bg-white/10"
          >
            {t("ctaServices", { default: "Ver servicios" })}
          </button>
          <a href={waHref} className="rounded-full bg-white text-black px-4 py-2 text-sm font-medium">
            {t("ctaTalk", { default: "Hablemos" })}
          </a>
        </div>
      </Modal>

      <Modal
        open={open === "services"}
        onClose={() => setOpen(null)}
        title={t("modals.services.title", { default: "Servicios" })}
      >
        <ul className="space-y-3">
          <li>• Landing / Sitio institucional</li>
          <li>• Web App / Sistema</li>
          <li>• Branding / Identidad</li>
          <li>• E-commerce</li>
          <li>• SEO / Optimización</li>
        </ul>
        <p className="mt-4 text-white/70">
          {t("modals.services.note", { default: "Elegimos el stack según tu objetivo y presupuesto." })}
        </p>
        <div className="mt-6 flex gap-3">
          <a href={waHref} className="rounded-full bg-white text-black px-4 py-2 text-sm font-medium">WhatsApp</a>
          <a href={mailHref} className="rounded-full border border-white/20 px-4 py-2 text-sm hover:bg-white/10">Email</a>
        </div>
      </Modal>

      <Modal
        open={open === "contact"}
        onClose={() => setOpen(null)}
        title={doc?.title || t("modals.contact.title", { default: "Contacto" })}
      >
        <p className="text-white/80">
          {doc?.intro || t("modals.contact.desc", { default: "Escribinos por el canal que prefieras:" })}
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <a href={waHref} className="inline-flex items-center gap-2 rounded-full bg-white text-black px-5 py-2.5 font-semibold">WhatsApp</a>
          <a href={mailHref} className="inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-2.5 font-semibold text-white/90 hover:bg-white/10">Email</a>
        </div>
        <p className="mt-4 text-sm text-white/60">
          {doc?.note || t("modals.contact.hint", { default: "Respuesta rápida en horario laboral." })}
        </p>
      </Modal>

      <Modal
        open={open === "privacy"}
        onClose={() => setOpen(null)}
        title={doc?.title || t("privacy")}
      >
        {doc?.intro && <p className="mb-4">{doc.intro}</p>}
        {doc?.sections?.map((s, i) => (
          <div key={i} className="mt-4">
            {s.heading && <h4 className="font-semibold text-white mb-1">{s.heading}</h4>}
            <p className="text-white/80">{s.body}</p>
          </div>
        ))}
      </Modal>

      <Modal
        open={open === "terms"}
        onClose={() => setOpen(null)}
        title={doc?.title || t("terms")}
      >
        {doc?.intro && <p className="mb-4">{doc.intro}</p>}
        {doc?.sections?.map((s, i) => (
          <div key={i} className="mt-4">
            {s.heading && <h4 className="font-semibold text-white mb-1">{s.heading}</h4>}
            <p className="text-white/80">{s.body}</p>
          </div>
        ))}
      </Modal>
    </footer>
  );
}

/* === subcomponents === */

function FooterCol({
  title,
  links,
}: {
  title: string;
  links: { label: string; onClick: () => void }[];
}) {
  return (
    <div>
      <h4 className="text-sm uppercase tracking-widest text-white/60 mb-4">{title}</h4>
      <ul className="space-y-3">
        {links.map((l) => (
          <li key={l.label}>
            <button onClick={l.onClick} className="text-base hover:opacity-90">
              {l.label}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

function FooterColExternal({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div>
      <h4 className="text-sm uppercase tracking-widest text-white/60 mb-4">{title}</h4>
      <ul className="space-y-3">
        {links.map((l) => (
          <li key={l.href}>
            <a href={l.href} target="_blank" rel="noreferrer" className="text-base hover:opacity-90">
              {l.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();
  const locales = ["es", "en"];

  const setLocale = (next: string) => {
    const parts = pathname.split("/");
    parts[1] = next;
    const nextPath = parts.join("/") || "/";
    startTransition(() => {
      window.location.assign(nextPath);
    });
  };

  return (
    <div className="flex items-start">
      <div className="mt-4 flex items-center gap-2">
        <span className="text-sm text-white/60">Language</span>
        <div className="inline-flex rounded-full border border-white/20 overflow-hidden">
          {locales.map((lc) => (
            <button
              key={lc}
              onClick={() => setLocale(lc)}
              disabled={isPending}
              className={`px-3 py-1.5 text-sm transition ${
                lc === locale ? "bg-white text-black" : "text-white/80 hover:bg-white/10"
              }`}
              aria-pressed={lc === locale}
            >
              {lc.toUpperCase()}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
