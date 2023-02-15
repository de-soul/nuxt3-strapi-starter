export default defineNuxtConfig({
  ssr: false,
  modules: ["@nuxtjs/strapi", "@pinia/nuxt"],
  strapi: {
    url: process.env.STRAPI_URL || "http://127.0.0.1:1337",
    prefix: "/api",
    version: "v4",
    cookieName: "strapi_jwt",
    key: "authToken",
    cookie: {
      maxAge: 7 * 24 * 3600 * 1000,
      sameSite: "lax",
      secure: true,
      path: "/",
      httpOnly: false,
    },
  },
  pinia: {
    autoImports: ["defineStore", "acceptHMRUpdate", "storeToRefs"],
  },
  css: [
    "vuetify/lib/styles/main.sass",
    "@mdi/font/css/materialdesignicons.min.css",
  ],
  build: {
    transpile: ["vuetify"],
  },
  vite: {
    define: {
      "process.env.DEBUG": false,
    },
  },
  imports: {
    dirs: ["stores"],
  },
});
