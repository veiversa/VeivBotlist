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
		},		{
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
		},
		{
			name: 'mee6',
			image:
				'https://www.saashub.com/images/app/service_logos/160/b5egw4e0bmyv/large.png?1602981606',
			vote: '',
			description: ''
		},

	];
	import { Button, TextBlock } from 'fluent-svelte';
</script>

<div class="container">
	<div class="text-white my-6">
		<TextBlock variant="titleLarge">Populer Bots</TextBlock>
	</div>
	<div class="flex overflow-x-auto">
		{#each bots as bot}
		<div class="w-64 bg-[#fafafa] bg-opacity-5 rounded-lg border border-[#141f24] shadow-md hover:shadow-lg hover:bg-opacity-10 transition" id="sarpklas">
			<img
				class="rounded-full mx-auto mt-4"
				src="https://www.saashub.com/images/app/service_logos/160/b5egw4e0bmyv/large.png?1602981606"
				alt=""
			/>

			<div class="p-4">
				<a href="#c">
					<h5 class="mb-1 text-2xl font-bold tracking-tight text-white">
						MEE6
					</h5>
				</a>
				<p class="mb-3 font-normal  text-gray-400">Ultra Gelişmiş Moderasyon Botu</p>
				<Button style="" variant="accent">Bot Page</Button>
			</div>
		</div>
		{/each}
	</div>
</div>


<style>
	#sarpklas {
		margin-right: 1rem;
		margin-bottom: 1rem;
		flex-grow: 0;
		flex-shrink: 0;
	}
	
	::-webkit-scrollbar {
		width: 8px;
		height: 8px;
	}

	::-webkit-scrollbar-thumb {
		background: rgba(255, 255, 255, 0.1);
		border-radius: 10px;
		background-clip: padding-box;
	}

	::-webkit-scrollbar-thumb:hover {
		background: rgba(255, 255, 255, 0.2) !important;
	}

	::-webkit-scrollbar-track {
		background: transparent;
	}
</style>