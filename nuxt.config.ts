// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
    modules: ['@nuxt/fonts', '@nuxt/eslint', '@pinia/nuxt', '@nuxtjs/i18n'],
    devtools: { enabled: true },
    css: ['~/assets/tailwind.css'],
    compatibilityDate: '2025-07-15',
    vite: {
        plugins: [
            tailwindcss(),
        ],
    },
    eslint: {
        config: {
            stylistic: {
                quotes: 'single',
                semi: false,
                indent: 4,
            },
        },
    },
    i18n: {
        locales: [
            { code: 'en', language: 'en-US', file: 'en.json', name: 'English' },
            { code: 'it', language: 'it-IT', file: 'it.json', name: 'Italiano' },
        ],
        defaultLocale: 'en',
        langDir: 'locales',
        strategy: 'no_prefix',
    },
})
