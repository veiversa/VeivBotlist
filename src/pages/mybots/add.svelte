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
	import { goto } from '$app/navigation';
	import { TextBox, Button, InfoBar } from 'fluent-svelte';

	export let user;

	if (!user) {
		goto('/auth/login');
	}

	/** @type {?string} */
	let id = null;

	/** @type {?string} */
	let description = null;

	/** @type {string[]} */
	let errors = [];

	let clicked = false;

	const clickHandle = () => {
		if (clicked) errors = [];

		clicked = true;

		let idPattern = /[\w+]{17,19}/;

		if (!id || (id && !idPattern.test(id))) errors.push('Invalid id was provided');

		if (!description) errors.push('Description is required');
		else if (description.length > 100) errors.push('Description is too long');

		return !!errors.length;
	};
</script>

<div class="flex flex-col justify-center items-center container mt-36">
	{#key clicked}
		{#each errors as error}
			<InfoBar title="Error" message={error} severity="critical" />
			<br />
		{/each}
	{/key}

	<br />
	<br />

	<p class="text-white">Ahh id yaz bebeğim</p>
	<TextBox bind:value={id} class="w-36" />

	<p class="text-white">Ahhh desc gir aşkom</p>
	<TextBox bind:value={description} />

	<br /><br /><br />
	<Button variant="accent" on:click={clickHandle}>Sumbit</Button>
</div>
