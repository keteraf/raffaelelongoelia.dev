import type { Ref } from 'vue'

export type GhRepo = { label: string, href: string }
export type GridItem = string | GhRepo

export type OutputLines = { type: 'lines', lines: string[] }
export type OutputRaw = { type: 'raw', text: string }
export type OutputGrid = { type: 'grid', items: GridItem[] }
export type OutputLinks = { type: 'links', github: string, linkedin: string }
export type CommandOutput = OutputLines | OutputRaw | OutputGrid | OutputLinks

export interface CommandResult {
    ok: boolean
    output: CommandOutput
    nextCwd?: string
}

export interface HistoryEntry {
    cmd: string
    cwd: string
    rprompt: string
    gitDirty: boolean
    ok: boolean
    output: CommandOutput
}

export interface CommandContext {
    args: string[]
    cwd: string
    t: (key: string, params?: Record<string, unknown>) => string
    tm: (key: string) => unknown
    rt: (val: unknown) => string
    setLocale: (locale: string) => Promise<void>
    ghRepos: Ref<GhRepo[] | null>
    ghLoading: Ref<boolean>
    ghError: Ref<string | null>
}

export type CommandHandler = (ctx: CommandContext) => CommandResult

export interface CommandDef {
    handler: CommandHandler
    argCompletions?: (ctx: CommandContext) => string[]
}
