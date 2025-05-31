<script setup lang="ts">

type HTMLTextInputType = "email" | "password" | "search" | "tel" | "text" | "url";

withDefaults(defineProps<{
    type?: HTMLTextInputType,
}>(), {
    type: 'text',
});

const model = defineModel<string>({
    required: true,
});

</script>

<template>
    <input
        :type.camel="type"
        v-model="model"
        class="mc-input border-2 border-gray-400 bg-black p-2 focus:border-white focus-visible:outline-0"
    />
</template>

<style></style>
