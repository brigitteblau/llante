// next.config.ts
// next.config.ts
import createNextIntlPlugin from "next-intl/plugin";

// ⚠️ Apunta AL ARCHIVO de request config (lo creamos en el paso 2)
const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

const nextConfig = {
  reactStrictMode: true
};

export default withNextIntl(nextConfig);
