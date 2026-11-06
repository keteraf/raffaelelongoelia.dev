// Career timeline rendered as a `git log --graph`.
// Text (role, location, bullet points) lives in i18n under `experience.items.<id>`;
// this file only holds structure: dates, company names, stack and graph layout.

export interface ExperienceEntry {
    id: string
    company: string
    /** 'YYYY' or 'YYYY-MM' */
    start: string
    /** 'YYYY' or 'YYYY-MM'; null = present */
    end: string | null
    stack?: string[]
    /** git refs shown as pills next to the commit hash */
    refs?: string[]
    /** entry has no `points` array in i18n */
    noPoints?: boolean
}

export type GraphRow
    = | {
        type: 'commit'
        entry: ExperienceEntry
        /** lane this commit sits on */
        lane: number
        /** lanes whose line passes through this row */
        lanes: number[]
        /** first commit: own lane starts at the dot */
        head?: boolean
        /** dashed line + hollow dot (e.g. a career break) */
        dashed?: boolean
    }
    | {
        type: 'edge'
        /** [fromLane at top, toLane at bottom] */
        paths: [number, number][]
        /** i18n key for a muted label next to the curve */
        label?: string
    }
    | {
        type: 'root'
        lane: number
        label: string
    }

export const LANE_COUNT = 2

const bene: ExperienceEntry = {
    id: 'bene',
    company: 'Bene Assicurazioni',
    start: '2024-09',
    end: null,
    stack: ['Laravel 12', 'MySQL 8', 'Vue 3', 'Redis', 'PHPUnit / Pest', 'TDD', 'AWS', 'CI/CD'],
    refs: ['HEAD -> main'],
}

const si2001: ExperienceEntry = {
    id: 'si2001',
    company: 'Si2001 SpA',
    start: '2017-10',
    end: '2024-09',
    noPoints: true,
}

const vodafone: ExperienceEntry = {
    id: 'vodafone',
    company: 'Vodafone Italia (via BIP)',
    start: '2017',
    end: '2024',
    stack: ['PHP 8', 'Laravel', 'PostgreSQL', 'Vue 3', 'TailwindCSS', 'Microservices', 'Python'],
    refs: ['si2001/vodafone'],
}

const exage: ExperienceEntry = {
    id: 'exage',
    company: 'Exage – UniSalute',
    start: '2017',
    end: '2017',
    refs: ['si2001/unisalute'],
}

const si2001Internal: ExperienceEntry = {
    id: 'si2001Internal',
    company: 'Si2001 SpA',
    start: '2017-10',
    end: '2017-10',
    stack: ['Java'],
}

const interteck: ExperienceEntry = {
    id: 'interteck',
    company: 'Interteck Srls',
    start: '2016-05',
    end: '2017-08',
    stack: ['PHP 7', 'MySQL', 'Bootstrap', 'C#', 'Visual Basic'],
}

const careerBreak: ExperienceEntry = {
    id: 'break',
    company: 'Australia',
    start: '2015-02',
    end: '2016-05',
}

const artebianca: ExperienceEntry = {
    id: 'artebianca',
    company: 'Artebianca Srl',
    start: '2013-03',
    end: '2015-02',
    stack: ['PHP 5', 'MySQL', 'WordPress', 'Java'],
}

const provy: ExperienceEntry = {
    id: 'provy',
    company: 'Provy Srl',
    start: '2008-05',
    end: '2013-02',
    stack: ['PHP', 'MySQL', 'jQuery', 'Java', 'Asterisk PBX', 'Apache', 'Linux'],
}

export const EXPERIENCE_GRAPH: GraphRow[] = [
    { type: 'commit', entry: bene, lane: 0, lanes: [0], head: true },
    { type: 'commit', entry: si2001, lane: 0, lanes: [0] },
    { type: 'edge', paths: [[0, 0], [0, 1]], label: 'experience.mergeSi2001' },
    { type: 'commit', entry: vodafone, lane: 1, lanes: [0, 1] },
    { type: 'commit', entry: exage, lane: 1, lanes: [0, 1] },
    { type: 'edge', paths: [[0, 0], [1, 0]] },
    { type: 'commit', entry: si2001Internal, lane: 0, lanes: [0] },
    { type: 'commit', entry: interteck, lane: 0, lanes: [0] },
    { type: 'commit', entry: careerBreak, lane: 0, lanes: [0], dashed: true },
    { type: 'commit', entry: artebianca, lane: 0, lanes: [0] },
    { type: 'commit', entry: provy, lane: 0, lanes: [0] },
    { type: 'root', lane: 0, label: 'experience.root' },
]

/** Deterministic fake short SHA for flavour. */
export const shortSha = (seed: string): string => {
    let h = 0x811C9DC5
    for (const ch of seed) {
        h ^= ch.charCodeAt(0)
        h = Math.imul(h, 0x01000193) >>> 0
    }
    return h.toString(16).padStart(8, '0').slice(0, 7)
}

const formatPoint = (value: string, locale: string): string => {
    const [y, m] = value.split('-')
    if (!m) return y ?? value
    return new Intl.DateTimeFormat(locale, { month: 'short', year: 'numeric', timeZone: 'UTC' })
        .format(new Date(Date.UTC(Number(y), Number(m) - 1, 1)))
}

export const formatPeriod = (entry: ExperienceEntry, locale: string, presentLabel: string): string => {
    const start = formatPoint(entry.start, locale)
    const end = entry.end === null ? presentLabel : formatPoint(entry.end, locale)
    return start === end ? start : `${start} – ${end}`
}
