<script>
	import {
		Button,
		PersonPicture,
		IconButton,
		MenuFlyoutItem,
		MenuFlyoutDivider,
		ContextMenu
	} from 'fluent-svelte';
	import { goto } from '$app/navigation';

	import image from '$lib/images/veiv.png';

	/** @type {Record<string, any> | false} */
	export let user;

	const loginHandle = () => {
		goto('/auth/login');
	};

	const logoutHandle = () => {
		goto('/auth/logout');
	};

	const adminHandle = () => {
		goto('/admin');
	};
</script>

<div class="w-full h-16 flex items-center justify-around">
	<img src={image} alt="logo" width="60" />

	{#if user}
		<ContextMenu>
			<IconButton href={`/profile/${user.id}`}>
				<PersonPicture size={50} src={user.avatar_url} />
			</IconButton>

			<svelte:fragment slot="flyout">
				<MenuFlyoutItem href="/admin" on:click={adminHandle}>Admin</MenuFlyoutItem>
				<MenuFlyoutDivider />
				<MenuFlyoutItem on:click={logoutHandle}>Logout</MenuFlyoutItem>
			</svelte:fragment>
		</ContextMenu>
	{:else}
		<Button variant="accent" class="w-20" on:click={loginHandle}>Login</Button>
	{/if}
</div>
