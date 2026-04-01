<template>
    <div
        v-if="output?.type === 'lines'"
        class="pl-6 mt-1 space-y-0.5 text-sm text-neutral-300/90"
    >
        <p
            v-for="(line, i) in output.lines"
            :key="i"
            class="whitespace-pre leading-5"
        >
            {{ line }}
        </p>
    </div>
    <div
        v-else-if="output?.type === 'grid'"
        class="pl-6 mt-1 grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-0.5 text-sm text-sky-300/90"
    >
        <div
            v-for="(item, i) in output.items"
            :key="i"
            class="leading-5"
        >
            <template v-if="typeof item === 'string'">
                {{ item }}
            </template>
            <template v-else>
                <a
                    class="hover:text-sky-200 hover:underline focus:underline outline-none transition-colors"
                    :href="item.href"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    {{ item.label }}
                </a>
            </template>
        </div>
    </div>
    <div
        v-else-if="output?.type === 'raw' && output.text"
        class="pl-6 mt-1 text-sm text-neutral-300/90 leading-5"
    >
        <p>{{ output.text }}</p>
    </div>
    <div
        v-else-if="output?.type === 'links'"
        class="pl-6 mt-1 space-y-0.5 text-sm text-neutral-400 leading-5"
    >
        <p>
            <span class="text-neutral-600">GitHub   </span>
            <a
                class="text-sky-400 hover:text-sky-300 hover:underline transition-colors outline-none"
                :href="output.github"
                target="_blank"
                rel="noopener noreferrer"
            >{{ output.github }}</a>
        </p>
        <p>
            <span class="text-neutral-600">LinkedIn </span>
            <a
                class="text-sky-400 hover:text-sky-300 hover:underline transition-colors outline-none"
                :href="output.linkedin"
                target="_blank"
                rel="noopener noreferrer"
            >{{ output.linkedin }}</a>
        </p>
    </div>
</template>

<script setup lang="ts">
import type { CommandOutput } from '~/composables/terminal/types'

interface Props {
    output?: CommandOutput
}

defineProps<Props>()
</script>
