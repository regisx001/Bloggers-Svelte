<script lang="ts">
	import type { PageProps } from './$types';
	import * as Card from '$lib/components/ui/card';
	import { Badge } from '$lib/components/ui/badge';
	import { Button } from '$lib/components/ui/button';
	import TimeStamp from '$lib/components/time-stamp.svelte';
	import * as Avatar from '$lib/components/ui/avatar';
	import { CalendarIcon, UserIcon, EyeIcon } from '@lucide/svelte';
	import { base } from '$app/paths';

	import ArticleCard from '$lib/components/shared/article-card.svelte';
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
				<ArticleCard {article} />
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
