<template>
    <div class="flex items-center gap-x-1 h-6">
        <span class="text-green-400">raffaele</span>
        <span class="text-neutral-500">@</span>
        <span class="text-green-400">portfolio</span>
        <span class="text-neutral-500">in</span>
        <span class="text-cyan-400">{{ cwd }}</span>
        <span class="ml-2 px-1.5 rounded bg-fuchsia-900/30 text-fuchsia-300"> main<span
            v-if="gitDirty"
            class="ml-1"
        >*</span></span>
        <span
            class="ml-2"
            :class="ok ? 'text-green-400' : 'text-red-400'"
        >❯</span>
        <span
            v-if="command"
            class="ml-2"
        >{{ command }}</span>
        <slot />
    </div>
</template>

<script setup lang="ts">
interface Props {
    cwd: string
    command?: string
    gitDirty?: boolean
    ok?: boolean
}

withDefaults(defineProps<Props>(), {
    command: '',
    gitDirty: false,
    ok: true,
})
</script>
