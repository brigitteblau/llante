
// app/page.tsx
// import Image from "next/image";
import NavBar from "@/components/common/NavBar";
import Hero from "@/components/landing/Hero";
import TrustedBy from "@/components/landing/Trustedby";
import  FAQService from "@/components/landing/Questions";
import  ContactSection from "@/components/landing/ContactSection";
import Footer from "@/components/common/Footer";
import {setRequestLocale} from "next-intl/server";

export default function Page({params: {locale}}:{params:{locale:string}}){
  setRequestLocale(locale); // asegura el locale en esta ruta
  return (
    <>
      <NavBar/>
      <main className="overflow-hidden">
        <Hero/>
      </main>
       <TrustedBy/>
       <FAQService/>
<ContactSection/>
      <Footer/>
    </>
  );
}
