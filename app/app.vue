<template>
    <div>
        <NuxtPage />
    </div>
</template>

<script setup lang="ts">
// <html lang>, canonical, hreflang alternates (en, it, x-default) and og:locale for the current locale
const i18nHead = useLocaleHead()

useHead(() => ({
    htmlAttrs: { lang: i18nHead.value.htmlAttrs.lang },
    link: [...(i18nHead.value.link || [])],
    meta: [...(i18nHead.value.meta || [])],
}))
</script>
