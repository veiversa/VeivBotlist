// @ts-nocheck
import adapter from '@sveltejs/adapter-auto';
import preprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter(),
		appDir: '__data',
		files: {
			routes: 'src/pages'
		}
	},
	preprocess: [
		preprocess({
			postcss: true
		})
	]
};

export default config;
