<script lang="ts">
	import * as Card from '$lib/components/ui/card/index.js';
	import { Badge } from '$lib/components/ui/badge/index.js';
	import * as Avatar from '$lib/components/ui/avatar/index.js';
	import { Calendar, User, FileText } from '@lucide/svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	function formatDate(dateString: string) {
		return new Date(dateString).toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'short',
			day: 'numeric'
		});
	}

	function formatContent(content: string, maxLength = 100) {
		return content.length > maxLength ? content.slice(0, maxLength) + '...' : content;
	}
</script>

<svelte:head>
	<title>{data.category?.title || 'Category'} - Blog App</title>
</svelte:head>

<div class="from-background via-background to-muted/20 min-h-screen bg-gradient-to-br">
	<section class="py-16">
		<div class="container mx-auto px-4">
			{#if data.category}
				<!-- Category Header -->
				<div class="mb-12">
					<Card.Root class="overflow-hidden border-0 shadow-lg">
						<div class="relative h-48 overflow-hidden">
							<img
								src={data.category.image}
								alt={data.category.title}
								class="h-full w-full object-cover"
								loading="eager"
							/>
							<div
								class="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"
							></div>
							<div class="absolute bottom-6 left-6 text-white">
								<h1 class="mb-2 text-4xl font-bold">{data.category.title}</h1>
								<p class="text-lg opacity-90">{data.category.description}</p>
							</div>
						</div>
						<Card.Content class="p-6">
							<div class="flex items-center justify-between">
								<div class="text-muted-foreground flex items-center gap-2 text-sm">
									<Calendar class="h-4 w-4" />
									<span>Created {formatDate(data.category.createdAt)}</span>
								</div>
								<Badge variant="secondary" class="flex items-center gap-1">
									<FileText class="h-3 w-3" />
									{data.articles?.content?.length || 0} articles
								</Badge>
							</div>
						</Card.Content>
					</Card.Root>
				</div>

				<!-- Articles Section -->
				{#if data.articles?.content?.length}
					<div class="mb-8">
						<h2 class="mb-6 text-2xl font-semibold">Latest Articles</h2>
						<div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
							{#each data.articles.content as article (article.id)}
								<Card.Root class="group overflow-hidden transition-all hover:shadow-lg">
									<!-- Featured Image or Placeholder -->
									<div class="relative h-48 overflow-hidden">
										{#if article.featuredImage}
											<img
												src={article.featuredImage}
												alt={article.title}
												class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
												loading="lazy"
											/>
										{:else}
											<div class="bg-muted flex h-full w-full items-center justify-center">
												<FileText class="text-muted-foreground h-12 w-12" />
											</div>
										{/if}
									</div>
									<Card.Header class="pb-4">
										<Card.Title class="line-clamp-2 text-lg">{article.title}</Card.Title>
										<Card.Description class="line-clamp-3 text-sm">
											{formatContent(article.content)}
										</Card.Description>
									</Card.Header>
									<Card.Content class="pb-4">
										{#if article.tags?.length}
											<div class="mb-4 flex flex-wrap gap-1">
												{#each article.tags.slice(0, 3) as tag}
													<Badge variant="outline" class="text-xs">{tag}</Badge>
												{/each}
												{#if article.tags.length > 3}
													<Badge variant="outline" class="text-xs">+{article.tags.length - 3}</Badge
													>
												{/if}
											</div>
										{/if}
									</Card.Content>
									<Card.Footer class="flex items-center justify-between pt-0">
										<div class="flex items-center gap-2">
											<Avatar.Root class="h-6 w-6">
												<Avatar.Image src={article.author.avatar} alt={article.author.username} />
												<Avatar.Fallback class="text-xs">
													{article.author.username.slice(0, 2).toUpperCase()}
												</Avatar.Fallback>
											</Avatar.Root>
											<span class="text-muted-foreground text-xs">{article.author.username}</span>
										</div>
										<div class="text-muted-foreground flex items-center gap-1 text-xs">
											<Calendar class="h-3 w-3" />
											<span>{formatDate(article.createdAt)}</span>
										</div>
									</Card.Footer>
								</Card.Root>
							{/each}
						</div>
					</div>
				{:else}
					<!-- Empty State -->
					<div class="flex flex-col items-center justify-center py-16 text-center">
						<div class="mb-6 text-7xl">📝</div>
						<h3 class="mb-3 text-2xl font-semibold">No articles yet</h3>
						<p class="text-muted-foreground max-w-md">
							This category doesn't have any articles yet. Check back later!
						</p>
					</div>
				{/if}
			{:else}
				<!-- Category Not Found -->
				<div class="flex flex-col items-center justify-center py-16 text-center">
					<div class="mb-6 text-7xl">❓</div>
					<h3 class="mb-3 text-2xl font-semibold">Category not found</h3>
					<p class="text-muted-foreground max-w-md">
						The category you're looking for doesn't exist or has been removed.
					</p>
				</div>
			{/if}
		</div>
	</section>
</div>

<style>
	:global(.line-clamp-2) {
		display: -webkit-box;
		-webkit-line-clamp: 2;
		line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}

	:global(.line-clamp-3) {
		display: -webkit-box;
		-webkit-line-clamp: 3;
		line-clamp: 3;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}
</style>
