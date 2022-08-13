<script>
	import { Button, PersonPicture, IconButton, MenuFlyoutItem, MenuFlyoutDivider, ContextMenu, TextBlock } from 'fluent-svelte';
	import { goto } from '$app/navigation';

	import image from '$lib/images/veiv.png';

	/** @type {Record<string, any> | false} */
	export let user;

	const loginHandle = () => {
		window.location.href = `${import.meta.env.VITE_API_URL}/v1/auth/login`;
	};

	const logoutHandle = async () => {
		goto('/auth/logout');
	};

	const adminHandle = () => {
		goto('/admin');
	};
	const mybotsHandle = () => {
		goto('/mybots');
	};
</script>

<div class="w-full h-16 flex items-center justify-evenly">
	<a href="/"><img src={image} alt="logo" width="60" /></a>
	{#if user}
		<ContextMenu>
			<IconButton href={`/profile/${user.id}`}>
				<PersonPicture size={51} src={user.avatar_url} />
			</IconButton>

			<svelte:fragment slot="flyout">
				<MenuFlyoutItem on:click={adminHandle}>Admin</MenuFlyoutItem>
				<MenuFlyoutItem on:click={mybotsHandle}>My Bots</MenuFlyoutItem>
				<MenuFlyoutDivider />
				<MenuFlyoutItem on:click={logoutHandle}>Logout</MenuFlyoutItem>
			</svelte:fragment>
		</ContextMenu>
	{:else}
		<Button variant="accent" class="w-20" on:click={loginHandle}>Login</Button>
	{/if}
</div>
