import type { HistoryEntry } from './types'

export const useHistory = () => {
    const displayHistory = ref<HistoryEntry[]>([])
    const cmdHistory = ref<string[]>([])
    const navIndex = ref(-1)
    const draft = ref('')

    const push = (entry: HistoryEntry) => {
        displayHistory.value.push(entry)
        if (entry.cmd) cmdHistory.value.push(entry.cmd)
        navIndex.value = -1
        draft.value = ''
    }

    const navigateUp = (currentInput: string): string => {
        if (cmdHistory.value.length === 0) return currentInput
        if (navIndex.value === -1) draft.value = currentInput
        navIndex.value = Math.min(navIndex.value + 1, cmdHistory.value.length - 1)
        return cmdHistory.value[cmdHistory.value.length - 1 - navIndex.value]!
    }

    const navigateDown = (): string => {
        if (navIndex.value <= 0) {
            navIndex.value = -1
            return draft.value
        }
        navIndex.value--
        return cmdHistory.value[cmdHistory.value.length - 1 - navIndex.value]!
    }

    const reset = () => {
        displayHistory.value = []
        cmdHistory.value = []
        navIndex.value = -1
        draft.value = ''
    }

    return {
        displayHistory: readonly(displayHistory),
        push,
        navigateUp,
        navigateDown,
        reset,
    }
}
