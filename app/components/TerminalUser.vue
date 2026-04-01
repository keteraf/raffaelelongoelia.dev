<template>
    <div class="font-mono text-sm">
        <!-- Context line: user · host · path · git -->
        <div class="flex items-center flex-wrap gap-x-1.5 gap-y-0.5 leading-5 text-sm">
            <span class="text-emerald-400 font-semibold">raffaele</span>
            <span class="text-neutral-600 text-xs">@</span>
            <span class="text-emerald-300/70">portfolio</span>
            <span class="text-neutral-700 select-none">›</span>
            <span class="text-sky-400">{{ cwd }}</span>
            <span class="inline-flex items-center gap-1 px-1.5 py-px rounded text-xs bg-violet-500/10 text-violet-300 border border-violet-500/20 leading-4">
                <span class="text-violet-400 select-none">⎇</span>
                <span>main</span>
                <span
                    v-if="gitDirty"
                    class="text-amber-400"
                >±</span>
            </span>
        </div>
        <!-- Prompt line: ❯ + command/input -->
        <div class="flex items-center gap-2 mt-0.5 leading-6">
            <span
                class="font-bold select-none"
                :class="ok ? 'text-emerald-400' : 'text-red-400'"
            >❯</span>
            <span
                v-if="command"
                class="text-neutral-200"
            >{{ command }}</span>
            <slot />
        </div>
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
