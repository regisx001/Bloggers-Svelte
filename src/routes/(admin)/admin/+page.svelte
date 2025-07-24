<script lang="ts">
	import { ChartContainer, ChartTooltip } from '$lib/components/ui/chart/index.js';
	import {
		Card,
		CardContent,
		CardDescription,
		CardHeader,
		CardTitle
	} from '$lib/components/ui/card/index.js';
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

	// Chart configurations
	const trendsChartConfig = {
		articles: {
			label: 'Articles',
			color: 'hsl(var(--chart-1))'
		},
		views: {
			label: 'Views',
			color: 'hsl(var(--chart-2))'
		},
		engagement: {
			label: 'Engagement',
			color: 'hsl(var(--chart-3))'
		}
	};

	// User growth data for the past 12 months
	const userGrowthData = [
		{ month: 'Jul 2024', users: 1250, newUsers: 125 },
		{ month: 'Aug 2024', users: 1380, newUsers: 130 },
		{ month: 'Sep 2024', users: 1520, newUsers: 140 },
		{ month: 'Oct 2024', users: 1685, newUsers: 165 },
		{ month: 'Nov 2024', users: 1842, newUsers: 157 },
		{ month: 'Dec 2024', users: 2018, newUsers: 176 },
		{ month: 'Jan 2025', users: 2205, newUsers: 187 },
		{ month: 'Feb 2025', users: 2396, newUsers: 191 },
		{ month: 'Mar 2025', users: 2583, newUsers: 187 },
		{ month: 'Apr 2025', users: 2754, newUsers: 171 },
		{ month: 'May 2025', users: 2847, newUsers: 93 },
		{ month: 'Jun 2025', users: 2847, newUsers: 0 }
	];

	const userGrowthConfig = {
		users: {
			label: 'Total Users',
			color: 'hsl(var(--chart-1))'
		},
		newUsers: {
			label: 'New Users',
			color: 'hsl(var(--chart-2))'
		}
	};

	// Page views by device type
	const deviceData = [
		{ device: 'Desktop', percentage: 45, visitors: 12450 },
		{ device: 'Mobile', percentage: 38, visitors: 10534 },
		{ device: 'Tablet', percentage: 17, visitors: 4708 }
	];

	const deviceConfig = {
		visitors: {
			label: 'Visitors',
			color: 'hsl(var(--chart-1))'
		}
	};

	// Article performance over time
	const articlePerformanceData = [
		{ week: 'Week 1', published: 12, drafts: 8, reviews: 15 },
		{ week: 'Week 2', published: 15, drafts: 12, reviews: 18 },
		{ week: 'Week 3', published: 18, drafts: 10, reviews: 22 },
		{ week: 'Week 4', published: 14, drafts: 15, reviews: 19 },
		{ week: 'Week 5', published: 20, drafts: 9, reviews: 25 },
		{ week: 'Week 6', published: 16, drafts: 11, reviews: 21 },
		{ week: 'Week 7', published: 22, drafts: 7, reviews: 28 },
		{ week: 'Week 8', published: 19, drafts: 13, reviews: 24 }
	];

	const articlePerformanceConfig = {
		published: {
			label: 'Published',
			color: 'hsl(var(--chart-1))'
		},
		drafts: {
			label: 'Drafts',
			color: 'hsl(var(--chart-2))'
		},
		reviews: {
			label: 'Under Review',
			color: 'hsl(var(--chart-3))'
		}
	};

	const categoryData = [
		{ category: 'Technology', articles: 245, percentage: 34 },
		{ category: 'Lifestyle', articles: 186, percentage: 26 },
		{ category: 'Business', articles: 142, percentage: 20 },
		{ category: 'Health', articles: 98, percentage: 14 },
		{ category: 'Travel', articles: 43, percentage: 6 }
	];

	const recentActivity = [
		{
			id: 1,
			type: 'article',
			title: 'New article published: "Advanced Svelte Patterns"',
			user: 'Sarah Johnson',
			time: '2 minutes ago',
			status: 'success'
		},
		{
			id: 2,
			type: 'user',
			title: 'New user registration: john.doe@example.com',
			user: 'System',
			time: '15 minutes ago',
			status: 'info'
		},
		{
			id: 3,
			type: 'comment',
			title: 'High engagement on "React vs Svelte Comparison"',
			user: 'Analytics Bot',
			time: '1 hour ago',
			status: 'success'
		},
		{
			id: 4,
			type: 'warning',
			title: 'Server response time spike detected',
			user: 'Monitoring',
			time: '2 hours ago',
			status: 'warning'
		},
		{
			id: 5,
			type: 'article',
			title: 'Article draft saved: "Machine Learning Basics"',
			user: 'Mike Chen',
			time: '3 hours ago',
			status: 'info'
		}
	];

	const topAuthors = [
		{ name: 'Sarah Johnson', articles: 42, views: 15600, avatar: 'SJ' },
		{ name: 'Mike Chen', articles: 38, views: 14200, avatar: 'MC' },
		{ name: 'Emily Davis', articles: 35, views: 13800, avatar: 'ED' },
		{ name: 'Alex Rodriguez', articles: 29, views: 11400, avatar: 'AR' },
		{ name: 'Jennifer Kim', articles: 26, views: 9800, avatar: 'JK' }
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

<div class="flex flex-1 flex-col gap-4 p-4 pt-0">
	<!-- Header -->
	<div class="flex items-center justify-between">
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
			<Card>
				<CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
					<CardTitle class="text-sm font-medium">{stat.title}</CardTitle>
					<stat.icon class="text-muted-foreground h-4 w-4" />
				</CardHeader>
				<CardContent>
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
				</CardContent>
			</Card>
		{/each}
	</div>

	<div class="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
		<!-- Monthly Trends Chart -->
		<Card class="col-span-4">
			<CardHeader>
				<CardTitle class="flex items-center gap-2">
					<LineChart class="h-5 w-5" />
					Content & Engagement Trends
				</CardTitle>
				<CardDescription>
					Monthly overview of articles published, page views, and user engagement
				</CardDescription>
			</CardHeader>
			<CardContent class="pl-2">
				<div class="space-y-4">
					<!-- Chart placeholder with data summary -->
					<div
						class="flex h-[200px] items-center justify-center rounded-lg border-2 border-dashed border-gray-200"
					>
						<div class="text-center">
							<BarChart3 class="text-muted-foreground mx-auto mb-4 h-12 w-12" />
							<p class="text-muted-foreground mb-2 text-sm">Interactive Chart Display</p>
							<p class="text-muted-foreground text-xs">Analytics visualization would appear here</p>
						</div>
					</div>

					<!-- Data table for monthly trends -->
					<div class="overflow-x-auto">
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
			</CardContent>
		</Card>
	</div>

	<div class="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
		<!-- Category Distribution -->
		<Card class="col-span-3">
			<CardHeader>
				<CardTitle class="flex items-center gap-2">
					<PieChart class="h-5 w-5" />
					Content Categories
				</CardTitle>
				<CardDescription>Distribution of articles by category</CardDescription>
			</CardHeader>
			<CardContent>
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
							<div class="h-1 rounded-full bg-blue-500" style="width: {category.percentage}%"></div>
						</div>
					{/each}
				</div>
			</CardContent>
		</Card>
	</div>

	<!-- Performance Metrics -->
	<div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
		<Card>
			<CardHeader>
				<CardTitle class="text-lg">System Performance</CardTitle>
				<CardDescription>Server and database metrics</CardDescription>
			</CardHeader>
			<CardContent>
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
			</CardContent>
		</Card>

		<Card>
			<CardHeader>
				<CardTitle class="text-lg">Content Statistics</CardTitle>
				<CardDescription>Latest content metrics</CardDescription>
			</CardHeader>
			<CardContent>
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
			</CardContent>
		</Card>

		<Card>
			<CardHeader>
				<CardTitle class="text-lg">User Activity</CardTitle>
				<CardDescription>Recent user engagement</CardDescription>
			</CardHeader>
			<CardContent>
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
			</CardContent>
		</Card>
	</div>
</div>
