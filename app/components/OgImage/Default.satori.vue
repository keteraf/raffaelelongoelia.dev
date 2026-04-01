<template>
    <!-- Satori renders this at build time. Rules: flex only (no grid), inline styles,
         no external image URLs, limited CSS. Keep it simple. -->
    <div
        :style="{
            display: 'flex',
            width: '1200px',
            height: '630px',
            background: '#090d12',
            fontFamily: 'monospace',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
        }"
    >
        <!-- Subtle grid texture via border lines -->
        <div
            :style="{
                position: 'absolute',
                inset: '0',
                border: '1px solid rgba(255,255,255,0.04)',
                display: 'flex',
            }"
        />

        <div
            :style="{
                display: 'flex',
                flexDirection: 'column',
                gap: '28px',
                padding: '72px 80px',
                width: '100%',
            }"
        >
            <!-- Window chrome dots + domain -->
            <div :style="{ display: 'flex', alignItems: 'center', gap: '8px' }">
                <div :style="{ width: '14px', height: '14px', borderRadius: '50%', background: '#ff5f57' }" />
                <div :style="{ width: '14px', height: '14px', borderRadius: '50%', background: '#febc2e' }" />
                <div :style="{ width: '14px', height: '14px', borderRadius: '50%', background: '#28c840' }" />
                <span :style="{ color: '#4b5563', fontSize: '15px', marginLeft: '16px' }">raffaelelongoelia.dev</span>
            </div>

            <!-- Prompt line -->
            <div :style="{ display: 'flex', alignItems: 'center', gap: '10px' }">
                <span :style="{ color: '#34d399', fontSize: '22px' }">~</span>
                <span :style="{ color: '#60a5fa', fontSize: '22px' }">❯</span>
                <span :style="{ color: '#9ca3af', fontSize: '22px' }">whoami</span>
            </div>

            <!-- Name + role -->
            <div :style="{ display: 'flex', flexDirection: 'column', gap: '10px' }">
                <span
                    :style="{
                        color: '#f9fafb',
                        fontSize: '62px',
                        fontWeight: '700',
                        letterSpacing: '-1px',
                        lineHeight: '1.1',
                    }"
                >
                    {{ title || 'Raffaele Longo Elia' }}
                </span>
                <span :style="{ color: '#6b7280', fontSize: '26px' }">
                    {{ description || 'Full-Stack Developer' }}
                </span>
            </div>

            <!-- Divider -->
            <div
                :style="{
                    height: '1px',
                    background: 'rgba(255,255,255,0.06)',
                    display: 'flex',
                    marginTop: '8px',
                }"
            />

            <!-- Footer line -->
            <div :style="{ display: 'flex', alignItems: 'center', gap: '8px' }">
                <span :style="{ color: '#34d399', fontSize: '16px' }">▶</span>
                <span :style="{ color: '#374151', fontSize: '15px' }">Interactive terminal portfolio — type </span>
                <span :style="{ color: '#34d399', fontSize: '15px' }">'help'</span>
                <span :style="{ color: '#374151', fontSize: '15px' }"> to get started</span>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
// Props injected automatically by nuxt-og-image from defineOgImageComponent() call
defineProps<{
    title?: string
    description?: string
}>()
</script>
