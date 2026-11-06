// Featured GitHub projects shown on the home page.
// Descriptions live in i18n under `classic.projects.items.<id>`.

export interface FeaturedProject {
    id: string
    url: string
    stack: string[]
    /** early-stage repository, shown with a "work in progress" badge */
    wip?: boolean
}

export const FEATURED_PROJECTS: FeaturedProject[] = [
    {
        id: 'laratooler',
        url: 'https://github.com/keteraf/laratooler',
        stack: ['PHP', 'Laravel', 'Larastan', 'Rector'],
    },
    {
        id: 'vilt-starter-kit',
        url: 'https://github.com/keteraf/vilt-starter-kit',
        stack: ['Laravel 12', 'Vue 3', 'Inertia', 'Tailwind 4', 'Pest'],
    },
    {
        id: 'pames',
        url: 'https://github.com/keteraf/pames',
        stack: ['Laravel 13', 'Livewire 4', 'Flux UI', 'Pest 4'],
        wip: true,
    },
    {
        id: 'ragtisan',
        url: 'https://github.com/keteraf/ragtisan',
        stack: ['Laravel 13', 'Inertia', 'Vue'],
        wip: true,
    },
    {
        id: 'get-done',
        url: 'https://github.com/keteraf/get-done',
        stack: ['Laravel 13', 'Inertia', 'Vue'],
        wip: true,
    },
]
