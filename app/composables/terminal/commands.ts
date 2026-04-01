import type { CommandContext, CommandDef, GridItem } from './types'
import { ROOT_ITEMS, cdCompletions, getFiles, resolvePath } from './virtualFs'
import type { VirtualPath } from './virtualFs'

const lines = (arr: string[]) => ({ type: 'lines' as const, lines: arr })
const raw = (text: string) => ({ type: 'raw' as const, text })
const grid = (items: GridItem[]) => ({ type: 'grid' as const, items })
const links = (github: string, linkedin: string) => ({ type: 'links' as const, github, linkedin })

const projectsList = ({ ghLoading, ghError, ghRepos, t }: CommandContext): GridItem[] => {
    if (ghLoading.value) return [t('terminal.projects.loading')]
    if (ghError.value) return [t('terminal.errors.githubFetchFailed')]
    if (!ghRepos.value) return [t('terminal.projects.loading')]
    if (ghRepos.value.length === 0) return [t('terminal.projects.empty')]
    return ghRepos.value
}

export const COMMANDS: Record<string, CommandDef> = {
    help: {
        handler: ({ t }) => ({
            ok: true,
            output: lines([
                t('terminal.help.title'),
                `  whoami             → ${t('terminal.help.whoami')}`,
                `  ls                 → ${t('terminal.help.ls')}`,
                `  cd [~|..|projects] → ${t('terminal.help.cd')}`,
                `  pwd                → ${t('terminal.help.pwd')}`,
                `  cat about.txt      → ${t('terminal.help.cat')}`,
                `  contact --info     → ${t('terminal.help.contact')}`,
                `  projects           → ${t('terminal.help.projects')}`,
                `  echo <text>        → ${t('terminal.help.echo')}`,
                `  date               → ${t('terminal.help.date')}`,
                `  clear              → ${t('terminal.help.clear')}`,
                `  lang [en|it]       → ${t('terminal.help.lang')}`,
            ]),
        }),
    },
    whoami: {
        handler: ({ t }) => ({ ok: true, output: raw(t('terminal.whoami')) }),
    },
    pwd: {
        handler: ({ cwd }) => ({ ok: true, output: raw(cwd) }),
    },
    date: {
        handler: () => ({ ok: true, output: raw(new Date().toString()) }),
    },
    echo: {
        handler: ({ args }) => ({ ok: true, output: raw(args.join(' ')) }),
    },
    clear: {
        // Intercepted in handleEnter before runCommand; entry kept here for tab completion
        handler: () => ({ ok: true, output: raw('') }),
    },
    cd: {
        handler: ({ args, cwd, t, ghRepos }) => {
            const to = args[0] || '~'
            const next = resolvePath(cwd as VirtualPath, to)
            if (next !== null) return { ok: true, output: raw(''), nextCwd: next }
            if (to === '..') return { ok: true, output: raw(''), nextCwd: cwd } // already at root, stay silently
            if (cwd === '~/projects' && ghRepos.value) {
                const repo = ghRepos.value.find(r => r.label === to)
                if (repo) return { ok: true, output: raw(t('terminal.cd.openingRepo', { repo: to })), openUrl: repo.href }
            }
            return { ok: false, output: raw(t('terminal.errors.noSuchDir', { path: to })) }
        },
        argCompletions: ({ cwd, ghRepos }) => {
            const base = cdCompletions(cwd as VirtualPath)
            if (cwd === '~/projects' && ghRepos.value) {
                return [...base, ...ghRepos.value.map(r => r.label)]
            }
            return base
        },
    },
    ls: {
        handler: ctx => ctx.cwd === '~/projects'
            ? { ok: true, output: grid(projectsList(ctx)) }
            : { ok: true, output: lines([...ROOT_ITEMS]) },
    },
    projects: {
        handler: ctx => ({ ok: true, output: grid(projectsList(ctx)) }),
    },
    cat: {
        handler: ({ args, cwd, t, tm, rt }) => {
            const target = args[0]
            if (!target) return { ok: false, output: raw(t('terminal.errors.noSuchFile', { file: '' })) }
            if (target === 'about.txt' && cwd === '~') {
                const skills = tm('terminal.about.skills') as string[]
                return {
                    ok: true,
                    output: lines([t('terminal.about.intro'), ...skills.map(s => `• ${rt(s)}`)]),
                }
            }
            return { ok: false, output: raw(t('terminal.errors.noSuchFile', { file: target })) }
        },
        argCompletions: ({ cwd }) => getFiles(cwd as VirtualPath),
    },
    contact: {
        handler: ({ args, t }) => args[0] === '--info'
            ? { ok: true, output: links('https://github.com/keteraf', 'https://linkedin.com/in/raffaele-longo-elia') }
            : { ok: false, output: raw(t('terminal.errors.unsupportedOption')) },
        argCompletions: () => ['--info'],
    },
    lang: {
        handler: ({ args, t, setLocale }) => {
            const lang = args[0]
            if (lang === 'en' || lang === 'it') {
                setLocale(lang).then()
                return { ok: true, output: raw(t('terminal.langChanged')) }
            }
            return { ok: false, output: raw(t('terminal.errors.invalidLang', { lang: lang || '' })) }
        },
        argCompletions: () => ['en', 'it'],
    },
}
