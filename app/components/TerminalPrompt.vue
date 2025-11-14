<template>
    <div :class="marginClass">
        <TerminalUser
            :cwd="cwd"
            :command="command"
            :git-dirty="gitDirty"
            :ok="ok"
        >
            <slot />
        </TerminalUser>
    </div>
</template>

<script setup lang="ts">
interface Props {
    cwd: string
    command: string
    rprompt: string
    gitDirty?: boolean
    ok?: boolean
    marginClass?: string
}

withDefaults(defineProps<Props>(), {
    gitDirty: false,
    ok: true,
    marginClass: 'mt-2',
})
</script>
