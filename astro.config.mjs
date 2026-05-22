import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  site: "https://vmgorken.dev",
  // i18n hazırlığı: ileride EN/DE eklendiğinde bu blok aktif edilecek
  // i18n: {
  //   defaultLocale: "tr",
  //   locales: ["tr", "en", "de"],
  //   routing: { prefixDefaultLocale: false },
  // },
  build: {
    inlineStylesheets: "auto",
  },
});
