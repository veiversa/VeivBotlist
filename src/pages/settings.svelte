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
	import { ListItem, TextBlock, Button } from 'fluent-svelte';
	import Navbar from '$lib/components/Navbar.svelte';
	import { goto } from '$app/navigation';
	export /**
	 * @type {false | Record<string, any>}
	 */
	let user;

	

	const mybotsHandle = () => {
		goto('/mybots');
	};

	const addbotsHandle = () => {
		goto('/mybots/add');
	};
	const settingsHandle = () => {
		goto('/settings');
	};
</script>

<!--Navbar-->
<Navbar {user} />
<div class="flex w-full mt-2">
	<div class="w-64 h-full">
		<div class="">
			
			<ListItem on:click={mybotsHandle}>
				<svg
					slot="icon"
					width="16"
					height="16"
					fill="none"
					viewBox="0 0 24 24"
					xmlns="http://www.w3.org/2000/svg"
					><path
						d="M17.753 14a2.25 2.25 0 0 1 2.25 2.25v.905a3.75 3.75 0 0 1-1.307 2.846C17.13 21.345 14.89 22 12 22c-2.89 0-5.128-.656-6.691-2a3.75 3.75 0 0 1-1.306-2.843v-.908A2.25 2.25 0 0 1 6.253 14h11.5ZM11.898 2.008 12 2a.75.75 0 0 1 .743.648l.007.102V3.5h3.5a2.25 2.25 0 0 1 2.25 2.25v4.505a2.25 2.25 0 0 1-2.25 2.25h-8.5a2.25 2.25 0 0 1-2.25-2.25V5.75A2.25 2.25 0 0 1 7.75 3.5h3.5v-.749a.75.75 0 0 1 .648-.743L12 2l-.102.007ZM9.75 6.5a1.25 1.25 0 1 0 0 2.5 1.25 1.25 0 0 0 0-2.5Zm4.493 0a1.25 1.25 0 1 0 0 2.499 1.25 1.25 0 0 0 0-2.499Z"
						fill="#DDE6E8"
					/></svg
				>
				My Bots</ListItem
			>
			<ListItem on:click={addbotsHandle}>
				<svg
					slot="icon"
					width="16"
					height="16"
					fill="none"
					viewBox="0 0 24 24"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M17.5 12a5.5 5.5 0 1 1 0 11 5.5 5.5 0 0 1 0-11Zm-5.478 2A6.47 6.47 0 0 0 11 17.5c0 1.645.61 3.146 1.617 4.291-.802.14-1.675.21-2.617.21-2.89 0-5.128-.656-6.691-2a3.75 3.75 0 0 1-1.306-2.843v-.908A2.25 2.25 0 0 1 4.253 14h7.77Zm5.478 0-.09.008a.5.5 0 0 0-.402.402L17 14.5V17h-2.502l-.09.009a.5.5 0 0 0-.402.402l-.008.09.008.09a.5.5 0 0 0 .402.401l.09.008H17l.001 2.504.008.09a.5.5 0 0 0 .402.402l.09.008.09-.008a.5.5 0 0 0 .402-.402l.008-.09V18h2.503l.09-.008a.5.5 0 0 0 .402-.402l.008-.09-.008-.09a.5.5 0 0 0-.402-.401l-.09-.009H18v-2.5l-.007-.09a.5.5 0 0 0-.402-.402L17.5 14ZM10 2a.75.75 0 0 1 .743.648l.007.102V3.5h3.5a2.25 2.25 0 0 1 2.25 2.25v4.505c0 .301-.06.588-.167.851a6.46 6.46 0 0 0-2.992 1.4H5.75a2.25 2.25 0 0 1-2.25-2.25V5.75A2.25 2.25 0 0 1 5.75 3.5h3.5v-.749a.75.75 0 0 1 .55-.723l.098-.02L10 2Zm-2.25 4.5a1.25 1.25 0 1 0 0 2.498 1.25 1.25 0 0 0 0-2.499Zm4.492 0a1.25 1.25 0 1 0 0 2.498 1.25 1.25 0 0 0 0-2.499Z"
						fill="#DDE6E8"
					/></svg
				> Add Bot</ListItem
			>
		</div>
		<div>
			<ListItem selected on:click={settingsHandle}>
				<svg
					slot="icon"
					width="16"
					height="16"
					fill="none"
					viewBox="0 0 24 24"
					xmlns="http://www.w3.org/2000/svg"
					><path
						d="M12.012 2.25c.734.008 1.465.093 2.182.253a.75.75 0 0 1 .582.649l.17 1.527a1.384 1.384 0 0 0 1.927 1.116l1.401-.615a.75.75 0 0 1 .85.174 9.792 9.792 0 0 1 2.204 3.792.75.75 0 0 1-.271.825l-1.242.916a1.381 1.381 0 0 0 0 2.226l1.243.915a.75.75 0 0 1 .272.826 9.797 9.797 0 0 1-2.204 3.792.75.75 0 0 1-.848.175l-1.407-.617a1.38 1.38 0 0 0-1.926 1.114l-.169 1.526a.75.75 0 0 1-.572.647 9.518 9.518 0 0 1-4.406 0 .75.75 0 0 1-.572-.647l-.168-1.524a1.382 1.382 0 0 0-1.926-1.11l-1.406.616a.75.75 0 0 1-.849-.175 9.798 9.798 0 0 1-2.204-3.796.75.75 0 0 1 .272-.826l1.243-.916a1.38 1.38 0 0 0 0-2.226l-1.243-.914a.75.75 0 0 1-.271-.826 9.793 9.793 0 0 1 2.204-3.792.75.75 0 0 1 .85-.174l1.4.615a1.387 1.387 0 0 0 1.93-1.118l.17-1.526a.75.75 0 0 1 .583-.65c.717-.159 1.45-.243 2.201-.252ZM12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z"
						fill="#DDE6E8"
					/></svg
				>
				Settings</ListItem
			>
		</div>
	</div>
	<!--Main Content-->
	<div class="container overflow-y-auto">
		<TextBlock variant="titleLarge" style="color:white;">Settings</TextBlock>
	</div>
</div>

<style lang="scss">
	:global(body) {
		background-image: linear-gradient(to right, #141f24, #212121);
	}
</style>
