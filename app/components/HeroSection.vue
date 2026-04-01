<template>
    <div class="flex flex-col items-center justify-center gap-12 text-center">
        <!-- Typewriter headline -->
        <div class="space-y-4">
            <div class="flex items-center justify-center gap-3 font-mono text-2xl md:text-4xl">
                <span class="text-emerald-400 select-none">›</span>
                <span class="text-neutral-200 tracking-tight">{{ displayed }}<span
                    class="inline-block w-[0.55em] h-[1.1em] bg-emerald-400/80 align-middle ml-0.5"
                    :class="cursorVisible ? 'opacity-100' : 'opacity-0'"
                /></span>
            </div>

            <Transition name="fade">
                <div
                    v-if="done"
                    class="font-mono text-sm text-neutral-500 tracking-wide"
                >
                    {{ $t('hero.subtitle') }}
                </div>
            </Transition>
        </div>

        <!-- Buttons slot -->
        <Transition name="fade">
            <div
                v-if="done"
                class="flex flex-col items-center gap-4"
            >
                <p class="font-mono text-xs text-neutral-600">
                    {{ $t('hero.hint') }}
                </p>
                <slot />
            </div>
        </Transition>
    </div>
</template>

<script setup lang="ts">
const FULL_TEXT = 'raffaelelongoelia.dev'
const CHAR_DELAY = 80 // ms per character
const CURSOR_INTERVAL = 530 // ms blink period

const displayed = ref('')
const done = ref(false)
const cursorVisible = ref(true)

let cursorTimer: ReturnType<typeof setInterval> | null = null

const startTyping = () => {
    let i = 0
    const type = () => {
        if (i < FULL_TEXT.length) {
            displayed.value += FULL_TEXT[i]
            i++
            setTimeout(type, CHAR_DELAY)
        }
        else {
            done.value = true
        }
    }

    // Small initial pause before starting
    setTimeout(type, 600)

    // Cursor blink runs throughout
    cursorTimer = setInterval(() => {
        cursorVisible.value = !cursorVisible.value
    }, CURSOR_INTERVAL)
}

onMounted(startTyping)

onUnmounted(() => {
    if (cursorTimer) clearInterval(cursorTimer)
})
</script>

<style scoped>
.fade-enter-active {
    transition: opacity 0.6s ease, transform 0.6s ease;
}
.fade-enter-from {
    opacity: 0;
    transform: translateY(6px);
}
</style>
