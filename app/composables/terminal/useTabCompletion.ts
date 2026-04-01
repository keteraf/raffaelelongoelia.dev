import type { CommandContext, CommandDef } from './types'

export const useTabCompletion = (commands: Record<string, CommandDef>) => {
    const cycleIndex = ref(0)
    const candidates = ref<string[]>([])
    const originalParts = ref<string[]>([])
    const lastCompletedValue = ref('')

    const complete = (input: string, ctx: CommandContext): string => {
        const isCycling = input === lastCompletedValue.value && candidates.value.length > 0

        if (!isCycling) {
            const parts = input.split(/\s+/)
            originalParts.value = parts

            if (parts.length <= 1) {
                const partial = parts[0] ?? ''
                candidates.value = Object.keys(commands).filter(c => c.startsWith(partial))
            }
            else {
                const cmdDef = commands[parts[0] ?? '']
                const partial = parts[parts.length - 1] ?? ''
                candidates.value = (cmdDef?.argCompletions?.(ctx) ?? []).filter(c => c.startsWith(partial))
            }
            cycleIndex.value = 0
        }
        else {
            cycleIndex.value = (cycleIndex.value + 1) % candidates.value.length
        }

        if (candidates.value.length === 0) return input

        const chosen = candidates.value[cycleIndex.value]!
        const result = originalParts.value.length <= 1
            ? chosen
            : [...originalParts.value.slice(0, -1), chosen].join(' ')
        lastCompletedValue.value = result
        return result
    }

    const reset = () => {
        cycleIndex.value = 0
        candidates.value = []
        originalParts.value = []
        lastCompletedValue.value = ''
    }

    return { complete, reset }
}
