<script>
	import '../app.css';
	import { ProgressRing } from 'fluent-svelte';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { fade } from 'svelte/transition';

	let url = $page.url;
	let loaded = false;

	onMount(() => {
		loaded = true;
	});
</script>

{#if !loaded}
	<ProgressRing
		size={64}
		style="position: absolute; left: 50%; top: 50%; -webkit-transform: translate(-50%, -50%); transform: translate(-50%, -50%)"
	/>
{:else}
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
{/if}
