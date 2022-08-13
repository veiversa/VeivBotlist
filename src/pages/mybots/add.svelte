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
	import { ListItem, TextBlock, Button, TextBox, InfoBar } from 'fluent-svelte';
	import Navbar from '$lib/components/Navbar.svelte';

	/** @type {false | Record<string, any>} */
	export let user;

	import { goto } from '$app/navigation';

	const profileHandle = () => {
		goto('/profile');
	};

	const mybotsHandle = () => {
		goto('/mybots');
	};

	const addbotsHandle = () => {
		goto('/mybots/add');
	};
	const settingsHandle = () => {
		goto('/settings');
	};

	/** @type {string[]}*/
	let errors = [];

	/** @type {boolean} */
	let checked;
	/** @type {any} */
	let responseData;

	/** @type {?string}*/
	let bot_id = null;
	/** @type {?string}*/
	let long_description = null;
	/** @type {?string}*/
	let short_description = null;
	/** @type {?string}*/
	let prefix = null;
	/** @type {?string} */
	let language = null;
	/** @type {string[] }*/
	let owners = [];
	/** @type {?string}*/
	let support_server = null;

	const findBot = async () => {
		await fetch(`${import.meta.env.VITE_API_URL}/v1/users/${bot_id}`)
			.then(async (response) => {
				const data = await response.json();
				responseData = data;
				if (!data.user.bot) {
					errors.push('Bot is user');
					errors = errors;
					return (checked = false);
				} else {
					await fetch(`${import.meta.env.VITE_API_URL}/v1/bots/${bot_id}`).then((a) => {
						console.log(a);
						if (a.status !== 404) {
							errors.push('Bot is already exists');
							checked = false;
							errors = errors;
						} else {
							checked = true;
						}
					});
				}
			})
			.catch(() => {
				errors.push('Invalid id was provided');
				errors = errors;
			});
		checked = checked;
	};
	const StepTwo = () => {
		let getID = document.getElementById('sarpklas');
		let get2ID = document.getElementById('sarpklas2');
		// @ts-ignore
		getID.style.display = 'block';
		// @ts-ignore
		get2ID.style.display = 'none';
	};
</script>

<Navbar {user} />

{#key errors.length}
	{#each errors as error}
		<div class="absolute top-8 right-10">
			<InfoBar title="Error" message={error} severity="critical" />
		</div>
	{/each}
{/key}

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
			<ListItem selected on:click={addbotsHandle}>
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
			<ListItem on:click={settingsHandle}>
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

	<div class="container text-white mt-20 oveflow-y-auto">
		<div class="mx-10 flex flex-col" id="sarpklas2">
			<TextBlock variant="title">Provide your Discord Bot's Application ID</TextBlock>
			<div class="text-gray-400 my-3">
				<TextBlock variant="subtitle"
					>By providing your bot’s Application ID we are able to display information about your bot
					such as the name, profile image and invite URL (if you do not provide a custom one).</TextBlock
				>
			</div>
			<div class="flex">
				<div class="mx-2 w-[350px]">
					<TextBox placeholder="Enter your bot id" bind:value={bot_id} />
				</div>
				<Button on:click={findBot} disabled={!bot_id} variant="accent" style="width: 100px"
					>Find</Button
				>
			</div>
			{#if checked}
				<div class="mt-8 text-gray-200 flex items-center">
					<img src={responseData.user.avatar_url} class="rounded-lg w-40" alt="" />
					<div class="flex flex-col mx-4">
						<TextBlock variant="title">{responseData.user.username}</TextBlock>
						<div class="text-gray-300">
							<TextBlock variant="subtitle">#{responseData.user.discriminator}</TextBlock>
						</div>
						<Button on:click={StepTwo} variant="accent">Next Step</Button>
					</div>
				</div>
			{/if}
		</div>
		<!--Next Step-->
		<div class="hidden" id="sarpklas">
			<div class="flex justify-between">
				<div>
					<!--Short Description-->
					<div class="mb-10 w-[550px]">
						<div>
							<TextBlock variant="title">Short Description</TextBlock>
						</div>
						<div>
							<TextBox placeholder="Pls enter bot description :D" />
						</div>
					</div>
	
					<!--Long Description-->
					<div class="mb-10 w-[550px]">
						<div>
							<TextBlock variant="title">Long Description</TextBlock>
						</div>
						<div>
							<TextBox />
						</div>
					</div>
	
					<!--Prefix-->
					<div class="mb-10 w-[550px]">
						<div>
							<TextBlock variant="title">Prefix</TextBlock>
						</div>
						<div>
							<TextBox />
						</div>
					</div>
	
					<!--Language-->
					<div class="mb-10 w-[550px]">
						<div>
							<TextBlock variant="title">Language</TextBlock>
						</div>
						<div>
							<TextBox />
						</div>
					</div>
	
					<!--Owners-->
					<div class="mb-10 w-[550px]">
						<div>
							<TextBlock variant="title">Owners</TextBlock>
						</div>
						<div>
							<TextBox />
						</div>
					</div>
				</div>
				{#if responseData}
				<img src={responseData.user.avatar_url} alt="bot pp">
				{/if}
			</div>
		</div>
	</div>
</div>

<style lang="scss">
	:global(body) {
		background-image: linear-gradient(to right, #141f24, #212121);
	}
</style>
