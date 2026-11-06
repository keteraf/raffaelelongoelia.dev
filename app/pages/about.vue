<template>
    <ProsePage
        :eyebrow="eyebrow"
        :title="title"
        :sections="sections"
    >
        <p class="mt-4 text-site-muted leading-relaxed">
            {{ t('aboutPage.more') }}
            <NuxtLink
                :to="{ path: localePath('/'), hash: '#experience' }"
                class="text-site-accent hover:underline"
            >{{ t('aboutPage.moreLink') }}</NuxtLink>.
        </p>
    </ProsePage>
</template>

<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()
const { title, eyebrow, sections } = useProsePage('aboutPage', ['AboutPage'])
</script>
