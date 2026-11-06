<template>
    <header class="sticky top-0 z-20 border-b border-site-border/60 bg-site-bg/85 backdrop-blur">
        <div class="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-4">
            <div class="flex items-center gap-6">
                <NuxtLink
                    :to="localePath('/')"
                    class="font-display font-extrabold text-lg tracking-tight"
                >
                    raffaelelongoelia<span class="text-site-accent">.</span>dev
                </NuxtLink>
                <nav class="hidden sm:flex items-center gap-5 text-sm text-site-muted">
                    <NuxtLink
                        v-for="section in sections"
                        :key="section"
                        :to="{ path: localePath('/'), hash: `#${section}` }"
                        class="hover:text-site-text transition-colors"
                    >
                        {{ t(`classic.nav.${section}`) }}
                    </NuxtLink>
                </nav>
            </div>
            <div class="flex items-center gap-3">
                <div class="flex items-center text-xs font-mono border border-site-border rounded-md overflow-hidden">
                    <!-- Real links (not buttons) so crawlers can discover each language version -->
                    <NuxtLink
                        v-for="code in (['en', 'it'] as const)"
                        :key="code"
                        :to="switchLocalePath(code)"
                        :hreflang="code"
                        :aria-current="locale === code ? 'page' : undefined"
                        :class="[
                            'px-2.5 py-1 uppercase transition-colors',
                            locale === code ? 'bg-site-accent text-site-on-accent' : 'text-site-muted hover:text-site-text',
                        ]"
                    >
                        {{ code }}
                    </NuxtLink>
                </div>
                <button
                    v-if="terminal"
                    type="button"
                    class="group flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-site-accent/40 bg-site-accent/10 hover:bg-site-accent/20 hover:border-site-accent text-xs font-mono transition-colors"
                    @click="$emit('open-terminal')"
                >
                    <span class="text-site-accent font-bold select-none group-hover:translate-x-0.5 transition-transform">❯</span>
                    <span class="hidden sm:inline">{{ t('classic.tryTerminal') }}</span>
                    <span class="sm:hidden">{{ t('classic.terminalShort') }}</span>
                </button>
            </div>
        </div>
    </header>
</template>

<script setup lang="ts">
defineProps<{ terminal?: boolean }>()
defineEmits<{ 'open-terminal': [] }>()

const { t, locale } = useI18n()
const localePath = useLocalePath()
const switchLocalePath = useSwitchLocalePath()

const sections = ['about', 'experience', 'tallypal', 'projects', 'contact'] as const
</script>
