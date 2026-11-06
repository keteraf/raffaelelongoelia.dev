<template>
    <div class="min-h-screen bg-site-bg text-site-text font-sans">
        <SiteHeader
            terminal
            @open-terminal="$emit('open-terminal')"
        />

        <main>
            <!-- Hero -->
            <section class="relative border-b border-site-border/60">
                <div class="max-w-6xl mx-auto px-4 sm:px-6 py-20 md:py-28">
                    <p class="font-mono text-sm text-site-accent tracking-widest mb-6">
                        ~ {{ t('classic.hero.eyebrow') }}
                    </p>
                    <h1 class="font-display font-extrabold tracking-tight leading-[1.05] text-5xl md:text-7xl max-w-3xl">
                        Raffaele<br>Longo Elia<br>
                        <span class="italic text-site-accent">{{ t('classic.hero.role') }}</span>
                    </h1>
                    <p class="mt-8 max-w-2xl text-lg text-site-muted">
                        {{ t('terminal.about.intro') }}
                    </p>
                    <p class="mt-4 font-mono text-sm text-neutral-500">
                        {{ t('classic.hero.location') }}
                    </p>
                    <dl class="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl">
                        <div
                            v-for="stat in stats"
                            :key="stat.value"
                            class="border-l-2 border-site-accent/70 pl-4"
                        >
                            <dt class="font-display font-extrabold text-3xl tracking-tight">
                                {{ stat.value }}
                            </dt>
                            <dd class="mt-1 text-sm text-site-muted">
                                {{ stat.label }}
                            </dd>
                        </div>
                    </dl>
                    <div class="mt-10 flex flex-wrap gap-3">
                        <a
                            href="#experience"
                            class="px-5 py-2.5 rounded-lg bg-site-accent text-site-on-accent text-sm font-semibold hover:brightness-110 transition"
                        >{{ t('classic.hero.cta') }}</a>
                        <a
                            href="https://github.com/keteraf"
                            target="_blank"
                            rel="noopener"
                            class="px-5 py-2.5 rounded-lg border border-site-border bg-site-surface text-sm font-semibold hover:border-site-muted transition-colors"
                        >GitHub</a>
                        <button
                            type="button"
                            class="group flex items-center gap-2 px-5 py-2.5 rounded-lg border border-site-accent/40 bg-site-accent/10 hover:bg-site-accent/20 hover:border-site-accent text-sm font-mono transition-colors"
                            @click="$emit('open-terminal')"
                        >
                            <span class="text-site-accent font-bold select-none group-hover:translate-x-0.5 transition-transform">❯</span>
                            {{ t('classic.tryTerminal') }}
                        </button>
                    </div>
                </div>
            </section>

            <!-- About -->
            <section
                id="about"
                class="scroll-mt-14 border-b border-site-border/60"
            >
                <div class="max-w-6xl mx-auto px-4 sm:px-6 py-16 md:py-20">
                    <p class="font-mono text-sm text-site-accent tracking-widest mb-3">
                        ~ {{ t('classic.about.eyebrow') }}
                    </p>
                    <h2 class="font-display font-extrabold tracking-tight text-3xl md:text-5xl mb-10">
                        {{ t('classic.about.title') }}
                        <span class="italic text-site-accent">{{ t('classic.about.titleAccent') }}</span>
                    </h2>
                    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        <div
                            v-for="(skill, i) in skills"
                            :key="skill.title"
                            class="rounded-xl border border-site-border bg-site-surface p-6"
                        >
                            <span class="font-mono text-xs text-site-accent">0{{ i + 1 }}</span>
                            <p class="mt-3 text-lg font-semibold">
                                {{ skill.title }}
                            </p>
                            <p class="mt-2 text-sm text-site-muted leading-relaxed">
                                {{ skill.items }}
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Experience -->
            <section
                id="experience"
                class="scroll-mt-14 border-b border-site-border/60"
            >
                <div class="max-w-6xl mx-auto px-4 sm:px-6 py-16 md:py-20">
                    <p class="font-mono text-sm text-site-accent tracking-widest mb-3">
                        $ {{ t('classic.experience.eyebrow') }}
                    </p>
                    <h2 class="font-display font-extrabold tracking-tight text-3xl md:text-5xl mb-12">
                        {{ t('classic.experience.title') }}
                        <span class="italic text-site-accent">{{ t('classic.experience.titleAccent') }}</span>
                    </h2>
                    <ExperienceGraph collapsible />
                </div>
            </section>

            <!-- TallyPal -->
            <section
                id="tallypal"
                class="scroll-mt-14 border-b border-site-border/60"
            >
                <div class="max-w-6xl mx-auto px-4 sm:px-6 py-16 md:py-20">
                    <p class="font-mono text-sm text-site-accent tracking-widest mb-3">
                        ~ {{ t('classic.tallypal.eyebrow') }}
                    </p>
                    <h2 class="font-display font-extrabold tracking-tight text-3xl md:text-5xl">
                        {{ t('classic.tallypal.title') }}
                        <span class="italic text-site-accent">{{ t('classic.tallypal.titleAccent') }}</span>
                    </h2>
                    <p class="mt-4 font-mono text-sm text-site-muted">
                        {{ t('classic.tallypal.tagline') }}
                    </p>
                    <div class="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-10">
                        <div class="space-y-4 text-site-muted leading-relaxed">
                            <p>{{ t('classic.tallypal.intro') }}</p>
                            <a
                                href="https://tallypal.it"
                                target="_blank"
                                rel="noopener"
                                class="inline-block mt-2 px-5 py-2.5 rounded-lg bg-site-accent text-site-on-accent text-sm font-semibold hover:brightness-110 transition"
                            >{{ t('classic.tallypal.visit') }} →</a>
                        </div>
                        <dl class="grid grid-cols-1 sm:grid-cols-2 gap-4 content-start">
                            <div
                                v-for="feature in tallypalFeatures"
                                :key="feature.title"
                                class="rounded-xl border border-site-border bg-site-surface p-6"
                            >
                                <dt class="text-lg font-semibold">
                                    {{ feature.title }}
                                </dt>
                                <dd class="mt-2 text-sm text-site-muted leading-relaxed">
                                    {{ feature.text }}
                                </dd>
                            </div>
                        </dl>
                    </div>
                </div>
            </section>

            <!-- Projects -->
            <section
                id="projects"
                class="scroll-mt-14 border-b border-site-border/60"
            >
                <div class="max-w-6xl mx-auto px-4 sm:px-6 py-16 md:py-20">
                    <div class="flex items-end justify-between gap-4 mb-10">
                        <div>
                            <p class="font-mono text-sm text-site-accent tracking-widest mb-3">
                                ~ {{ t('classic.projects.eyebrow') }}
                            </p>
                            <h2 class="font-display font-extrabold tracking-tight text-3xl md:text-5xl">
                                {{ t('classic.projects.title') }}
                                <span class="italic text-site-accent">{{ t('classic.projects.titleAccent') }}</span>
                            </h2>
                        </div>
                        <a
                            href="https://github.com/keteraf?tab=repositories"
                            target="_blank"
                            rel="noopener"
                            class="hidden sm:inline font-mono text-xs text-site-muted hover:text-site-accent transition-colors"
                        >{{ t('classic.projects.all') }} →</a>
                    </div>

                    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        <a
                            v-for="project in FEATURED_PROJECTS"
                            :key="project.id"
                            :href="project.url"
                            target="_blank"
                            rel="noopener"
                            class="group flex flex-col rounded-xl border border-site-border bg-site-surface p-6 hover:border-site-accent transition-colors"
                        >
                            <span class="flex flex-wrap items-center gap-2 font-mono text-sm">
                                <span><span class="text-site-muted group-hover:text-site-accent transition-colors">./</span>{{ project.id }}/</span>
                                <span
                                    v-if="project.wip"
                                    class="rounded-full border border-site-accent/40 px-2 py-0.5 text-[10px] uppercase tracking-wider text-site-accent"
                                >{{ t('classic.projects.wip') }}</span>
                            </span>
                            <span class="mt-3 text-sm text-site-muted leading-relaxed">
                                {{ t(`classic.projects.items.${project.id}`) }}
                            </span>
                            <span class="mt-auto pt-4 flex flex-wrap gap-1.5">
                                <span
                                    v-for="tech in project.stack"
                                    :key="tech"
                                    class="rounded-md bg-site-raised px-2 py-0.5 font-mono text-[11px] text-site-muted"
                                >{{ tech }}</span>
                            </span>
                        </a>
                    </div>
                    <a
                        href="https://github.com/keteraf?tab=repositories"
                        target="_blank"
                        rel="noopener"
                        class="sm:hidden mt-6 inline-block font-mono text-xs text-site-muted hover:text-site-accent transition-colors"
                    >{{ t('classic.projects.all') }} →</a>
                </div>
            </section>

            <!-- Contact -->
            <section
                id="contact"
                class="relative scroll-mt-14"
            >
                <div class="max-w-6xl mx-auto px-4 sm:px-6 py-20 text-center">
                    <p class="font-mono text-sm text-site-accent tracking-widest mb-3">
                        ~ {{ t('classic.contact.eyebrow') }}
                    </p>
                    <h2 class="font-display font-extrabold tracking-tight text-3xl md:text-5xl">
                        {{ t('classic.contact.title') }}
                        <span class="italic text-site-accent">{{ t('classic.contact.titleAccent') }}</span>
                    </h2>
                    <p class="mt-6 max-w-2xl mx-auto text-site-muted leading-relaxed">
                        {{ t('classic.contact.text') }}
                    </p>
                    <div class="mt-10 flex flex-wrap justify-center gap-3">
                        <a
                            href="https://github.com/keteraf"
                            target="_blank"
                            rel="noopener"
                            class="px-5 py-2.5 rounded-lg bg-site-accent text-site-on-accent text-sm font-semibold hover:brightness-110 transition"
                        >github.com/keteraf</a>
                        <a
                            href="https://linkedin.com/in/raffaele-longo-elia"
                            target="_blank"
                            rel="noopener"
                            class="px-5 py-2.5 rounded-lg border border-site-border bg-site-surface text-sm font-semibold hover:border-site-muted transition-colors"
                        >linkedin.com/in/raffaele-longo-elia</a>
                    </div>
                </div>
            </section>
        </main>

        <SiteFooter />
    </div>
</template>

<script setup lang="ts">
import { FEATURED_PROJECTS } from '~/data/projects'

const { t, tm, rt } = useI18n()

const skills = computed(() => (tm('terminal.about.skills') as { title: unknown, items: unknown }[])
    .map(s => ({ title: rt(s.title as string), items: rt(s.items as string) })))
const tallypalFeatures = computed(() => (tm('classic.tallypal.features') as { title: unknown, text: unknown }[])
    .map(f => ({ title: rt(f.title as string), text: rt(f.text as string) })))
const stats = computed(() => (tm('classic.hero.stats') as { value: unknown, label: unknown }[])
    .map(s => ({ value: rt(s.value as string), label: rt(s.label as string) })))

defineEmits<{ 'open-terminal': [] }>()
</script>
