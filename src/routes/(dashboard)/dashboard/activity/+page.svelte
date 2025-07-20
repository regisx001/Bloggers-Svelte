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
		Bell,
		Calendar,
		Clock,
		User,
		FileText,
		TrendingUp,
		Activity as ActivityIcon
	} from '@lucide/svelte';

	// Static data for demonstration
	let timeFilter = { value: 'week', label: 'This Week' };
	let activityType = { value: 'all', label: 'All Activity' };

	const timeFilterOptions = [
		{ value: 'day', label: 'Today' },
		{ value: 'week', label: 'This Week' },
		{ value: 'month', label: 'This Month' },
		{ value: 'quarter', label: 'This Quarter' }
	];

	const activityTypeOptions = [
		{ value: 'all', label: 'All Activity' },
		{ value: 'views', label: 'Views' },
		{ value: 'likes', label: 'Likes' },
		{ value: 'comments', label: 'Comments' },
		{ value: 'shares', label: 'Shares' },
		{ value: 'milestones', label: 'Milestones' }
	];

	const activities = [
		{
			id: 1,
			type: 'milestone',
			title: 'Article reached 4,000 views',
			description: 'Getting Started with React Hooks hit a new milestone',
			time: '2 hours ago',
			date: '2024-01-20',
			icon: TrendingUp,
			color: 'blue',
			article: 'Getting Started with React Hooks',
			value: '4,000 views'
		},
		{
			id: 2,
			type: 'comment',
			title: 'New comment received',
			description: 'John Doe commented on "Advanced CSS Grid Techniques"',
			time: '4 hours ago',
			date: '2024-01-20',
			icon: MessageCircle,
			color: 'green',
			article: 'Advanced CSS Grid Techniques',
			value: 'Great tutorial!'
		},
		{
			id: 3,
			type: 'like',
			title: 'Article liked 50 times today',
			description: 'JavaScript ES2024 Features received multiple likes',
			time: '6 hours ago',
			date: '2024-01-20',
			icon: Heart,
			color: 'red',
			article: 'JavaScript ES2024 Features',
			value: '50 likes'
		},
		{
			id: 4,
			type: 'share',
			title: 'Article shared on social media',
			description: 'Building Responsive Layouts was shared 5 times',
			time: '8 hours ago',
			date: '2024-01-20',
			icon: Share2,
			color: 'purple',
			article: 'Building Responsive Layouts',
			value: '5 shares'
		},
		{
			id: 5,
			type: 'view',
			title: 'High traffic period detected',
			description: 'Unusual spike in views across multiple articles',
			time: '12 hours ago',
			date: '2024-01-19',
			icon: Eye,
			color: 'orange',
			article: 'Multiple articles',
			value: '2,500+ views'
		},
		{
			id: 6,
			type: 'milestone',
			title: 'Total views milestone',
			description: 'Your content reached 15,000 total views',
			time: '1 day ago',
			date: '2024-01-19',
			icon: TrendingUp,
			color: 'blue',
			article: 'All articles',
			value: '15,000 views'
		},
		{
			id: 7,
			type: 'comment',
			title: 'Comment thread active',
			description: 'Long discussion started on "Svelte 5 Deep Dive"',
			time: '1 day ago',
			date: '2024-01-19',
			icon: MessageCircle,
			color: 'green',
			article: 'Svelte 5 Deep Dive',
			value: '8 comments'
		},
		{
			id: 8,
			type: 'like',
			title: 'Popular article this week',
			description: 'Advanced CSS Grid Techniques trending with likes',
			time: '2 days ago',
			date: '2024-01-18',
			icon: Heart,
			color: 'red',
			article: 'Advanced CSS Grid Techniques',
			value: '144 likes'
		}
	];

	const weeklyStats = [
		{
			title: 'Total Views',
			value: '5,847',
			change: '+23%',
			trend: 'up'
		},
		{
			title: 'New Likes',
			value: '342',
			change: '+15%',
			trend: 'up'
		},
		{
			title: 'Comments',
			value: '89',
			change: '+8%',
			trend: 'up'
		},
		{
			title: 'Shares',
			value: '47',
			change: '+12%',
			trend: 'up'
		}
	];

	const topPerformers = [
		{
			title: 'Getting Started with React Hooks',
			type: 'Most Views',
			value: '4,003 views',
			growth: '+23%'
		},
		{
			title: 'Advanced CSS Grid Techniques',
			type: 'Most Liked',
			value: '144 likes',
			growth: '+15%'
		},
		{
			title: 'JavaScript ES2024 Features',
			type: 'Most Comments',
			value: '31 comments',
			growth: '+18%'
		}
	];

	// Filter activities based on selections
	$: filteredActivities = activities.filter((activity) => {
		if (activityType.value === 'all') return true;

		const typeMap: Record<string, string[]> = {
			views: ['view'],
			likes: ['like'],
			comments: ['comment'],
			shares: ['share'],
			milestones: ['milestone']
		};

		return typeMap[activityType.value]?.includes(activity.type) ?? false;
	});

	function getActivityIcon(type: string) {
		const iconMap: Record<string, any> = {
			milestone: TrendingUp,
			comment: MessageCircle,
			like: Heart,
			share: Share2,
			view: Eye
		};
		return iconMap[type] || ActivityIcon;
	}

	function getActivityColor(type: string) {
		const colorMap: Record<string, string> = {
			milestone: 'blue',
			comment: 'green',
			like: 'red',
			share: 'purple',
			view: 'orange'
		};
		return colorMap[type] || 'gray';
	}
</script>

<div class="flex-1 space-y-4 p-4 pt-6 md:p-8">
	<div class="flex items-center justify-between space-y-2">
		<div>
			<h2 class="text-3xl font-bold tracking-tight">Activity Feed</h2>
			<p class="text-muted-foreground">Track all interactions and milestones for your content</p>
		</div>
		<div class="flex items-center space-x-2">
			<Select.Root type="single">
				<Select.Trigger class="w-[120px]">
					<Calendar class="mr-2 h-4 w-4" />
					<!-- <Select.Value /> -->
				</Select.Trigger>
				<Select.Content>
					{#each timeFilterOptions as option}
						<Select.Item value={option.value}>{option.label}</Select.Item>
					{/each}
				</Select.Content>
			</Select.Root>
			<Select.Root type="single">
				<Select.Trigger class="w-[140px]">
					<ActivityIcon class="mr-2 h-4 w-4" />
					<!-- <Select.Value /> -->
				</Select.Trigger>
				<Select.Content>
					{#each activityTypeOptions as option}
						<Select.Item value={option.value}>{option.label}</Select.Item>
					{/each}
				</Select.Content>
			</Select.Root>
		</div>
	</div>

	<!-- Weekly Stats -->
	<div class="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
		{#each weeklyStats as stat}
			<Card>
				<CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
					<CardTitle class="text-sm font-medium">{stat.title}</CardTitle>
					<Clock class="text-muted-foreground h-4 w-4" />
				</CardHeader>
				<CardContent>
					<div class="text-2xl font-bold">{stat.value}</div>
					<p class="text-muted-foreground flex items-center gap-1 text-xs">
						<TrendingUp class="h-3 w-3 text-green-500" />
						{stat.change} from last week
					</p>
				</CardContent>
			</Card>
		{/each}
	</div>

	<div class="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
		<!-- Activity Timeline -->
		<Card class="col-span-4">
			<CardHeader>
				<CardTitle class="flex items-center gap-2">
					<Bell class="h-5 w-5" />
					Recent Activity
				</CardTitle>
				<CardDescription>Real-time updates on your content engagement</CardDescription>
			</CardHeader>
			<CardContent>
				<div class="max-h-[500px] space-y-4 overflow-y-auto">
					{#each filteredActivities as activity}
						<div
							class="hover:bg-muted/50 flex items-start gap-3 rounded-lg border p-4 transition-colors"
						>
							<div
								class="h-8 w-8 flex-shrink-0 rounded-full bg-{activity.color}-100 flex items-center justify-center"
							>
								<svelte:component
									this={getActivityIcon(activity.type)}
									class="h-4 w-4 text-{activity.color}-600"
								/>
							</div>
							<div class="flex-1 space-y-1">
								<h4 class="text-sm font-medium">{activity.title}</h4>
								<p class="text-muted-foreground text-sm">{activity.description}</p>
								<div class="text-muted-foreground flex items-center gap-2 text-xs">
									<Clock class="h-3 w-3" />
									{activity.time}
									<span>•</span>
									<span class="font-medium">{activity.article}</span>
								</div>
							</div>
							<div class="text-right">
								<Badge variant="outline" class="text-xs">
									{activity.value}
								</Badge>
							</div>
						</div>
					{/each}

					{#if filteredActivities.length === 0}
						<div class="py-8 text-center">
							<ActivityIcon class="text-muted-foreground mx-auto mb-4 h-12 w-12" />
							<p class="text-muted-foreground">No activity found for the selected filters.</p>
						</div>
					{/if}
				</div>
			</CardContent>
		</Card>

		<!-- Top Performers -->
		<Card class="col-span-3">
			<CardHeader>
				<CardTitle class="flex items-center gap-2">
					<TrendingUp class="h-5 w-5" />
					Top Performers
				</CardTitle>
				<CardDescription>Your best performing content this week</CardDescription>
			</CardHeader>
			<CardContent class="space-y-4">
				{#each topPerformers as performer}
					<div class="space-y-2 rounded-lg border p-3">
						<div class="flex items-center justify-between">
							<Badge variant="secondary" class="text-xs">
								{performer.type}
							</Badge>
							<Badge variant="outline" class="text-xs text-green-600">
								{performer.growth}
							</Badge>
						</div>
						<h4 class="text-sm leading-tight font-medium">{performer.title}</h4>
						<p class="text-muted-foreground text-sm">{performer.value}</p>
					</div>
				{/each}
			</CardContent>
		</Card>
	</div>

	<!-- Activity Summary -->
	<Card>
		<CardHeader>
			<CardTitle>Activity Summary</CardTitle>
			<CardDescription>Breakdown of your content interactions over time</CardDescription>
		</CardHeader>
		<CardContent>
			<Tabs.Root value="daily" class="w-full">
				<Tabs.List class="grid w-full grid-cols-3">
					<Tabs.Trigger value="daily">Daily</Tabs.Trigger>
					<Tabs.Trigger value="weekly">Weekly</Tabs.Trigger>
					<Tabs.Trigger value="monthly">Monthly</Tabs.Trigger>
				</Tabs.List>
				<Tabs.Content value="daily" class="space-y-4">
					<div class="grid gap-4 md:grid-cols-3">
						<div class="space-y-2">
							<p class="text-sm font-medium">Today's Highlights</p>
							<div class="text-muted-foreground space-y-1 text-sm">
								<p>• 2 new milestones reached</p>
								<p>• 15 new comments received</p>
								<p>• 847 total views</p>
								<p>• 23 new likes</p>
							</div>
						</div>
						<div class="space-y-2">
							<p class="text-sm font-medium">Most Active Hour</p>
							<div class="text-muted-foreground space-y-1 text-sm">
								<p>2:00 PM - 3:00 PM</p>
								<p>324 views in one hour</p>
							</div>
						</div>
						<div class="space-y-2">
							<p class="text-sm font-medium">Peak Engagement</p>
							<div class="text-muted-foreground space-y-1 text-sm">
								<p>React Hooks article</p>
								<p>152 interactions</p>
							</div>
						</div>
					</div>
				</Tabs.Content>
				<Tabs.Content value="weekly" class="space-y-4">
					<div class="grid gap-4 md:grid-cols-3">
						<div class="space-y-2">
							<p class="text-sm font-medium">This Week's Growth</p>
							<div class="text-muted-foreground space-y-1 text-sm">
								<p>• +23% increase in views</p>
								<p>• +15% more likes</p>
								<p>• +8% new comments</p>
								<p>• +12% shares</p>
							</div>
						</div>
						<div class="space-y-2">
							<p class="text-sm font-medium">Best Day</p>
							<div class="text-muted-foreground space-y-1 text-sm">
								<p>Tuesday, Jan 16</p>
								<p>1,234 total views</p>
							</div>
						</div>
						<div class="space-y-2">
							<p class="text-sm font-medium">Top Content</p>
							<div class="text-muted-foreground space-y-1 text-sm">
								<p>React Hooks guide</p>
								<p>2,847 weekly views</p>
							</div>
						</div>
					</div>
				</Tabs.Content>
				<Tabs.Content value="monthly" class="space-y-4">
					<div class="grid gap-4 md:grid-cols-3">
						<div class="space-y-2">
							<p class="text-sm font-medium">Monthly Milestones</p>
							<div class="text-muted-foreground space-y-1 text-sm">
								<p>• 5 articles published</p>
								<p>• 15,000+ total views</p>
								<p>• 500+ new followers</p>
								<p>• 98% positive feedback</p>
							</div>
						</div>
						<div class="space-y-2">
							<p class="text-sm font-medium">Best Week</p>
							<div class="text-muted-foreground space-y-1 text-sm">
								<p>Jan 8-14, 2024</p>
								<p>4,521 weekly views</p>
							</div>
						</div>
						<div class="space-y-2">
							<p class="text-sm font-medium">Top Category</p>
							<div class="text-muted-foreground space-y-1 text-sm">
								<p>React Tutorials</p>
								<p>6,053 total views</p>
							</div>
						</div>
					</div>
				</Tabs.Content>
			</Tabs.Root>
		</CardContent>
	</Card>
</div>
