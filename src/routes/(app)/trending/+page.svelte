<script lang="ts">
	import type { PageProps } from './$types';
	import * as Card from '$lib/components/ui/card';
	import { Badge } from '$lib/components/ui/badge';
	import { Button } from '$lib/components/ui/button';
	import { Select } from '$lib/components/ui/select';
	import TimeStamp from '$lib/components/time-stamp.svelte';
	import * as Avatar from '$lib/components/ui/avatar';
	import ArticleCard from '$lib/components/shared/article-card.svelte';
	import { Clock, Eye, BookmarkIcon } from '@lucide/svelte';

	let { data }: PageProps = $props();

	// Active time range state
	let activeTimeRange = $state('today');

	// Active category state
	let activeCategory = $state('all');

	// Sort option state
	let sortOption = $state('most-viewed');

	const timeRanges = [
		{ id: 'today', label: 'Today' },
		{ id: 'week', label: 'This week' },
		{ id: 'month', label: 'This month' },
		{ id: 'all', label: 'All time' }
	];

	const categories = [
		{ id: 'all', label: 'All' },
		{ id: 'engineering', label: 'Engineering' },
		{ id: 'design', label: 'Design' },
		{ id: 'ai', label: 'AI' },
		{ id: 'business', label: 'Business' }
	];

	const sortOptions = [
		{ value: 'most-viewed', label: 'Most viewed' },
		{ value: 'most-discussed', label: 'Most discussed' },
		{ value: 'most-shared', label: 'Most shared' },
		{ value: 'newest', label: 'Newest' }
	];

	const topTags = [
		{ id: 'ai', label: '#ai' },
		{ id: 'design', label: '#design' },
		{ id: 'engineering', label: '#engineering' },
		{ id: 'postgres', label: '#postgres' },
		{ id: 'growth', label: '#growth' }
	];

	const topAuthors = [
		{
			name: 'Jane Doe',
			followers: '54.2k',
			avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=jane'
		},
		{
			name: 'Alex Lee',
			followers: '38.9k',
			avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=alex'
		},
		{
			name: 'Sam Wu',
			followers: '31.4k',
			avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sam'
		}
	];

	const mostDiscussed = [
		{
			title: 'Rethinking Microservices Boundaries',
			comments: 412,
			views: '7.8k'
		},
		{
			title: 'Design Docs that Engineers Love',
			comments: 287,
			views: '6.1k'
		},
		{
			title: 'Latency Budgets for Real Apps',
			comments: 230,
			views: '5.3k'
		}
	];
</script>

<main class="mx-auto max-w-7xl px-4 py-6">
	<!-- Page header -->
	<div class="mb-4 flex flex-wrap items-end justify-between gap-3">
		<div>
			<h1 class="text-2xl font-semibold">Trending</h1>
			<p class="text-muted-foreground text-sm">What readers are engaging with right now</p>
		</div>
		<!-- Time range -->
		<div class="bg-card flex items-center gap-1 rounded-lg border p-1">
			{#each timeRanges as range}
				<Button
					variant={activeTimeRange === range.id ? 'secondary' : 'ghost'}
					size="sm"
					onclick={() => (activeTimeRange = range.id)}
				>
					{range.label}
				</Button>
			{/each}
		</div>
	</div>

	<!-- Hero top trend -->
	<Card.Root class="grid grid-cols-1 gap-4 md:grid-cols-5">
		<!-- Media -->
		<div class="md:col-span-2">
			<img
				src="https://source.unsplash.com/random/800x600?technology"
				alt="Article cover"
				class="h-48 w-full rounded-lg object-cover md:h-56 lg:h-64"
			/>
		</div>
		<!-- Content -->
		<div class="md:col-span-3">
			<div class="flex items-center gap-2 text-xs">
				<Badge variant="outline">Top story</Badge>
				<span class="text-muted-foreground">•</span>
				<span class="text-muted-foreground flex items-center gap-1">
					<Clock class="h-3 w-3" /> 12 min read
				</span>
				<span class="text-muted-foreground">•</span>
				<span class="text-muted-foreground flex items-center gap-1">
					<Eye class="h-3 w-3" /> 34k views
				</span>
			</div>
			<h2 class="mt-2 text-xl font-semibold">The Architecture Behind Instant Search at Scale</h2>
			<p class="text-muted-foreground mt-2 text-sm">
				A high-level breakdown of indexing strategies, caching layers, and query routing used to
				deliver sub-100ms relevance at global scale.
			</p>
			<div class="mt-4 flex flex-wrap items-center gap-3">
				<div class="flex items-center gap-2">
					<Avatar.Root class="h-6 w-6">
						<Avatar.Image src="https://api.dicebear.com/7.x/avataaars/svg?seed=hero" alt="Author" />
						<Avatar.Fallback>JD</Avatar.Fallback>
					</Avatar.Root>
					<span class="text-sm">Jane Doe</span>
					<span class="text-muted-foreground text-sm">·</span>
					<span class="text-muted-foreground text-sm">Sep 24</span>
				</div>
				<div class="ml-auto flex items-center gap-2">
					<Button variant="outline" size="sm">
						<BookmarkIcon class="mr-1 h-4 w-4" />
						Save
					</Button>
					<Button size="sm">Read</Button>
				</div>
			</div>
		</div>
	</Card.Root>

	<!-- Controls -->
	<section class="mt-6 flex flex-wrap items-center justify-between gap-3">
		<div class="flex flex-wrap items-center gap-2">
			{#each categories as category}
				<Button
					variant={activeCategory === category.id ? 'secondary' : 'outline'}
					size="sm"
					class="rounded-full"
					onclick={() => (activeCategory = category.id)}
				>
					{category.label}
				</Button>
			{/each}
		</div>
		<div class="flex items-center gap-2">
			<span class="text-muted-foreground text-sm">Sort</span>
			<Select
				value={sortOption}
				onValueChange={(value) => (sortOption = value)}
				options={sortOptions}
				class="w-40"
			/>
		</div>
	</section>

	<!-- Content + Sidebar grid -->
	<section class="mt-4 grid grid-cols-1 gap-6 lg:grid-cols-12">
		<!-- Trending grid -->
		<div class="lg:col-span-8">
			<div class="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
				{#each data?.articles?.content || [] as article}
					<ArticleCard {article} />
				{/each}
			</div>

			<!-- Load more -->
			<div class="mt-6 flex justify-center">
				<Button variant="outline">Load more</Button>
			</div>
		</div>

		<!-- Sidebar -->
		<aside class="space-y-4 lg:col-span-4">
			<!-- Top tags -->
			<Card.Root>
				<Card.Header>
					<Card.Title class="text-sm">Top tags</Card.Title>
				</Card.Header>
				<Card.Content>
					<div class="flex flex-wrap gap-2">
						{#each topTags as tag}
							<Badge variant="outline" class="hover:bg-secondary cursor-pointer rounded-full">
								{tag.label}
							</Badge>
						{/each}
					</div>
				</Card.Content>
			</Card.Root>

			<!-- Top authors -->
			<Card.Root>
				<Card.Header>
					<Card.Title class="text-sm">Top authors</Card.Title>
				</Card.Header>
				<Card.Content>
					<ul class="space-y-3">
						{#each topAuthors as author}
							<li class="flex items-center justify-between">
								<div class="flex items-center gap-3">
									<Avatar.Root class="h-8 w-8">
										<Avatar.Image src={author.avatar} alt={author.name} />
										<Avatar.Fallback>{author.name[0]}</Avatar.Fallback>
									</Avatar.Root>
									<div>
										<div class="text-sm font-medium">{author.name}</div>
										<div class="text-muted-foreground text-xs">{author.followers} followers</div>
									</div>
								</div>
								<Button variant="outline" size="sm">Follow</Button>
							</li>
						{/each}
					</ul>
				</Card.Content>
			</Card.Root>

			<!-- Most discussed -->
			<Card.Root>
				<Card.Header>
					<Card.Title class="text-sm">Most discussed</Card.Title>
				</Card.Header>
				<Card.Content>
					<ul class="space-y-3">
						{#each mostDiscussed as article}
							<li>
								<a href="#" class="block text-sm font-medium hover:underline">{article.title}</a>
								<div class="text-muted-foreground text-xs">
									{article.comments} comments · {article.views} views
								</div>
							</li>
						{/each}
					</ul>
				</Card.Content>
			</Card.Root>
		</aside>
	</section>
</main>
