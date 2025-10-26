"use client";

import { useTranslations, useLocale } from "next-intl";
import { useId, useState, useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ContactSection() {
  const t = useTranslations("info");
  const locale = useLocale();

  const nameId = useId();
  const emailId = useId();
  const phoneId = useId();
  const serviceId = useId();
  const msgId = useId();

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<null | "ok" | "err">(null);

  // --- refs para reveals ---
  const sectionRef = useRef<HTMLElement | null>(null);
  const headerRef = useRef<HTMLDivElement | null>(null);
  const bulletsRef = useRef<HTMLUListElement | null>(null);
  const formRef = useRef<HTMLFormElement | null>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // header
      gsap.fromTo(
        headerRef.current,
        { autoAlpha: 0, y: 24 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: headerRef.current!, start: "top 85%" }
        }
      );
      // bullets (stagger)
      gsap.fromTo(
        bulletsRef.current?.children || [],
        { autoAlpha: 0, y: 12 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.08,
          ease: "power2.out",
          scrollTrigger: { trigger: bulletsRef.current!, start: "top 80%" }
        }
      );
      // form
      gsap.fromTo(
        formRef.current,
        { autoAlpha: 0, y: 20 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: { trigger: formRef.current!, start: "top 85%" }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus(null);

    const form = e.currentTarget;
    const data = new FormData(form);

    if ((data.get("company") as string)?.trim()) {
      setStatus("ok");
      form.reset();
      return;
    }

    const payload = {
      name: (data.get("name") as string)?.trim(),
      email: (data.get("email") as string)?.trim(),
      phone: (data.get("phone") as string)?.trim() || null,
      service: (data.get("service") as string)?.trim() || null, // <— NUEVO
      message: (data.get("message") as string)?.trim(),
      locale
    };

    if (!payload.name || !payload.email || !payload.message) return;

    setLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (!res.ok) throw new Error("Request failed");
      setStatus("ok");
      form.reset();
    } catch {
      setStatus("err");
    } finally {
      setLoading(false);
    }
  }

  const waPhone = "5491161213881";
  const waText = encodeURIComponent(
    t("contact.whatsappPrefill", {
      default: "Hola llante, quiero consultar por un servicio."
    })
  );
  const waHref = `https://wa.me/${waPhone}?text=${waText}`;

  const emailTo = "brigitteyaelblau0@gmail.com";
  const emailSub = encodeURIComponent(
    t("contact.emailSubject", { default: "Consulta desde la web" })
  );
  const emailBody = encodeURIComponent(
    t("contact.emailBody", { default: "Hola, me gustaría consultar por un servicio." })
  );
  const mailHref = `mailto:${emailTo}?subject=${emailSub}&body=${emailBody}`;

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative bg-neutral-950 text-white py-20 overflow-hidden"
    >
      <div aria-hidden className="difuminado pointer-events-none absolute inset-0" />

      <div className="relative max-w-5xl mx-auto px-6">
        <header ref={headerRef} className="mb-10 text-center">
          <h2 className="text-3xl sm:text-5xl font-extrabold">{t("contact.title")}</h2>
          <p className="mt-3 text-white/70">{t("contact.subtitle")}</p>
        </header>

        <div className="grid md:grid-cols-2 gap-10">
          {/* texto / bullets */}
          <div className="space-y-6">
            <p className="text-white/80">{t("contact.pitch")}</p>
            <ul ref={bulletsRef} className="space-y-3">
              {["flex1", "flex2", "flex3", "flex4"].map((k) => (
                <li key={k} className="flex items-start gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-gradient-to-r from-[var(--hot)] to-[var(--cool)]" />
                  <span className="text-white/80">{t(`contact.${k}`)}</span>
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-3 pt-2">
              <a
                href={waHref}
                className="inline-flex items-center gap-2 rounded-full bg-white text-black px-5 py-2.5 font-semibold transition-transform hover:scale-105 active:scale-95"
              >
                {t("contact.whatsapp")}
                <svg width="16" height="16" viewBox="0 0 24 24" className="opacity-70">
                  <path
                    fill="currentColor"
                    d="M13 5h6v6h-2V8.41l-9.29 9.3l-1.42-1.42l9.3-9.29H13z"
                  />
                </svg>
              </a>
              <a
                href={mailHref}
                className="inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-2.5 font-semibold text-white/90 hover:bg-white/10 transition"
              >
                {t("contact.email")}
              </a>
            </div>
          </div>

          {/* formulario */}
          <form
            ref={formRef}
            onSubmit={onSubmit}
            noValidate
            className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur"
          >
            <input
              type="text"
              name="company"
              className="hidden"
              tabIndex={-1}
              autoComplete="off"
            />

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

              {/* SELECT: Tipo de servicio */}
              <div className="sm:col-span-2">
                <label htmlFor={serviceId} className="block text-sm text-white/70 mb-1">
                  {t("contact.form.service.label")}
                </label>
                <select
                  id={serviceId}
                  name="service"
                  required
                  className="w-full rounded-lg bg-black/40 border border-white/15 px-4 py-2.5 outline-none focus:ring-2 focus:ring-white/30"
                  defaultValue=""
                >
                  <option value="" disabled>
                    {t("contact.form.service.placeholder")}
                  </option>
                  {[
                    { value: "landing", key: "landing" },
                    { value: "webapp", key: "webapp" },
                    { value: "branding", key: "branding" },
                    { value: "ecommerce", key: "ecommerce" },
                    { value: "seo", key: "seo" },
                    { value: "otro", key: "otro" }
                  ].map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {t(`contact.form.service.options.${opt.key}`)}
                    </option>
                  ))}
                </select>
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
                />
              </div>
            </div>

            <input type="hidden" name="locale" value={locale} />

            <div className="mt-5 flex items-start gap-3 text-xs text-white/70">
              <input id="consent" required type="checkbox" className="mt-1 accent-white" />
              <label htmlFor="consent">{t("contact.form.consent")}</label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-6 inline-flex items-center justify-center rounded-full bg-white text-black font-semibold px-7 py-3 transition-all duration-300 hover:scale-110 hover:-translate-y-0.5 hover:shadow-[0_0_24px_rgba(255,255,255,.45)] active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? t("contact.form.sending") : t("contact.form.send")}
            </button>

            {status === "ok" && (
              <p className="mt-3 text-sm text-green-300">{t("contact.form.success")}</p>
            )}
            {status === "err" && (
              <p className="mt-3 text-sm text-red-300">{t("contact.form.error")}</p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
