<template>
    <footer class="border-t border-site-border/60">
        <div class="max-w-6xl mx-auto px-4 sm:px-6 py-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-xs text-site-muted font-mono">
            <p>© {{ new Date().getFullYear() }} Raffaele Longo Elia</p>
            <nav class="flex flex-wrap items-center gap-x-5 gap-y-2">
                <NuxtLink
                    :to="localePath('/about')"
                    class="hover:text-site-text transition-colors"
                >
                    {{ t('footer.about') }}
                </NuxtLink>
                <NuxtLink
                    :to="localePath('/privacy')"
                    class="hover:text-site-text transition-colors"
                >
                    {{ t('footer.privacy') }}
                </NuxtLink>
                <a
                    href="https://github.com/keteraf"
                    target="_blank"
                    rel="noopener"
                    class="hover:text-site-text transition-colors"
                >GitHub</a>
                <a
                    href="https://linkedin.com/in/raffaele-longo-elia"
                    target="_blank"
                    rel="noopener"
                    class="hover:text-site-text transition-colors"
                >LinkedIn</a>
            </nav>
        </div>
    </footer>
</template>

<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()
</script>
