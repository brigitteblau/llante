// app/layout.tsx
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
  return [{locale: "es"}, {locale: "en"}]; // si solo usás ES por ahora, dejá solo "es"
}

export default async function LocaleLayout({
  children,
  params: {locale}
}: {
  children: React.ReactNode;
  params: {locale: string};
}) {
  setRequestLocale(locale);                // importante para SSR
  const messages = await getMessages();   // viene del request.ts que hicimos arriba

  return (
    <html lang={locale}>
      <body className={inter.className}>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

// declare module '*.css';