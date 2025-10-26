// app/page.tsx
import NavBar from "@/components/common/NavBar";
import Hero from "@/components/landing/Hero";              
import TrustedBy from "@/components/landing/Trustedby";    
import FAQService from "@/components/landing/Questions";   
import ContactSection from "@/components/landing/ContactSection"; 
import BePart from "@/components/landing/BePart"; 
import { setRequestLocale } from "next-intl/server";

export default async function Page(props: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  return (
    <>
      <main className="overflow-hidden">
        <Hero />
      </main>
      <TrustedBy />
      <FAQService />
      <ContactSection />
      <BePart />
    </>
  );
}
