// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    modules: ['@nuxt/ui', '@nuxt/fonts', '@nuxt/eslint', '@pinia/nuxt', '@nuxtjs/i18n', '@nuxtjs/seo'],
    devtools: { enabled: true },
    css: ['~/assets/tailwind.css'],
    compatibilityDate: '2025-07-15',

    // ─── Site identity (used by all @nuxtjs/seo sub-modules) ───────────────────
    site: {
        url: 'https://raffaelelongoelia.dev',
        name: 'Raffaele Longo Elia',
        description: 'Personal portfolio of Raffaele Longo Elia — full-stack developer. Explore projects, skills, and contact info through an interactive terminal.',
        defaultLocale: 'en',
    },

    // ─── Sitemap ────────────────────────────────────────────────────────────────
    sitemap: {
        // Single-page site; both locale variants share the same URL (no_prefix)
        urls: [{ loc: '/', priority: 1.0, changefreq: 'monthly' }],
    },

    // ─── Robots ─────────────────────────────────────────────────────────────────
    robots: {
        // Allow all crawlers; disallow nothing
        groups: [{ userAgent: ['*'], allow: ['/'] }],
    },

    // ─── OG Image (nuxt-og-image v6, Satori renderer) ───────────────────────────
    ogImage: {
        defaults: {
            width: 1200,
            height: 630,
            extension: 'png',
        },
    },

    // ─── Schema.org ─────────────────────────────────────────────────────────────
    schemaOrg: {
        identity: {
            type: 'Person',
            name: 'Raffaele Longo Elia',
            url: 'https://raffaelelongoelia.dev',
        },
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
    vite: {
        optimizeDeps: {
            include: [
                '@unhead/schema-org/vue',
            ]
        }
    },
})