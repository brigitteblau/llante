"use client";
import  Image  from "next/image";
import Link from "next/link";
import {useTranslations, useLocale} from "next-intl";
import {usePathname} from "next/navigation";
import {useState, useEffect} from "react";

export default function NavBar() {
  const t = useTranslations("common");
  const locale = useLocale();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Cierra el menú cuando cambie la ruta
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const links = [
    { href: `/${locale}`, label: t("nav.hello", { default: "¡Hol!" }) },
    { href: `/${locale}/home`, label: t("nav.projects", { default: "Proyectos" }) },
    { href: `/${locale}/about`, label: t("nav.about", { default: "Historia" }) },
    { href: `/${locale}/contact`, label: t("nav.contact", { default: "Charlemos" }) },
  ];

  const isActive = (href: string) => pathname === href;

  return (
    <header className="fixed top-6 left-0 w-full z-50 flex justify-center">
      {/* Contenedor pill */}
      <div className="w-[92%] max-w-4xl flex items-center ">
        <Link
            href={`/${locale}`}
            className="text-base sm:text-lg font-semibold tracking-tight text-white"
          >
            <Image src="/logo.png" alt="llante-logo" width={150} height={300}/>
          </Link>

        <div className="flex  justify-end bg-black/90 rounded-full px-4 py-2 backdrop-blur-sm shadow-lg">
          {/* Brand */}
          

          {/* Desktop nav */}
          <nav className="hidden sm:flex items-center gap-2">
            {links.map((link) => {
              const base = "text-sm font-medium px-5 py-2 rounded-full transition-all duration-200";
              const active = "bg-[#E46AA8] text-black";
              const inactive = "text-white hover:text-[#E46AA8]";
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`${base} ${isActive(link.href) ? active : inactive}`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
          <button
            onClick={() => setOpen((v) => !v)}
            className="sm:hidden inline-flex items-center justify-center w-10 h-10 rounded-full text-white hover:text-[#E46AA8] focus:outline-none focus:ring-2 focus:ring-[#E46AA8]/60"
            aria-label={open ? t("nav.closeMenu", { default: "Cerrar menú" }) : t("nav.openMenu", { default: "Abrir menú" })}
            aria-expanded={open}
            aria-controls="mobile-nav"
          >
            {/* ícono simple */}
            <svg
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              {open ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile: menú desplegable */}
        <nav
          id="mobile-nav"
          className={`sm:hidden mt-2 rounded-2xl overflow-hidden transition-[max-height,opacity] duration-300
            ${open ? "max-h-64 opacity-100" : "max-h-0 opacity-0"}
          `}
          aria-hidden={!open}
        >
          <ul className="bg-black/90 backdrop-blur-sm shadow-lg rounded-2xl py-2">
            {links.map((link) => {
              const base = "block px-5 py-3 text-sm font-medium";
              const active = "bg-[#E46AA8] text-black";
              const inactive = "text-white hover:text-[#E46AA8]";
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`${base} ${isActive(link.href) ? active : inactive}`}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </header>
  );
}
