<template>
    <div class="min-h-screen bg-[#0a0a0a] text-gray-200 font-mono p-4">
        <div class="max-w-4xl mx-auto">
            <!-- Window chrome -->
            <div class="rounded-xl border border-neutral-800/80 shadow-2xl overflow-hidden bg-[#0c0c0c]">
                <div class="flex items-center justify-between px-4 py-2 border-b border-neutral-800/80 bg-[#0e0e0e]">
                    <div class="flex items-center gap-2">
                        <div class="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
                        <div class="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
                        <div class="w-3 h-3 rounded-full bg-[#27c93f]"></div>
                        <span class="ml-3 text-xs text-neutral-400">raffaelelongoelia.dev</span>
                    </div>
                    <div class="text-xs text-neutral-500">{{ time }}</div>
                </div>

                <!-- Terminal surface with a subtle radial texture -->
                <div class="p-4 bg-[radial-gradient(ellipse_at_top,_rgba(255,255,255,0.04),transparent_60%)]">
                    <div class="space-y-3">
                        <!-- Prompt 1 -->
                        <div class="flex items-baseline justify-between">
                            <div class="flex flex-wrap items-baseline gap-x-1">
                                <span class="text-green-400">raffaele</span>
                                <span class="text-neutral-500">@</span>
                                <span class="text-green-400">portfolio</span>
                                <span class="text-neutral-500">in</span>
                                <span class="text-cyan-400">~</span>
                                <span class="ml-2 px-1.5 rounded bg-fuchsia-900/30 text-fuchsia-300"> main<span v-if="gitDirty" class="ml-1">*</span></span>
                                <span :class="['ml-2', exitOk ? 'text-green-400' : 'text-red-400']">❯</span>
                                <span class="ml-2">whoami</span>
                            </div>
                            <div class="text-neutral-500 text-sm">{{ rprompt }}</div>
                        </div>
                        <div class="pl-6 text-neutral-200">Raffaele Longo Elia - Web Developer</div>

                        <!-- Prompt 2 -->
                        <div class="flex items-baseline justify-between mt-2">
                            <div class="flex flex-wrap items-baseline gap-x-1">
                                <span class="text-green-400">raffaele</span>
                                <span class="text-neutral-500">@</span>
                                <span class="text-green-400">portfolio</span>
                                <span class="text-neutral-500">in</span>
                                <span class="text-cyan-400">~</span>
                                <span class="ml-2 px-1.5 rounded bg-fuchsia-900/30 text-fuchsia-300"> main</span>
                                <span class="ml-2 text-green-400">❯</span>
                                <span class="ml-2">cat about.txt</span>
                            </div>
                            <div class="text-neutral-500 text-sm">{{ rprompt }}</div>
                        </div>
                        <div class="pl-6 space-y-1 text-neutral-300">
                            <p>Passionate web developer with expertise in:</p>
                            <p>• PHP with Laravel Framework</p>
                            <p>• MySQL/Postgres Database Design</p>
                            <p>• API Development & Integration</p>
                            <p>• DevOps & Server Management</p>
                        </div>

                        <!-- Prompt 3 -->
                        <div class="flex items-baseline justify-between mt-2">
                            <div class="flex flex-wrap items-baseline gap-x-1">
                                <span class="text-green-400">raffaele</span>
                                <span class="text-neutral-500">@</span>
                                <span class="text-green-400">portfolio</span>
                                <span class="text-neutral-500">in</span>
                                <span class="text-cyan-400">~/projects</span>
                                <span class="ml-2 px-1.5 rounded bg-fuchsia-900/30 text-fuchsia-300"> main</span>
                                <span class="ml-2 text-green-400">❯</span>
                                <span class="ml-2">ls</span>
                            </div>
                            <div class="text-neutral-500 text-sm">{{ rprompt }}</div>
                        </div>
                        <div class="pl-6 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-1 text-cyan-300">
                            <div>e-commerce-platform/</div>
                            <div>task-management-app/</div>
                            <div>api-gateway/</div>
                            <div>cms-system/</div>
                        </div>

                        <!-- Prompt 4 -->
                        <div class="flex items-baseline justify-between mt-2">
                            <div class="flex flex-wrap items-baseline gap-x-1">
                                <span class="text-green-400">raffaele</span>
                                <span class="text-neutral-500">@</span>
                                <span class="text-green-400">portfolio</span>
                                <span class="text-neutral-500">in</span>
                                <span class="text-cyan-400">~</span>
                                <span class="ml-2 px-1.5 rounded bg-fuchsia-900/30 text-fuchsia-300"> main</span>
                                <span class="ml-2 text-green-400">❯</span>
                                <span class="ml-2">contact --info</span>
                            </div>
                            <div class="text-neutral-500 text-sm">{{ rprompt }}</div>
                        </div>
                        <div class="pl-6 space-y-1 text-neutral-300">
                            <p>GitHub: <span class="text-amber-300">https://github.com/keteraf</span></p>
                            <p>LinkedIn: <span class="text-amber-300">https://linkedin.com/in/raffaele-longo-elia</span></p>
                        </div>

                        <!-- Current prompt with cursor -->
                        <div class="flex items-baseline justify-between mt-4">
                            <div class="flex flex-wrap items-baseline gap-x-1">
                                <span class="text-green-400">raffaele</span>
                                <span class="text-neutral-500">@</span>
                                <span class="text-green-400">portfolio</span>
                                <span class="text-neutral-500">in</span>
                                <span class="text-cyan-400">~</span>
                                <span class="ml-2 px-1.5 rounded bg-fuchsia-900/30 text-fuchsia-300"> main</span>
                                <span class="ml-2" :class="exitOk ? 'text-green-400' : 'text-red-400'">❯</span>
                                <span class="ml-2 text-neutral-200">_</span>
                                <span class="w-2 h-5 bg-emerald-400/80 animate-pulse ml-1"></span>
                            </div>
                            <div class="text-neutral-500 text-sm">{{ rprompt }}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue'

const time = ref('')
const rprompt = ref('')
const gitDirty = ref(false)
const exitOk = ref(true)
let t

const updateTime = () => {
    const d = new Date()
    const hh = String(d.getHours()).padStart(2, '0')
    const mm = String(d.getMinutes()).padStart(2, '0')
    time.value = `${hh}:${mm}`
    rprompt.value = `[${hh}:${mm}]`
}

onMounted(() => {
    updateTime()
    t = setInterval(updateTime, 1000)
    // Simulate git dirty state toggling occasionally
    const shouldDirty = Number(new Date().getMinutes()) % 2 === 1
    gitDirty.value = shouldDirty
})

onUnmounted(() => {
    if (t) clearInterval(t)
})
</script>