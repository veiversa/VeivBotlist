<script>
	import { Button } from 'fluent-svelte';
	import { goto } from '$app/navigation';

	const clickHandle = () => {
		goto('/');
	};
</script>

<head>
	<title>404: Not Found</title>
</head>

<div class="flex flex-col w-full h-full items-center justify-center absolute bottom-24">
	<h1 class="text-7xl font-extrabold text-white"><i class="fa-solid fa-ghost" /> 404</h1>
	<p class="text-2xl font-bold text-zinc-500">
		Sorry, if you don't have a time machine, you can't access this content anymore.
	</p>
	<br />
	<Button on:click={clickHandle} variant="accent" class="w-32">Go Home</Button>
</div>
