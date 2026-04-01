<template>
    <div class="min-h-screen bg-[#090d12] text-gray-200 font-mono flex items-center justify-center p-4">
        <HeroSection v-if="!classicMode && windowState !== 'maximized'">
            <div class="flex gap-4">
                <ClassicModeButton @click="openClassic" />
                <NewTerminalButton
                    v-if="windowState === 'closed'"
                    @click="openTerminal"
                />
            </div>
        </HeroSection>

        <ClassicView
            v-if="classicMode"
            @back="closeClassic"
        />

        <div
            v-if="windowState !== 'closed'"
            :class="[
                'fixed inset-0 flex items-center justify-center p-4',
                windowState === 'minimized' ? 'pointer-events-none' : '',
            ]"
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
                            class="bg-transparent border-none outline-none text-neutral-200 caret-emerald-400 w-[60vw] md:w-160 text-sm font-mono"
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
            class="fixed bottom-4 left-4"
        >
            <button
                class="px-4 py-2 bg-[#161b22] border border-white/[0.07] rounded-lg hover:bg-[#1c2128] transition-colors text-xs text-neutral-400 font-mono"
                @click="restoreTerminal"
            >
                raffaelelongoelia.dev
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
const { time, rprompt, startTimer, stopTimer } = useTime()
const {
    input, inputEl, history, cwd, gitDirty, exitOk, focusInput,
    handleEnter, handleTab, navigateHistoryUp, navigateHistoryDown,
    clearScreen, initializeTerminal, resetTerminalState,
} = useTerminal()
const terminalWindow = ref()
const windowState = ref<'closed' | 'normal' | 'maximized' | 'minimized'>('closed')
const classicMode = ref(false)

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
}

const openClassic = () => {
    classicMode.value = true
}

const closeClassic = () => {
    classicMode.value = false
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
