<script setup lang="ts">
import BaseButton from "@/components/Controls/BaseButton.vue";
import TextInput from "@/components/Controls/TextInput.vue";
import BaseModal from "@/components/Modals/BaseModal.vue";
import {onMounted, reactive, ref} from "vue";
import {useServersStore} from "@/stores/servers";

const showAddServerModal = ref(false);
const servers = useServersStore();

const selectedServer = ref();
const showEditServerModal = ref(false);

const addServerForm = reactive({
    title: '',
    address: '',
});

function onAddServer() {
    servers.add(addServerForm.address, addServerForm.title);

    addServerForm.title = '';
    addServerForm.address = '';
    showAddServerModal.value = false;
}

onMounted(() => {
    servers.refreshAll();
});
</script>

<template>
    <header class="flex select-none items-end justify-center p-2">
        Minecraft Servers List
    </header>
    <main>
        <div class="m-auto w-[600px] py-1">
            <div
                v-for="(server, i) in servers.servers" :key="server.address"

                class="mc-server-item"
                :class="{'mc-server-item--selected': selectedServer === i}"

                @click="selectedServer = i"
            >
                <img class="mc-server-item__icon" :src="server.icon" />
                <div class="mc-server-item__info">
                    <p class="mc-server-item__info__title">{{ server.title }}</p>
                    <h4 v-if="server.isPending">...pending...</h4>
                    <h4 v-else v-html="server.motd ?? ''"></h4>
                </div>
                <div
                    class="mc-server-item__icon flex cursor-pointer items-center justify-center text-black"
                    @click="servers.remove(i)"
                >X
                </div>
            </div>

            <base-modal v-if="showAddServerModal">
                <div class="m-auto h-full w-96">
                    <h2 class="mb-20 mt-10 text-center">Edit Server Info</h2>

                    <form class="flex h-full max-h-96 flex-col space-y-2" @submit.prevent="onAddServer">
                        <div>
                            <p class="mb-1 text-gray-400">Server Name</p>
                            <text-input class="w-full" v-model="addServerForm.title"/>
                        </div>

                        <div>
                            <p class="mb-1 text-gray-400">Server Address</p>
                            <text-input class="w-full" v-model="addServerForm.address"/>
                        </div>

                        <div class="grow"></div>

                        <base-button type="submit">Done</base-button>
                        <base-button type="button" @click="showAddServerModal = false">Cancel</base-button>
                    </form>
                </div>
            </base-modal>
            <base-modal v-if="showEditServerModal">
                <div class="m-auto h-full w-96">
                    <h2 class="mb-20 mt-10 text-center">Edit Server Info</h2>

                    <form class="flex h-full max-h-96 flex-col space-y-2" @submit.prevent="onAddServer">
                        <div>
                            <p class="mb-1 text-gray-400">Server Name</p>
                            <text-input class="w-full" v-model="addServerForm.title"/>
                        </div>

                        <div>
                            <p class="mb-1 text-gray-400">Server Address</p>
                            <text-input class="w-full" v-model="addServerForm.address"/>
                        </div>

                        <div class="grow"></div>

                        <base-button type="submit">Done</base-button>
                        <base-button type="button" @click="showAddServerModal = false">Cancel</base-button>
                    </form>
                </div>
            </base-modal>
        </div>
    </main>
    <footer class="m-auto flex w-[600px] flex-col gap-2 py-5">
        <div class="mc-controls-row">
            <base-button type="button">Join Server</base-button>
            <base-button type="button" >Direct Connection</base-button>
            <base-button @click="showAddServerModal = true" type="button">Add Server</base-button>
        </div>
        <div class="mc-controls-row">
            <base-button @click="showAddServerModal = true" type="button">Edit</base-button>
            <base-button
                @click="servers.remove(selectedServer)"
                :disabled="selectedServer"
                type="button"
            >Delete</base-button>
            <base-button @click="servers.refreshAll()" type="button">Refresh</base-button>
            <base-button type="button">Cancel</base-button>
        </div>
    </footer>
</template>
