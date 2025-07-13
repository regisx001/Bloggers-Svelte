<script lang="ts">
	import type { PageProps } from './$types';
	import * as Card from '$lib/components/ui/card';
	import { Badge } from '$lib/components/ui/badge';
	import { Button } from '$lib/components/ui/button';
	import TimeStamp from '$lib/components/time-stamp.svelte';
	import * as Avatar from '$lib/components/ui/avatar';
	import { CalendarIcon, UserIcon, EyeIcon } from '@lucide/svelte';
	import { base } from '$app/paths';

	let { data }: PageProps = $props();

	// Helper function to strip HTML tags and truncate content
	const stripHtmlAndTruncate = (html: string, maxLength: number = 150) => {
		const div = document.createElement('div');
		div.innerHTML = html;
		const text = div.textContent || div.innerText || '';
		return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
	};
</script>

<svelte:head>
	<title>Articles | Blog App</title>
	<meta name="description" content="Browse all articles on our blog platform" />
</svelte:head>

<div class="container mx-auto px-4 py-8">
	<!-- Header Section -->
	<div class="mb-8">
		<h1 class="mb-4 text-center text-4xl font-bold">Latest Articles</h1>
		<p class="text-muted-foreground mx-auto max-w-2xl text-center text-lg">
			Discover insightful articles from our community of writers covering technology, programming,
			and more.
		</p>
	</div>

	<!-- Articles Grid -->
	{#if data.articles?.content && data.articles.content.length > 0}
		<div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
			{#each data.articles.content as article}
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
						<div class="mb-3">
							<Badge variant="secondary" class="text-xs">
								{article.category?.title || 'Uncategorized'}
							</Badge>
						</div>

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
							<div class="flex items-center space-x-2">
								<Avatar.Root class="h-8 w-8">
									<Avatar.Image src={article.author.avatar} alt={article.author.username} />
									<Avatar.Fallback class="text-xs">
										{article.author.username.charAt(0).toUpperCase()}
									</Avatar.Fallback>
								</Avatar.Root>
								<div class="text-sm">
									<p class="font-medium">{article.author.username}</p>
								</div>
							</div>
							<div class="text-muted-foreground flex items-center text-xs">
								<CalendarIcon class="mr-1 h-3 w-3" />
								<TimeStamp date={article.createdAt} />
							</div>
						</div>

						<!-- Status Indicator -->
						<div class="flex items-center justify-between">
							<div class="flex items-center">
								{#if article.isPublished}
									<Badge variant="default" class="text-xs">Published</Badge>
								{:else}
									<Badge variant="secondary" class="text-xs">Draft</Badge>
								{/if}
							</div>

							<!-- Read More Button -->
							<Button
								variant="ghost"
								size="sm"
								class="text-primary hover:text-primary/80"
								onclick={() => (window.location.href = `/articles/${article.id}`)}
							>
								Read More →
							</Button>
						</div>
					</Card.Content>
				</Card.Root>
			{/each}
		</div>

		<!-- Pagination Info -->
		<div class="text-muted-foreground mt-8 text-center">
			<p class="text-sm">
				Showing {data.articles.numberOfElements} of {data.articles.totalElements} articles
				{#if data.articles.totalPages > 1}
					(Page {data.articles.number + 1} of {data.articles.totalPages})
				{/if}
			</p>
		</div>
	{:else}
		<!-- Empty State -->
		<div class="py-12 text-center">
			<div class="bg-muted mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full">
				<EyeIcon class="text-muted-foreground h-12 w-12" />
			</div>
			<h2 class="mb-2 text-2xl font-semibold">No Articles Found</h2>
			<p class="text-muted-foreground mb-4">
				There are no articles available at the moment. Check back later!
			</p>
			<Button onclick={() => (window.location.href = '/dashboard/articles')}>Create Article</Button>
		</div>
	{/if}
</div>

<style>
	.line-clamp-2 {
		display: -webkit-box;
		-webkit-line-clamp: 2;
		line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}

	.line-clamp-3 {
		display: -webkit-box;
		-webkit-line-clamp: 3;
		line-clamp: 3;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}
</style>
