"use client";

import { useTranslations } from "next-intl";
import { useId } from "react";

export default function ContactSection() {
  const t = useTranslations("info");
  const nameId = useId();
  const emailId = useId();
  const phoneId = useId();
  const msgId = useId();

  return (
    <section id="contact" className="bg-neutral-950 text-white py-20">
      <div className="max-w-5xl mx-auto px-6">
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
                <svg width="16" height="16" viewBox="0 0 24 24" className="opacity-70"><path fill="currentColor" d="M13 5h6v6h-2V8.41l-9.29 9.3l-1.42-1.42l9.3-9.29H13z"/></svg>
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
            action="mailto:hola@tuempresa.com"
            method="post"
            encType="text/plain"
            className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor={nameId} className="block text-sm text-white/70 mb-1">{t("form.name")}</label>
                <input id={nameId} name="name" required autoComplete="name"
                  className="w-full rounded-lg bg-black/40 border border-white/15 px-4 py-2.5 outline-none focus:ring-2 focus:ring-white/30" />
              </div>
              <div>
                <label htmlFor={emailId} className="block text-sm text-white/70 mb-1">{t("form.email")}</label>
                <input id={emailId} type="email" name="email" required autoComplete="email"
                  className="w-full rounded-lg bg-black/40 border border-white/15 px-4 py-2.5 outline-none focus:ring-2 focus:ring-white/30" />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor={phoneId} className="block text-sm text-white/70 mb-1">{t("form.phone")}</label>
                <input id={phoneId} name="phone" autoComplete="tel"
                  className="w-full rounded-lg bg-black/40 border border-white/15 px-4 py-2.5 outline-none focus:ring-2 focus:ring-white/30" />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor={msgId} className="block text-sm text-white/70 mb-1">{t("form.message")}</label>
                <textarea id={msgId} name="message" rows={5} required
                  className="w-full rounded-lg bg-black/40 border border-white/15 px-4 py-3 outline-none focus:ring-2 focus:ring-white/30" />
              </div>
            </div>

            <div className="mt-5 flex items-start gap-3 text-xs text-white/60">
              <input id="consent" required type="checkbox" className="mt-1" />
              <label htmlFor="consent">{t("form.consent")}</label>
            </div>

            <button
              type="submit"
              className="mt-6 inline-flex items-center justify-center rounded-full bg-white text-black font-semibold px-7 py-3 transition-all duration-300 hover:scale-110 hover:-translate-y-0.5 hover:shadow-[0_0_24px_rgba(255,255,255,.45)] active:scale-95"
            >
              {t("form.send")}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
