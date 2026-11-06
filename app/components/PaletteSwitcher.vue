<template>
    <div class="fixed bottom-4 right-4 z-40 font-mono text-xs">
        <button
            v-if="!open"
            type="button"
            class="flex items-center gap-2 px-3 py-2 rounded-lg border border-site-border bg-site-raised text-site-text shadow-lg hover:border-site-accent transition-colors"
            @click="open = true"
        >
            <span
                class="w-3 h-3 rounded-full"
                :style="{ background: accent }"
            />
            palette
        </button>

        <div
            v-else
            class="w-72 rounded-xl border border-site-border bg-site-surface text-site-text shadow-2xl p-4 space-y-4"
        >
            <div class="flex items-center justify-between">
                <span class="text-site-muted">~ palette (test only)</span>
                <button
                    type="button"
                    class="text-site-muted hover:text-site-text"
                    aria-label="Close"
                    @click="open = false"
                >
                    ✕
                </button>
            </div>

            <!-- Accent -->
            <div class="space-y-2">
                <p class="text-site-muted">
                    accent
                </p>
                <div class="flex flex-wrap gap-1.5">
                    <button
                        v-for="p in ACCENTS"
                        :key="p.hex"
                        type="button"
                        :title="`${p.name} ${p.hex}`"
                        class="w-7 h-7 rounded-md border-2 transition-transform hover:scale-110"
                        :class="accent === p.hex ? 'border-white' : 'border-transparent'"
                        :style="{ background: p.hex }"
                        @click="accent = p.hex"
                    />
                </div>
                <label class="flex items-center gap-2">
                    <input
                        v-model="accent"
                        type="color"
                        class="w-8 h-7 bg-transparent cursor-pointer"
                    >
                    <input
                        v-model.lazy="accent"
                        class="flex-1 bg-site-raised border border-site-border rounded px-2 py-1 outline-none focus:border-site-accent"
                        spellcheck="false"
                    >
                </label>
            </div>

            <!-- Second graph branch -->
            <div class="space-y-2">
                <p class="text-site-muted">
                    graph 2nd branch
                </p>
                <div class="flex flex-wrap gap-1.5">
                    <button
                        v-for="p in SECONDARIES"
                        :key="p.hex"
                        type="button"
                        :title="`${p.name} ${p.hex}`"
                        class="w-7 h-7 rounded-md border-2 transition-transform hover:scale-110"
                        :class="accent2 === p.hex ? 'border-white' : 'border-transparent'"
                        :style="{ background: p.hex }"
                        @click="accent2 = p.hex"
                    />
                    <input
                        v-model="accent2"
                        type="color"
                        class="w-7 h-7 bg-transparent cursor-pointer"
                    >
                </div>
            </div>

            <!-- Preview of text on accent (auto-picked for contrast) -->
            <div class="flex items-center gap-2">
                <span class="px-3 py-1.5 rounded-md bg-site-accent text-site-on-accent font-semibold">
                    button
                </span>
                <span class="text-site-accent italic">accent text</span>
            </div>

            <div class="flex items-center justify-between gap-2 pt-1 border-t border-site-border">
                <code class="text-site-muted pt-2">{{ accent }} · {{ accent2 }}</code>
                <button
                    type="button"
                    class="mt-2 text-site-muted hover:text-site-text"
                    @click="reset"
                >
                    reset
                </button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
/**
 * Test-only palette switcher: overrides the accent CSS variables on <html> at runtime.
 * Shown in dev, or on any build with `?palette` in the URL. Remove once a palette is chosen.
 */
const DEFAULT_ACCENT = '#ff2056'
const DEFAULT_ACCENT_2 = '#38bdf8'
const STORAGE_KEY = 'palette-test'

const ACCENTS = [
    { name: 'Current red', hex: '#ff2056' },
    { name: 'Azure', hex: '#4cc2ff' },
    { name: 'Sky', hex: '#38bdf8' },
    { name: 'Ice', hex: '#7dd3fc' },
    { name: 'Cornflower', hex: '#60a5fa' },
    { name: 'Steel blue', hex: '#5ea8d8' },
    { name: 'Cyan', hex: '#22d3ee' },
    { name: 'Baby blue', hex: '#89cff0' },
    // greens
    { name: 'Teal', hex: '#2dd4bf' },
    { name: 'Emerald', hex: '#34d399' },
    { name: 'Mint', hex: '#6ee7b7' },
    { name: 'Green', hex: '#4ade80' },
    { name: 'Terminal green', hex: '#39ff14' },
    { name: 'Lime', hex: '#a3e635' },
    // purples
    { name: 'Lavender', hex: '#c4b5fd' },
    { name: 'Violet', hex: '#a78bfa' },
    { name: 'Indigo', hex: '#818cf8' },
    { name: 'Purple', hex: '#c084fc' },
    { name: 'Orchid', hex: '#e879f9' },
    { name: 'Electric violet', hex: '#8b5cf6' },
]

const SECONDARIES = [
    { name: 'Sky', hex: '#38bdf8' },
    { name: 'Amber', hex: '#fbbf24' },
    { name: 'Violet', hex: '#a78bfa' },
    { name: 'Emerald', hex: '#34d399' },
    { name: 'Pink', hex: '#f472b6' },
    { name: 'Red', hex: '#ff2056' },
]

const open = ref(false)
const accent = ref(DEFAULT_ACCENT)
const accent2 = ref(DEFAULT_ACCENT_2)

/** Dark text on light accents, white on dark ones (WCAG relative luminance). */
const onAccentColor = (hex: string) => {
    const m = /^#?([0-9a-f]{6})$/i.exec(hex.trim())
    if (!m) return '#ffffff'
    const [r, g, b] = [0, 2, 4].map((i) => {
        const c = parseInt(m[1]!.slice(i, i + 2), 16) / 255
        return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4
    })
    const luminance = 0.2126 * r! + 0.7152 * g! + 0.0722 * b!
    return luminance > 0.35 ? '#0b0b0e' : '#ffffff'
}

const apply = () => {
    const root = document.documentElement.style
    root.setProperty('--color-site-accent', accent.value)
    root.setProperty('--color-site-accent-2', accent2.value)
    root.setProperty('--color-site-on-accent', onAccentColor(accent.value))
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify({ accent: accent.value, accent2: accent2.value }))
    }
    catch { /* storage unavailable: palette just won't persist */ }
}

const reset = () => {
    accent.value = DEFAULT_ACCENT
    accent2.value = DEFAULT_ACCENT_2
}

onMounted(() => {
    try {
        const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null')
        if (saved?.accent) accent.value = saved.accent
        if (saved?.accent2) accent2.value = saved.accent2
    }
    catch { /* ignore */ }
    apply()
})

watch([accent, accent2], apply)
</script>
