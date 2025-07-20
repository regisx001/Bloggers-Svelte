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
	import { Separator } from '$lib/components/ui/separator';
	import * as Sidebar from '$lib/components/ui/sidebar';
	import {
		BarChart3,
		Eye,
		Heart,
		MessageCircle,
		Share2,
		TrendingUp,
		Users,
		Edit3,
		Calendar,
		Target
	} from '@lucide/svelte';

	// Static data for demonstration
	const stats = [
		{
			title: 'Total Views',
			value: '18,237',
			change: '+12.5%',
			trend: 'up',
			icon: Eye
		},
		{
			title: 'Unique Visitors',
			value: '9,412',
			change: '+8.2%',
			trend: 'up',
			icon: Users
		},
		{
			title: 'Total Likes',
			value: '1,247',
			change: '+15.3%',
			trend: 'up',
			icon: Heart
		},
		{
			title: 'Comments',
			value: '328',
			change: '+5.7%',
			trend: 'up',
			icon: MessageCircle
		}
	];

	const recentArticles = [
		{
			title: 'Getting Started with React Hooks',
			status: 'published',
			views: 4003,
			likes: 253,
			comments: 52,
			publishedAt: '2 days ago'
		},
		{
			title: 'Advanced CSS Grid Techniques',
			status: 'published',
			views: 1897,
			likes: 144,
			comments: 24,
			publishedAt: '5 days ago'
		},
		{
			title: 'Building Responsive Layouts',
			status: 'draft',
			views: 0,
			likes: 0,
			comments: 0,
			publishedAt: 'Draft'
		},
		{
			title: 'JavaScript ES2024 Features',
			status: 'published',
			views: 2150,
			likes: 189,
			comments: 31,
			publishedAt: '1 week ago'
		}
	];

	const quickActions = [
		{
			title: 'Write New Article',
			description: 'Start writing your next blog post',
			href: '/write',
			icon: Edit3
		},
		{
			title: 'View Analytics',
			description: 'Check your content performance',
			href: '/dashboard/analytics',
			icon: BarChart3
		},
		{
			title: 'Manage Categories',
			description: 'Organize your content topics',
			href: '/dashboard/categories',
			icon: Target
		}
	];
</script>

<div class="flex-1 space-y-4 p-4 pt-6 md:p-8">
	<div class="flex items-center justify-between space-y-2">
		<div>
			<h2 class="text-3xl font-bold tracking-tight">Dashboard Overview</h2>
			<p class="text-muted-foreground">Welcome back! Here's what's happening with your content.</p>
		</div>
		<div class="flex items-center space-x-2">
			<Button href="/write" class="flex items-center gap-2">
				<Edit3 class="h-4 w-4" />
				New Article
			</Button>
		</div>
	</div>

	<!-- Stats Cards -->
	<div class="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
		{#each stats as stat}
			<Card>
				<CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
					<CardTitle class="text-sm font-medium">{stat.title}</CardTitle>
					<svelte:component this={stat.icon} class="text-muted-foreground h-4 w-4" />
				</CardHeader>
				<CardContent>
					<div class="text-2xl font-bold">{stat.value}</div>
					<p class="text-muted-foreground flex items-center gap-1 text-xs">
						<TrendingUp class="h-3 w-3 text-green-500" />
						{stat.change} from last month
					</p>
				</CardContent>
			</Card>
		{/each}
	</div>

	<div class="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
		<!-- Recent Articles -->
		<Card class="col-span-4">
			<CardHeader>
				<CardTitle>Recent Articles</CardTitle>
				<CardDescription>Your latest published and draft articles</CardDescription>
			</CardHeader>
			<CardContent class="space-y-4">
				{#each recentArticles as article}
					<div class="flex items-center justify-between rounded-lg border p-3">
						<div class="space-y-1">
							<h4 class="leading-none font-medium">{article.title}</h4>
							<div class="text-muted-foreground flex items-center gap-2 text-sm">
								<Badge variant={article.status === 'published' ? 'default' : 'secondary'}>
									{article.status}
								</Badge>
								<span>•</span>
								<span>{article.publishedAt}</span>
							</div>
						</div>
						{#if article.status === 'published'}
							<div class="text-muted-foreground flex items-center gap-4 text-sm">
								<div class="flex items-center gap-1">
									<Eye class="h-3 w-3" />
									{article.views}
								</div>
								<div class="flex items-center gap-1">
									<Heart class="h-3 w-3" />
									{article.likes}
								</div>
								<div class="flex items-center gap-1">
									<MessageCircle class="h-3 w-3" />
									{article.comments}
								</div>
							</div>
						{/if}
					</div>
				{/each}
				<div class="pt-2">
					<Button variant="outline" href="/dashboard/my-articles" class="w-full">
						View All Articles
					</Button>
				</div>
			</CardContent>
		</Card>

		<!-- Quick Actions -->
		<Card class="col-span-3">
			<CardHeader>
				<CardTitle>Quick Actions</CardTitle>
				<CardDescription>Shortcuts to common tasks</CardDescription>
			</CardHeader>
			<CardContent class="space-y-3">
				{#each quickActions as action}
					<Button variant="outline" href={action.href} class="h-auto w-full justify-start p-4">
						<div class="flex items-start gap-3">
							<svelte:component this={action.icon} class="mt-0.5 h-5 w-5" />
							<div class="text-left">
								<div class="font-medium">{action.title}</div>
								<div class="text-muted-foreground text-sm">{action.description}</div>
							</div>
						</div>
					</Button>
				{/each}
			</CardContent>
		</Card>
	</div>

	<!-- Activity Feed -->
	<Card>
		<CardHeader>
			<CardTitle class="flex items-center gap-2">
				<Calendar class="h-5 w-5" />
				Recent Activity
			</CardTitle>
			<CardDescription>Your latest content interactions and milestones</CardDescription>
		</CardHeader>
		<CardContent>
			<div class="space-y-4">
				<div
					class="flex items-start gap-3 rounded-r-lg border-l-2 border-blue-500 bg-blue-50/50 p-3"
				>
					<div class="flex-1">
						<p class="text-sm">
							<span class="font-medium">Getting Started with React Hooks</span> reached 4,000 views
						</p>
						<p class="text-muted-foreground text-xs">2 hours ago</p>
					</div>
				</div>
				<div
					class="flex items-start gap-3 rounded-r-lg border-l-2 border-green-500 bg-green-50/50 p-3"
				>
					<div class="flex-1">
						<p class="text-sm">
							New comment on <span class="font-medium">Advanced CSS Grid Techniques</span>
						</p>
						<p class="text-muted-foreground text-xs">5 hours ago</p>
					</div>
				</div>
				<div
					class="flex items-start gap-3 rounded-r-lg border-l-2 border-purple-500 bg-purple-50/50 p-3"
				>
					<div class="flex-1">
						<p class="text-sm">
							<span class="font-medium">Building Responsive Layouts</span> was published
						</p>
						<p class="text-muted-foreground text-xs">1 day ago</p>
					</div>
				</div>
				<div
					class="flex items-start gap-3 rounded-r-lg border-l-2 border-orange-500 bg-orange-50/50 p-3"
				>
					<div class="flex-1">
						<p class="text-sm">Monthly analytics report is ready</p>
						<p class="text-muted-foreground text-xs">2 days ago</p>
					</div>
				</div>
			</div>
		</CardContent>
	</Card>
</div>
