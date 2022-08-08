<script>
	// @ts-nocheck

	import {
		Button,
		TextBlock,
		PersonPicture,
		TextBox,
		IconButton,
		InfoBar,
		MenuFlyout,
		MenuFlyoutItem,
		MenuFlyoutDivider
	} from 'fluent-svelte';
	import 'fluent-svelte/theme.css';

	export let user;
</script>

<main class="w-full h-16 flex items-center justify-around">
	<div class="text-gray-100">
		<!--Logo Name-->
		<TextBlock variant="title">VeivBotlist</TextBlock>
	</div>
	<div class="w-[450px]">
		<!--Search-->
		<TextBox type="search" placeholder="Search Bots!" />
	</div>

	{#if user}
		<div class="">
			<MenuFlyout placement="bottom" closeOnSelect=false>
				<IconButton>
					<PersonPicture size={50} src={user.avatar_url} />
				</IconButton>

				<svelte:fragment slot="flyout" >
					<MenuFlyoutItem>anan</MenuFlyoutItem>
					<MenuFlyoutDivider />
					<MenuFlyoutItem>anan</MenuFlyoutItem>
					<MenuFlyoutItem>anan</MenuFlyoutItem>
				</svelte:fragment>
			</MenuFlyout>
		</div>
	{:else}
		<a href="/auth/login"><Button variant="hyperlink">Login</Button></a>
	{/if}
</main>
