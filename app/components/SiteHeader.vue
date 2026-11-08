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
                <div class="hidden sm:flex items-center text-xs font-mono border border-site-border rounded-md overflow-hidden">
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
                <button
                    type="button"
                    class="sm:hidden -mr-1 p-1.5 rounded-md text-site-muted hover:text-site-text hover:bg-site-raised transition-colors"
                    :aria-label="menuOpen ? t('classic.closeMenu') : t('classic.openMenu')"
                    :aria-expanded="menuOpen"
                    aria-controls="mobile-nav"
                    @click="menuOpen = !menuOpen"
                >
                    <svg
                        class="w-5 h-5"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        aria-hidden="true"
                    >
                        <path
                            v-if="menuOpen"
                            d="M6 6l12 12M18 6L6 18"
                        />
                        <path
                            v-else
                            d="M4 7h16M4 12h16M4 17h16"
                        />
                    </svg>
                </button>
            </div>
        </div>

        <Transition
            enter-active-class="transition duration-150 ease-out"
            enter-from-class="opacity-0 -translate-y-1"
            leave-active-class="transition duration-100 ease-in"
            leave-to-class="opacity-0 -translate-y-1"
        >
            <nav
                v-if="menuOpen"
                id="mobile-nav"
                class="sm:hidden border-t border-site-border/60 bg-site-bg/95 backdrop-blur"
            >
                <ul class="px-4 py-2 flex flex-col text-sm">
                    <li
                        v-for="section in sections"
                        :key="section"
                    >
                        <NuxtLink
                            :to="{ path: localePath('/'), hash: `#${section}` }"
                            class="block py-2.5 text-site-muted hover:text-site-text transition-colors"
                            @click="menuOpen = false"
                        >
                            {{ t(`classic.nav.${section}`) }}
                        </NuxtLink>
                    </li>
                </ul>
                <div class="px-4 pt-1 pb-4">
                    <div class="inline-flex items-center text-xs font-mono border border-site-border rounded-md overflow-hidden">
                        <NuxtLink
                            v-for="code in (['en', 'it'] as const)"
                            :key="code"
                            :to="switchLocalePath(code)"
                            :hreflang="code"
                            :aria-current="locale === code ? 'page' : undefined"
                            :class="[
                                'px-3 py-1.5 uppercase transition-colors',
                                locale === code ? 'bg-site-accent text-site-on-accent' : 'text-site-muted hover:text-site-text',
                            ]"
                            @click="menuOpen = false"
                        >
                            {{ code }}
                        </NuxtLink>
                    </div>
                </div>
            </nav>
        </Transition>
    </header>
</template>

<script setup lang="ts">
defineProps<{ terminal?: boolean }>()
defineEmits<{ 'open-terminal': [] }>()

const { t, locale } = useI18n()
const localePath = useLocalePath()
const switchLocalePath = useSwitchLocalePath()

const sections = ['about', 'experience', 'tallypal', 'projects', 'contact'] as const

const menuOpen = ref(false)
const route = useRoute()

// Close the mobile menu on navigation, on Escape and when resizing up to the desktop layout
watch(() => route.fullPath, () => {
    menuOpen.value = false
})

const onKeydown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') menuOpen.value = false
}

let desktopQuery: MediaQueryList | undefined
const onBreakpointChange = (e: MediaQueryListEvent) => {
    if (e.matches) menuOpen.value = false
}

onMounted(() => {
    window.addEventListener('keydown', onKeydown)
    desktopQuery = window.matchMedia('(min-width: 40rem)')
    desktopQuery.addEventListener('change', onBreakpointChange)
})

onUnmounted(() => {
    window.removeEventListener('keydown', onKeydown)
    desktopQuery?.removeEventListener('change', onBreakpointChange)
})
</script>
