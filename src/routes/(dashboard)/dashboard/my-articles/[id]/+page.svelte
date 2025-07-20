<script lang="ts">
	import type { PageProps } from './$types';
	import * as Card from '$lib/components/ui/card';
	import { Badge } from '$lib/components/ui/badge';
	import { Button } from '$lib/components/ui/button';
	import TimeStamp from '$lib/components/time-stamp.svelte';
	import * as Avatar from '$lib/components/ui/avatar';
	import { CalendarIcon, ArrowLeftIcon, TagIcon, FolderIcon, ShareIcon } from '@lucide/svelte';

	let { data }: PageProps = $props();
	const article = data.article;

	// Function to safely render HTML content
	const renderContent = (content: string) => {
		// In a real application, you might want to sanitize this content
		return content;
	};

	const shareArticle = () => {
		if (navigator.share) {
			navigator.share({
				title: article.title,
				text: article.title,
				url: window.location.href
			});
		} else {
			// Fallback: copy to clipboard
			navigator.clipboard.writeText(window.location.href);
			// You could show a toast notification here
		}
	};
</script>

<svelte:head>
	<title>{article.title} | Blog App</title>
	<meta name="description" content={article.title} />
	<meta property="og:title" content={article.title} />
	<meta property="og:description" content={article.title} />
	{#if article.featuredImage}
		<meta property="og:image" content={article.featuredImage} />
	{/if}
</svelte:head>

<article class="container mx-auto max-w-4xl px-4 py-8">
	<!-- Back Button -->
	<div class="mb-6">
		<Button variant="ghost" size="sm" onclick={() => window.history.back()} class="mb-4">
			<ArrowLeftIcon class="mr-2 h-4 w-4" />
			Back to Articles
		</Button>
	</div>

	<!-- Article Header -->
	<header class="mb-8">
		<!-- Category -->
		<div class="mb-4">
			<Badge variant="secondary" class="inline-flex items-center">
				<FolderIcon class="mr-1 h-3 w-3" />
				{article.category?.title || 'Uncategorized'}
			</Badge>
		</div>

		<!-- Title -->
		<h1 class="tinos mb-6 text-4xl leading-tight font-bold md:text-5xl">
			{article.title}
		</h1>

		<!-- Author & Meta Info -->
		<div class="mb-6 flex flex-wrap items-center justify-between gap-4">
			<div class="flex items-center space-x-4">
				<!-- Author -->
				<div class="flex items-center space-x-3">
					<Avatar.Root class="h-12 w-12">
						<Avatar.Image src={article.author.avatar} alt={article.author.username} />
						<Avatar.Fallback class="text-sm">
							{article.author.username.charAt(0).toUpperCase()}
						</Avatar.Fallback>
					</Avatar.Root>
					<div>
						<p class="font-semibold">{article.author.username}</p>
						<div class="text-muted-foreground flex items-center text-sm">
							<CalendarIcon class="mr-1 h-4 w-4" />
							<TimeStamp date={article.createdAt} />
						</div>
					</div>
				</div>
			</div>

			<!-- Actions -->
			<div class="flex items-center space-x-2">
				<!-- Status -->
				{#if article.status === 'PUBLISHED'}
					<Badge variant="default">Published</Badge>
				{:else}
					<Badge variant="secondary">Draft</Badge>
				{/if}

				<!-- Share Button -->
				<Button variant="outline" size="sm" onclick={shareArticle}>
					<ShareIcon class="mr-2 h-4 w-4" />
					Share
				</Button>
			</div>
		</div>

		<!-- Tags -->
		{#if article.tags && article.tags.length > 0}
			<div class="mb-6 flex flex-wrap gap-2">
				{#each article.tags as tag}
					<Badge variant="outline" class="text-sm">
						<TagIcon class="mr-1 h-3 w-3" />
						{tag}
					</Badge>
				{/each}
			</div>
		{/if}
	</header>

	<!-- Featured Image -->
	{#if article.featuredImage}
		<div class="mb-8">
			<div class="aspect-video overflow-hidden rounded-lg md:aspect-[21/9]">
				<img src={article.featuredImage} alt={article.title} class="h-full w-full object-cover" />
			</div>
		</div>
	{/if}

	<!-- Article Content -->
	<div class="prose prose-lg max-w-none">
		<Card.Root class="p-8">
			<div class="content">
				{@html renderContent(article.content)}
			</div>
		</Card.Root>
	</div>

	<!-- Article Footer -->
	<footer class="mt-12 border-t pt-8">
		<div class="flex flex-wrap items-center justify-between gap-4">
			<!-- Last Updated -->
			{#if article.updatedAt !== article.createdAt}
				<div class="text-muted-foreground text-sm">
					Last updated: <TimeStamp date={article.updatedAt} />
				</div>
			{/if}

			<!-- Action Buttons -->
			<div class="flex items-center space-x-4">
				<Button variant="outline" onclick={() => window.history.back()}>← Back to Articles</Button>
				<Button variant="default" onclick={shareArticle}>Share Article</Button>
			</div>
		</div>
	</footer>

	<!-- Related Articles Section (Placeholder) -->
	<section class="mt-16">
		<h2 class="mb-6 text-2xl font-bold">More from {article.category?.title || 'this category'}</h2>
		<Card.Root class="p-6">
			<p class="text-muted-foreground text-center">
				Related articles will be displayed here in the future.
			</p>
		</Card.Root>
	</section>
</article>

<style>
	/* Custom styling for article content */
	:global(.content h1) {
		font-size: 1.875rem;
		font-weight: 700;
		margin-top: 2rem;
		margin-bottom: 1rem;
	}

	:global(.content h2) {
		font-size: 1.5rem;
		font-weight: 600;
		margin-top: 1.5rem;
		margin-bottom: 0.75rem;
	}

	:global(.content h3) {
		font-size: 1.25rem;
		font-weight: 600;
		margin-top: 1.25rem;
		margin-bottom: 0.5rem;
	}

	:global(.content p) {
		margin-bottom: 1rem;
		line-height: 1.75;
	}

	:global(.content ul),
	:global(.content ol) {
		margin-bottom: 1rem;
		margin-left: 1.5rem;
	}

	:global(.content li) {
		margin-bottom: 0.5rem;
	}

	:global(.content blockquote) {
		border-left: 4px solid hsl(var(--primary));
		padding-left: 1rem;
		font-style: italic;
		margin: 1rem 0;
	}

	:global(.content pre) {
		background-color: hsl(var(--muted));
		padding: 1rem;
		border-radius: 0.5rem;
		overflow-x: auto;
		margin: 1rem 0;
	}

	:global(.content code) {
		background-color: hsl(var(--muted));
		padding: 0.25rem 0.5rem;
		border-radius: 0.25rem;
		font-size: 0.875rem;
	}

	:global(.content img) {
		border-radius: 0.5rem;
		box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
		margin: 1.5rem 0;
		max-width: 100%;
		height: auto;
	}

	:global(.content hr) {
		margin: 2rem 0;
		border-color: hsl(var(--border));
	}

	:global(.content strong) {
		font-weight: 600;
	}

	:global(.content em) {
		font-style: italic;
	}

	:global(.content a) {
		color: hsl(var(--primary));
		text-decoration: underline;
	}

	:global(.content a:hover) {
		text-decoration: underline;
	}

	:global(.content table) {
		width: 100%;
		border-collapse: collapse;
		border: 1px solid hsl(var(--border));
		margin: 1rem 0;
	}

	:global(.content th),
	:global(.content td) {
		border: 1px solid hsl(var(--border));
		padding: 0.5rem 1rem;
	}

	:global(.content th) {
		background-color: hsl(var(--muted));
		font-weight: 600;
	}
</style>
