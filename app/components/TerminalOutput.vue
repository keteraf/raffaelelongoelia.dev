<template>
    <div
        v-if="output?.type === 'lines'"
        class="pl-6 space-y-1 text-neutral-300"
    >
        <p
            v-for="(line, i) in output.lines"
            :key="i"
            class="whitespace-pre"
        >
            {{ line }}
        </p>
    </div>
    <div
        v-else-if="output?.type === 'grid'"
        class="pl-6 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-1 text-cyan-300"
    >
        <div
            v-for="(item, i) in output.items"
            :key="i"
        >
            <template v-if="typeof item === 'string'">
                {{ item }}
            </template>
            <template v-else>
                <a
                    class="hover:underline focus:underline outline-none"
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
        v-else-if="output?.type === 'raw'"
        class="pl-6 text-neutral-300"
    >
        <p>{{ output.text }}</p>
    </div>
    <div
        v-else-if="output?.type === 'links'"
        class="pl-6 space-y-1 text-neutral-300"
    >
        <p>GitHub: <span class="text-amber-300">{{ output.github }}</span></p>
        <p>LinkedIn: <span class="text-amber-300">{{ output.linkedin }}</span></p>
    </div>
</template>

<script setup lang="ts">
import type { CommandOutput } from '../composables/terminal/types'

interface Props {
    output?: CommandOutput
}

defineProps<Props>()
</script>
