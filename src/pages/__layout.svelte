<script>
	import '$lib/styles/fluent-svelte.css'
	import '../app.css';
	import { ProgressRing } from 'fluent-svelte';
	import { page } from '$app/stores';
	import { fade } from 'svelte/transition';
	let url = $page.url;
	let loaded = false;
	let serversReady = false;

	async function checkServers() {
		const response = await fetch(import.meta.env.VITE_API_URL);
		return response.status === 200;
	}

	checkServers()
		.then((_) => {
			serversReady = _;
			loaded = true;
		})
		.catch(() => {
			serversReady = false;
			loaded = true;
		});
</script>

{#if !loaded}
	<ProgressRing
		size={64}
		style="position: absolute; left: 50%; top: 50%; -webkit-transform: translate(-50%, -50%); transform: translate(-50%, -50%)"
	/>
{:else if serversReady}
	{#key url}
		<div
			in:fade={{
				duration: 200,
				delay: 200
			}}
			out:fade={{ duration: 200 }}
		>
			<slot />
		</div>
	{/key}
{:else}
	<br />
	<br />
	<br />
	<h1 class="text-white text-3xl text-center">Sunucularımız Kapalı</h1>
{/if}
