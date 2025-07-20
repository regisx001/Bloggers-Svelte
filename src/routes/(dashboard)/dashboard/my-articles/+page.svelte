<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import { Badge } from '$lib/components/ui/badge';
	import { Button, buttonVariants } from '$lib/components/ui/button';
	import * as Popover from '$lib/components/ui/popover';
	import CircleCheckFilledIcon from '@tabler/icons-svelte/icons/circle-check-filled';
	import * as AlertDialog from '$lib/components/ui/alert-dialog';
	import TimeStamp from '$lib/components/time-stamp.svelte';
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
		CheckIcon,
		XIcon,
		Clock,
		LoaderIcon,
		Trash
	} from '@lucide/svelte';
	import type { PageProps } from './$types';
	import { base } from '$app/paths';
	import { enhance } from '$app/forms';
	let publishAlertDialogOpen = $state(false);
	let deleteAlertDialogOpen = $state(false);
	let sendForReviewAlertDialogOpen = $state(false);
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

						<!-- Status Indicator -->
						<div class="flex items-center justify-between">
							<div class="flex items-center">
								{#if article.status === 'PUBLISHED'}
									<Badge variant="outline" class="px-1.5 text-green-600 dark:text-green-400">
										<CircleCheckFilledIcon class="mr-1 fill-green-500 dark:fill-green-400" />
										Published
									</Badge>
								{:else if article.status === 'DRAFT'}
									<Badge variant="secondary" class="px-1.5 text-gray-500">Draft</Badge>
								{:else if article.status === 'APPROVED'}
									<Badge variant="outline" class="px-1.5 text-blue-600 dark:text-blue-400">
										<CheckIcon class="mr-1" />
										Approved
									</Badge>
								{:else if article.status === 'REJECTED'}
									<Badge variant="destructive" class="px-1.5"><XIcon /> Rejected</Badge>
								{:else if article.status === 'ARCHIVED'}
									<Badge variant="outline" class="text-muted-foreground px-1.5">Archived</Badge>
								{:else if article.status === 'DELETED'}
									<Badge variant="destructive" class="px-1.5">Deleted</Badge>
								{:else if article.status === 'PENDING_REVIEW'}
									<Badge variant="outline" class="px-1.5 text-yellow-600 dark:text-yellow-400">
										<Clock />
										Pending Review
									</Badge>
								{:else if article.status === 'SCHEDULED'}
									<Badge variant="outline" class="px-1.5 text-blue-600 dark:text-blue-400"
										>Scheduled</Badge
									>
								{:else}
									<Badge variant="outline" class="text-muted-foreground px-1.5">
										<LoaderIcon class="mr-1" />
										{article.status}
									</Badge>
								{/if}
							</div>

							<!-- Read More Button -->
							<Button
								variant="ghost"
								size="sm"
								class="text-primary hover:text-primary/80"
								href="{base}/dashboard/my-articles/{article.id}"
							>
								Read More →
							</Button>
						</div>
					</Card.Content>
					<Card.Footer class="mt-auto">
						<Popover.Root>
							<Popover.Trigger class="w-full {buttonVariants({ variant: 'outline' })}">
								Actions
								<MoreHorizontal />
							</Popover.Trigger>
							<Popover.Content class="flex w-80 flex-col gap-2">
								{@render publishConfirm(article.id)}
								{@render sendForReview(article.id)}
								<Button size="sm" variant="outline" class="w-full">Edit</Button>
								{@render deleteConfirm(article.id)}
							</Popover.Content>
						</Popover.Root>
					</Card.Footer>
				</Card.Root>
			{/each}
		</section>

		{#if data.myArticles?.content.length === 0}
			<!-- <Card.Root>
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
			</Card.Root> -->
		{/if}
	</div>
</div>

{#snippet sendForReview(id: string)}
	<AlertDialog.Root bind:open={sendForReviewAlertDialogOpen}>
		<!-- <AlertDialog.Root> -->
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
								sendForReviewAlertDialogOpen = false;
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

{#snippet publishConfirm(id: string)}
	<AlertDialog.Root bind:open={publishAlertDialogOpen}>
		<!-- <AlertDialog.Root> -->
		<AlertDialog.Trigger class="hover:bg-muted  flex w-full flex-row gap-2 hover:cursor-pointer">
			<Button size="sm" variant="outline" class="w-full">Publish</Button>
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
					action="?/publishArticle"
					method="post"
					use:enhance={() => {
						return async ({ result, update }) => {
							if (result.type === 'success') {
								publishAlertDialogOpen = false;
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
	<AlertDialog.Root bind:open={deleteAlertDialogOpen}>
		<!-- <AlertDialog.Root> -->
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
