<script lang="ts">
	import { ChartContainer, ChartTooltip } from '$lib/components/ui/chart/index.js';
	import * as Card from '$lib/components/ui/card';
	import { Badge } from '$lib/components/ui/badge/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import {
		Activity,
		Users,
		FileText,
		Eye,
		TrendingUp,
		TrendingDown,
		BarChart3,
		PieChart,
		LineChart,
		Calendar,
		Download,
		RefreshCw,
		ArrowUpRight,
		ArrowDownRight
	} from '@lucide/svelte';

	import TrendingUpIcon from '@lucide/svelte/icons/trending-up';
	import { curveLinearClosed } from 'd3-shape';
	import { scaleBand } from 'd3-scale';
	import * as Chart from '$lib/components/ui/chart/index.js';
	import { scaleUtc } from 'd3-scale';
	import { curveNatural } from 'd3-shape';
	import { Area, AreaChart, LinearGradient } from 'layerchart';
	import { Root } from '$lib/components/ui/separator';

	const usersEngagementsStats = [
		{ date: new Date('2024-01-01'), desktop: 186, mobile: 80 },
		{ date: new Date('2024-02-01'), desktop: 305, mobile: 200 },
		{ date: new Date('2024-03-01'), desktop: 237, mobile: 120 },
		{ date: new Date('2024-04-01'), desktop: 73, mobile: 190 },
		{ date: new Date('2024-05-01'), desktop: 209, mobile: 130 },
		{ date: new Date('2024-06-01'), desktop: 214, mobile: 140 }
	];

	const usersEngagementsStatsConfig = {
		desktop: { label: 'Desktop', color: 'var(--chart-1)' },
		mobile: { label: 'Mobile', color: 'var(--chart-2)' }
	} satisfies Chart.ChartConfig;

	// Sample data for analytics
	const stats = [
		{
			title: 'Total Users',
			value: '2,847',
			change: '+12.5%',
			trend: 'up' as const,
			icon: Users,
			description: 'Active registered users'
		},
		{
			title: 'Total Articles',
			value: '1,432',
			change: '+8.2%',
			trend: 'up' as const,
			icon: FileText,
			description: 'Published articles'
		},
		{
			title: 'Page Views',
			value: '89,421',
			change: '+23.1%',
			trend: 'up' as const,
			icon: Eye,
			description: 'This month'
		},
		{
			title: 'Engagement Rate',
			value: '68.4%',
			change: '-2.3%',
			trend: 'down' as const,
			icon: Activity,
			description: 'Average session time'
		}
	];

	const monthlyData = [
		{ month: 'Jan', articles: 45, views: 8200, engagement: 4100 },
		{ month: 'Feb', articles: 52, views: 9500, engagement: 4800 },
		{ month: 'Mar', articles: 48, views: 8900, engagement: 4200 },
		{ month: 'Apr', articles: 61, views: 11200, engagement: 5600 },
		{ month: 'May', articles: 55, views: 10100, engagement: 4900 },
		{ month: 'Jun', articles: 67, views: 12800, engagement: 6400 }
	];
	const categoryData = [
		{ category: 'Technology', articles: 245, percentage: 34 },
		{ category: 'Lifestyle', articles: 186, percentage: 26 },
		{ category: 'Business', articles: 142, percentage: 20 },
		{ category: 'Health', articles: 98, percentage: 14 },
		{ category: 'Travel', articles: 43, percentage: 6 }
	];
</script>

<svelte:head>
	<title>Admin Overview - Blog Admin Panel</title>
	<meta
		name="description"
		content="Comprehensive admin dashboard with analytics, user management, and content insights for the blog platform."
	/>
	<meta
		name="keywords"
		content="admin dashboard, blog analytics, content management, user statistics, admin panel"
	/>
	<meta property="og:title" content="Admin Overview - Blog Admin Panel" />
	<meta
		property="og:description"
		content="Comprehensive admin dashboard with analytics and insights"
	/>
</svelte:head>
<section class="flex-1 space-y-4 p-4 pt-6 md:p-8">
	<div class="flex flex-1 flex-col gap-4 pt-0">
		<!-- Header -->
		<div class="flex items-center justify-between pb-6">
			<div>
				<h1 class="text-3xl font-bold tracking-tight">Admin Overview</h1>
				<p class="text-muted-foreground">
					Comprehensive analytics and insights for your blog platform
				</p>
			</div>
			<div class="flex items-center gap-2">
				<Button variant="outline" size="sm">
					<Calendar class="mr-2 h-4 w-4" />
					Last 30 days
				</Button>
				<Button variant="outline" size="sm">
					<Download class="mr-2 h-4 w-4" />
					Export
				</Button>
				<Button size="sm">
					<RefreshCw class="mr-2 h-4 w-4" />
					Refresh
				</Button>
			</div>
		</div>

		<!-- Statistics Cards -->
		<div class="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
			{#each stats as stat}
				<Card.Root>
					<Card.Header class="flex flex-row items-center justify-between space-y-0 pb-2">
						<Card.Title class="text-sm font-medium">{stat.title}</Card.Title>
						<stat.icon class="text-muted-foreground h-4 w-4" />
					</Card.Header>
					<Card.Content>
						<div class="text-2xl font-bold">{stat.value}</div>
						<div class="text-muted-foreground flex items-center space-x-2 text-xs">
							<span class="flex items-center">
								{#if stat.trend === 'up'}
									<ArrowUpRight class="mr-1 h-3 w-3 text-green-500" />
									<span class="text-green-500">{stat.change}</span>
								{:else}
									<ArrowDownRight class="mr-1 h-3 w-3 text-red-500" />
									<span class="text-red-500">{stat.change}</span>
								{/if}
							</span>
							<span>from last month</span>
						</div>
						<p class="text-muted-foreground mt-1 text-xs">{stat.description}</p>
					</Card.Content>
				</Card.Root>
			{/each}
		</div>

		<div class="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
			<!-- Monthly Trends Chart -->
			<Card.Root class="col-span-4">
				<Card.Header>
					<Card.Title class="flex items-center gap-2">
						<LineChart class="h-5 w-5" />
						Content & Engagement Trends
					</Card.Title>
					<Card.Description>
						Monthly overview of articles published, page views, and user engagement
					</Card.Description>
				</Card.Header>
				<Card.Content class="pl-2">
					<div class="space-y-4">
						<!-- Chart placeholder with data summary -->

						<Card.Content>
							<Chart.Container
								config={usersEngagementsStatsConfig}
								class="aspect-auto h-[200px] w-full"
							>
								<AreaChart
									data={usersEngagementsStats}
									x="date"
									xScale={scaleUtc()}
									yPadding={[0, 25]}
									series={[
										{
											key: 'mobile',
											label: 'Mobile',
											color: 'var(--color-mobile)'
										},
										{
											key: 'desktop',
											label: 'Desktop',
											color: 'var(--color-desktop)'
										}
									]}
									seriesLayout="stack"
									props={{
										area: {
											curve: curveNatural,
											'fill-opacity': 0.4,
											line: { class: 'stroke-1' },
											motion: 'tween'
										},
										xAxis: {
											format: (v: Date) => v.toLocaleDateString('en-US', { month: 'short' }),
											ticks: usersEngagementsStats.length
										},
										yAxis: { format: () => '' }
									}}
								>
									{#snippet tooltip()}
										<Chart.Tooltip
											indicator="dot"
											labelFormatter={(v: Date) => {
												return v.toLocaleDateString('en-US', {
													month: 'long'
												});
											}}
										/>
									{/snippet}
									{#snippet marks({ series, getAreaProps })}
										{#each series as s, i (s.key)}
											<LinearGradient
												stops={[
													s.color ?? '',
													'color-mix(in lch, ' + s.color + ' 10%, transparent)'
												]}
												vertical
											>
												{#snippet children({ gradient })}
													<Area {...getAreaProps(s, i)} fill={gradient} />
												{/snippet}
											</LinearGradient>
										{/each}
									{/snippet}
								</AreaChart>
							</Chart.Container>
						</Card.Content>
						<Card.Footer>
							<div class="flex w-full items-start gap-2 text-sm">
								<div class="grid gap-2">
									<div class="flex items-center gap-2 leading-none font-medium">
										Users commitment up by 5.2% this month <TrendingUpIcon class="size-4" />
									</div>
									<div class="text-muted-foreground flex items-center gap-2 leading-none">
										January - June 2024
									</div>
								</div>
							</div>
						</Card.Footer>

						<!-- Data table for monthly trends -->
						<div class="overflow-x-auto p-4">
							<table class="w-full text-sm">
								<thead>
									<tr class="border-b">
										<th class="py-2 text-left">Month</th>
										<th class="py-2 text-right">Articles</th>
										<th class="py-2 text-right">Views</th>
										<th class="py-2 text-right">Engagement</th>
									</tr>
								</thead>
								<tbody>
									{#each monthlyData as data}
										<tr class="border-b">
											<td class="py-2 font-medium">{data.month}</td>
											<td class="py-2 text-right">
												<Badge variant="outline">{data.articles}</Badge>
											</td>
											<td class="text-muted-foreground py-2 text-right">
												{data.views.toLocaleString()}
											</td>
											<td class="text-muted-foreground py-2 text-right">
												{data.engagement.toLocaleString()}
											</td>
										</tr>
									{/each}
								</tbody>
							</table>
						</div>
					</div>
				</Card.Content>
			</Card.Root>
		</div>

		<div class="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
			<!-- Category Distribution -->
			<Card.Root class="col-span-3">
				<Card.Header>
					<Card.Title class="flex items-center gap-2">
						<PieChart class="h-5 w-5" />
						Content Categories
					</Card.Title>
					<Card.Description>Distribution of articles by category</Card.Description>
				</Card.Header>
				<Card.Content>
					<div class="space-y-3">
						{#each categoryData as category}
							<div class="flex items-center justify-between">
								<div class="flex items-center space-x-3">
									<div class="h-2 w-2 rounded-full bg-blue-500"></div>
									<span class="text-sm font-medium">{category.category}</span>
								</div>
								<div class="flex items-center space-x-2">
									<span class="text-muted-foreground text-sm">{category.articles}</span>
									<Badge variant="secondary" class="text-xs">
										{category.percentage}%
									</Badge>
								</div>
							</div>
							<div class="bg-secondary h-1 w-full rounded-full">
								<div
									class="h-1 rounded-full bg-blue-500"
									style="width: {category.percentage}%"
								></div>
							</div>
						{/each}
					</div>
				</Card.Content>
			</Card.Root>
		</div>

		<!-- Performance Metrics -->
		<div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
			<Card.Root>
				<Card.Header>
					<Card.Title class="text-lg">System Performance</Card.Title>
					<Card.Description>Server and database metrics</Card.Description>
				</Card.Header>
				<Card.Content>
					<div class="space-y-4">
						<div class="flex items-center justify-between">
							<span class="text-muted-foreground text-sm">Response Time</span>
							<span class="text-sm font-medium">127ms</span>
						</div>
						<div class="bg-secondary h-2 w-full rounded-full">
							<div class="h-2 rounded-full bg-green-500" style="width: 85%"></div>
						</div>
						<div class="flex items-center justify-between">
							<span class="text-muted-foreground text-sm">Database Load</span>
							<span class="text-sm font-medium">34%</span>
						</div>
						<div class="bg-secondary h-2 w-full rounded-full">
							<div class="h-2 rounded-full bg-blue-500" style="width: 34%"></div>
						</div>
						<div class="flex items-center justify-between">
							<span class="text-muted-foreground text-sm">Memory Usage</span>
							<span class="text-sm font-medium">67%</span>
						</div>
						<div class="bg-secondary h-2 w-full rounded-full">
							<div class="h-2 rounded-full bg-yellow-500" style="width: 67%"></div>
						</div>
					</div>
				</Card.Content>
			</Card.Root>

			<Card.Root>
				<Card.Header>
					<Card.Title class="text-lg">Content Statistics</Card.Title>
					<Card.Description>Latest content metrics</Card.Description>
				</Card.Header>
				<Card.Content>
					<div class="space-y-4">
						<div class="flex items-center justify-between">
							<span class="text-muted-foreground text-sm">Articles Today</span>
							<Badge variant="outline">12</Badge>
						</div>
						<div class="flex items-center justify-between">
							<span class="text-muted-foreground text-sm">Pending Reviews</span>
							<Badge variant="secondary">8</Badge>
						</div>
						<div class="flex items-center justify-between">
							<span class="text-muted-foreground text-sm">Draft Articles</span>
							<Badge variant="outline">24</Badge>
						</div>
						<div class="flex items-center justify-between">
							<span class="text-muted-foreground text-sm">Comments Today</span>
							<Badge variant="outline">89</Badge>
						</div>
						<div class="flex items-center justify-between">
							<span class="text-muted-foreground text-sm">New Categories</span>
							<Badge variant="outline">3</Badge>
						</div>
					</div>
				</Card.Content>
			</Card.Root>

			<Card.Root>
				<Card.Header>
					<Card.Title class="text-lg">User Activity</Card.Title>
					<Card.Description>Recent user engagement</Card.Description>
				</Card.Header>
				<Card.Content>
					<div class="space-y-4">
						<div class="flex items-center justify-between">
							<span class="text-muted-foreground text-sm">Online Users</span>
							<div class="flex items-center gap-2">
								<div class="h-2 w-2 rounded-full bg-green-500"></div>
								<Badge variant="outline">284</Badge>
							</div>
						</div>
						<div class="flex items-center justify-between">
							<span class="text-muted-foreground text-sm">New Signups</span>
							<Badge variant="secondary">23</Badge>
						</div>
						<div class="flex items-center justify-between">
							<span class="text-muted-foreground text-sm">Active Sessions</span>
							<Badge variant="outline">1,247</Badge>
						</div>
						<div class="flex items-center justify-between">
							<span class="text-muted-foreground text-sm">Avg. Session</span>
							<span class="text-sm font-medium">4m 32s</span>
						</div>
						<div class="flex items-center justify-between">
							<span class="text-muted-foreground text-sm">Bounce Rate</span>
							<span class="text-sm font-medium">31.7%</span>
						</div>
					</div>
				</Card.Content>
			</Card.Root>
		</div>
	</div>
</section>
