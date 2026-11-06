<template>
    <div class="min-h-screen bg-site-bg text-site-text font-sans">
        <SiteHeader />

        <main class="max-w-3xl mx-auto px-4 sm:px-6 py-16 md:py-20">
            <p class="font-mono text-sm text-site-accent tracking-widest mb-3">
                ~ {{ eyebrow }}
            </p>
            <h1 class="font-display font-extrabold tracking-tight text-4xl md:text-6xl mb-12">
                {{ title }}
            </h1>

            <section
                v-for="section in sections"
                :key="section.heading"
                class="mb-12"
            >
                <h2 class="font-display font-extrabold tracking-tight text-2xl md:text-3xl mb-4">
                    {{ section.heading }}
                </h2>
                <p
                    v-for="(paragraph, i) in section.paragraphs"
                    :key="i"
                    class="mt-4 text-site-muted leading-relaxed"
                >
                    {{ paragraph }}
                </p>
            </section>

            <slot />
        </main>

        <SiteFooter />
    </div>
</template>

<script setup lang="ts">
defineProps<{
    eyebrow: string
    title: string
    sections: { heading: string, paragraphs: string[] }[]
}>()
</script>
