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
	import * as Select from '$lib/components/ui/select';
	import * as Tabs from '$lib/components/ui/tabs';
	import {
		Eye,
		Heart,
		MessageCircle,
		Share2,
		TrendingUp,
		TrendingDown,
		Users,
		Calendar,
		BarChart3,
		LineChart,
		PieChart
	} from '@lucide/svelte';

	// Static data for demonstration
	let timeRange = { value: 'month', label: 'This Month' };
	let sortBy = { value: 'views', label: 'Sort by: Views' };

	const timeRangeOptions = [
		{ value: 'week', label: 'This Week' },
		{ value: 'month', label: 'This Month' },
		{ value: 'quarter', label: 'This Quarter' },
		{ value: 'year', label: 'This Year' },
		{ value: 'custom', label: 'Custom Range' }
	];

	const sortOptions = [
		{ value: 'views', label: 'Sort by: Views' },
		{ value: 'likes', label: 'Sort by: Likes' },
		{ value: 'comments', label: 'Sort by: Comments' },
		{ value: 'shares', label: 'Sort by: Shares' },
		{ value: 'ctr', label: 'Sort by: CTR' }
	];

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

	const articleAnalytics = [
		{
			title: 'Getting Started with React Hooks',
			views: 4003,
			likes: 253,
			comments: 52,
			shares: 14,
			ctr: '5.1%',
			trend: 'up',
			viewChange: '+23%'
		},
		{
			title: 'Advanced CSS Grid Techniques',
			views: 1897,
			likes: 144,
			comments: 24,
			shares: 8,
			ctr: '4.2%',
			trend: 'up',
			viewChange: '+15%'
		},
		{
			title: 'Building Responsive Layouts',
			views: 2002,
			likes: 197,
			comments: 38,
			shares: 11,
			ctr: '4.6%',
			trend: 'down',
			viewChange: '-3%'
		},
		{
			title: 'JavaScript ES2024 Features',
			views: 2150,
			likes: 189,
			comments: 31,
			shares: 11,
			ctr: '4.8%',
			trend: 'up',
			viewChange: '+18%'
		},
		{
			title: 'Svelte 5 Deep Dive',
			views: 1654,
			likes: 123,
			comments: 18,
			shares: 7,
			ctr: '3.9%',
			trend: 'up',
			viewChange: '+8%'
		}
	];

	const topCategories = [
		{ name: 'React', views: 6053, articles: 8, percentage: 33 },
		{ name: 'CSS', views: 3899, articles: 6, percentage: 21 },
		{ name: 'JavaScript', views: 3804, articles: 5, percentage: 21 },
		{ name: 'Svelte', views: 2327, articles: 4, percentage: 13 },
		{ name: 'TypeScript', views: 2154, articles: 3, percentage: 12 }
	];

	const recentActivity = [
		{
			type: 'milestone',
			description: 'Getting Started with React Hooks reached 4,000 views',
			time: '2 hours ago',
			color: 'blue'
		},
		{
			type: 'engagement',
			description: 'New comment on Advanced CSS Grid Techniques',
			time: '5 hours ago',
			color: 'green'
		},
		{
			type: 'trend',
			description: 'JavaScript ES2024 Features trending up 18%',
			time: '1 day ago',
			color: 'purple'
		},
		{
			type: 'report',
			description: 'Weekly analytics report generated',
			time: '2 days ago',
			color: 'orange'
		}
	];
</script>

<div class="flex-1 space-y-4 p-4 pt-6 md:p-8">
	<div class="flex items-center justify-between space-y-2">
		<div>
			<h2 class="text-3xl font-bold tracking-tight">Analytics</h2>
			<p class="text-muted-foreground">Track your content performance and audience engagement</p>
		</div>
		<div class="flex items-center space-x-2">
			<Select.Root type="single">
				<Select.Trigger class="w-[140px]">
					<Calendar class="mr-2 h-4 w-4" />
					<!-- <Select.Value /> -->
				</Select.Trigger>
				<Select.Content>
					{#each timeRangeOptions as option}
						<Select.Item value={option.value}>{option.label}</Select.Item>
					{/each}
				</Select.Content>
			</Select.Root>
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
						{#if stat.trend === 'up'}
							<TrendingUp class="h-3 w-3 text-green-500" />
						{:else}
							<TrendingDown class="h-3 w-3 text-red-500" />
						{/if}
						{stat.change} from last {timeRange.value}
					</p>
				</CardContent>
			</Card>
		{/each}
	</div>

	<div class="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
		<!-- Chart Placeholder -->
		<Card class="col-span-4">
			<CardHeader>
				<CardTitle class="flex items-center gap-2">
					<LineChart class="h-5 w-5" />
					Views Over Time
				</CardTitle>
				<CardDescription>Daily view counts for the selected time period</CardDescription>
			</CardHeader>
			<CardContent>
				<div
					class="border-muted-foreground/25 flex h-[300px] items-center justify-center rounded-lg border-2 border-dashed"
				>
					<div class="space-y-2 text-center">
						<BarChart3 class="text-muted-foreground mx-auto h-12 w-12" />
						<p class="text-muted-foreground text-sm">Interactive chart would be displayed here</p>
						<p class="text-muted-foreground text-xs">(Chart library integration needed)</p>
					</div>
				</div>
			</CardContent>
		</Card>

		<!-- Top Categories -->
		<Card class="col-span-3">
			<CardHeader>
				<CardTitle class="flex items-center gap-2">
					<PieChart class="h-5 w-5" />
					Top Categories
				</CardTitle>
				<CardDescription>Performance by content category</CardDescription>
			</CardHeader>
			<CardContent class="space-y-4">
				{#each topCategories as category}
					<div class="flex items-center justify-between">
						<div class="space-y-1">
							<p class="text-sm leading-none font-medium">{category.name}</p>
							<p class="text-muted-foreground text-xs">
								{category.articles} articles • {category.views.toLocaleString()} views
							</p>
						</div>
						<div class="flex items-center gap-2">
							<div class="bg-muted h-2 w-16 overflow-hidden rounded-full">
								<div
									class="bg-primary h-full rounded-full"
									style="width: {category.percentage}%"
								></div>
							</div>
							<span class="text-muted-foreground w-8 text-xs">{category.percentage}%</span>
						</div>
					</div>
				{/each}
			</CardContent>
		</Card>
	</div>

	<!-- Article Performance Table -->
	<Card>
		<CardHeader>
			<div class="flex items-center justify-between">
				<div>
					<CardTitle>Article Performance</CardTitle>
					<CardDescription>Detailed metrics for your published articles</CardDescription>
				</div>
				<Select.Root type="single">
					<Select.Trigger class="w-[160px]">
						<!-- <Select.Value /> -->
					</Select.Trigger>
					<Select.Content>
						{#each sortOptions as option}
							<Select.Item value={option.value}>{option.label}</Select.Item>
						{/each}
					</Select.Content>
				</Select.Root>
			</div>
		</CardHeader>
		<CardContent>
			<div class="rounded-md border">
				<table class="w-full">
					<thead class="border-b">
						<tr class="hover:bg-muted/50 border-b transition-colors">
							<th class="text-muted-foreground h-12 px-4 text-left align-middle font-medium"
								>Article</th
							>
							<th class="text-muted-foreground h-12 px-4 text-left align-middle font-medium"
								>Views</th
							>
							<th class="text-muted-foreground h-12 px-4 text-left align-middle font-medium"
								>Likes</th
							>
							<th class="text-muted-foreground h-12 px-4 text-left align-middle font-medium"
								>Comments</th
							>
							<th class="text-muted-foreground h-12 px-4 text-left align-middle font-medium"
								>Shares</th
							>
							<th class="text-muted-foreground h-12 px-4 text-left align-middle font-medium">CTR</th
							>
							<th class="text-muted-foreground h-12 px-4 text-left align-middle font-medium"
								>Trend</th
							>
						</tr>
					</thead>
					<tbody>
						{#each articleAnalytics as article}
							<tr class="hover:bg-muted/50 border-b transition-colors">
								<td class="p-4 align-middle">
									<div class="font-medium">{article.title}</div>
								</td>
								<td class="p-4 align-middle">
									<div class="flex items-center gap-2">
										<span>{article.views.toLocaleString()}</span>
										<Badge variant="outline" class="text-xs">
											{article.viewChange}
										</Badge>
									</div>
								</td>
								<td class="p-4 align-middle">{article.likes.toLocaleString()}</td>
								<td class="p-4 align-middle">{article.comments}</td>
								<td class="p-4 align-middle">{article.shares}</td>
								<td class="p-4 align-middle">{article.ctr}</td>
								<td class="p-4 align-middle">
									{#if article.trend === 'up'}
										<TrendingUp class="h-4 w-4 text-green-500" />
									{:else}
										<TrendingDown class="h-4 w-4 text-red-500" />
									{/if}
								</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
		</CardContent>
	</Card>

	<!-- Recent Activity -->
	<Card>
		<CardHeader>
			<CardTitle>Recent Activity</CardTitle>
			<CardDescription>Latest analytics milestones and engagement highlights</CardDescription>
		</CardHeader>
		<CardContent>
			<div class="space-y-4">
				{#each recentActivity as activity}
					<div
						class="flex items-start gap-3 border-l-2 p-3 border-{activity.color}-500 bg-{activity.color}-50/50 rounded-r-lg"
					>
						<div class="flex-1">
							<p class="text-sm">{activity.description}</p>
							<p class="text-muted-foreground text-xs">{activity.time}</p>
						</div>
					</div>
				{/each}
			</div>
		</CardContent>
	</Card>
</div>
