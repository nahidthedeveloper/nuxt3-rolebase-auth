// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-10-09",
  devtools: { enabled: true },

  runtimeConfig: {
    authSecret: process.env.AUTH_SECRET,
    apiBaseUrl: process.env.SERVER_URL || "http://localhost:8000",
    public: {
      apiBaseUrl: process.env.SERVER_URL || "http://localhost:8000",
    },
  },

  ssr: true,
  plugins: ["~/plugins/api.js"],

  modules: [
    "@sidebase/nuxt-auth",
    "@nuxtjs/tailwindcss",
    ["@pinia/nuxt", { autoImports: ["defineStore", "acceptHMRUpdate"] }],
  ],
  
  imports: {
    dirs: ["stores"],
  },

  auth: {
    baseURL: process.env.AUTH_ORIGIN,
    disableServerSideAuth: false,
    provider: {
      type: "authjs",
    },
  },
});
