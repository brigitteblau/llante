// src/i18n/request.ts
// src/i18n/request.ts
import {getRequestConfig} from "next-intl/server";

// Debe exportar *default* sí o sí
export default getRequestConfig(async ({locale}) => {
  // Si por ahora solo tenés ES, forzá "es" aquí o asegurate de tener /local/en también
  const loc = ( locale === "es") ? locale : "es";

  // Cargamos namespaces por archivo (tu carpeta es /local/<locale>)
  const common    = (await import(`@/local/${loc}/common.json`)).default;
  const hero      = (await import(`@/local/${loc}/hero.json`)).default;
  const banner    = (await import(`@/local/${loc}/banner.json`)).default;
  const vision    = (await import(`@/local/${loc}/vision.json`)).default;
  const benefits  = (await import(`@/local/${loc}/benefits.json`)).default;
  const footer    = (await import(`@/local/${loc}/footer.json`)).default;
  const info   = (await import(`@/local/${loc}/info.json`)).default;
  const legal   = (await import(`@/local/${loc}/legal.json`)).default;
  const part   = (await import(`@/local/${loc}/part.json`)).default;
  // Podés usar namespaces (common.*, hero.*) con useTranslations("hero")
  return {
    locale: loc,
    messages: {common, hero, banner, vision, benefits, footer, info, legal, part}
  };
});
