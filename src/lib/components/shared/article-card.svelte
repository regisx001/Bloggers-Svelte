<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import { Button } from '$lib/components/ui/button';
	import { CalendarIcon, EyeIcon } from '@lucide/svelte';
	import { Badge } from '../ui/badge';
	import { base } from '$app/paths';
	import * as Avatar from '../ui/avatar';
	import TimeStamp from '../time-stamp.svelte';

	let { article }: { article: Article } = $props();
</script>

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
		<!-- <div class="flex items-center justify-between">
			<div class="flex items-center">
				{#if article.isPublished}
					<Badge variant="default" class="text-xs">Published</Badge>
				{:else}
					<Badge variant="secondary" class="text-xs">Draft</Badge>
				{/if}
			</div>

			<Button
				variant="ghost"
				size="sm"
				class="text-primary hover:text-primary/80"
				onclick={() => (window.location.href = `/articles/${article.id}`)}
			>
				Read More →
			</Button>
		</div> -->
	</Card.Content>
</Card.Root>
