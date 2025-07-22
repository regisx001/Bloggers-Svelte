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
	import { Avatar, AvatarFallback, AvatarImage } from '$lib/components/ui/avatar';
	import { Progress } from '$lib/components/ui/progress';
	import * as Dialog from '$lib/components/ui/dialog';
	import { Separator } from '$lib/components/ui/separator';
	import { Textarea } from '$lib/components/ui/textarea';
	import * as Select from '$lib/components/ui/select';
	import {
		Edit,
		Trash2,
		Eye,
		CheckCircle,
		XCircle,
		Clock,
		MessageCircle,
		ArrowRightCircle,
		Calendar,
		User,
		FileText,
		Send,
		RefreshCw,
		AlertCircle,
		Bot,
		UserCheck,
		ExternalLink,
		Download,
		Filter
	} from '@lucide/svelte';
	import type { PageProps } from './$types';

	let { data, form }: PageProps = $props();

	// Reactive state using Svelte 5 runes
	let selectedArticle: (typeof data.articles.content)[0] | null = $state(null);
	let showPreviewDialog = $state(false);
	let showWithdrawDialog = $state(false);
	let withdrawReason = $state('');
	let selectedStatusFilter = $state('all');

	// Filter options
	const statusFilterOptions = [
		{ value: 'all', label: 'All Status' },
		{ value: 'pending', label: 'Pending' },
		{ value: 'approved', label: 'Approved' },
		{ value: 'rejected', label: 'Rejected' }
	];

	// Derived state for articles
	const articles = $derived(data.articles.content || []);
	const filteredArticles = $derived(
		selectedStatusFilter === 'all'
			? articles
			: articles.filter((article) => article.status.toLowerCase() === selectedStatusFilter)
	);

	function getStatusColor(status: string) {
		const normalizedStatus = status.toLowerCase();
		switch (normalizedStatus) {
			case 'pending':
				return 'bg-yellow-100 text-yellow-800 border-yellow-200';
			case 'approved':
				return 'bg-green-100 text-green-800 border-green-200';
			case 'rejected':
				return 'bg-red-100 text-red-800 border-red-200';
			default:
				return 'bg-gray-100 text-gray-800 border-gray-200';
		}
	}

	function getStatusIcon(status: string) {
		const normalizedStatus = status.toLowerCase();
		switch (normalizedStatus) {
			case 'pending':
				return Clock;
			case 'approved':
				return CheckCircle;
			case 'rejected':
				return XCircle;
			default:
				return Clock;
		}
	}

	function getProgress(article: (typeof articles)[0]) {
		const status = article.status.toLowerCase();
		switch (status) {
			case 'pending':
				return 50;
			case 'approved':
				return 100;
			case 'rejected':
				return 25;
			default:
				return 0;
		}
	}

	function getReviewSteps(article: (typeof articles)[0]) {
		const status = article.status.toLowerCase();
		const steps = [
			{ name: 'Submitted', completed: true },
			{ name: 'Under Review', completed: status !== 'pending' },
			{ name: 'Decision Made', completed: status === 'approved' || status === 'rejected' }
		];

		if (status === 'approved') {
			steps.push({ name: 'Published', completed: article.isPublished });
		}

		return steps;
	}

	function getFeedbackIcon(type: string) {
		switch (type) {
			case 'approval':
				return CheckCircle;
			case 'rejection':
				return XCircle;
			case 'feedback':
				return MessageCircle;
			case 'suggestion':
				return AlertCircle;
			case 'status':
				return RefreshCw;
			default:
				return MessageCircle;
		}
	}

	function getFeedbackColor(type: string) {
		switch (type) {
			case 'approval':
				return 'text-green-600';
			case 'rejection':
				return 'text-red-600';
			case 'feedback':
				return 'text-blue-600';
			case 'suggestion':
				return 'text-orange-600';
			case 'status':
				return 'text-gray-600';
			default:
				return 'text-gray-600';
		}
	}

	function formatDate(dateString: string) {
		const date = new Date(dateString);
		return date.toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'long',
			day: 'numeric',
			hour: '2-digit',
			minute: '2-digit'
		});
	}

	function formatDateShort(dateString: string) {
		const date = new Date(dateString);
		return date.toLocaleDateString('en-US', {
			month: 'short',
			day: 'numeric'
		});
	}

	function handlePreview(article: (typeof articles)[0]) {
		selectedArticle = article;
		showPreviewDialog = true;
	}

	function handleWithdraw(article: (typeof articles)[0]) {
		selectedArticle = article;
		showWithdrawDialog = true;
	}

	function confirmWithdraw() {
		if (selectedArticle) {
			// In a real app, you would make an API call here
			// For now, we'll just close the dialog
			showWithdrawDialog = false;
			withdrawReason = '';
			selectedArticle = null;
		}
	}

	function handleEdit(article: (typeof articles)[0]) {
		// Navigate to edit page
		console.log('Navigate to edit:', article.id);
	}

	function handleResubmit(article: (typeof articles)[0]) {
		// Navigate to resubmit page
		console.log('Navigate to resubmit:', article.id);
	}

	function handleViewPublished(article: (typeof articles)[0]) {
		// Navigate to published article
		console.log('Navigate to published article:', article.id);
	}
</script>

<div class="flex-1 space-y-4 p-4 pt-6 md:p-8">
	<div class="flex items-center justify-between space-y-2">
		<div>
			<h2 class="text-3xl font-bold tracking-tight">Article Review Status</h2>
			<p class="text-muted-foreground">
				Track the progress and feedback of your submitted articles
			</p>
		</div>
		<div class="flex items-center space-x-2">
			<Button variant="outline">
				<Download class="mr-2 h-4 w-4" />
				Export Report
			</Button>
		</div>
	</div>

	<!-- Summary Stats -->
	<div class="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
		<Card>
			<CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
				<CardTitle class="text-sm font-medium">Total Articles</CardTitle>
				<FileText class="text-muted-foreground h-4 w-4" />
			</CardHeader>
			<CardContent>
				<div class="text-2xl font-bold">{data.articles.totalElements}</div>
				<p class="text-muted-foreground text-xs">Submitted for review</p>
			</CardContent>
		</Card>
		<Card>
			<CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
				<CardTitle class="text-sm font-medium">Pending</CardTitle>
				<Clock class="h-4 w-4 text-yellow-600" />
			</CardHeader>
			<CardContent>
				<div class="text-2xl font-bold text-yellow-600">
					{articles.filter((a) => a.status.toLowerCase() === 'pending').length}
				</div>
				<p class="text-muted-foreground text-xs">Under review</p>
			</CardContent>
		</Card>
		<Card>
			<CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
				<CardTitle class="text-sm font-medium">Approved</CardTitle>
				<CheckCircle class="h-4 w-4 text-green-600" />
			</CardHeader>
			<CardContent>
				<div class="text-2xl font-bold text-green-600">
					{articles.filter((a) => a.status.toLowerCase() === 'approved').length}
				</div>
				<p class="text-muted-foreground text-xs">Ready to publish</p>
			</CardContent>
		</Card>
		<Card>
			<CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
				<CardTitle class="text-sm font-medium">Rejected</CardTitle>
				<XCircle class="h-4 w-4 text-red-600" />
			</CardHeader>
			<CardContent>
				<div class="text-2xl font-bold text-red-600">
					{articles.filter((a) => a.status.toLowerCase() === 'rejected').length}
				</div>
				<p class="text-muted-foreground text-xs">Needs revision</p>
			</CardContent>
		</Card>
	</div>

	<!-- Filters -->
	<Card>
		<CardHeader>
			<div class="flex items-center justify-between">
				<CardTitle>Article Reviews</CardTitle>
				<div class="flex items-center gap-2">
					{#each statusFilterOptions as option}
						<Button
							variant={selectedStatusFilter === option.value ? 'default' : 'outline'}
							size="sm"
							onclick={() => (selectedStatusFilter = option.value)}
						>
							{option.label}
						</Button>
					{/each}
				</div>
			</div>
			{#if selectedStatusFilter !== 'all'}
				<CardDescription>
					Showing {filteredArticles.length}
					{statusFilterOptions.find((o) => o.value === selectedStatusFilter)?.label.toLowerCase()} article{filteredArticles.length !==
					1
						? 's'
						: ''}
				</CardDescription>
			{/if}
		</CardHeader>
	</Card>

	<!-- Articles List -->
	<div class="grid gap-4 md:grid-cols-1 lg:grid-cols-2">
		{#each filteredArticles as article}
			<Card class="overflow-hidden">
				<CardHeader class="pb-4">
					<div class="flex items-start gap-4">
						<img
							src={article.featuredImage}
							alt={article.title}
							class="h-20 w-20 rounded-lg border object-cover"
						/>
						<div class="flex-1 space-y-2">
							<div class="flex items-start justify-between">
								<div>
									<CardTitle class="line-clamp-2 text-xl">{article.title}</CardTitle>
									<CardDescription class="mt-1 flex items-center gap-4">
										<span class="flex items-center gap-1">
											<User class="h-3 w-3" />
											{article.author.username}
										</span>
										<span class="flex items-center gap-1">
											<Calendar class="h-3 w-3" />
											{formatDateShort(article.createdAt)}
										</span>
										{#if article.updatedAt !== article.createdAt}
											<span class="flex items-center gap-1 text-orange-600">
												<RefreshCw class="h-3 w-3" />
												Updated {formatDateShort(article.updatedAt)}
											</span>
										{/if}
									</CardDescription>
								</div>
								<div class="flex items-center gap-2">
									<Badge class="{getStatusColor(article.status)} border">
										{article.status.charAt(0).toUpperCase() + article.status.toLowerCase().slice(1)}
									</Badge>
								</div>
							</div>

							<!-- Tags -->
							{#if article.tags && article.tags.length > 0}
								<div class="flex flex-wrap items-center gap-2">
									{#if article.category}
										<Badge variant="secondary">{article.category}</Badge>
									{/if}
									{#each article.tags as tag}
										<Badge variant="outline" class="text-xs">#{tag}</Badge>
									{/each}
								</div>
							{/if}
						</div>
					</div>
				</CardHeader>

				<CardContent class="space-y-4">
					<!-- Progress Tracker -->
					<div class="space-y-2">
						<div class="flex items-center justify-between text-sm">
							<span class="font-medium">Review Progress</span>
							<span class="text-muted-foreground">{getProgress(article)}%</span>
						</div>
						<Progress value={getProgress(article)} class="h-2" />
						<div class="text-muted-foreground flex justify-between text-xs">
							{#each getReviewSteps(article) as step, index}
								<div class="flex flex-col items-center gap-1">
									<div
										class="flex h-6 w-6 items-center justify-center rounded-full border-2 {step.completed
											? 'border-green-500 bg-green-500 text-white'
											: 'border-gray-300'}"
									>
										{#if step.completed}
											<CheckCircle class="h-3 w-3" />
										{:else}
											<span class="text-xs">{index + 1}</span>
										{/if}
									</div>
									<span class="text-center text-xs">{step.name}</span>
								</div>
							{/each}
						</div>
					</div>

					<!-- Status-specific Information -->
					{#if article.status.toLowerCase() === 'rejected' && article.rejectedAt}
						<div class="rounded-lg border border-red-200 bg-red-50 p-3">
							<div class="flex items-center gap-2 text-sm text-red-800">
								<XCircle class="h-4 w-4" />
								<span class="font-medium">
									Rejected on {formatDate(article.rejectedAt)}
									{#if article.rejectedBy}
										by {article.rejectedBy}
									{/if}
								</span>
							</div>
							{#if article.feedback}
								<p class="mt-2 text-sm text-red-700">{article.feedback}</p>
							{/if}
						</div>
					{:else if article.status.toLowerCase() === 'approved' && article.approvedAt}
						<div class="rounded-lg border border-green-200 bg-green-50 p-3">
							<div class="flex items-center gap-2 text-sm text-green-800">
								<CheckCircle class="h-4 w-4" />
								<span class="font-medium">
									Approved on {formatDate(article.approvedAt)}
									{#if article.approvedBy}
										by {article.approvedBy}
									{/if}
								</span>
							</div>
							{#if article.isPublished && article.publishedAt}
								<p class="mt-1 text-sm text-green-700">
									Published on {formatDate(article.publishedAt)}
								</p>
							{/if}
						</div>
					{:else if article.status.toLowerCase() === 'pending'}
						<div class="rounded-lg border border-yellow-200 bg-yellow-50 p-3">
							<div class="flex items-center gap-2 text-sm text-yellow-800">
								<Clock class="h-4 w-4" />
								<span class="font-medium">Under review since {formatDate(article.createdAt)}</span>
							</div>
						</div>
					{/if}

					<!-- Action Buttons -->
					<div class="flex items-center gap-2 pt-2">
						<Button variant="outline" onclick={() => handlePreview(article)}>
							<Eye class="mr-2 h-4 w-4" />
							Preview
						</Button>

						{#if article.status.toLowerCase() === 'pending'}
							<Button variant="outline" onclick={() => handleEdit(article)}>
								<Edit class="mr-2 h-4 w-4" />
								Edit
							</Button>
							<Button variant="destructive" onclick={() => handleWithdraw(article)}>
								<Trash2 class="mr-2 h-4 w-4" />
								Withdraw
							</Button>
						{:else if article.status.toLowerCase() === 'approved'}
							{#if article.isPublished}
								<Button variant="default" onclick={() => handleViewPublished(article)}>
									<ExternalLink class="mr-2 h-4 w-4" />
									View Published
								</Button>
							{:else}
								<Button variant="outline" disabled>
									<Clock class="mr-2 h-4 w-4" />
									Awaiting Publication
								</Button>
							{/if}
						{:else if article.status.toLowerCase() === 'rejected'}
							<Button variant="default" onclick={() => handleResubmit(article)}>
								<ArrowRightCircle class="mr-2 h-4 w-4" />
								Resubmit
							</Button>
							<Button variant="outline" onclick={() => handleEdit(article)}>
								<Edit class="mr-2 h-4 w-4" />
								Edit
							</Button>
						{/if}
					</div>
				</CardContent>
			</Card>
		{/each}
	</div>

	{#if filteredArticles.length === 0}
		<Card class="py-12 text-center">
			<CardContent>
				<FileText class="text-muted-foreground mx-auto mb-4 h-12 w-12" />
				{#if selectedStatusFilter !== 'all'}
					<h3 class="mb-2 text-lg font-semibold">
						No {statusFilterOptions
							.find((o) => o.value === selectedStatusFilter)
							?.label.toLowerCase()} articles
					</h3>
					<p class="text-muted-foreground mb-4">
						No articles found with the selected status filter
					</p>
				{:else}
					<h3 class="mb-2 text-lg font-semibold">No articles submitted yet</h3>
					<p class="text-muted-foreground mb-4">
						Start writing and submit your first article for review
					</p>
					<Button href="/write">
						<Edit class="mr-2 h-4 w-4" />
						Write Article
					</Button>
				{/if}
			</CardContent>
		</Card>
	{/if}
</div>

<!-- Preview Dialog -->
<Dialog.Root bind:open={showPreviewDialog}>
	<Dialog.Content class="max-h-[90vh] max-w-4xl overflow-y-auto">
		<Dialog.Header>
			<Dialog.Title>Article Preview</Dialog.Title>
			<Dialog.Description>
				{#if selectedArticle}
					Preview of "{selectedArticle.title}"
				{/if}
			</Dialog.Description>
		</Dialog.Header>
		{#if selectedArticle}
			<div class="space-y-4">
				<img
					src={selectedArticle.featuredImage}
					alt={selectedArticle.title}
					class="h-48 w-full rounded-lg object-cover"
				/>
				<div class="space-y-2">
					<h1 class="text-2xl font-bold">{selectedArticle.title}</h1>
					<div class="text-muted-foreground flex items-center gap-4 text-sm">
						<div class="flex items-center gap-1">
							<Avatar class="h-6 w-6">
								<AvatarImage
									src={selectedArticle.author.avatar}
									alt={selectedArticle.author.username}
								/>
								<AvatarFallback>{selectedArticle.author.username[0].toUpperCase()}</AvatarFallback>
							</Avatar>
							<span>By {selectedArticle.author.username}</span>
						</div>
						<span>•</span>
						<span>{formatDate(selectedArticle.createdAt)}</span>
					</div>
					{#if selectedArticle.tags && selectedArticle.tags.length > 0}
						<div class="flex flex-wrap gap-2">
							{#each selectedArticle.tags as tag}
								<Badge variant="outline" class="text-xs">#{tag}</Badge>
							{/each}
						</div>
					{/if}
				</div>
				<div class="prose max-w-none">
					<p class="lead">
						This is a preview of the article content. In a real application, this would show the
						actual article content with proper formatting, images, and styling.
					</p>
					<p>
						The article "{selectedArticle.title}" is currently in {selectedArticle.status.toLowerCase()}
						status.
						{#if selectedArticle.feedback}
							Current feedback: {selectedArticle.feedback}
						{/if}
					</p>
				</div>
			</div>
		{/if}
		<Dialog.Footer>
			<Button variant="outline" onclick={() => (showPreviewDialog = false)}>Close</Button>
		</Dialog.Footer>
	</Dialog.Content>
</Dialog.Root>

<!-- Withdraw Dialog -->
<Dialog.Root bind:open={showWithdrawDialog}>
	<Dialog.Content>
		<Dialog.Header>
			<Dialog.Title>Withdraw Article</Dialog.Title>
			<Dialog.Description>
				Are you sure you want to withdraw this article from review? This action cannot be undone.
			</Dialog.Description>
		</Dialog.Header>
		<div class="space-y-4">
			<div class="space-y-2">
				<label for="reason" class="text-sm font-medium">Reason for withdrawal (optional)</label>
				<Textarea
					id="reason"
					bind:value={withdrawReason}
					placeholder="Please provide a reason for withdrawing this article..."
					rows={3}
				/>
			</div>
		</div>
		<Dialog.Footer>
			<Button variant="outline" onclick={() => (showWithdrawDialog = false)}>Cancel</Button>
			<Button variant="destructive" onclick={confirmWithdraw}>Withdraw Article</Button>
		</Dialog.Footer>
	</Dialog.Content>
</Dialog.Root>
