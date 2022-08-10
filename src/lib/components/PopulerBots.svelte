<script>
	let bots = [
		{
			name: 'mee6',
			image:
				'https://www.saashub.com/images/app/service_logos/160/b5egw4e0bmyv/large.png?1602981606',
			vote: '',
			description: ''
		},
		{
			name: 'mee6',
			image:
				'https://www.saashub.com/images/app/service_logos/160/b5egw4e0bmyv/large.png?1602981606',
			vote: '',
			description: ''
		},
		{
			name: 'mee6',
			image:
				'https://www.saashub.com/images/app/service_logos/160/b5egw4e0bmyv/large.png?1602981606',
			vote: '',
			description: ''
		},
		{
			name: 'mee6',
			image:
				'https://www.saashub.com/images/app/service_logos/160/b5egw4e0bmyv/large.png?1602981606',
			vote: '',
			description: ''
		},
		{
			name: 'mee6',
			image:
				'https://www.saashub.com/images/app/service_logos/160/b5egw4e0bmyv/large.png?1602981606',
			vote: '',
			description: ''
		},
		{
			name: 'mee6',
			image:
				'https://www.saashub.com/images/app/service_logos/160/b5egw4e0bmyv/large.png?1602981606',
			vote: '',
			description: ''
		}
	];
	import { Button } from 'fluent-svelte';
</script>

<div class="container grid grid-cols-1 gap-7 lg:grid-cols-2 md:grid-cols-3 sm:grid-cols-2">
	{#each bots as bot}
		<div class="w-[440px] h-[276px] grid border rounded mx-auto">
			<img src={bot.image} width="208px" alt={bot.name} />
			<div class="mx-auto">
				<a href=""><Button>Add Server</Button></a>
				<a href=""><Button>Vote</Button></a>
			</div>
		</div>
	{/each}
</div>
