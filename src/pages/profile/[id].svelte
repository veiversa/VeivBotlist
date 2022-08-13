<script context="module">
	/** @type {import('@sveltejs/kit/types').Load} */
	export async function load({ session }) {
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
	<title>Profile</title>
</head>

<Navbar {user} />

<SearchBots />
<PopulerBot />


<Footer />
<style lang="scss">
	:global(body) {
		background-image: linear-gradient(to right, #141f24, #212121);
	}
</style>