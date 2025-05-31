<script setup lang="ts">

withDefaults(defineProps<{
    closeByEsc?: boolean,
}>(), {
    closeByEsc: true,
});
const showModel = defineModel<boolean>('show', {default: false});

function onKeyPressed(e: KeyboardEvent) {
    if (showModel.value && e.key === 'Escape') {
        close();
    }
}

const open = (): void => {
    showModel.value = true
    document.addEventListener('keydown', onKeyPressed);
}

const close = (): void => {
    showModel.value = false;
    document.removeEventListener('keydown', onKeyPressed);
}

defineExpose({close, open});
defineOptions({inheritAttrs: false});
</script>

<template>
    <teleport to="body">
        <div class="mc-modal absolute inset-0">
            <slot/>
        </div>
    </teleport>
</template>
