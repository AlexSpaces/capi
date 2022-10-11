import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
    const { NODE_PORT, NODE_ENV } = loadEnv(mode, process.cwd(), '');
    const config = {
        plugins: [vue()],
        build: {
            manifest: true,
        },
        mode: NODE_ENV
    }

    if ('dev' === NODE_ENV) {
        config.server = {
            proxy: {
                '/info': `http://web:${NODE_PORT}`,
                '^/api/.*': `http://web:${NODE_PORT}`,
            }
        }
    }

    return config;
});
