<template>
    <div
        :class="[
            'transition-all duration-300',
            windowState === 'maximized' ? 'w-full h-screen' : 'w-full max-w-4xl h-[600px]',
            windowState === 'minimized' ? 'scale-0 opacity-0' : 'scale-100 opacity-100',
        ]"
    >
        <div class="rounded-xl border border-neutral-800/80 shadow-2xl overflow-hidden bg-[#0c0c0c] h-full flex flex-col">
            <div class="flex items-center justify-between px-4 py-2 border-b border-neutral-800/80 bg-[#0e0e0e]">
                <div class="flex items-center gap-2">
                    <button
                        class="w-3 h-3 rounded-full bg-[#ff5f56] hover:bg-[#ff1a1a] hover:scale-110 transition-all cursor-pointer"
                        @click="$emit('close')"
                    />
                    <button
                        class="w-3 h-3 rounded-full bg-[#ffbd2e] hover:bg-[#ff8c00] hover:scale-110 transition-all cursor-pointer"
                        @click="$emit('maximize')"
                    />
                    <button
                        class="w-3 h-3 rounded-full bg-[#27c93f] hover:bg-[#00ff00] hover:scale-110 transition-all cursor-pointer"
                        @click="$emit('minimize')"
                    />
                    <span class="ml-3 text-xs text-neutral-400">raffaelelongoelia.dev</span>
                </div>
                <div class="text-xs text-neutral-500">
                    {{ time }}
                </div>
            </div>
            <div
                ref="scrollContainer"
                class="p-6 bg-[radial-gradient(ellipse_at_top,_rgba(255,255,255,0.04),transparent_60%)] flex-1 overflow-y-auto terminal-scroll cursor-text"
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
  width: 8px;
}

.terminal-scroll::-webkit-scrollbar-track {
  background: #1a1a1a;
}

.terminal-scroll::-webkit-scrollbar-thumb {
  background: #404040;
  border-radius: 4px;
}

.terminal-scroll::-webkit-scrollbar-thumb:hover {
  background: #525252;
}
</style>
