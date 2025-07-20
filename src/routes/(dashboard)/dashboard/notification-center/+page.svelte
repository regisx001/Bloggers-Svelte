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
	import { Input } from '$lib/components/ui/input';
	import * as Select from '$lib/components/ui/select';
	import * as Tabs from '$lib/components/ui/tabs';
	import { Avatar, AvatarFallback, AvatarImage } from '$lib/components/ui/avatar';
	import { Separator } from '$lib/components/ui/separator';
	import {
		Bell,
		Search,
		Filter,
		MoreHorizontal,
		Heart,
		MessageCircle,
		UserPlus,
		BookOpen,
		Trash2,
		Check,
		CheckCheck,
		Settings,
		Calendar,
		Clock,
		TrendingUp,
		Users,
		Mail,
		Eye,
		EyeOff
	} from '@lucide/svelte';

	// Static data for demonstration
	let notifications = [
		{
			id: 1,
			type: 'like',
			title: 'Sarah Wilson liked your article',
			message: '"Getting Started with Svelte 5" received a new like',
			avatar: '/avatars/sarah.jpg',
			timestamp: '2024-01-15T10:30:00Z',
			isRead: false,
			actionUrl: '/articles/123',
			metadata: {
				articleTitle: 'Getting Started with Svelte 5',
				userName: 'Sarah Wilson'
			}
		},
		{
			id: 2,
			type: 'comment',
			title: 'New comment on your article',
			message: 'Alex Chen commented: "Great explanation of reactive statements!"',
			avatar: '/avatars/alex.jpg',
			timestamp: '2024-01-15T09:15:00Z',
			isRead: false,
			actionUrl: '/articles/123#comment-456',
			metadata: {
				articleTitle: 'Getting Started with Svelte 5',
				userName: 'Alex Chen',
				commentText: 'Great explanation of reactive statements!'
			}
		},
		{
			id: 3,
			type: 'follow',
			title: 'New follower',
			message: 'Maria Rodriguez started following you',
			avatar: '/avatars/maria.jpg',
			timestamp: '2024-01-15T08:45:00Z',
			isRead: true,
			actionUrl: '/profile/maria-rodriguez',
			metadata: {
				userName: 'Maria Rodriguez',
				userBio: 'Frontend Developer at TechCorp'
			}
		},
		{
			id: 4,
			type: 'article',
			title: 'Your article is trending',
			message: '"TypeScript Best Practices" is now in the top 10 trending articles',
			avatar: null,
			timestamp: '2024-01-15T07:20:00Z',
			isRead: true,
			actionUrl: '/articles/789',
			metadata: {
				articleTitle: 'TypeScript Best Practices',
				rank: 7,
				views: 2340
			}
		},
		{
			id: 5,
			type: 'like',
			title: 'Multiple likes on your article',
			message: '5 people liked "Advanced React Patterns"',
			avatar: null,
			timestamp: '2024-01-14T16:30:00Z',
			isRead: true,
			actionUrl: '/articles/456',
			metadata: {
				articleTitle: 'Advanced React Patterns',
				likeCount: 5
			}
		},
		{
			id: 6,
			type: 'comment',
			title: 'New comment thread',
			message: 'David Kim replied to your comment on "JavaScript Fundamentals"',
			avatar: '/avatars/david.jpg',
			timestamp: '2024-01-14T14:15:00Z',
			isRead: true,
			actionUrl: '/articles/321#comment-789',
			metadata: {
				articleTitle: 'JavaScript Fundamentals',
				userName: 'David Kim',
				isReply: true
			}
		},
		{
			id: 7,
			type: 'system',
			title: 'Weekly digest available',
			message: 'Your content performance summary for this week is ready',
			avatar: null,
			timestamp: '2024-01-14T09:00:00Z',
			isRead: false,
			actionUrl: '/dashboard/analytics',
			metadata: {
				period: 'Week of Jan 7-14',
				totalViews: 5420,
				totalLikes: 89
			}
		},
		{
			id: 8,
			type: 'follow',
			title: 'New follower milestone',
			message: 'Congratulations! You now have 500 followers',
			avatar: null,
			timestamp: '2024-01-13T12:00:00Z',
			isRead: true,
			actionUrl: '/dashboard/profile',
			metadata: {
				milestone: 500,
				previousMilestone: 400
			}
		}
	];

	let searchQuery = '';
	let filterBy = { value: 'all', label: 'All Notifications' };
	let activeTab = 'all';

	const filterOptions = [
		{ value: 'all', label: 'All Notifications' },
		{ value: 'unread', label: 'Unread' },
		{ value: 'likes', label: 'Likes' },
		{ value: 'comments', label: 'Comments' },
		{ value: 'follows', label: 'Follows' },
		{ value: 'system', label: 'System' }
	];

	// Computed properties
	$: filteredNotifications = notifications.filter((notification) => {
		// Search filter
		const matchesSearch =
			notification.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
			notification.message.toLowerCase().includes(searchQuery.toLowerCase());

		if (!matchesSearch) return false;

		// Category filter
		switch (filterBy.value) {
			case 'unread':
				return !notification.isRead;
			case 'likes':
				return notification.type === 'like';
			case 'comments':
				return notification.type === 'comment';
			case 'follows':
				return notification.type === 'follow';
			case 'system':
				return notification.type === 'system' || notification.type === 'article';
			default:
				return true;
		}
	});

	$: unreadCount = notifications.filter((n) => !n.isRead).length;
	$: todayNotifications = notifications.filter((n) => {
		const today = new Date().toDateString();
		const notificationDate = new Date(n.timestamp).toDateString();
		return today === notificationDate;
	});

	function getNotificationIcon(type: string) {
		switch (type) {
			case 'like':
				return Heart;
			case 'comment':
				return MessageCircle;
			case 'follow':
				return UserPlus;
			case 'article':
				return BookOpen;
			case 'system':
				return Bell;
			default:
				return Bell;
		}
	}

	function getNotificationColor(type: string) {
		switch (type) {
			case 'like':
				return 'text-red-500';
			case 'comment':
				return 'text-blue-500';
			case 'follow':
				return 'text-green-500';
			case 'article':
				return 'text-purple-500';
			case 'system':
				return 'text-gray-500';
			default:
				return 'text-gray-500';
		}
	}

	function formatTimestamp(timestamp: string) {
		const date = new Date(timestamp);
		const now = new Date();
		const diffMs = now.getTime() - date.getTime();
		const diffMins = Math.floor(diffMs / (1000 * 60));
		const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
		const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

		if (diffMins < 1) return 'Just now';
		if (diffMins < 60) return `${diffMins}m ago`;
		if (diffHours < 24) return `${diffHours}h ago`;
		if (diffDays < 7) return `${diffDays}d ago`;

		return date.toLocaleDateString();
	}

	function markAsRead(notificationId: number) {
		const index = notifications.findIndex((n) => n.id === notificationId);
		if (index !== -1) {
			notifications[index].isRead = true;
			notifications = [...notifications];
		}
	}

	function markAllAsRead() {
		notifications = notifications.map((n) => ({ ...n, isRead: true }));
	}

	function deleteNotification(notificationId: number) {
		notifications = notifications.filter((n) => n.id !== notificationId);
	}

	function handleNotificationClick(notification: (typeof notifications)[0]) {
		if (!notification.isRead) {
			markAsRead(notification.id);
		}
		// Here you would typically navigate to the action URL
		console.log('Navigate to:', notification.actionUrl);
	}
</script>

<div class="flex-1 space-y-4 p-4 pt-6 md:p-8">
	<div class="flex items-center justify-between space-y-2">
		<div>
			<h2 class="text-3xl font-bold tracking-tight">Notification Center</h2>
			<p class="text-muted-foreground">Stay updated with all your interactions and activities</p>
		</div>
		<div class="flex items-center space-x-2">
			<Button variant="outline" onclick={markAllAsRead} disabled={unreadCount === 0}>
				<CheckCheck class="mr-2 h-4 w-4" />
				Mark All Read
			</Button>
			<Button variant="outline">
				<Settings class="mr-2 h-4 w-4" />
				Settings
			</Button>
		</div>
	</div>

	<!-- Stats Cards -->
	<div class="grid gap-4 md:grid-cols-4">
		<Card>
			<CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
				<CardTitle class="text-sm font-medium">Total Notifications</CardTitle>
				<Bell class="text-muted-foreground h-4 w-4" />
			</CardHeader>
			<CardContent>
				<div class="text-2xl font-bold">{notifications.length}</div>
				<p class="text-muted-foreground text-xs">All time notifications</p>
			</CardContent>
		</Card>
		<Card>
			<CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
				<CardTitle class="text-sm font-medium">Unread</CardTitle>
				<Eye class="text-muted-foreground h-4 w-4" />
			</CardHeader>
			<CardContent>
				<div class="text-2xl font-bold text-blue-600">{unreadCount}</div>
				<p class="text-muted-foreground text-xs">Require your attention</p>
			</CardContent>
		</Card>
		<Card>
			<CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
				<CardTitle class="text-sm font-medium">Today</CardTitle>
				<Calendar class="text-muted-foreground h-4 w-4" />
			</CardHeader>
			<CardContent>
				<div class="text-2xl font-bold">{todayNotifications.length}</div>
				<p class="text-muted-foreground text-xs">Notifications today</p>
			</CardContent>
		</Card>
		<Card>
			<CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
				<CardTitle class="text-sm font-medium">Engagement</CardTitle>
				<TrendingUp class="text-muted-foreground h-4 w-4" />
			</CardHeader>
			<CardContent>
				<div class="text-2xl font-bold">
					{notifications.filter((n) => n.type === 'like' || n.type === 'comment').length}
				</div>
				<p class="text-muted-foreground text-xs">Likes & comments</p>
			</CardContent>
		</Card>
	</div>

	<!-- Filters and Search -->
	<Card>
		<CardHeader>
			<CardTitle>Recent Activity</CardTitle>
			<CardDescription>View and manage all your notifications</CardDescription>
		</CardHeader>
		<CardContent>
			<div class="mb-6 flex flex-col gap-4 md:flex-row">
				<div class="flex-1">
					<div class="relative">
						<Search class="text-muted-foreground absolute top-2.5 left-2 h-4 w-4" />
						<Input placeholder="Search notifications..." bind:value={searchQuery} class="pl-8" />
					</div>
				</div>
				<Select.Root type="single">
					<Select.Trigger class="w-[180px]">
						<Filter class="mr-2 h-4 w-4" />
						<!-- <Select.Value /> -->
					</Select.Trigger>
					<Select.Content>
						{#each filterOptions as option}
							<Select.Item value={option.value}>{option.label}</Select.Item>
						{/each}
					</Select.Content>
				</Select.Root>
			</div>

			<!-- Notifications List -->
			<div class="space-y-2">
				{#each filteredNotifications as notification}
					<div
						class="hover:bg-muted/50 cursor-pointer rounded-lg border p-4 transition-colors {notification.isRead
							? 'bg-background'
							: 'border-blue-200 bg-blue-50'}"
						onclick={() => handleNotificationClick(notification)}
					>
						<div class="flex items-start gap-4">
							<!-- Avatar or Icon -->
							<div class="flex-shrink-0">
								{#if notification.avatar}
									<Avatar class="h-10 w-10">
										<AvatarImage src={notification.avatar} alt="User avatar" />
										<AvatarFallback>
											{notification.metadata?.userName
												?.split(' ')
												.map((n) => n[0])
												.join('') || 'U'}
										</AvatarFallback>
									</Avatar>
								{:else}
									{@const IconComponent = getNotificationIcon(notification.type)}
									<div class="bg-muted flex h-10 w-10 items-center justify-center rounded-full">
										<IconComponent class="h-5 w-5 {getNotificationColor(notification.type)}" />
									</div>
								{/if}
							</div>

							<!-- Content -->
							<div class="min-w-0 flex-1">
								<div class="flex items-start justify-between">
									<div class="flex-1">
										<h4
											class="text-sm font-medium {notification.isRead
												? 'text-muted-foreground'
												: 'text-foreground'}"
										>
											{notification.title}
										</h4>
										<p class="text-muted-foreground mt-1 text-sm">
											{notification.message}
										</p>

										<!-- Metadata -->
										{#if notification.metadata}
											<div class="text-muted-foreground mt-2 text-xs">
												{#if notification.type === 'article' && notification.metadata.rank}
													<Badge variant="secondary" class="text-xs">
														<TrendingUp class="mr-1 h-3 w-3" />
														Rank #{notification.metadata.rank}
													</Badge>
												{/if}
												{#if notification.metadata.likeCount && notification.metadata.likeCount > 1}
													<Badge variant="outline" class="text-xs">
														<Heart class="mr-1 h-3 w-3" />
														{notification.metadata.likeCount} likes
													</Badge>
												{/if}
												{#if notification.metadata.milestone}
													<Badge variant="outline" class="text-xs">
														<Users class="mr-1 h-3 w-3" />
														{notification.metadata.milestone} followers
													</Badge>
												{/if}
											</div>
										{/if}
									</div>

									<!-- Actions -->
									<div class="ml-4 flex items-center gap-1">
										<span class="text-muted-foreground text-xs">
											{formatTimestamp(notification.timestamp)}
										</span>
										{#if !notification.isRead}
											<Button
												variant="ghost"
												size="sm"
												onclick={(e) => {
													e.stopPropagation();
													markAsRead(notification.id);
												}}
											>
												<Check class="h-4 w-4" />
											</Button>
										{/if}
										<Button
											variant="ghost"
											size="sm"
											onclick={(e) => {
												e.stopPropagation();
												deleteNotification(notification.id);
											}}
										>
											<Trash2 class="h-4 w-4" />
										</Button>
									</div>
								</div>
							</div>
						</div>
					</div>
				{/each}
			</div>

			{#if filteredNotifications.length === 0}
				<div class="text-muted-foreground py-8 text-center">
					<Bell class="mx-auto mb-4 h-12 w-12 opacity-50" />
					<p>No notifications found.</p>
					{#if searchQuery || filterBy.value !== 'all'}
						<p class="mt-2 text-sm">Try adjusting your search or filter criteria.</p>
					{/if}
				</div>
			{/if}

			<!-- Load More -->
			{#if filteredNotifications.length > 0}
				<div class="pt-6 text-center">
					<Button variant="outline">Load More Notifications</Button>
				</div>
			{/if}
		</CardContent>
	</Card>

	<!-- Quick Actions -->
	<Card>
		<CardHeader>
			<CardTitle>Quick Actions</CardTitle>
			<CardDescription>Manage your notification preferences and settings</CardDescription>
		</CardHeader>
		<CardContent>
			<div class="grid gap-4 md:grid-cols-3">
				<Button variant="outline" class="flex h-auto flex-col gap-2 p-4">
					<Settings class="h-6 w-6" />
					<span class="font-medium">Notification Settings</span>
					<span class="text-muted-foreground text-xs">Customize what you get notified about</span>
				</Button>
				<Button variant="outline" class="flex h-auto flex-col gap-2 p-4">
					<Mail class="h-6 w-6" />
					<span class="font-medium">Email Preferences</span>
					<span class="text-muted-foreground text-xs">Control email notification frequency</span>
				</Button>
				<Button variant="outline" class="flex h-auto flex-col gap-2 p-4">
					<EyeOff class="h-6 w-6" />
					<span class="font-medium">Do Not Disturb</span>
					<span class="text-muted-foreground text-xs">Temporarily pause notifications</span>
				</Button>
			</div>
		</CardContent>
	</Card>
</div>
