<script lang="ts">
	//  DEPRECATED: WERE GOING TO TRY A DIFFRENT APPROCH WITH CATEGORIES

	import * as Card from '$lib/components/ui/card/index.js';
	import { Badge } from '$lib/components/ui/badge/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Search, Calendar, Users } from '@lucide/svelte';
	import type { PageProps } from './$types';
	import { base } from '$app/paths';

	// Dummy data simulating API response

	function formatDate(dateString: string) {
		return new Date(dateString).toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'short',
			day: 'numeric'
		});
	}

	let { data }: PageProps = $props();
</script>

<svelte:head>
	<title>Categories - Blog App</title>
</svelte:head>

<div class="from-background via-background to-muted/20 min-h-screen bg-gradient-to-br">
	<section class="py-16">
		<div class="container mx-auto px-4">
			<!-- Header -->
			<div class="mb-12 text-center">
				<h1 class="mb-4 text-4xl font-bold tracking-tight lg:text-5xl">Explore Categories</h1>
				<p class="text-muted-foreground mx-auto max-w-2xl text-lg">
					Discover communities and topics that interest you
				</p>
			</div>

			<!-- Search -->
			<div class="mb-12 flex justify-center">
				<div class="relative w-full max-w-lg">
					<Search class="text-muted-foreground absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2" />
					<Input placeholder="Search categories..." class="h-12 border-2 pr-4 pl-12 text-base" />
				</div>
			</div>

			<!-- Stats -->
			<!-- <div class="text-muted-foreground mb-12 flex items-center justify-center gap-8 text-sm">
				<div class="flex items-center gap-2">
					<Users class="h-4 w-4" />
					<span>{data.categories.totalElements} categories</span>
				</div>
				<div class="flex items-center gap-2">
					<Badge variant="secondary">
						{filteredCategories.length} shown
					</Badge>
				</div>
			</div> -->

			<!-- Categories Grid -->
			<div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
				{#each data.categories?.content || [] as category (category.id)}
					<Card.Root
						class="group overflow-hidden border-0 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
					>
						<div class="relative overflow-hidden">
							<img
								src={category.image}
								alt={category.title}
								class="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-105"
								loading="lazy"
							/>
							<div
								class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 transition-opacity group-hover:opacity-100"
							></div>
						</div>
						<Card.Header class="pb-4">
							<Card.Title class="text-xl font-semibold">{category.title}</Card.Title>
							<Card.Description class="line-clamp-2 text-sm leading-relaxed">
								{category.description}
							</Card.Description>
						</Card.Header>
						<Card.Footer class="flex items-center justify-between pt-0">
							<div class="text-muted-foreground flex items-center gap-2 text-xs">
								<Calendar class="h-3 w-3" />
								<span>{formatDate(category.createdAt)}</span>
							</div>
							<Button
								href="{base}/categories/{category.title}"
								size="sm"
								variant="ghost"
								class="group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
							>
								Explore
							</Button>
						</Card.Footer>
					</Card.Root>
				{/each}
			</div>

			<!-- Empty State -->
			{#if data.categories?.empty}
				<div class="flex flex-col items-center justify-center py-16 text-center">
					<div class="mb-6 text-7xl">🔍</div>
					<h3 class="mb-3 text-2xl font-semibold">No categories found</h3>
					<p class="text-muted-foreground mb-6 max-w-md">
						Try adjusting your search terms or browse all categories
					</p>
					<Button variant="outline" size="lg">Clear search</Button>
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
</style>
