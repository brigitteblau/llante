import createMiddleware from "next-intl/middleware";
import {locales, defaultLocale} from "./app/i18n";

export default createMiddleware({
  locales,
  defaultLocale,
  localeDetection: true
});

export const config = {
  matcher: ["/", "/(es|en)/:path*"]
};
