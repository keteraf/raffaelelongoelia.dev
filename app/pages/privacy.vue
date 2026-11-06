<template>
    <ProsePage
        :eyebrow="eyebrow"
        :title="title"
        :sections="sections"
    >
        <p class="mt-4 font-mono text-xs text-site-muted">
            {{ t('privacyPage.updated') }}
        </p>
    </ProsePage>
</template>

<script setup lang="ts">
const { t } = useI18n()
const { title, eyebrow, sections } = useProsePage('privacyPage')
</script>
