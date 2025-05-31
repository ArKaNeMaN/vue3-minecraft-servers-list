<script setup lang="ts">
const props = withDefaults(defineProps<{
    disabled?: boolean,
}>(), {
    disabled: false,
});

function onClick(event: Event) {
    if (props.disabled) {
        event.stopPropagation();
    }
}
</script>

<template>
    <button class="mc-button" :class="{'disabled': disabled}" @click="onClick">
        <slot/>
    </button>
</template>
