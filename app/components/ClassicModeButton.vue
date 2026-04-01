<template>
    <button
        class="flex items-center gap-2 px-5 py-3 bg-cyan-500/[0.07] border border-cyan-500/20 rounded-lg hover:bg-cyan-500/[0.12] hover:border-cyan-400/40 transition-all text-sm font-mono group"
        @click="$emit('click')"
    >
        <span class="text-cyan-400 font-bold select-none group-hover:translate-x-0.5 transition-transform">❯</span>
        <span class="text-neutral-300 group-hover:text-neutral-100 transition-colors">{{ $t('hero.classicMode') }}</span>
    </button>
</template>

<script setup lang="ts">
defineEmits<{
    click: []
}>()
</script>
