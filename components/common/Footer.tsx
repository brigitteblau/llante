// components/common/Footer.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { usePathname } from "next/navigation";
import { useTransition } from "react";

export default function Footer() {
  const t = useTranslations("footer");
  const year = new Date().getFullYear();

  return (
    <footer
      className="text-white difuminado"
 
    >
      {/* Top */}
      <div className="bg-[var(--bg)]">
        <div className="max-w-6xl mx-auto px-6 py-16 grid gap-14 md:grid-cols-2">
          {/* Newsletter */}
          <div>
            <h3 className="text-3xl sm:text-4xl font-semibold leading-tight">
              {t("newsletter.title")}
            </h3>
            <p className="mt-3 text-white/70">{t("newsletter.subtitle")}</p>

            <form
              className="mt-8 flex items-center gap-3"
              // TODO: conecta tu endpoint (Beehiiv/Mailchimp/Supabase, etc.)
              onSubmit={(e) => e.preventDefault()}
            >
              <label htmlFor="llante-news" className="sr-only">
                {t("newsletter.emailPlaceholder")}
              </label>
              <input
                id="llante-news"
                type="email"
                required
                placeholder={t("newsletter.emailPlaceholder")}
                className="w-full max-w-md bg-transparent border-b border-white/30 focus:border-white/70 outline-none py-3 placeholder:text-white/50"
              />
              <button
                aria-label={t("newsletter.cta")}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/20 hover:border-white/40 transition"
              >
                {/* Flecha */}
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path
                    d="M5 12h12M13 6l6 6-6 6"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </form>
          </div>

          {/* Columnas de links */}
          <div className="grid grid-cols-2 gap-10 sm:gap-16">
            <FooterCol
              title="Llante"
              links={[
                { label: t("links.blog"), href: "/blog" },
                { label: t("links.showcase"), href: "/trabajos" },
                { label: t("links.learn"), href: "/servicios" },
                { label: t("links.contact"), href: "mailto:brigitteblau20@gmail.com" },
              ]}
            />
            <FooterCol
              title={t("connect")}
              links={[
                { label: "LinkedIn", href: "https://www.linkedin.com/" },
                { label: "GitHub", href: "https://github.com/" },
                { label: "CodePen", href: "https://codepen.io/" },
                { label: "X", href: "https://x.com/" },
              ]}
              external
            />
            <div className="col-span-2">
              <LanguageSwitcher />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="bg-[var(--bg)]/95 border-t border-white/10">
        <div className="max-w-6xl mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex  gap-3">
            <Image src="/logo.png" className="flex justify-center" alt="logo llante" height={100} width={130}/>
            <span className="text-sm text-white/70">
              © {year} Llante {t("copyright")}
            </span>
          </div>

          <nav className="flex items-center gap-5 text-sm">
            <Link href="/privacidad" className="hover:underline text-white/70">
              {t("privacy")}
            </Link>
            <span className="text-white/20">•</span>
            <Link href="/terminos" className="hover:underline text-white/70">
              {t("terms")}
            </Link>
            <span className="text-white/20">•</span>
            <a
              href="mailto:brigitteblau20@gmail.com"
              className="rounded-full bg-white text-black px-4 py-2 text-sm font-medium hover:opacity-90 transition"
            >
              {t("contactCta")}
            </a>
          </nav>
        </div>
      </div>
    </footer>
  );
}

/* === subcomponents === */

function FooterCol({
  title,
  links,
  external = false,
}: {
  title: string;
  links: { label: string; href: string }[];
  external?: boolean;
}) {
  return (
    <div>
      <h4 className="text-sm uppercase tracking-widest text-white/60 mb-4">
        {title}
      </h4>
      <ul className="space-y-3">
        {links.map((l) => (
          <li key={l.href}>
            {external ? (
              <a
                href={l.href}
                target="_blank"
                rel="noreferrer"
                className="text-base hover:opacity-90"
              >
                {l.label}
              </a>
            ) : (
              <Link href={l.href} className="text-base hover:opacity-90">
                {l.label}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Conmutador de idiomas (next-intl, App Router) */
function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();
  const locales = ["es", "en"]; // agrega más si los tienes

  const setLocale = (next: string) => {
    // Reescribe el pathname con el nuevo prefijo de locale
    const parts = pathname.split("/");
    parts[1] = next;
    const nextPath = parts.join("/") || "/";
    startTransition(() => {
      window.location.assign(nextPath);
    });
  };

  return (
    <div className="mt-4 flex items-center gap-2">
      <span className="text-sm text-white/60">{/* etiqueta accesible */}
        Idioma
      </span>
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
  );
}
