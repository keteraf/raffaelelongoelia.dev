<template>
    <button
        class="px-8 py-4 bg-[#0c0c0c] border border-neutral-800/80 rounded-xl hover:bg-[#0e0e0e] hover:border-emerald-400/50 transition-all text-neutral-200 font-mono group"
        @click="$emit('click')"
    >
        <span class="group-hover:text-emerald-400 transition-colors">$ </span>New Terminal
    </button>
</template>

<script setup lang="ts">
defineEmits<{
    click: []
}>()
</script>
