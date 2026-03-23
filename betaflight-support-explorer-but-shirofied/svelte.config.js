import adapter from '@sveltejs/adapter-cloudflare';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
    preprocess: vitePreprocess(),

    kit: {
        // We add an empty object or specific config here to override defaults
        adapter: adapter({
            routes: {
                include: ['/*'],
                exclude: ['<all>']
            }
        }),
        alias: {
            $components: 'src/components'
        }
    }
};

export default config;