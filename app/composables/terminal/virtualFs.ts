export type VirtualPath = '~' | '~/projects'

export const ROOT_ITEMS = ['projects/', 'about.txt'] as const

export function resolvePath(current: VirtualPath, target: string): VirtualPath | null {
    if (target === '~' || target === '/') return '~'
    if (target === '..') return current === '~/projects' ? '~' : null
    if (target === 'projects' || target === '~/projects' || target === 'projects/') return '~/projects'
    return null
}

export function getFiles(cwd: VirtualPath): string[] {
    return cwd === '~' ? ['about.txt'] : []
}

export function cdCompletions(cwd: VirtualPath): string[] {
    return cwd === '~/projects' ? ['..', '~'] : ['projects']
}
