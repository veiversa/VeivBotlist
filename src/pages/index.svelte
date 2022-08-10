<script context="module">
	import { browser } from '$app/env';

	/** @type {import('@sveltejs/kit/types').Load} */
	export async function load({ session }) {
		// @ts-ignore
		if (session.tokens && browser) {
			await fetch('/auth/store_tokens', {
				method: 'POST',
				// @ts-ignore
				body: JSON.stringify(session.tokens)
			});

			window.location.reload();
		}

		return {
			// @ts-ignore
			props: { user: session.user }
		};
	}
</script>

<script>
	import Navbar from '$lib/components/Navbar.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import PopulerBot from '$lib/components/PopulerBots.svelte';
	import SearchBots from '$lib/components/SearchBots.svelte';

	/** @type {Record<string, any> | false} */
	export let user;
</script>

<head>
	<title>VeivBotlist</title>
</head>

<Navbar {user} />
<Footer />
<SearchBots />
<PopulerBot />

<style lang="scss">
	:global(body) {
		background-image: linear-gradient(to right, #141f24, #212121);
	}
</style>