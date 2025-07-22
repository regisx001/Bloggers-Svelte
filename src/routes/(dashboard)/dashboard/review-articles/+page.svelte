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
		Download
	} from '@lucide/svelte';

	// Static data for demonstration
	let articles = [
		{
			id: 1,
			title: 'Understanding SvelteKit 5: A Comprehensive Guide',
			author: 'John Doe',
			submissionDate: '2025-07-15T09:30:00Z',
			coverImage:
				'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=300&h=200&fit=crop',
			status: 'pending',
			progress: 60, // Progress percentage
			estimatedCompletion: '2025-07-22',
			wordCount: 2847,
			readTime: '12 min',
			category: 'Web Development',
			tags: ['SvelteKit', 'JavaScript', 'Framework'],
			feedback: [
				{
					id: 1,
					role: 'admin',
					name: 'Sarah Wilson',
					avatar:
						'https://images.unsplash.com/photo-1494790108755-2616b2bc7ab7?w=40&h=40&fit=crop&crop=face',
					message:
						'Great article overall! However, the section on routing could use more detailed examples. Consider adding code snippets for nested routes and dynamic parameters.',
					timestamp: '2025-07-16T10:00:00Z',
					type: 'feedback'
				},
				{
					id: 2,
					role: 'ai',
					name: 'AI Reviewer',
					avatar: null,
					message:
						'The article structure is well-organized. I suggest adding a table of contents and improving the introduction to better capture reader attention. The technical explanations are clear and accurate.',
					timestamp: '2025-07-16T12:00:00Z',
					type: 'suggestion'
				},
				{
					id: 3,
					role: 'system',
					name: 'System',
					avatar: null,
					message: 'Article submitted for review. Initial AI scan completed successfully.',
					timestamp: '2025-07-15T09:35:00Z',
					type: 'status'
				}
			],
			reviewSteps: [
				{ name: 'Submitted', completed: true },
				{ name: 'AI Review', completed: true },
				{ name: 'Admin Review', completed: false },
				{ name: 'Final Approval', completed: false }
			]
		},
		{
			id: 2,
			title: 'Mastering TypeScript: Advanced Patterns and Best Practices',
			author: 'Jane Smith',
			submissionDate: '2025-07-10T14:20:00Z',
			coverImage:
				'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=300&h=200&fit=crop',
			status: 'approved',
			progress: 100,
			publishedDate: '2025-07-18T10:00:00Z',
			wordCount: 3542,
			readTime: '15 min',
			category: 'Programming',
			tags: ['TypeScript', 'JavaScript', 'Best Practices'],
			feedback: [
				{
					id: 1,
					role: 'admin',
					name: 'Mike Johnson',
					avatar:
						'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face',
					message:
						'Excellent article! The examples are clear and the explanations are thorough. Approved for publication.',
					timestamp: '2025-07-17T16:30:00Z',
					type: 'approval'
				},
				{
					id: 2,
					role: 'ai',
					name: 'AI Reviewer',
					avatar: null,
					message:
						'High-quality content with excellent code examples. SEO optimization suggestions have been applied.',
					timestamp: '2025-07-11T09:15:00Z',
					type: 'suggestion'
				}
			],
			reviewSteps: [
				{ name: 'Submitted', completed: true },
				{ name: 'AI Review', completed: true },
				{ name: 'Admin Review', completed: true },
				{ name: 'Published', completed: true }
			]
		},
		{
			id: 3,
			title: 'CSS Grid vs Flexbox: When to Use Which',
			author: 'Alice Johnson',
			submissionDate: '2025-07-12T11:45:00Z',
			coverImage:
				'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=200&fit=crop',
			status: 'rejected',
			progress: 25,
			wordCount: 1456,
			readTime: '6 min',
			category: 'Web Design',
			tags: ['CSS', 'Layout', 'Frontend'],
			feedback: [
				{
					id: 1,
					role: 'admin',
					name: 'Sarah Wilson',
					avatar:
						'https://images.unsplash.com/photo-1494790108755-2616b2bc7ab7?w=40&h=40&fit=crop&crop=face',
					message:
						'The comparison lacks depth and practical examples. Please provide more real-world use cases, interactive demos, and detailed explanations of when to choose each layout method. The article needs significant expansion.',
					timestamp: '2025-07-13T09:00:00Z',
					type: 'rejection'
				},
				{
					id: 2,
					role: 'ai',
					name: 'AI Reviewer',
					avatar: null,
					message:
						'Content structure is basic. Recommend adding more code examples, visual demonstrations, and expanding the comparison criteria.',
					timestamp: '2025-07-12T14:20:00Z',
					type: 'feedback'
				}
			],
			reviewSteps: [
				{ name: 'Submitted', completed: true },
				{ name: 'AI Review', completed: true },
				{ name: 'Admin Review', completed: true },
				{ name: 'Rejected', completed: true }
			]
		}
	];

	let selectedArticle: (typeof articles)[0] | null = null;
	let showPreviewDialog = false;
	let showWithdrawDialog = false;
	let withdrawReason = '';

	function getStatusColor(status: string) {
		switch (status) {
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
		switch (status) {
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
			// Remove article from list or update status
			articles = articles.filter((a) => a.id !== selectedArticle!.id);
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

<div class="flex-1 space-y-6 p-4 pt-6 md:p-8">
	<div class="flex items-center justify-between">
		<div>
			<h2 class="text-3xl font-bold tracking-tight">Article Review Status</h2>
			<p class="text-muted-foreground">
				Track the progress and feedback of your submitted articles
			</p>
		</div>
		<div class="flex items-center gap-2">
			<Button variant="outline">
				<Download class="mr-2 h-4 w-4" />
				Export Report
			</Button>
		</div>
	</div>

	<!-- Summary Stats -->
	<div class="grid gap-4 md:grid-cols-4">
		<Card>
			<CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
				<CardTitle class="text-sm font-medium">Total Articles</CardTitle>
				<FileText class="text-muted-foreground h-4 w-4" />
			</CardHeader>
			<CardContent>
				<div class="text-2xl font-bold">{articles.length}</div>
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
					{articles.filter((a) => a.status === 'pending').length}
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
					{articles.filter((a) => a.status === 'approved').length}
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
					{articles.filter((a) => a.status === 'rejected').length}
				</div>
				<p class="text-muted-foreground text-xs">Needs revision</p>
			</CardContent>
		</Card>
	</div>

	<!-- Articles List -->
	<div class="space-y-6">
		{#each articles as article}
			<Card class="overflow-hidden">
				<CardHeader class="pb-4">
					<div class="flex items-start gap-4">
						<img
							src={article.coverImage}
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
											{article.author}
										</span>
										<span class="flex items-center gap-1">
											<Calendar class="h-3 w-3" />
											{formatDateShort(article.submissionDate)}
										</span>
										<span class="flex items-center gap-1">
											<FileText class="h-3 w-3" />
											{article.wordCount} words • {article.readTime}
										</span>
									</CardDescription>
								</div>
								<div class="flex items-center gap-2">
									<!-- {@const StatusIcon = getStatusIcon(article.status)} -->
									<Badge class="{getStatusColor(article.status)} border">
										<!-- <StatusIcon class="mr-1 h-3 w-3" /> -->
										{article.status.charAt(0).toUpperCase() + article.status.slice(1)}
									</Badge>
								</div>
							</div>

							<!-- Tags and Category -->
							<div class="flex flex-wrap items-center gap-2">
								<Badge variant="secondary">{article.category}</Badge>
								{#each article.tags as tag}
									<Badge variant="outline" class="text-xs">{tag}</Badge>
								{/each}
							</div>
						</div>
					</div>
				</CardHeader>

				<CardContent class="space-y-4">
					<!-- Progress Tracker -->
					<div class="space-y-2">
						<div class="flex items-center justify-between text-sm">
							<span class="font-medium">Review Progress</span>
							<span class="text-muted-foreground">{article.progress}%</span>
						</div>
						<Progress value={article.progress} class="h-2" />
						<div class="text-muted-foreground flex justify-between text-xs">
							{#each article.reviewSteps as step, index}
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

					<!-- Estimated Completion (for pending articles) -->
					{#if article.status === 'pending' && article.estimatedCompletion}
						<div class="rounded-lg border border-blue-200 bg-blue-50 p-3">
							<div class="flex items-center gap-2 text-sm text-blue-800">
								<Clock class="h-4 w-4" />
								<span class="font-medium"
									>Estimated completion: {formatDateShort(article.estimatedCompletion)}</span
								>
							</div>
						</div>
					{/if}

					<!-- Published Date (for approved articles) -->
					{#if article.status === 'approved' && article.publishedDate}
						<div class="rounded-lg border border-green-200 bg-green-50 p-3">
							<div class="flex items-center gap-2 text-sm text-green-800">
								<CheckCircle class="h-4 w-4" />
								<span class="font-medium">Published on {formatDate(article.publishedDate)}</span>
							</div>
						</div>
					{/if}

					<!-- Feedback Timeline -->
					{#if article.feedback.length > 0}
						<div class="space-y-3">
							<h4 class="flex items-center gap-2 text-sm font-semibold">
								<MessageCircle class="h-4 w-4" />
								Feedback Timeline
							</h4>
							<div class="max-h-64 space-y-3 overflow-y-auto">
								{#each article.feedback.slice().reverse() as feedback}
									<div class="flex items-start gap-3 rounded-lg bg-gray-50 p-3">
										<div class="flex-shrink-0">
											{#if feedback.avatar}
												<Avatar class="h-8 w-8">
													<AvatarImage src={feedback.avatar} alt={feedback.name} />
													<AvatarFallback
														>{feedback.name
															.split(' ')
															.map((n) => n[0])
															.join('')}</AvatarFallback
													>
												</Avatar>
											{:else}
												{@const FeedbackIcon = getFeedbackIcon(feedback.type)}
												<div
													class="flex h-8 w-8 items-center justify-center rounded-full border bg-white"
												>
													{#if feedback.role === 'ai'}
														<Bot class="h-4 w-4 text-blue-600" />
													{:else if feedback.role === 'system'}
														<RefreshCw class="h-4 w-4 text-gray-600" />
													{:else}
														<FeedbackIcon class="h-4 w-4 {getFeedbackColor(feedback.type)}" />
													{/if}
												</div>
											{/if}
										</div>
										<div class="flex-1 space-y-1">
											<div class="flex items-center gap-2">
												<span class="text-sm font-medium">{feedback.name}</span>
												<span class="text-muted-foreground text-xs">
													{formatDate(feedback.timestamp)}
												</span>
												{#if feedback.type !== 'status'}
													{@const TypeIcon = getFeedbackIcon(feedback.type)}
													<TypeIcon class="h-3 w-3 {getFeedbackColor(feedback.type)}" />
												{/if}
											</div>
											<p class="text-sm text-gray-700">{feedback.message}</p>
										</div>
									</div>
								{/each}
							</div>
						</div>
					{/if}

					<!-- Action Buttons -->
					<div class="flex items-center gap-2 pt-2">
						<Button variant="outline" onclick={() => handlePreview(article)}>
							<Eye class="mr-2 h-4 w-4" />
							Preview
						</Button>

						{#if article.status === 'pending'}
							<Button variant="outline" onclick={() => handleEdit(article)}>
								<Edit class="mr-2 h-4 w-4" />
								Edit
							</Button>
							<Button variant="destructive" onclick={() => handleWithdraw(article)}>
								<Trash2 class="mr-2 h-4 w-4" />
								Withdraw
							</Button>
						{:else if article.status === 'approved'}
							<Button variant="default" onclick={() => handleViewPublished(article)}>
								<ExternalLink class="mr-2 h-4 w-4" />
								View Published
							</Button>
						{:else if article.status === 'rejected'}
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

	{#if articles.length === 0}
		<Card class="py-12 text-center">
			<CardContent>
				<FileText class="text-muted-foreground mx-auto mb-4 h-12 w-12" />
				<h3 class="mb-2 text-lg font-semibold">No articles submitted yet</h3>
				<p class="text-muted-foreground mb-4">
					Start writing and submit your first article for review
				</p>
				<Button>
					<Edit class="mr-2 h-4 w-4" />
					Write Article
				</Button>
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
					src={selectedArticle.coverImage}
					alt={selectedArticle.title}
					class="h-48 w-full rounded-lg object-cover"
				/>
				<div class="prose max-w-none">
					<h1>{selectedArticle.title}</h1>
					<p class="lead">
						This is a preview of the article content. In a real application, this would show the
						actual article content with proper formatting, images, and styling.
					</p>
					<p>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
						incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
						exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
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
