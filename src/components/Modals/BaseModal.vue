<script setup lang="ts">
import ModalLayout from "./ModalLayout.vue";
import {ref} from "vue";

withDefaults(defineProps<{
    closeByEsc?: boolean,
}>(), {
    closeByEsc: true,
});

const showModel = defineModel<boolean>('show', {local: false, default: false});

const modalLayoutEl = ref<typeof ModalLayout | null>(null);

defineExpose({
    close: () => modalLayoutEl.value?.close(),
    open: () => modalLayoutEl.value?.open(),
});
defineOptions({inheritAttrs: false});
</script>

<template>
    <modal-layout
        class="p-4"
        ref="modalLayoutEl"
        v-model:show="showModel"
        :close-by-esc="closeByEsc"
    >
        <slot/>
    </modal-layout>
</template>
