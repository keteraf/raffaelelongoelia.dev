type RawSection = { heading: unknown, paragraphs: unknown[] }

/**
 * Localised content + SEO meta for a static prose page (about, privacy).
 * Reads `<key>.title`, `<key>.eyebrow`, `<key>.seoTitle`, `<key>.seoDescription`
 * and `<key>.sections[]` ({ heading, paragraphs[] }) from the i18n messages.
 */
export const useProsePage = (key: string, pageType: string[] = []) => {
    const { t, tm, rt } = useI18n()

    const title = computed(() => t(`${key}.title`))
    const eyebrow = computed(() => t(`${key}.eyebrow`))
    const seoTitle = computed(() => t(`${key}.seoTitle`))
    const seoDescription = computed(() => t(`${key}.seoDescription`))
    const sections = computed(() => (tm(`${key}.sections`) as RawSection[]).map(s => ({
        heading: rt(s.heading as string),
        paragraphs: s.paragraphs.map(p => rt(p as string)),
    })))

    useHead({
        titleTemplate: '%s',
        // nuxt-seo-utils injects the site-wide description at priority 30; outrank it with a per-page one
        meta: [{ name: 'description', content: seoDescription, tagPriority: 10 }],
    })
    useSeoMeta({
        title: seoTitle,
        ogTitle: seoTitle,
        ogDescription: seoDescription,
        twitterTitle: seoTitle,
        twitterDescription: seoDescription,
        twitterCard: 'summary_large_image',
    })
    defineOgImage('Default', {
        title: 'Raffaele Longo Elia',
        description: 'Senior Software Engineer — PHP · Laravel · Vue',
    })

    // Every section heading is a visible question: mirror them as FAQPage Q&A
    useSchemaOrg([
        defineWebPage({ '@type': [...pageType, 'FAQPage'], 'name': seoTitle }),
        ...sections.value.map(s => defineQuestion({
            name: s.heading,
            acceptedAnswer: s.paragraphs.join(' '),
        })),
    ])

    return { title, eyebrow, sections }
}
