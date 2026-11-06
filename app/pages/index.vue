<template>
    <div class="min-h-screen bg-site-bg">
        <ClassicView @open-terminal="openTerminal" />

        <!-- Test-only colour picker: `npm run dev` only, never in production -->
        <ClientOnly>
            <component
                :is="DevPaletteSwitcher"
                v-if="DevPaletteSwitcher"
            />
        </ClientOnly>

        <div
            v-if="windowState !== 'closed'"
            :class="[
                'fixed inset-0 z-30 flex items-center justify-center p-4 text-gray-200 font-mono transition-colors',
                windowState === 'minimized' ? 'pointer-events-none' : 'bg-black/60 backdrop-blur-sm',
            ]"
            @click.self="closeTerminal"
        >
            <TerminalWindow
                ref="terminalWindow"
                :time="time"
                :window-state="windowState"
                class="pointer-events-auto"
                @close="closeTerminal"
                @maximize="toggleMaximize"
                @minimize="minimizeTerminal"
                @focus="focusInput"
            >
                <div class="space-y-4">
                    <div
                        v-for="(h, i) in history"
                        :key="i"
                    >
                        <TerminalPrompt
                            :cwd="h.cwd"
                            :command="h.cmd"
                            :rprompt="h.rprompt"
                            :git-dirty="h.gitDirty"
                            :ok="h.ok"
                        />
                        <TerminalOutput :output="h.output" />
                    </div>

                    <TerminalPrompt
                        :cwd="cwd"
                        command=""
                        :rprompt="rprompt"
                        :git-dirty="gitDirty"
                        :ok="exitOk"
                        margin-class=""
                        @click="focusInput"
                    >
                        <input
                            ref="inputEl"
                            v-model="input"
                            class="bg-transparent border-none outline-none text-neutral-200 caret-site-accent w-[60vw] md:w-160 text-sm font-mono"
                            spellcheck="false"
                            autocomplete="off"
                            autocapitalize="off"
                            @keydown="handleKeydown"
                        >
                    </TerminalPrompt>
                </div>
            </TerminalWindow>
        </div>

        <div
            v-if="windowState === 'minimized'"
            class="fixed bottom-4 left-4 z-30"
        >
            <button
                class="px-4 py-2 bg-site-raised border border-site-border rounded-lg hover:bg-site-border transition-colors text-xs text-neutral-400 font-mono"
                @click="restoreTerminal"
            >
                raffaelelongoelia.dev
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
// ─── SEO ────────────────────────────────────────────────────────────────────
const { t } = useI18n()
const SEO_TITLE = computed(() => t('seo.title'))
const SEO_DESCRIPTION = computed(() => t('seo.description'))

// The title already contains the site name: skip the " | Raffaele Longo Elia" template suffix
useHead({ titleTemplate: '%s' })

useSeoMeta({
    title: SEO_TITLE,
    description: SEO_DESCRIPTION,
    ogTitle: SEO_TITLE,
    ogDescription: SEO_DESCRIPTION,
    twitterTitle: SEO_TITLE,
    twitterDescription: SEO_DESCRIPTION,
    twitterCard: 'summary_large_image',
})

defineOgImage('Default', {
    title: 'Raffaele Longo Elia',
    description: 'Senior Software Engineer — PHP · Laravel · Vue',
})

useSchemaOrg([
    definePerson({
        name: 'Raffaele Longo Elia',
        url: 'https://raffaelelongoelia.dev',
        jobTitle: 'Senior Software Engineer',
        sameAs: ['https://github.com/keteraf', 'https://linkedin.com/in/raffaele-longo-elia'],
    }),
    defineWebSite({
        name: 'Raffaele Longo Elia',
        description: SEO_DESCRIPTION,
    }),
    defineWebPage({
        name: SEO_TITLE,
    }),
])
// ────────────────────────────────────────────────────────────────────────────

const { time, rprompt, startTimer, stopTimer } = useTime()
const {
    input, inputEl, history, cwd, gitDirty, exitOk, focusInput,
    handleEnter, handleTab, navigateHistoryUp, navigateHistoryDown,
    clearScreen, initializeTerminal, resetTerminalState,
} = useTerminal()
const terminalWindow = ref()
const windowState = ref<'closed' | 'normal' | 'maximized' | 'minimized'>('closed')
// Dev server only: `import.meta.dev` is replaced by `false` at build time, so this
// dynamic import is dead code and the switcher is not shipped to production at all
const DevPaletteSwitcher = import.meta.dev
    ? defineAsyncComponent(() => import('~/components/PaletteSwitcher.vue'))
    : null

const handleKeydown = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
        e.preventDefault()
        handleEnter()
    }
    else if (e.key === 'ArrowUp') {
        e.preventDefault()
        navigateHistoryUp()
    }
    else if (e.key === 'ArrowDown') {
        e.preventDefault()
        navigateHistoryDown()
    }
    else if (e.key === 'Tab') {
        e.preventDefault()
        handleTab()
    }
    else if (e.ctrlKey && e.key === 'c') {
        e.preventDefault()
        input.value = ''
    }
    else if (e.ctrlKey && e.key === 'l') {
        e.preventDefault()
        clearScreen()
    }
}

const closeTerminal = () => {
    windowState.value = 'closed'
    resetTerminalState()
}

const openTerminal = () => {
    windowState.value = 'normal'
    nextTick(focusInput)
}

const toggleMaximize = () => {
    windowState.value = windowState.value === 'maximized' ? 'normal' : 'maximized'
}

const minimizeTerminal = () => {
    windowState.value = 'minimized'
}

const restoreTerminal = () => {
    windowState.value = 'normal'
}

watch(history, () => {
    nextTick(() => {
        if (terminalWindow.value?.scrollToBottom) {
            terminalWindow.value.scrollToBottom()
        }
    })
}, { deep: true })

// Lock page scroll while the terminal overlay is visible
watch(windowState, (state) => {
    document.body.style.overflow = state === 'normal' || state === 'maximized' ? 'hidden' : ''
})

const onGlobalKeydown = (e: KeyboardEvent) => {
    if (e.key === 'Escape' && (windowState.value === 'normal' || windowState.value === 'maximized')) {
        closeTerminal()
    }
}

onMounted(() => {
    startTimer()
    initializeTerminal()
    window.addEventListener('keydown', onGlobalKeydown)
})

onUnmounted(() => {
    stopTimer()
    window.removeEventListener('keydown', onGlobalKeydown)
    document.body.style.overflow = ''
})
</script>
