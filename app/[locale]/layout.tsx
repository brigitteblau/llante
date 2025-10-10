// app/[locale]/layout.tsx
// app/[locale]/layout.tsx
import { setRequestLocale, getMessages } from "next-intl/server";
import { Inter } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import "../globals.css";
import type { Metadata } from "next";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Llante — Consultoría joven, resultados serios",
  description: "Soluciones tecnológicas creadas por jovenes.",
  openGraph: {
    title: "Llante",
    description: "Consultoría joven, resultados serios",
    url: "https://llante.com",
    siteName: "Llante",
    locale: "es",
    type: "website",
  },
};

export function generateStaticParams() {
  return [{ locale: "es" }, { locale: "en" }];
}

export default async function LocaleLayout(props: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await props.params;

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body className={inter.className}>
        <NextIntlClientProvider messages={messages}>
          {props.children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
