// File: components/landing/JoinLlanteSection.tsx
"use client";

import { useTranslations, useLocale } from "next-intl";
import { useId, useState } from "react";

/**
 * Componente de postulación a Llante — ahora con q1 como SELECT
 */
export default function JoinLlanteSection({ api = "/api/join" }: { api?: string }) {
  const t = useTranslations("join");
  const locale = useLocale();

  const q1Id = useId();
  const q2Id = useId();
  const q3Id = useId();

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<null | "ok" | "err">(null);

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
      q1: (data.get("q1") as string)?.trim(),
      q2: (data.get("q2") as string)?.trim(),
      q3: (data.get("q3") as string)?.trim(),
      locale,
    };

    if (!payload.q1 || !payload.q3) return;

    setLoading(true);
    try {
      const res = await fetch(api, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Request failed");
      setStatus("ok");
      form.reset();
    } catch (err) {
      setStatus("err");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section id="join" className="relative bg-neutral-950 text-white py-20 overflow-hidden">
      <div aria-hidden className="difuminado pointer-events-none absolute inset-0" />

      <div className="relative max-w-5xl mx-auto px-6">
        <header className="mb-10 text-center">
          <h2 className="text-3xl sm:text-5xl font-extrabold">{t("title")}</h2>
          <p className="mt-3 text-white/70">{t("subtitle")}</p>
        </header>

        <div className="grid md:grid-cols-2 gap-10">
          {/* texto izquierdo */}
          <div className="space-y-6">
            <p className="text-white/80 text-lg leading-relaxed">
              {t("intro", {
                default:
                  "¿Estás cansado/a de que en la mayoría de los trabajos te pidan años de experiencia? Si tenés entre 14 y 20 años y sos apasionado/a de la tecnología, diseño y más, estás en el lugar correcto. Completá el formulario para que podamos comunicarnos con vos y crear algo muy bueno juntos.",
              })}
            </p>
          </div>

          {/* formulario */}
          <form onSubmit={onSubmit} noValidate className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
            <input type="text" name="company" className="hidden" tabIndex={-1} autoComplete="off" />

            <div className="grid grid-cols-1 gap-4">
              <div>
                <label htmlFor={q1Id} className="block text-sm text-white/70 mb-1">
                  {t("form.q1.label")}
                </label>
                <select
                  id={q1Id}
                  name="q1"
                  required
                  defaultValue=""
                  className="w-full rounded-lg bg-black/40 border border-white/15 px-4 py-2.5 outline-none focus:ring-2 focus:ring-white/30"
                >
                  <option value="" disabled>
                    {t("form.q1.placeholder")}
                  </option>
                  {Object.entries(t.raw("form.q1.options")).map(([key, label]) => (
  <option key={key} value={key}>
    {label}
  </option>
))}

                
                </select>
              </div>

              <div>
                <label htmlFor={q2Id} className="block text-sm text-white/70 mb-1">
                  {t("form.q2.label")}
                </label>
                <textarea
                  id={q2Id}
                  name="q2"
                  rows={5}
                  placeholder={t("form.q2.placeholder")}
                  className="w-full resize-y rounded-lg bg-black/40 border border-white/15 px-4 py-3 outline-none focus:ring-2 focus:ring-white/30"
                />
              </div>

              <div>
                <label htmlFor={q3Id} className="block text-sm text-white/70 mb-1">
                  {t("form.q3.label")}
                </label>
                <input
                  id={q3Id}
                  name="q3"
                  required
                  placeholder={t("form.q3.placeholder")}
                  className="w-full rounded-lg bg-black/40 border border-white/15 px-4 py-2.5 outline-none focus:ring-2 focus:ring-white/30"
                />
              </div>
            </div>

            <input type="hidden" name="locale" value={locale} />

            <div className="mt-5 flex items-start gap-3 text-xs text-white/70">
              <input id="consent" required type="checkbox" className="mt-1 accent-white" />
              <label htmlFor="consent">{t("form.consent")}</label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-6 inline-flex items-center justify-center rounded-full bg-white text-black font-semibold px-7 py-3 transition-all duration-300 hover:scale-110 hover:-translate-y-0.5 hover:shadow-[0_0_24px_rgba(255,255,255,.45)] active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? t("form.sending") : t("form.send")}
            </button>

            {status === "ok" && <p className="mt-3 text-sm text-green-300">{t("form.success")}</p>}
            {status === "err" && <p className="mt-3 text-sm text-red-300">{t("form.error")}</p>}
          </form>
        </div>
      </div>
    </section>
  );
}

