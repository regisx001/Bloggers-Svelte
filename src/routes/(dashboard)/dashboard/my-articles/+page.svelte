<script lang="ts">
	import {
		Card,
		CardContent,
		CardDescription,
		CardHeader,
		CardTitle
	} from '$lib/components/ui/card';
	import { Badge } from '$lib/components/ui/badge';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import * as Select from '$lib/components/ui/select';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import {
		Eye,
		Heart,
		MessageCircle,
		Share2,
		MoreHorizontal,
		Edit3,
		Trash2,
		Calendar,
		Search,
		Filter,
		Plus
	} from '@lucide/svelte';

	// Static data for demonstration
	let searchQuery = '';
	let statusFilter = { value: 'all', label: 'All Status' };
	let sortBy = { value: 'date', label: 'Date Created' };

	const articles = [
		{
			id: 1,
			title: 'Getting Started with React Hooks',
			status: 'published',
			views: 4003,
			likes: 253,
			comments: 52,
			shares: 14,
			publishedAt: '2024-01-15',
			updatedAt: '2024-01-15',
			category: 'React',
			excerpt:
				'Learn the fundamentals of React Hooks and how to use them effectively in your applications.'
		},
		{
			id: 2,
			title: 'Advanced CSS Grid Techniques',
			status: 'published',
			views: 1897,
			likes: 144,
			comments: 24,
			shares: 8,
			publishedAt: '2024-01-10',
			updatedAt: '2024-01-12',
			category: 'CSS',
			excerpt: 'Explore advanced CSS Grid features and create complex layouts with ease.'
		},
		{
			id: 3,
			title: 'Building Responsive Layouts',
			status: 'draft',
			views: 0,
			likes: 0,
			comments: 0,
			shares: 0,
			publishedAt: null,
			updatedAt: '2024-01-18',
			category: 'CSS',
			excerpt: 'A comprehensive guide to creating responsive web layouts that work on all devices.'
		},
		{
			id: 4,
			title: 'JavaScript ES2024 Features',
			status: 'published',
			views: 2150,
			likes: 189,
			comments: 31,
			shares: 11,
			publishedAt: '2024-01-08',
			updatedAt: '2024-01-08',
			category: 'JavaScript',
			excerpt:
				'Discover the latest JavaScript features and how they can improve your development workflow.'
		},
		{
			id: 5,
			title: 'TypeScript Best Practices',
			status: 'draft',
			views: 0,
			likes: 0,
			comments: 0,
			shares: 0,
			publishedAt: null,
			updatedAt: '2024-01-20',
			category: 'TypeScript',
			excerpt: 'Learn the best practices for writing maintainable and scalable TypeScript code.'
		},
		{
			id: 6,
			title: 'Svelte 5 Deep Dive',
			status: 'published',
			views: 1654,
			likes: 123,
			comments: 18,
			shares: 7,
			publishedAt: '2024-01-05',
			updatedAt: '2024-01-05',
			category: 'Svelte',
			excerpt:
				'An in-depth look at Svelte 5 features and what makes it special for modern web development.'
		}
	];

	const statusOptions = [
		{ value: 'all', label: 'All Status' },
		{ value: 'published', label: 'Published' },
		{ value: 'draft', label: 'Draft' },
		{ value: 'archived', label: 'Archived' }
	];

	const sortOptions = [
		{ value: 'date', label: 'Date Created' },
		{ value: 'updated', label: 'Last Updated' },
		{ value: 'views', label: 'Most Views' },
		{ value: 'likes', label: 'Most Likes' },
		{ value: 'title', label: 'Title A-Z' }
	];

	// Computed filtered articles
	$: filteredArticles = articles.filter((article) => {
		const matchesSearch =
			article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
			article.category.toLowerCase().includes(searchQuery.toLowerCase());
		const matchesStatus = statusFilter.value === 'all' || article.status === statusFilter.value;
		return matchesSearch && matchesStatus;
	});

	// Stats
	$: stats = {
		total: articles.length,
		published: articles.filter((a) => a.status === 'published').length,
		drafts: articles.filter((a) => a.status === 'draft').length,
		totalViews: articles.reduce((sum, a) => sum + a.views, 0),
		totalLikes: articles.reduce((sum, a) => sum + a.likes, 0)
	};

	function formatDate(dateString: string | null) {
		if (!dateString) return 'Never';
		return new Date(dateString).toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'short',
			day: 'numeric'
		});
	}
</script>

<div class="flex-1 space-y-4 p-4 pt-6 md:p-8">
	<div class="flex items-center justify-between space-y-2">
		<div>
			<h2 class="text-3xl font-bold tracking-tight">My Articles</h2>
			<p class="text-muted-foreground">Manage your published articles and drafts</p>
		</div>
		<div class="flex items-center space-x-2">
			<Button href="/write" class="flex items-center gap-2">
				<Plus class="h-4 w-4" />
				New Article
			</Button>
		</div>
	</div>

	<!-- Stats Cards -->
	<div class="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
		<Card>
			<CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
				<CardTitle class="text-sm font-medium">Total Articles</CardTitle>
			</CardHeader>
			<CardContent>
				<div class="text-2xl font-bold">{stats.total}</div>
			</CardContent>
		</Card>
		<Card>
			<CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
				<CardTitle class="text-sm font-medium">Published</CardTitle>
			</CardHeader>
			<CardContent>
				<div class="text-2xl font-bold">{stats.published}</div>
			</CardContent>
		</Card>
		<Card>
			<CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
				<CardTitle class="text-sm font-medium">Drafts</CardTitle>
			</CardHeader>
			<CardContent>
				<div class="text-2xl font-bold">{stats.drafts}</div>
			</CardContent>
		</Card>
		<Card>
			<CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
				<CardTitle class="text-sm font-medium">Total Views</CardTitle>
			</CardHeader>
			<CardContent>
				<div class="text-2xl font-bold">{stats.totalViews.toLocaleString()}</div>
			</CardContent>
		</Card>
		<Card>
			<CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
				<CardTitle class="text-sm font-medium">Total Likes</CardTitle>
			</CardHeader>
			<CardContent>
				<div class="text-2xl font-bold">{stats.totalLikes.toLocaleString()}</div>
			</CardContent>
		</Card>
	</div>

	<!-- Filters and Search -->
	<Card>
		<CardHeader>
			<div class="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
				<div class="flex flex-1 items-center gap-2">
					<div class="relative max-w-sm flex-1">
						<Search class="text-muted-foreground absolute top-2.5 left-2 h-4 w-4" />
						<Input placeholder="Search articles..." bind:value={searchQuery} class="pl-8" />
					</div>
					<Select.Root type="single">
						<Select.Trigger class="w-[140px]">
							<Filter class="mr-2 h-4 w-4" />
						</Select.Trigger>
						<Select.Content>
							{#each statusOptions as option}
								<Select.Item value={option.value}>{option.label}</Select.Item>
							{/each}
						</Select.Content>
					</Select.Root>
					<Select.Root type="single">
						<Select.Trigger class="w-[140px]">Something here</Select.Trigger>
						<Select.Content>
							{#each sortOptions as option}
								<Select.Item value={option.value}>{option.label}</Select.Item>
							{/each}
						</Select.Content>
					</Select.Root>
				</div>
			</div>
		</CardHeader>
	</Card>

	<!-- Articles List -->
	<div class="space-y-4">
		{#each filteredArticles as article}
			<Card class="transition-shadow hover:shadow-md">
				<CardContent class="p-6">
					<div class="flex items-start justify-between">
						<div class="flex-1 space-y-2">
							<div class="flex items-center gap-2">
								<h3 class="text-lg leading-none font-semibold tracking-tight">
									{article.title}
								</h3>
								<Badge variant={article.status === 'published' ? 'default' : 'secondary'}>
									{article.status}
								</Badge>
								<Badge variant="outline">{article.category}</Badge>
							</div>
							<p class="text-muted-foreground text-sm">
								{article.excerpt}
							</p>
							<div class="text-muted-foreground flex items-center gap-4 text-sm">
								<div class="flex items-center gap-1">
									<Calendar class="h-3 w-3" />
									{article.status === 'published' ? 'Published' : 'Updated'}: {formatDate(
										article.status === 'published' ? article.publishedAt : article.updatedAt
									)}
								</div>
								{#if article.status === 'published'}
									<div class="flex items-center gap-4">
										<div class="flex items-center gap-1">
											<Eye class="h-3 w-3" />
											{article.views.toLocaleString()}
										</div>
										<div class="flex items-center gap-1">
											<Heart class="h-3 w-3" />
											{article.likes.toLocaleString()}
										</div>
										<div class="flex items-center gap-1">
											<MessageCircle class="h-3 w-3" />
											{article.comments}
										</div>
										<div class="flex items-center gap-1">
											<Share2 class="h-3 w-3" />
											{article.shares}
										</div>
									</div>
								{/if}
							</div>
						</div>
						<DropdownMenu.Root>
							<DropdownMenu.Trigger>
								<Button variant="ghost" size="sm">
									<MoreHorizontal class="h-4 w-4" />
								</Button>
							</DropdownMenu.Trigger>
							<DropdownMenu.Content align="end">
								<DropdownMenu.Item class="flex items-center gap-2">
									<Edit3 class="h-4 w-4" />
									Edit
								</DropdownMenu.Item>
								<DropdownMenu.Item class="flex items-center gap-2">
									<Eye class="h-4 w-4" />
									View
								</DropdownMenu.Item>
								<DropdownMenu.Separator />
								<DropdownMenu.Item class="text-destructive flex items-center gap-2">
									<Trash2 class="h-4 w-4" />
									Delete
								</DropdownMenu.Item>
							</DropdownMenu.Content>
						</DropdownMenu.Root>
					</div>
				</CardContent>
			</Card>
		{/each}

		{#if filteredArticles.length === 0}
			<Card>
				<CardContent class="p-12 text-center">
					<div class="text-muted-foreground">
						{#if searchQuery || statusFilter.value !== 'all'}
							No articles found matching your filters.
						{:else}
							No articles yet. Create your first article to get started!
						{/if}
					</div>
					{#if !searchQuery && statusFilter.value === 'all'}
						<Button href="/write" class="mt-4">
							<Plus class="mr-2 h-4 w-4" />
							Write Your First Article
						</Button>
					{/if}
				</CardContent>
			</Card>
		{/if}
	</div>
</div>
