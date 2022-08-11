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

<div class="w-full overflow-auto ">
	{#each bots as bot}
		<div class="w-[440px] h-[276px] border rounded">
			<img src={bot.image} width="208px" alt={bot.name} />
			<div class="mx-auto">
				<a href="a"><Button>Add Server</Button></a>
				<a href="a"><Button>Vote</Button></a>
			</div>
		</div>
	{/each}
</div>
