<script>
	let mybots = [
		{
			name: 'Emax',
			vote: 4,
			description: 'Very Cool Bot',
			image:
				'https://www.saashub.com/images/app/service_logos/160/b5egw4e0bmyv/large.png?1602981606'
		},
		{
			name: 'Arawn',
			vote: 10,
			description: 'Very Nice Bot',
			image:
				'https://www.saashub.com/images/app/service_logos/160/b5egw4e0bmyv/large.png?1602981606'
		}
	];
</script>

<main>
	<div>
		{#each mybots as allah}
			<div>
				{allah.name}
			</div>
		{/each}
	</div>
</main>

<style lang="scss">
	:global(body) {
		background-image: linear-gradient(to right, #141f24, #212121);
	}
</style>