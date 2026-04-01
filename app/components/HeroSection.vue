<template>
    <div class="w-full max-w-lg">
        <div class="border border-white/[0.07] rounded-xl shadow-2xl overflow-hidden bg-[#0d1117]">
            <!-- Title bar — matches TerminalWindow -->
            <div class="grid grid-cols-3 items-center px-4 py-2.5 border-b border-white/[0.06] bg-[#161b22]">
                <div class="flex items-center gap-1.5">
                    <span class="w-3 h-3 rounded-full bg-[#ff5f57]" />
                    <span class="w-3 h-3 rounded-full bg-[#febc2e]" />
                    <span class="w-3 h-3 rounded-full bg-[#28c840]" />
                </div>
                <div class="flex items-center justify-center gap-2 text-xs text-neutral-500 select-none">
                    <span class="text-neutral-400 font-medium">zsh</span>
                    <span class="text-neutral-700">·</span>
                    <span class="text-neutral-600">raffaelelongoelia.dev</span>
                </div>
                <div class="flex justify-end items-center gap-1.5 text-xs text-neutral-600 font-mono">
                    <span class="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    <span>online</span>
                </div>
            </div>

            <!-- Terminal output -->
            <div class="px-5 py-5 font-mono text-sm space-y-4">
                <!-- whoami -->
                <div>
                    <div class="flex items-center flex-wrap gap-x-1.5 gap-y-0.5 text-sm">
                        <span class="text-emerald-400 font-semibold">raffaele</span>
                        <span class="text-neutral-600 text-xs">@</span>
                        <span class="text-emerald-300/70">portfolio</span>
                        <span class="text-neutral-700">›</span>
                        <span class="text-sky-400">~</span>
                    </div>
                    <div class="flex items-center gap-2 mt-0.5">
                        <span class="text-emerald-400 font-bold select-none">❯</span>
                        <span class="text-neutral-200">whoami</span>
                    </div>
                    <div class="mt-1.5 pl-5 text-neutral-300">
                        {{ $t('hero.title') }}
                    </div>
                </div>

                <!-- cat about.txt -->
                <div>
                    <div class="flex items-center flex-wrap gap-x-1.5 gap-y-0.5 text-sm">
                        <span class="text-emerald-400 font-semibold">raffaele</span>
                        <span class="text-neutral-600 text-xs">@</span>
                        <span class="text-emerald-300/70">portfolio</span>
                        <span class="text-neutral-700">›</span>
                        <span class="text-sky-400">~</span>
                    </div>
                    <div class="flex items-center gap-2 mt-0.5">
                        <span class="text-emerald-400 font-bold select-none">❯</span>
                        <span class="text-neutral-200">cat about.txt</span>
                    </div>
                    <div class="mt-1.5 pl-5 space-y-1">
                        <div class="text-emerald-400">{{ $t('hero.subtitle') }}</div>
                        <div class="text-neutral-500 text-xs tracking-wide">PHP · Laravel · MySQL · DevOps · API</div>
                    </div>
                </div>

                <!-- Empty prompt with blinking cursor -->
                <div>
                    <div class="flex items-center flex-wrap gap-x-1.5 gap-y-0.5 text-sm">
                        <span class="text-emerald-400 font-semibold">raffaele</span>
                        <span class="text-neutral-600 text-xs">@</span>
                        <span class="text-emerald-300/70">portfolio</span>
                        <span class="text-neutral-700">›</span>
                        <span class="text-sky-400">~</span>
                    </div>
                    <div class="flex items-center gap-2 mt-0.5">
                        <span class="text-emerald-400 font-bold select-none">❯</span>
                        <span class="inline-block w-[7px] h-[1.1em] bg-emerald-400/80 cursor-blink align-middle" />
                    </div>
                </div>

                <!-- Divider + mode buttons -->
                <div class="border-t border-white/[0.05] pt-4">
                    <div class="text-neutral-600 text-xs mb-3">
                        {{ $t('hero.hint') }}
                    </div>
                    <slot />
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.cursor-blink {
    animation: blink 1.2s step-end infinite;
}

@keyframes blink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0; }
}
</style>
