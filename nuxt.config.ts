// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: '2024-10-09',

    devtools: { enabled: true },

    runtimeConfig: {
        authSecret: process.env.AUTH_SECRET,
        apiBaseUrl: process.env.API_BASE_URL_SERVER || 'http://backend:8000',
        public: {
            apiBaseUrl: process.env.SERVER_URL || 'http://localhost:8000',
        },
    },

    plugins: [
        '~/plugins/axios.js'
    ],

    modules: ['@sidebase/nuxt-auth', "@nuxtjs/tailwindcss"],

    auth: {
        baseURL: process.env.AUTH_ORIGIN,
        disableServerSideAuth: false,
        provider: {
            type: 'authjs'
        }
    },
})