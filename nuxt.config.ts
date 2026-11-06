// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    modules: ['@nuxt/ui', '@nuxt/fonts', '@nuxt/eslint', '@pinia/nuxt', '@nuxtjs/i18n', '@nuxtjs/seo'],
    devtools: { enabled: true },

    app: {
        head: {
            link: [{ rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }],
        },
    },
    css: ['~/assets/tailwind.css'],

    // ─── Site identity (used by all @nuxtjs/seo sub-modules) ───────────────────
    site: {
        url: 'https://raffaelelongoelia.dev',
        name: 'Raffaele Longo Elia',
        description: 'Senior Software Engineer (PHP · Laravel · Vue) with 16 years of experience. Experience, skills and projects — or explore them through an interactive terminal.',
        defaultLocale: 'en',
    },
    compatibilityDate: '2025-07-15',
    vite: {
        optimizeDeps: {
            include: [
                '@unhead/schema-org/vue',
            ],
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
        baseUrl: 'https://raffaelelongoelia.dev',
        // English at `/`, Italian at `/it` — each language gets its own indexable URL
        strategy: 'prefix_except_default',
        // First visit to `/`: redirect to the browser language if supported, else stay on English.
        // The cookie remembers a manual switch so the visitor is never redirected against their choice.
        detectBrowserLanguage: {
            useCookie: true,
            cookieKey: 'i18n_redirected',
            redirectOn: 'root',
            alwaysRedirect: false,
            fallbackLocale: 'en',
        },
    },

    // ─── OG Image (nuxt-og-image v6, Satori renderer) ───────────────────────────
    ogImage: {
        defaults: {
            width: 1200,
            height: 630,
            extension: 'png',
        },
    },

    // ─── Robots ─────────────────────────────────────────────────────────────────
    robots: {
        // Allow all crawlers; disallow nothing
        groups: [{ userAgent: ['*'], allow: ['/'] }],
    },

    // ─── Schema.org ─────────────────────────────────────────────────────────────
    schemaOrg: {
        identity: {
            type: 'Person',
            name: 'Raffaele Longo Elia',
            url: 'https://raffaelelongoelia.dev',
        },
    },

    // ─── Sitemap ────────────────────────────────────────────────────────────────
    sitemap: {
        // Routes (`/`, `/it`) and their hreflang alternates are discovered from @nuxtjs/i18n.
        // One sitemap.xml instead of per-locale sitemaps + index (overkill for two pages).
        sitemaps: false,
        // lastmod = build time, so every deploy refreshes the freshness signal
        defaults: { priority: 1.0, changefreq: 'monthly', lastmod: new Date().toISOString() },
    },
})
