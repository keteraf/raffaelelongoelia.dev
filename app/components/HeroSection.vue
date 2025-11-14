<template>
    <div class="flex flex-col items-center gap-8 text-center max-w-2xl">
        <div class="space-y-4">
            <h1 class="text-4xl md:text-6xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                {{ $t('hero.title') }}
            </h1>
            <p class="text-xl text-neutral-400">
                {{ $t('hero.subtitle') }}
            </p>
            <div class="text-neutral-500 space-y-2">
                <p>{{ $t('hero.welcome') }}</p>
                <p class="text-sm">
                    {{ $t('hero.hint', { command: 'help' }) }}
                </p>
            </div>
        </div>
        <slot />
    </div>
</template>
