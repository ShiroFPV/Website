import adapter from '@sveltejs/adapter-cloudflare';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** @type {import('@sveltejs/kit').Config} */
const config = {
    preprocess: vitePreprocess(),

    kit: {
        adapter: adapter(),
        alias: {
            $components: path.resolve(__dirname, './src/components')
        }
    }
};

export default config;