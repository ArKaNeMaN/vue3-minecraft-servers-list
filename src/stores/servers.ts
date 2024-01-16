import {defineStore} from 'pinia'
import {useStorage} from "@vueuse/core";
import * as mcs from 'node-mcstatus';

console.log(mcs)

type MinecraftServer = {
    address: string,
    title: string,

    isPending: boolean,
    motd?: string | undefined,
    version?: string | undefined,
    maxPlayers?: number | undefined,
    nowPlayers?: number | undefined,
    isOnline?: boolean | undefined,
    icon?: string | undefined,
};

export const useServersStore = defineStore('servers', () => {
    const servers = useStorage<MinecraftServer[]>('servers', []);

    function add(address: string, title: string) {
        servers.value.push({
            address,
            title,
            isPending: false,
        });

        refresh(servers.value.length - 1);
    }

    function refresh(index: number): void {
        servers.value[index].isPending = true;

        const addressSplit = servers.value[index].address.split(':');
        const address = {
            host: addressSplit[0],
            port: parseInt(addressSplit[1]) > 0 ? parseInt(addressSplit[1]) : 25565,
        };

        mcs.statusJava(address.host, address.port)
            .then(res => {
                servers.value[index].isPending = false;
                servers.value[index].motd = res.motd?.html ?? '';
                servers.value[index].version = res.version?.name_clean ?? 'unknown';
                servers.value[index].maxPlayers = res.players?.max ?? 0;
                servers.value[index].nowPlayers = res.players?.online ?? 0;
                servers.value[index].isOnline = res.online ?? false;
                servers.value[index].icon = res.icon ?? undefined;
            })
    }

    function refreshAll(): void {
        for (const index in servers.value) {
            refresh(Number(index));
        }
    }

    function remove(index: number): void {
        servers.value.splice(index, 1);
    }

    return {servers, add, remove, refreshAll};
});
