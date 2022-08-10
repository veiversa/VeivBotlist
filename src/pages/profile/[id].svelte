<script>
	import { page } from '$app/stores';
	const accountName = $page.params.id;
	import { onMount } from 'svelte';
	onMount(async () => {
		const user = await fetch(`https://discord.com/api/v10/users/${accountName}`, {
			headers: { Authorization: `Bot ${import.meta.env.VITE_CLIENT_TOKEN}` }
		}).then((res) => {
			console.log(res);
		});
	});
</script>

<main>
</main>
 