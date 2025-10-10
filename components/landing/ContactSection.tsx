"use client";

import { useTranslations } from "next-intl";
import { useId, useState } from "react";

export default function ContactSection() {
  const t = useTranslations("info");
  const nameId  = useId();
  const emailId = useId();
  const phoneId = useId();
  const msgId   = useId();

  const [loading, setLoading] = useState(false);
  const [status, setStatus]   = useState<null | "ok" | "err">(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus(null);

    const form = e.currentTarget;
    const data = new FormData(form);

    // honeypot: si viene con contenido, es bot
    if ((data.get("company") as string)?.trim()) {
      setStatus("ok");
      form.reset();
      return;
    }

    // validaciones mínimas
    const email = (data.get("email") as string)?.trim();
    const name  = (data.get("name") as string)?.trim();
    const msg   = (data.get("message") as string)?.trim();
    if (!email || !name || !msg) return;

    setLoading(true);
    try {
      // Si tenés un endpoint, activá esto y ajustá la ruta:
      // const res = await fetch("/api/contact", { method: "POST", body: data });
      // if (!res.ok) throw new Error();
      // --- Fallback temporal: abrir mailto formateado
      const subject = encodeURIComponent(`[Contacto] ${name}`);
      const body =
        `Nombre: ${name}\nEmail: ${email}\nTeléfono: ${data.get("phone") || "-"}\n\nMensaje:\n${msg}`;
      window.location.href = `mailto:hola@tuempresa.com?subject=${subject}&body=${encodeURIComponent(body)}`;

      setStatus("ok");
      form.reset();
    } catch {
      setStatus("err");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section id="contact" className="relative bg-neutral-950 text-white py-20 overflow-hidden">
      {/* DIFUMINADO: usa tu clase existente para el blur/gradiente */}
      <div aria-hidden className="difuminado pointer-events-none absolute inset-0" />

      <div className="relative max-w-5xl mx-auto px-6">
        <header className="mb-10 text-center">
          <h2 className="text-3xl sm:text-5xl font-extrabold">{t("contact.title")}</h2>
          <p className="mt-3 text-white/70">{t("contact.subtitle")}</p>
        </header>

        <div className="grid md:grid-cols-2 gap-10">
          {/* Copy / bullets */}
          <div className="space-y-6">
            <p className="text-white/80">{t("contact.pitch")}</p>
            <ul className="space-y-3">
              {["flex1","flex2","flex3","flex4"].map((k) => (
                <li key={k} className="flex items-start gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-gradient-to-r from-[var(--hot)] to-[var(--cool)]" />
                  <span className="text-white/80">{t(`contact.${k}`)}</span>
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-3 pt-2">
              <a
                href="https://wa.me/5491112345678"
                className="inline-flex items-center gap-2 rounded-full bg-white text-black px-5 py-2.5 font-semibold transition-transform hover:scale-105 active:scale-95"
              >
                {t("contact.whatsapp")}
                <svg width="16" height="16" viewBox="0 0 24 24" className="opacity-70" aria-hidden>
                  <path fill="currentColor" d="M13 5h6v6h-2V8.41l-9.29 9.3l-1.42-1.42l9.3-9.29H13z"/>
                </svg>
              </a>
              <a
                href="mailto:hola@tuempresa.com"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-2.5 font-semibold text-white/90 hover:bg-white/10 transition"
              >
                {t("contact.email")}
              </a>
            </div>
          </div>

          {/* Form */}
          <form
            onSubmit={onSubmit}
            noValidate
            className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur"
          >
            <h3 className="sr-only">{t("contact.formTitle")}</h3>

            {/* Honeypot anti-spam */}
            <input type="text" name="company" className="hidden" tabIndex={-1} autoComplete="off" />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor={nameId} className="block text-sm text-white/70 mb-1">
                  {t("contact.form.name")}
                </label>
                <input
                  id={nameId}
                  name="name"
                  required
                  autoComplete="name"
                  className="w-full rounded-lg bg-black/40 border border-white/15 px-4 py-2.5 outline-none focus:ring-2 focus:ring-white/30"
                  aria-required="true"
                />
              </div>
              <div>
                <label htmlFor={emailId} className="block text-sm text-white/70 mb-1">
                  {t("contact.form.email")}
                </label>
                <input
                  id={emailId}
                  type="email"
                  name="email"
                  required
                  autoComplete="email"
                  className="w-full rounded-lg bg-black/40 border border-white/15 px-4 py-2.5 outline-none focus:ring-2 focus:ring-white/30"
                  aria-required="true"
                />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor={phoneId} className="block text-sm text-white/70 mb-1">
                  {t("contact.form.phone")}
                </label>
                <input
                  id={phoneId}
                  name="phone"
                  inputMode="tel"
                  autoComplete="tel"
                  className="w-full rounded-lg bg-black/40 border border-white/15 px-4 py-2.5 outline-none focus:ring-2 focus:ring-white/30"
                />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor={msgId} className="block text-sm text-white/70 mb-1">
                  {t("contact.form.message")}
                </label>
                <textarea
                  id={msgId}
                  name="message"
                  rows={5}
                  required
                  className="w-full resize-y rounded-lg bg-black/40 border border-white/15 px-4 py-3 outline-none focus:ring-2 focus:ring-white/30"
                  aria-required="true"
                />
              </div>
            </div>

            <div className="mt-5 flex items-start gap-3 text-xs text-white/70">
              <input id="consent" required type="checkbox" className="mt-1 accent-white" aria-required="true" />
              <label htmlFor="consent">{t("contact.form.consent")}</label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-6 inline-flex items-center justify-center rounded-full bg-white text-black font-semibold px-7 py-3 transition-all duration-300 hover:scale-110 hover:-translate-y-0.5 hover:shadow-[0_0_24px_rgba(255,255,255,.45)] active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? t("contact.form.sending") : t("contact.form.send")}
            </button>

            {/* Estado */}
            {status === "ok" && (
              <p role="status" className="mt-3 text-sm text-green-300">
                {t("contact.form.success")}
              </p>
            )}
            {status === "err" && (
              <p role="status" className="mt-3 text-sm text-red-300">
                {t("contact.form.error")}
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
