<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import { Badge } from '$lib/components/ui/badge';
	import { Button, buttonVariants } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import * as Select from '$lib/components/ui/select';
	import * as Avatar from '$lib/components/ui/avatar';
	import * as AlertDialog from '$lib/components/ui/alert-dialog';
	import TimeStamp from '$lib/components/time-stamp.svelte';
	import * as Popover from '$lib/components/ui/popover/index.js';
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
		Plus,
		EyeIcon,
		CalendarIcon,
		Trash
	} from '@lucide/svelte';
	import type { PageProps } from './$types';
	import { base } from '$app/paths';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import { enhance } from '$app/forms';

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
	let filteredArticles = articles.filter((article) => {
		const matchesSearch =
			article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
			article.category.toLowerCase().includes(searchQuery.toLowerCase());
		const matchesStatus = statusFilter.value === 'all' || article.status === statusFilter.value;
		return matchesSearch && matchesStatus;
	});

	// Stats
	let stats = {
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

	let deleteAlertDialogOpen = $state(false);
	let { data }: PageProps = $props();
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
		<!-- <Card>
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
		</Card> -->
	</div>

	<!-- Filters and Search -->
	<!-- <Card>
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
	</Card> -->

	<!-- Articles List -->
	<div class="space-y-4">
		<section class="grid grid-cols-4 gap-2">
			{#each data.myArticles?.content || [] as article}
				<Card.Root class="group overflow-hidden transition-all duration-300 hover:shadow-lg">
					<!-- Featured Image -->
					{#if article.featuredImage}
						<div class="aspect-video overflow-hidden">
							<img
								src={article.featuredImage}
								alt={article.title}
								class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
							/>
						</div>
					{:else}
						<div class="bg-muted flex aspect-video items-center justify-center">
							<EyeIcon class="text-muted-foreground h-12 w-12" />
						</div>
					{/if}

					<Card.Content class="p-6">
						<!-- Category Badge -->
						<!-- <div class="mb-3">
							<Badge variant="secondary" class="text-xs">
								{article.category?.title || 'Uncategorized'}
							</Badge>
						</div> -->

						<!-- Title -->
						<a href="{base}/articles/{article.id}">
							<h2
								class="group-hover:text-primary mb-3 line-clamp-2 text-xl font-semibold transition-colors"
							>
								{article.title}
							</h2>
						</a>

						<!-- Content Preview -->
						<p class="text-muted-foreground mb-4 line-clamp-3 text-sm">
							{@html article.content}
						</p>

						<!-- Tags -->
						{#if article.tags && article.tags.length > 0}
							<div class="mb-4 flex flex-wrap gap-1">
								{#each article.tags.slice(0, 3) as tag}
									<Badge variant="outline" class="text-xs">
										#{tag}
									</Badge>
								{/each}
								{#if article.tags.length > 3}
									<Badge variant="outline" class="text-xs">
										+{article.tags.length - 3}
									</Badge>
								{/if}
							</div>
						{/if}

						<!-- Author and Date -->
						<div class="mb-4 flex items-center justify-between">
							<div class="text-muted-foreground flex items-center text-xs">
								<CalendarIcon class="mr-1 h-3 w-3" />
								<TimeStamp date={article.createdAt} />
							</div>
						</div>
					</Card.Content>
					<Card.Footer>
						<!-- <DropdownMenu.Root>
							<DropdownMenu.Trigger class="w-full {buttonVariants({ variant: 'outline' })}">
								Actions
								<MoreHorizontal />
							</DropdownMenu.Trigger>
							<DropdownMenu.Content class=" w-80">
								<DropdownMenu.Item>Publish</DropdownMenu.Item>
								<DropdownMenu.Item>Send for Approval</DropdownMenu.Item>
								<DropdownMenu.Item>Edit</DropdownMenu.Item>
								<DropdownMenu.Item>{@render deleteConfirm(article.id)}</DropdownMenu.Item>
								<DropdownMenu.Item>View Submission Status</DropdownMenu.Item>
							</DropdownMenu.Content>
						</DropdownMenu.Root> -->

						<Popover.Root>
							<Popover.Trigger class="w-full {buttonVariants({ variant: 'outline' })}">
								Actions
								<MoreHorizontal />
							</Popover.Trigger>
							<Popover.Content class="flex w-80 flex-col gap-2">
								<Button size="sm" variant="outline" class="w-full">Publish</Button>
								<Button size="sm" variant="outline" class="w-full">Send for Approval</Button>
								<Button size="sm" variant="outline" class="w-full">Edit</Button>
								{@render deleteConfirm(article.id)}
							</Popover.Content>
						</Popover.Root>
					</Card.Footer>
				</Card.Root>
			{/each}
		</section>

		<!-- {#if data.myArticles?.content.length === 0}
			<Card.Root>
				<Card.Content class="p-12 text-center">
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
				<Card.Content/>
			</Card.Root>
		{/if} -->
	</div>
</div>

{#snippet deleteConfirm(id: string)}
	<!-- <AlertDialog.Root bind:open={deleteAlertDialogOpen}> -->
	<AlertDialog.Root>
		<AlertDialog.Trigger
			class="hover:bg-muted text-destructive flex w-full flex-row gap-2 hover:cursor-pointer"
		>
			<Button variant="outline" class="w-full">
				<Trash size="16" class="text-destructive" />
				Delete
			</Button>
		</AlertDialog.Trigger>
		<AlertDialog.Content>
			<AlertDialog.Header>
				<AlertDialog.Title>Are you sure?</AlertDialog.Title>
				<AlertDialog.Description>
					This action cannot be undone. This will permanently delete the article and remove the data
					from our servers.
				</AlertDialog.Description>
			</AlertDialog.Header>
			<AlertDialog.Footer>
				<AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
				<form
					action="?/deleteArticle"
					method="post"
					use:enhance={() => {
						return async ({ result, update }) => {
							if (result.type === 'success') {
								deleteAlertDialogOpen = false;
							}
							await update();
						};
					}}
				>
					<input type="hidden" name="articleId" value={id} />
					<AlertDialog.Action type="submit">Continue</AlertDialog.Action>
				</form>
			</AlertDialog.Footer>
		</AlertDialog.Content>
	</AlertDialog.Root>
{/snippet}
