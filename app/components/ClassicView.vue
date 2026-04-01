<template>
    <div class="fixed inset-0 bg-[#0a0a0a] overflow-auto z-10 font-mono">
        <!-- Header bar -->
        <header class="sticky top-0 z-20 border-b border-neutral-800/60 bg-[#0a0a0a]/95 backdrop-blur-sm">
            <div class="max-w-5xl mx-auto px-4 sm:px-6 h-12 flex items-center justify-between gap-4">
                <UButton
                    variant="ghost"
                    size="sm"
                    class="text-neutral-400 hover:text-neutral-200 font-mono text-xs"
                    @click="$emit('back')"
                >
                    ← back
                </UButton>
                <span class="hidden sm:flex items-center gap-0.5 text-xs select-none">
                    <span class="text-emerald-400">raffaele</span>
                    <span class="text-neutral-600">@</span>
                    <span class="text-emerald-400">portfolio</span>
                    <span class="text-neutral-600 mx-1.5">in</span>
                    <span class="text-sky-400">~</span>
                    <span class="text-neutral-500 mx-1.5">❯</span>
                    <span class="text-neutral-300">classic --mode</span>
                    <span class="ml-1 w-1.5 h-3.5 bg-emerald-400 opacity-70 animate-pulse inline-block align-middle" />
                </span>
                <div class="flex gap-1">
                    <UButton
                        size="xs"
                        :variant="locale === 'en' ? 'solid' : 'ghost'"
                        class="font-mono text-xs"
                        @click="setLocale('en')"
                    >
                        EN
                    </UButton>
                    <UButton
                        size="xs"
                        :variant="locale === 'it' ? 'solid' : 'ghost'"
                        class="font-mono text-xs"
                        @click="setLocale('it')"
                    >
                        IT
                    </UButton>
                </div>
            </div>
        </header>

        <main class="max-w-5xl mx-auto px-4 sm:px-6 py-8 pb-16">
            <!-- Bento grid -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <!-- Left column: identity + about -->
                <div class="flex flex-col gap-4">
                    <!-- whoami card -->
                    <UCard class="bg-[#0d0d0d] border border-neutral-800/60 ring-0">
                        <div class="space-y-3">
                            <div class="flex items-center gap-2">
                                <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block animate-pulse" />
                                <span class="text-[10px] text-neutral-600 uppercase tracking-widest">whoami</span>
                            </div>
                            <h1 class="text-2xl font-bold leading-tight">
                                <span class="bg-linear-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                                    Raffaele<br>Longo Elia
                                </span>
                            </h1>
                            <p class="text-sm text-neutral-400">
                                Web Developer
                            </p>
                        </div>
                    </UCard>

                    <!-- about / skills card -->
                    <UCard class="bg-[#0d0d0d] border border-neutral-800/60 ring-0 flex-1">
                        <div class="space-y-4">
                            <div class="flex items-center gap-2">
                                <span class="text-[10px] text-neutral-600 uppercase tracking-widest">cat about.txt</span>
                            </div>
                            <p class="text-xs text-neutral-500 leading-relaxed">
                                {{ t('terminal.about.intro') }}
                            </p>
                            <ul class="space-y-2.5">
                                <li
                                    v-for="skill in skills"
                                    :key="skill"
                                    class="flex items-start gap-2 text-sm text-neutral-300"
                                >
                                    <span class="text-emerald-500 mt-0.5 shrink-0">▸</span>
                                    <span>{{ skill }}</span>
                                </li>
                            </ul>
                        </div>
                    </UCard>

                    <!-- contact card (visible on mobile, hidden md+) -->
                    <UCard class="md:hidden bg-[#0d0d0d] border border-neutral-800/60 ring-0">
                        <div class="space-y-3">
                            <span class="text-[10px] text-neutral-600 uppercase tracking-widest">contact --info</span>
                            <div class="flex flex-col gap-2">
                                <UButton
                                    to="https://github.com/keteraf"
                                    target="_blank"
                                    variant="outline"
                                    size="sm"
                                    class="justify-start font-mono text-amber-400 border-amber-900/50 hover:border-amber-600/60 hover:bg-amber-950/20"
                                >
                                    github.com/keteraf
                                </UButton>
                                <UButton
                                    to="https://linkedin.com/in/raffaele-longo-elia"
                                    target="_blank"
                                    variant="outline"
                                    size="sm"
                                    class="justify-start font-mono text-amber-400 border-amber-900/50 hover:border-amber-600/60 hover:bg-amber-950/20"
                                >
                                    linkedin/raffaele-longo-elia
                                </UButton>
                            </div>
                        </div>
                    </UCard>
                </div>

                <!-- Right column: projects + contact -->
                <div class="md:col-span-2 flex flex-col gap-4">
                    <!-- projects card -->
                    <UCard class="bg-[#0d0d0d] border border-neutral-800/60 ring-0 flex-1">
                        <template #header>
                            <div class="flex items-center justify-between">
                                <span class="text-[10px] text-neutral-600 uppercase tracking-widest">ls ~/projects</span>
                                <UBadge
                                    v-if="!ghLoading && ghRepos"
                                    variant="soft"
                                    size="xs"
                                    class="font-mono text-[10px]"
                                >
                                    {{ ghRepos.length }} repos
                                </UBadge>
                            </div>
                        </template>

                        <div
                            v-if="ghLoading"
                            class="flex items-center gap-2 text-xs text-neutral-500 py-2"
                        >
                            <span class="animate-pulse text-emerald-500">▊</span>
                            {{ t('terminal.projects.loading') }}
                        </div>
                        <p
                            v-else-if="!ghRepos?.length"
                            class="text-xs text-neutral-500 py-2"
                        >
                            {{ t('terminal.projects.empty') }}
                        </p>
                        <div
                            v-else
                            class="grid grid-cols-2 sm:grid-cols-3 gap-1.5"
                        >
                            <UButton
                                v-for="repo in ghRepos"
                                :key="repo.label"
                                :to="repo.href"
                                target="_blank"
                                variant="ghost"
                                size="xs"
                                class="justify-start font-mono text-xs text-sky-400/80 hover:text-sky-300 hover:bg-sky-950/30 truncate"
                            >
                                <span class="text-neutral-700 mr-0.5">./</span>{{ repo.label }}
                            </UButton>
                        </div>
                    </UCard>

                    <!-- contact card (hidden on mobile, visible md+) -->
                    <UCard class="hidden md:block bg-[#0d0d0d] border border-neutral-800/60 ring-0">
                        <template #header>
                            <span class="text-[10px] text-neutral-600 uppercase tracking-widest">contact --info</span>
                        </template>
                        <div class="flex flex-wrap gap-3">
                            <UButton
                                to="https://github.com/keteraf"
                                target="_blank"
                                variant="outline"
                                size="sm"
                                class="font-mono text-amber-400 border-amber-900/50 hover:border-amber-600/60 hover:bg-amber-950/20"
                            >
                                github.com/keteraf
                            </UButton>
                            <UButton
                                to="https://linkedin.com/in/raffaele-longo-elia"
                                target="_blank"
                                variant="outline"
                                size="sm"
                                class="font-mono text-amber-400 border-amber-900/50 hover:border-amber-600/60 hover:bg-amber-950/20"
                            >
                                linkedin.com/in/raffaele-longo-elia
                            </UButton>
                        </div>
                    </UCard>
                </div>
            </div>

            <!-- Footer -->
            <p class="mt-12 text-center text-[11px] text-neutral-700 select-none">
                <span class="text-neutral-600">raffaele@portfolio</span>
                <span class="text-neutral-800 mx-1">~</span>
                <span class="text-neutral-700">$ exit</span>
            </p>
        </main>
    </div>
</template>

<script setup lang="ts">
import { useGithubRepos } from '~/composables/terminal/useGithubRepos'

const { t, tm, rt, locale, setLocale } = useI18n()
const { ghRepos, ghLoading, fetchGithubRepos } = useGithubRepos()

const skills = computed(() => (tm('terminal.about.skills') as string[]).map(s => rt(s)))

defineEmits<{ back: [] }>()

onMounted(() => {
    fetchGithubRepos()
})
</script>
