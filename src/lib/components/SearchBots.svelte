<script>
	import { Button, TextBlock, TextBox } from 'fluent-svelte';

	const tags = [
		{
			name: 'Moderation',
			href: '/bots?tag=moderation'
		},
		{
			name: 'Moderation',
			href: '/bots?tag=moderation'
		},
		{
			name: 'Moderation',
			href: '/bots?tag=moderation'
		},
		{
			name: 'Moderation',
			href: '/bots?tag=moderation'
		},
		{
			name: 'Moderation',
			href: '/bots?tag=moderation'
		},
		{
			name: 'Moderation',
			href: '/bots?tag=moderation'
		},
		{
			name: 'Moderation',
			href: '/bots?tag=moderation'
		},
		{
			name: 'Moderation',
			href: '/bots?tag=moderation'
		},
		{
			name: 'Moderation',
			href: '/bots?tag=moderation'
		}
	];
</script>

<div class="w-full h-[450px] container text-white flex flex-col justify-center">
	<TextBlock variant="titleLarge">Search Bots</TextBlock>
	<div class="w-[500px] mt-4">
		<TextBox type="search" placeholder="TextBox" />
	</div>
	<div class="mt-4 items-center" id="tags">
		{#each tags as tag}
			<a href={tag.href}><Button variant="standard">#{tag.name}</Button></a>
		{/each}
	</div>
</div>

<style lang="scss">
	#tags :nth-child(n + 2) {
		margin-left: 1rem;
	}
</style>
