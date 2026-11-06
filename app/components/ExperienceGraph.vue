<template>
    <div class="relative">
        <div class="relative">
            <ol
                :id="listId"
                class="relative"
                :class="compact ? 'font-mono' : ''"
            >
                <template
                    v-for="(row, i) in rows"
                    :key="i"
                >
                    <!-- Commit -->
                    <li
                        v-if="row.type === 'commit'"
                        v-show="isVisible(i)"
                        class="flex"
                    >
                        <div
                            class="relative shrink-0"
                            :style="{ width: `${graphWidth}px` }"
                            aria-hidden="true"
                        >
                            <span
                                v-for="l in row.lanes"
                                :key="l"
                                class="absolute w-0 border-l-2"
                                :style="laneLineStyle(row, l)"
                            />
                            <span
                                class="absolute rounded-full border-2"
                                :class="row.head ? 'shadow-[0_0_0_4px_color-mix(in_srgb,var(--color-site-accent)_18%,transparent)]' : ''"
                                :style="dotStyle(row.lane, row.dashed)"
                            />
                        </div>

                        <div
                            class="flex-1 min-w-0"
                            :class="compact ? 'pb-5' : 'pb-10'"
                        >
                            <div
                                class="flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-xs"
                                :style="{ minHeight: `${dotY * 2}px` }"
                            >
                                <span class="text-amber-400/90">{{ shortSha(row.entry.id) }}</span>
                                <span
                                    v-for="ref in row.entry.refs"
                                    :key="ref"
                                    class="px-1.5 py-px rounded border leading-4"
                                    :style="refStyle(ref, row.lane)"
                                >{{ ref }}</span>
                                <span class="text-site-muted">{{ period(row.entry) }}</span>
                            </div>

                            <h3
                                :class="compact
                                    ? 'text-sm text-neutral-100 font-semibold'
                                    : 'mt-1 font-display font-extrabold tracking-tight text-xl md:text-2xl'"
                            >
                                {{ t(`experience.items.${row.entry.id}.role`) }}
                                <span
                                    class="font-normal"
                                    :style="{ color: laneColor(row.lane) }"
                                >@ {{ row.entry.company }}</span>
                            </h3>
                            <p
                                class="text-site-muted"
                                :class="compact ? 'text-xs' : 'mt-0.5 text-sm'"
                            >
                                {{ t(`experience.items.${row.entry.id}.location`) }}
                            </p>

                            <ul
                                v-if="!row.entry.noPoints"
                                class="space-y-1.5 text-neutral-300/90"
                                :class="compact ? 'mt-1.5 text-xs leading-5' : 'mt-4 text-[15px] leading-relaxed max-w-3xl'"
                            >
                                <li
                                    v-for="(point, p) in points(row.entry.id)"
                                    :key="p"
                                    class="flex gap-2"
                                >
                                    <span
                                        class="select-none shrink-0"
                                        :style="{ color: laneColor(row.lane) }"
                                    >+</span>
                                    <span>{{ point }}</span>
                                </li>
                            </ul>

                            <div
                                v-if="row.entry.stack?.length"
                                class="flex flex-wrap gap-1.5"
                                :class="compact ? 'mt-2' : 'mt-4'"
                            >
                                <span
                                    v-for="tech in row.entry.stack"
                                    :key="tech"
                                    class="font-mono text-[11px] px-2 py-0.5 rounded border border-site-border bg-site-raised/60 text-neutral-300"
                                >{{ tech }}</span>
                            </div>
                        </div>
                    </li>

                    <!-- Fork / merge connector -->
                    <li
                        v-else-if="row.type === 'edge'"
                        v-show="isVisible(i)"
                        class="flex items-center"
                        aria-hidden="true"
                    >
                        <svg
                            class="shrink-0 block"
                            :width="graphWidth"
                            :height="edgeHeight"
                            :viewBox="`0 0 ${graphWidth} ${edgeHeight}`"
                            fill="none"
                        >
                            <path
                                v-for="([from, to], p) in row.paths"
                                :key="p"
                                :d="edgePath(from, to)"
                                :stroke="laneColor(Math.max(from, to))"
                                stroke-width="2"
                                stroke-linecap="round"
                            />
                        </svg>
                        <span
                            v-if="row.label"
                            class="font-mono text-xs text-neutral-500 truncate"
                        >{{ t(row.label) }}</span>
                    </li>

                    <!-- Root commit -->
                    <li
                        v-else
                        v-show="isVisible(i)"
                        class="flex"
                    >
                        <div
                            class="relative shrink-0"
                            :style="{ width: `${graphWidth}px`, height: `${dotY * 2}px` }"
                            aria-hidden="true"
                        >
                            <span
                                class="absolute w-0 border-l-2"
                                :style="{ left: `${laneX(row.lane) - 1}px`, top: 0, height: `${dotY}px`, borderColor: laneColor(row.lane) }"
                            />
                            <span
                                class="absolute rounded-full border-2"
                                :style="dotStyle(row.lane, true, dotSize - 4)"
                            />
                        </div>
                        <span
                            class="font-mono text-xs text-neutral-500 self-center"
                        >{{ t(row.label) }}</span>
                    </li>
                </template>
            </ol>

            <!-- Fade-out over the truncated lanes -->
            <div
                v-if="collapsible && !expanded"
                class="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-linear-to-t from-site-bg to-transparent"
                aria-hidden="true"
            />
        </div>

        <!-- Sticky so it stays reachable while scrolling the full history -->
        <div
            v-if="collapsible"
            class="sticky bottom-4 z-10 flex justify-center pt-4"
        >
            <button
                ref="toggleBtn"
                type="button"
                class="group flex items-center gap-2 px-5 py-2.5 rounded-lg border border-site-accent/40 bg-site-surface/90 backdrop-blur hover:bg-site-raised hover:border-site-accent text-sm font-mono shadow-lg shadow-black/30 transition-colors"
                :aria-expanded="expanded"
                :aria-controls="listId"
                @click="toggle"
            >
                <span
                    class="text-site-accent font-bold select-none transition-transform"
                    :class="expanded ? '-rotate-90' : 'rotate-90'"
                >❯</span>
                {{ expanded ? t('experience.showLess') : t('experience.showMore', { count: hiddenCommits }) }}
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { EXPERIENCE_GRAPH, LANE_COUNT, formatPeriod, shortSha } from '~/data/experience'
import type { ExperienceEntry, GraphRow } from '~/data/experience'

interface Props {
    /** denser variant for the terminal */
    compact?: boolean
    /** show only the most recent commits until the user expands */
    collapsible?: boolean
}

const props = withDefaults(defineProps<Props>(), { compact: false, collapsible: false })

const { t, tm, rt, locale } = useI18n()

const rows = EXPERIENCE_GRAPH

// Collapsed view: everything up to and including the Nth commit
const PREVIEW_COMMITS = 3
const commitIndexes = rows.flatMap((row, i) => (row.type === 'commit' ? [i] : []))
const cutIndex = commitIndexes[PREVIEW_COMMITS - 1] ?? rows.length - 1
const hiddenCommits = Math.max(commitIndexes.length - PREVIEW_COMMITS, 0)

const listId = useId()
const expanded = ref(false)
const toggleBtn = ref<HTMLButtonElement | null>(null)

const isVisible = (i: number) => !props.collapsible || expanded.value || i <= cutIndex

const toggle = async () => {
    expanded.value = !expanded.value
    if (expanded.value) return
    // Collapsing from deep in the list: bring the button back into view
    await nextTick()
    toggleBtn.value?.scrollIntoView({ block: 'nearest', behavior: 'smooth' })
}

// CSS variables (see assets/tailwind.css) so the palette can be swapped in one place
const LANE_COLORS = ['var(--color-site-accent)', 'var(--color-site-accent-2)']
const MUTED = '#71717a'

const laneGap = computed(() => (props.compact ? 16 : 22))
const pad = computed(() => (props.compact ? 6 : 10))
const dotSize = computed(() => (props.compact ? 10 : 14))
const dotY = computed(() => (props.compact ? 10 : 12))
const edgeHeight = computed(() => (props.compact ? 22 : 30))
const graphWidth = computed(() => pad.value * 2 + (LANE_COUNT - 1) * laneGap.value + dotSize.value + (props.compact ? 6 : 14))

const laneX = (lane: number) => pad.value + dotSize.value / 2 + lane * laneGap.value
const laneColor = (lane: number) => LANE_COLORS[lane] ?? MUTED

type CommitRow = Extract<GraphRow, { type: 'commit' }>

const laneLineStyle = (row: CommitRow, lane: number) => {
    const own = lane === row.lane
    return {
        left: `${laneX(lane) - 1}px`,
        top: row.head && own ? `${dotY.value}px` : '0',
        bottom: '0',
        borderColor: row.dashed && own ? MUTED : laneColor(lane),
        borderStyle: row.dashed && own ? 'dashed' : 'solid',
    }
}

const dotStyle = (lane: number, hollow = false, size = dotSize.value) => ({
    width: `${size}px`,
    height: `${size}px`,
    left: `${laneX(lane) - size / 2}px`,
    top: `${dotY.value - size / 2}px`,
    borderColor: hollow ? MUTED : laneColor(lane),
    background: hollow ? 'var(--color-site-bg, #18181b)' : laneColor(lane),
})

const refStyle = (ref: string, lane: number) => {
    const color = ref.startsWith('HEAD') ? '#34d399' : laneColor(lane)
    return {
        color,
        borderColor: `color-mix(in srgb, ${color} 33%, transparent)`,
        background: `color-mix(in srgb, ${color} 8%, transparent)`,
    }
}

const edgePath = (from: number, to: number) => {
    const x1 = laneX(from)
    const x2 = laneX(to)
    const h = edgeHeight.value
    if (x1 === x2) return `M ${x1} 0 L ${x2} ${h}`
    return `M ${x1} 0 C ${x1} ${h * 0.6}, ${x2} ${h * 0.4}, ${x2} ${h}`
}

const period = (entry: ExperienceEntry) => formatPeriod(entry, locale.value, t('experience.present'))

const points = (id: string) => (tm(`experience.items.${id}.points`) as unknown[]).map(p => rt(p as string))
</script>
