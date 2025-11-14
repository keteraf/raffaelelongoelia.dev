<template>
    <div class="min-h-screen bg-[#0a0a0a] text-gray-200 font-mono flex items-center justify-center p-4">
        <HeroSection v-if="windowState === 'closed'">
            <NewTerminalButton @click="openTerminal" />
        </HeroSection>

        <TerminalWindow
            v-else
            ref="terminalWindow"
            :time="time"
            :window-state="windowState"
            @close="closeTerminal"
            @maximize="toggleMaximize"
            @minimize="minimizeTerminal"
            @focus="focusInput"
        >
            <div class="space-y-3">
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
                    margin-class="mt-2"
                    @click="focusInput"
                >
                    <input
                        ref="inputEl"
                        v-model="input"
                        class="ml-2 bg-transparent border-none outline-none text-neutral-200 caret-emerald-400 w-[60vw] md:w-[40rem] text-base font-mono"
                        spellcheck="false"
                        autocomplete="off"
                        autocapitalize="off"
                        autocorrect="off"
                        @keydown.enter.prevent="handleEnter"
                    >
                </TerminalPrompt>
            </div>
        </TerminalWindow>

        <div
            v-if="windowState === 'minimized'"
            class="fixed bottom-4 left-4"
        >
            <button
                class="px-4 py-2 bg-[#0c0c0c] border border-neutral-800/80 rounded-lg hover:bg-[#0e0e0e] transition-colors text-xs text-neutral-400"
                @click="restoreTerminal"
            >
                raffaelelongoelia.dev
            </button>
        </div>
    </div>
</template>

<script setup>
const { time, rprompt, startTimer, stopTimer } = useTime()
const { input, inputEl, history, cwd, gitDirty, exitOk, focusInput, handleEnter, initializeTerminal, resetTerminalState } = useTerminal()
const terminalWindow = ref()
const windowState = ref('closed')

const closeTerminal = () => {
    windowState.value = 'closed'
    resetTerminalState()
}

const openTerminal = () => {
    windowState.value = 'normal'
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

onMounted(() => {
    startTimer()
    initializeTerminal()
})

onUnmounted(() => {
    stopTimer()
})
</script>
