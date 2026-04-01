<template>
    <div
        :class="[
            'transition-all duration-300',
            windowState === 'maximized' ? 'w-full h-screen' : 'w-full max-w-4xl h-[600px]',
            windowState === 'minimized' ? 'scale-0 opacity-0' : 'scale-100 opacity-100',
        ]"
    >
        <div
            :class="[
                'border border-white/[0.07] shadow-2xl overflow-hidden bg-[#0d1117] h-full flex flex-col',
                windowState === 'maximized' ? 'rounded-none' : 'rounded-xl',
            ]"
        >
            <!-- Title bar -->
            <div class="grid grid-cols-3 items-center px-4 py-2.5 border-b border-white/[0.06] bg-[#161b22] shrink-0">
                <!-- Traffic lights -->
                <div class="flex items-center gap-1.5">
                    <button
                        class="w-3 h-3 rounded-full bg-[#ff5f57] transition-all cursor-pointer group relative"
                        @click="$emit('close')"
                    >
                        <span
                            class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 text-[#6e0902] font-bold leading-none"
                            style="font-size: 8px"
                        >✕</span>
                    </button>
                    <button
                        class="w-3 h-3 rounded-full bg-[#febc2e] transition-all cursor-pointer group relative"
                        @click="$emit('minimize')"
                    >
                        <span
                            class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 text-[#985702] font-bold leading-none"
                            style="font-size: 10px"
                        >−</span>
                    </button>
                    <button
                        class="w-3 h-3 rounded-full bg-[#28c840] transition-all cursor-pointer group relative"
                        @click="$emit('maximize')"
                    >
                        <span
                            class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 text-[#006500] font-bold leading-none"
                            style="font-size: 8px"
                        >+</span>
                    </button>
                </div>
                <!-- Center title -->
                <div class="flex items-center justify-center gap-2 text-xs text-neutral-500 select-none">
                    <span class="text-neutral-400 font-medium">zsh</span>
                    <span class="text-neutral-700">·</span>
                    <span class="text-neutral-600">raffaelelongoelia.dev</span>
                </div>
                <!-- Time -->
                <div class="flex justify-end text-xs text-neutral-600 tabular-nums font-mono">
                    {{ time }}
                </div>
            </div>

            <!-- Content -->
            <div
                ref="scrollContainer"
                class="px-5 py-4 flex-1 overflow-y-auto terminal-scroll cursor-text"
                @click="$emit('focus')"
            >
                <slot />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
interface Props {
    time: string
    windowState: 'normal' | 'maximized' | 'minimized'
}

defineProps<Props>()

defineEmits<{
    close: []
    maximize: []
    minimize: []
    focus: []
}>()

const scrollContainer = ref<HTMLElement | null>(null)

const scrollToBottom = () => {
    if (scrollContainer.value) {
        scrollContainer.value.scrollTop = scrollContainer.value.scrollHeight
    }
}

defineExpose({ scrollToBottom })
</script>

<style scoped>
.terminal-scroll::-webkit-scrollbar {
  width: 6px;
}

.terminal-scroll::-webkit-scrollbar-track {
  background: transparent;
}

.terminal-scroll::-webkit-scrollbar-thumb {
  background: #30363d;
  border-radius: 3px;
}

.terminal-scroll::-webkit-scrollbar-thumb:hover {
  background: #484f58;
}
</style>
