<script>
	import {
		Button,
		PersonPicture,
		IconButton,
		MenuFlyoutItem,
		MenuFlyoutDivider,
		ContextMenu
	} from 'fluent-svelte';
	import 'fluent-svelte/theme.css';

	import image from '$lib/images/veiv.png';

	/** @type {Record<string, any> | false} */
	export let user;
</script>

<div class="w-full h-16 flex items-center justify-around">
	<div class="text-gray-100">
		<!--Logo Name-->
		<img src={image} alt="logo" width="60" />
	</div>

	{#if user}
		<ContextMenu>
			<IconButton href={`/profile/${user.id}`}>
				<PersonPicture size={50} src={user.avatar_url} />
			</IconButton>

			<svelte:fragment slot="flyout">
				<MenuFlyoutItem href="/admin">Admin</MenuFlyoutItem>
				<MenuFlyoutDivider />
				<a href="/auth/logout"><MenuFlyoutItem>Logout</MenuFlyoutItem></a>
			</svelte:fragment>
		</ContextMenu>
	{:else}
		<Button variant="accent" href="/auth/login">Login</Button>
	{/if}
</div>
