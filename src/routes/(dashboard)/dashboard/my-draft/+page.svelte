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
	import { toast } from 'svelte-sonner';

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
	import { enhance } from '$app/forms';

	let deleteAlertDialogOpen = $state(false);
	let { data, form }: PageProps = $props();

	$effect(() => {
		if (form?.success) {
			if (form?.action === 'sendForReview') {
				// createDialogOpen = false;
				toast(form?.message || 'Article awaiting review');
			} else if (form?.action === 'delete') {
				toast.error(form?.message);
			} else {
				toast.info(form?.message);
			}
		}
	});
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
					<Card.Footer class="mt-auto">
						<Popover.Root>
							<Popover.Trigger class="w-full {buttonVariants({ variant: 'outline' })}">
								Actions
								<MoreHorizontal />
							</Popover.Trigger>
							<Popover.Content class="flex w-80 flex-col gap-2">
								<Button size="sm" variant="outline" class="w-full">Publish</Button>
								{@render sendForReview(article.id)}
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
{#snippet sendForReview(id: string)}
	<!-- <AlertDialog.Root bind:open={deleteAlertDialogOpen}> -->
	<AlertDialog.Root>
		<AlertDialog.Trigger class="hover:bg-muted  flex w-full flex-row gap-2 hover:cursor-pointer">
			<Button size="sm" variant="outline" class="w-full">Send for Approval</Button>
		</AlertDialog.Trigger>
		<AlertDialog.Content>
			<AlertDialog.Header>
				<AlertDialog.Title>Are you sure?</AlertDialog.Title>
				<AlertDialog.Description>
					This action cannot be undone. This Article will be send for reviwing by our admins ?.
				</AlertDialog.Description>
			</AlertDialog.Header>
			<AlertDialog.Footer>
				<AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
				<form
					action="?/sendForReview"
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
