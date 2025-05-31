import {fileURLToPath, URL} from 'node:url'

import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import { env } from 'node:process'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue({
        script: {
            defineModel: true,
        }
    })],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    },
    base: env.VITE_BASE_URL ?? '/',
})
