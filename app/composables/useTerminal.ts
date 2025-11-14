type CommandOutput = { type: string, lines?: string[], text?: string, items?: string[], github?: string, linkedin?: string }
type HistoryEntry = { cmd: string, cwd: string, rprompt: string, gitDirty: boolean, ok: boolean, output: CommandOutput }
type CommandResult = { ok: boolean, output: CommandOutput, nextCwd?: string }

export const useTerminal = () => {
    const { t, tm, rt, setLocale } = useI18n()
    const input = ref('')
    const inputEl = ref<HTMLInputElement | null>(null)
    const history = ref<HistoryEntry[]>([])
    const cwd = ref('~')
    const gitDirty = ref(false)
    const exitOk = ref(true)

    const focusInput = () => {
        if (inputEl.value) inputEl.value.focus()
    }

    const pushHistory = (cmd: string, output: CommandOutput, ok = true) => {
        const { rprompt } = useTime()
        history.value.push({
            cmd,
            cwd: cwd.value,
            rprompt: rprompt.value,
            gitDirty: gitDirty.value,
            ok,
            output,
        })
    }

    const runCommand = (command: string) => {
        const parts = command.split(/\s+/)
        const base = parts[0] || ''
        const args = parts.slice(1)

        const lines = (arr: string[]) => ({ type: 'lines', lines: arr })
        const raw = (text: string) => ({ type: 'raw', text })
        const grid = (items: string[]) => ({ type: 'grid', items })
        const links = (github: string, linkedin: string) => ({ type: 'links', github, linkedin })

        const ROOT_ITEMS = ['projects/', 'about.txt', 'contact']
        const projects = ['e-commerce-platform/', 'task-management-app/', 'api-gateway/', 'cms-system/']

        const commands: Record<string, () => CommandResult> = {
            help: () => ({ ok: true, output: lines([
                t('terminal.help.title'),
                `  whoami            → ${t('terminal.help.whoami')}`,
                `  ls                → ${t('terminal.help.ls')}`,
                `  cd [~|projects]   → ${t('terminal.help.cd')}`,
                `  pwd               → ${t('terminal.help.pwd')}`,
                `  cat about.txt     → ${t('terminal.help.cat')}`,
                `  contact --info    → ${t('terminal.help.contact')}`,
                `  projects          → ${t('terminal.help.projects')}`,
                `  echo <text>       → ${t('terminal.help.echo')}`,
                `  date              → ${t('terminal.help.date')}`,
                `  clear             → ${t('terminal.help.clear')}`,
                `  lang [en|it]      → ${t('terminal.help.lang')}`,
            ]) }),
            whoami: () => ({ ok: true, output: raw(t('terminal.whoami')) }),
            pwd: () => ({ ok: true, output: raw(cwd.value) }),
            date: () => ({ ok: true, output: raw(new Date().toString()) }),
            echo: () => ({ ok: true, output: raw(args.join(' ')) }),
            cd: () => {
                const to = args[0] || '~'
                if (to === '~' || to === '/') return { ok: true, output: raw(''), nextCwd: '~' }
                if (to === 'projects' || to === '~/projects' || to === 'projects/') return { ok: true, output: raw(''), nextCwd: '~/projects' }
                return { ok: false, output: raw(t('terminal.errors.noSuchDir', { path: to })) }
            },
            ls: () => cwd.value === '~/projects'
                ? { ok: true, output: grid(projects) }
                : { ok: true, output: lines(ROOT_ITEMS) },
            projects: () => ({ ok: true, output: grid(projects) }),
            cat: () => {
                const target = args[0]
                if (!target) return { ok: false, output: raw(t('terminal.errors.noSuchFile', { file: '' })) }
                if (target === 'about.txt' && cwd.value === '~') {
                    const skills = tm('terminal.about.skills') as string[]
                    return { ok: true, output: lines([
                        t('terminal.about.intro'),
                        ...skills.map(s => `• ${rt(s)}`),
                    ]) }
                }
                return { ok: false, output: raw(t('terminal.errors.noSuchFile', { file: target })) }
            },
            contact: () => args[0] === '--info'
                ? { ok: true, output: links('https://github.com/keteraf', 'https://linkedin.com/in/raffaele-longo-elia') }
                : { ok: false, output: raw(t('terminal.errors.unsupportedOption')) },
            lang: () => {
                const lang = args[0]
                if (lang === 'en' || lang === 'it') {
                    setLocale(lang).then()
                    return { ok: true, output: raw(t('terminal.langChanged')) }
                }
                return { ok: false, output: raw(t('terminal.errors.invalidLang', { lang: lang || '' })) }
            },
        }

        return commands[base]?.() ?? { ok: false, output: raw(t('terminal.errors.commandNotFound', { command: base })), nextCwd: undefined }
    }

    const handleEnter = () => {
        const command = input.value.trim()
        if (!command) return

        if (command === 'clear') {
            history.value = []
            input.value = ''
            exitOk.value = true
            return
        }

        const { output, ok, nextCwd } = runCommand(command)
        if (nextCwd) cwd.value = nextCwd

        pushHistory(command, output, ok)
        exitOk.value = Boolean(ok)

        input.value = ''
        nextTick(() => focusInput()).then()
    }

    const initializeTerminal = () => {
        gitDirty.value = Number(new Date().getMinutes()) % 2 === 1
        nextTick(() => focusInput()).then()
    }

    const resetTerminalState = () => {
        input.value = ''
        history.value = []
        cwd.value = '~'
        exitOk.value = true
        initializeTerminal()
    }

    return {
        input,
        inputEl,
        history: readonly(history),
        cwd: readonly(cwd),
        gitDirty: readonly(gitDirty),
        exitOk: readonly(exitOk),
        focusInput,
        handleEnter,
        initializeTerminal,
        resetTerminalState,
    }
}
