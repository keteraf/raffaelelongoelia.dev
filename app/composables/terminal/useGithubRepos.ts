import type { GhRepo } from './types'

export const useGithubRepos = () => {
    const ghRepos = ref<GhRepo[] | null>(null)
    const ghLoading = ref(false)
    const ghError = ref<string | null>(null)

    const fetchGithubRepos = async () => {
        try {
            ghLoading.value = true
            ghError.value = null
            const data: { name?: unknown, html_url?: unknown }[] = await $fetch(
                'https://api.github.com/users/keteraf/repos?per_page=100&type=public&sort=updated',
                { headers: { Accept: 'application/vnd.github+json' } },
            )
            ghRepos.value = (data || [])
                .map(r => ({ name: typeof r?.name === 'string' ? r.name : undefined, url: typeof r?.html_url === 'string' ? r.html_url : undefined }))
                .filter((r): r is { name: string, url: string } => Boolean(r.name) && Boolean(r.url))
                .map(r => ({ label: `${r.name}/`, href: r.url }))
                .sort((a, b) => a.label.localeCompare(b.label))
        }
        catch {
            ghError.value = 'fetch-failed'
            ghRepos.value = []
        }
        finally {
            ghLoading.value = false
        }
    }

    return { ghRepos, ghLoading, ghError, fetchGithubRepos }
}
