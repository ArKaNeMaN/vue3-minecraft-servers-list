<template>
	<div class="grid grid-cols-1 gap-y-2 p-4">
		<minecraft-server-card
			v-for="server in servers"
			:host="server.host"
			:port="server.port"
			:key="server.host + ':' + server.port"
		></minecraft-server-card>
	</div>
</template>

<script setup>
import { defineProps } from 'vue';
import MinecraftServerCard from './components/MinecraftServerCard.vue';

defineProps({
	servers: {
		type: Array,
		required: false,
		default: () => [
			{ host: 'vh.mc.arkan1.ru' },
			{ host: 'db.mc.arkan1.ru' },
			{ host: 'bnc.mc.arkan1.ru' },
		],
	},
});

</script>