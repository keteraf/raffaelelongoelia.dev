import { COMMANDS } from './terminal/commands'
import type { CommandOutput, HistoryEntry } from './terminal/types'
import type { VirtualPath } from './terminal/virtualFs'
import { useGithubRepos } from './terminal/useGithubRepos'
import { useHistory } from './terminal/useHistory'
import { useTabCompletion } from './terminal/useTabCompletion'

export const useTerminal = () => {
    const { t, tm, rt, setLocale } = useI18n()
    const input = ref('')
    const inputEl = ref<HTMLInputElement | null>(null)
    const cwd = ref<VirtualPath>('~')
    const gitDirty = ref(false)
    const exitOk = ref(true)

    const { ghRepos, ghLoading, ghError, fetchGithubRepos } = useGithubRepos()
    const { displayHistory, push, navigateUp, navigateDown, reset: resetHistory } = useHistory()
    const { complete: tabComplete, reset: resetTab } = useTabCompletion(COMMANDS)

    const focusInput = () => inputEl.value?.focus()

    const makeCtx = (args: string[] = []) => ({
        args,
        cwd: cwd.value,
        t,
        tm,
        rt,
        setLocale,
        ghRepos,
        ghLoading,
        ghError,
    })

    const currentRprompt = (): string => {
        const d = new Date()
        const hh = String(d.getHours()).padStart(2, '0')
        const mm = String(d.getMinutes()).padStart(2, '0')
        return `[${hh}:${mm}]`
    }

    const makeEntry = (cmd: string, output: CommandOutput, ok: boolean): HistoryEntry => ({
        cmd,
        cwd: cwd.value,
        rprompt: currentRprompt(),
        gitDirty: gitDirty.value,
        ok,
        output,
    })

    const runCommand = (command: string) => {
        const parts = command.trim().split(/\s+/)
        const base = parts[0] ?? ''
        const args = parts.slice(1)
        const cmdDef = COMMANDS[base]
        if (!cmdDef) {
            return {
                ok: false,
                output: { type: 'raw' as const, text: t('terminal.errors.commandNotFound', { command: base }) },
            }
        }
        return cmdDef.handler(makeCtx(args))
    }

    const handleEnter = () => {
        const command = input.value.trim()
        if (!command) return
        resetTab()

        if (command === 'clear') {
            clearScreen()
            input.value = ''
            return
        }

        const entry = makeEntry(command, { type: 'raw', text: '' }, true) // cwd snapshot before navigation
        const { output, ok, nextCwd } = runCommand(command)
        if (nextCwd) cwd.value = nextCwd as VirtualPath

        push({ ...entry, output, ok })
        exitOk.value = ok
        input.value = ''
        nextTick(() => focusInput())
    }

    const handleTab = () => {
        input.value = tabComplete(input.value, makeCtx())
    }

    const navigateHistoryUp = () => {
        input.value = navigateUp(input.value)
        resetTab()
    }

    const navigateHistoryDown = () => {
        input.value = navigateDown()
        resetTab()
    }

    const clearScreen = () => {
        resetHistory()
        exitOk.value = true
    }

    const initializeTerminal = () => {
        gitDirty.value = Number(new Date().getMinutes()) % 2 === 1
        push(makeEntry('', {
            type: 'lines',
            lines: [t('hero.welcome'), t('hero.hint', { command: 'help' })],
        }, true))
        fetchGithubRepos()
        nextTick(() => focusInput())
    }

    const resetTerminalState = () => {
        input.value = ''
        resetHistory()
        cwd.value = '~'
        exitOk.value = true
        initializeTerminal()
    }

    return {
        input,
        inputEl,
        history: displayHistory,
        cwd: readonly(cwd),
        gitDirty: readonly(gitDirty),
        exitOk: readonly(exitOk),
        focusInput,
        handleEnter,
        handleTab,
        navigateHistoryUp,
        navigateHistoryDown,
        clearScreen,
        initializeTerminal,
        resetTerminalState,
        fetchGithubRepos,
    }
}
