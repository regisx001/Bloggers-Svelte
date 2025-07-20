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
	import { Label } from '$lib/components/ui/label';
	import { Textarea } from '$lib/components/ui/textarea';
	import * as Avatar from '$lib/components/ui/avatar';
	import * as Select from '$lib/components/ui/select';
	import * as Tabs from '$lib/components/ui/tabs';
	import { Separator } from '$lib/components/ui/separator';
	import {
		User,
		Mail,
		MapPin,
		Link as LinkIcon,
		Calendar,
		Edit3,
		Camera,
		Save,
		Shield,
		Bell,
		Eye,
		Globe,
		Twitter,
		Github,
		Linkedin
	} from '@lucide/svelte';

	// Static data for demonstration
	let isEditing = false;

	let profile = {
		name: 'John Doe',
		email: 'john.doe@example.com',
		username: 'johndoe',
		bio: 'Passionate web developer and technical writer. I love sharing knowledge about React, Svelte, and modern web technologies.',
		location: 'San Francisco, CA',
		website: 'https://johndoe.dev',
		twitter: 'johndoe',
		github: 'johndoe',
		linkedin: 'johndoe',
		avatar: '/placeholder-avatar.jpg',
		joinDate: '2023-06-15',
		timezone: 'PST',
		language: 'en'
	};

	let settings = {
		emailNotifications: true,
		browserNotifications: false,
		weeklyDigest: true,
		profileVisibility: 'public',
		showEmail: false,
		showLocation: true,
		allowComments: true,
		moderateComments: false
	};

	const stats = [
		{ label: 'Articles Published', value: '24' },
		{ label: 'Total Views', value: '18.2K' },
		{ label: 'Followers', value: '1.2K' },
		{ label: 'Following', value: '345' }
	];

	const recentArticles = [
		{
			title: 'Getting Started with React Hooks',
			publishedAt: '2024-01-15',
			views: 4003,
			status: 'published'
		},
		{
			title: 'Advanced CSS Grid Techniques',
			publishedAt: '2024-01-10',
			views: 1897,
			status: 'published'
		},
		{
			title: 'Building Responsive Layouts',
			publishedAt: null,
			views: 0,
			status: 'draft'
		}
	];

	const achievements = [
		{
			title: 'First Article',
			description: 'Published your first article',
			earned: true,
			date: '2023-06-20'
		},
		{
			title: '1K Views',
			description: 'Reached 1,000 total views',
			earned: true,
			date: '2023-07-15'
		},
		{
			title: '10K Views',
			description: 'Reached 10,000 total views',
			earned: true,
			date: '2023-12-01'
		},
		{
			title: 'Consistent Writer',
			description: 'Published 5 articles in a month',
			earned: true,
			date: '2023-11-30'
		},
		{
			title: '100 Followers',
			description: 'Gained 100 followers',
			earned: true,
			date: '2023-09-10'
		},
		{
			title: '50K Views',
			description: 'Reached 50,000 total views',
			earned: false,
			date: null
		}
	];

	function handleSave() {
		isEditing = false;
		// Here you would typically save to a server
		console.log('Profile updated:', profile);
	}

	function formatDate(dateString: string) {
		return new Date(dateString).toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		});
	}
</script>

<div class="flex-1 space-y-4 p-4 pt-6 md:p-8">
	<div class="flex items-center justify-between space-y-2">
		<div>
			<h2 class="text-3xl font-bold tracking-tight">Profile</h2>
			<p class="text-muted-foreground">Manage your account settings and public profile</p>
		</div>
		<div class="flex items-center space-x-2">
			{#if isEditing}
				<Button variant="outline" onclick={() => (isEditing = false)}>Cancel</Button>
				<Button onclick={handleSave}>
					<Save class="mr-2 h-4 w-4" />
					Save Changes
				</Button>
			{:else}
				<Button onclick={() => (isEditing = true)}>
					<Edit3 class="mr-2 h-4 w-4" />
					Edit Profile
				</Button>
			{/if}
		</div>
	</div>

	<div class="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
		<!-- Profile Info -->
		<Card class="col-span-4">
			<CardHeader>
				<CardTitle>Profile Information</CardTitle>
				<CardDescription>Update your public profile and personal information</CardDescription>
			</CardHeader>
			<CardContent class="space-y-6">
				<!-- Avatar Section -->
				<div class="flex items-center gap-4">
					<Avatar.Root class="h-20 w-20">
						<Avatar.Image src={profile.avatar} alt={profile.name} />
						<Avatar.Fallback class="text-lg">
							{profile.name
								.split(' ')
								.map((n) => n[0])
								.join('')}
						</Avatar.Fallback>
					</Avatar.Root>
					{#if isEditing}
						<Button variant="outline" size="sm">
							<Camera class="mr-2 h-4 w-4" />
							Change Avatar
						</Button>
					{/if}
				</div>

				<Separator />

				<!-- Basic Info -->
				<div class="grid gap-4 md:grid-cols-2">
					<div class="space-y-2">
						<Label for="name">Display Name</Label>
						{#if isEditing}
							<Input id="name" bind:value={profile.name} />
						{:else}
							<p class="py-2 text-sm">{profile.name}</p>
						{/if}
					</div>
					<div class="space-y-2">
						<Label for="username">Username</Label>
						{#if isEditing}
							<Input id="username" bind:value={profile.username} />
						{:else}
							<p class="py-2 text-sm">@{profile.username}</p>
						{/if}
					</div>
				</div>

				<div class="space-y-2">
					<Label for="email">Email</Label>
					{#if isEditing}
						<Input id="email" type="email" bind:value={profile.email} />
					{:else}
						<p class="py-2 text-sm">{profile.email}</p>
					{/if}
				</div>

				<div class="space-y-2">
					<Label for="bio">Bio</Label>
					{#if isEditing}
						<Textarea
							id="bio"
							placeholder="Tell us about yourself..."
							bind:value={profile.bio}
							rows={3}
						/>
					{:else}
						<p class="text-muted-foreground py-2 text-sm">{profile.bio}</p>
					{/if}
				</div>

				<div class="grid gap-4 md:grid-cols-2">
					<div class="space-y-2">
						<Label for="location">Location</Label>
						{#if isEditing}
							<Input id="location" bind:value={profile.location} />
						{:else}
							<p class="flex items-center gap-2 py-2 text-sm">
								<MapPin class="h-4 w-4" />
								{profile.location}
							</p>
						{/if}
					</div>
					<div class="space-y-2">
						<Label for="website">Website</Label>
						{#if isEditing}
							<Input id="website" bind:value={profile.website} />
						{:else}
							<p class="flex items-center gap-2 py-2 text-sm">
								<LinkIcon class="h-4 w-4" />
								<a href={profile.website} class="text-primary hover:underline" target="_blank">
									{profile.website}
								</a>
							</p>
						{/if}
					</div>
				</div>

				<!-- Social Links -->
				<Separator />
				<div>
					<h4 class="mb-3 text-sm font-medium">Social Links</h4>
					<div class="grid gap-4 md:grid-cols-3">
						<div class="space-y-2">
							<Label for="twitter" class="flex items-center gap-2">
								<Twitter class="h-4 w-4" />
								Twitter
							</Label>
							{#if isEditing}
								<Input id="twitter" bind:value={profile.twitter} placeholder="username" />
							{:else}
								<p class="py-2 text-sm">
									{#if profile.twitter}
										<a
											href="https://twitter.com/{profile.twitter}"
											class="text-primary hover:underline"
											target="_blank"
										>
											@{profile.twitter}
										</a>
									{:else}
										Not set
									{/if}
								</p>
							{/if}
						</div>
						<div class="space-y-2">
							<Label for="github" class="flex items-center gap-2">
								<Github class="h-4 w-4" />
								GitHub
							</Label>
							{#if isEditing}
								<Input id="github" bind:value={profile.github} placeholder="username" />
							{:else}
								<p class="py-2 text-sm">
									{#if profile.github}
										<a
											href="https://github.com/{profile.github}"
											class="text-primary hover:underline"
											target="_blank"
										>
											{profile.github}
										</a>
									{:else}
										Not set
									{/if}
								</p>
							{/if}
						</div>
						<div class="space-y-2">
							<Label for="linkedin" class="flex items-center gap-2">
								<Linkedin class="h-4 w-4" />
								LinkedIn
							</Label>
							{#if isEditing}
								<Input id="linkedin" bind:value={profile.linkedin} placeholder="username" />
							{:else}
								<p class="py-2 text-sm">
									{#if profile.linkedin}
										<a
											href="https://linkedin.com/in/{profile.linkedin}"
											class="text-primary hover:underline"
											target="_blank"
										>
											{profile.linkedin}
										</a>
									{:else}
										Not set
									{/if}
								</p>
							{/if}
						</div>
					</div>
				</div>
			</CardContent>
		</Card>

		<!-- Sidebar -->
		<div class="col-span-3 space-y-4">
			<!-- Stats -->
			<Card>
				<CardHeader>
					<CardTitle class="text-lg">Your Stats</CardTitle>
				</CardHeader>
				<CardContent>
					<div class="grid grid-cols-2 gap-4">
						{#each stats as stat}
							<div class="text-center">
								<div class="text-2xl font-bold">{stat.value}</div>
								<div class="text-muted-foreground text-xs">{stat.label}</div>
							</div>
						{/each}
					</div>
				</CardContent>
			</Card>

			<!-- Recent Articles -->
			<Card>
				<CardHeader>
					<CardTitle class="text-lg">Recent Articles</CardTitle>
				</CardHeader>
				<CardContent class="space-y-3">
					{#each recentArticles as article}
						<div class="space-y-1">
							<h4 class="text-sm leading-tight font-medium">{article.title}</h4>
							<div class="text-muted-foreground flex items-center gap-2 text-xs">
								<Badge
									variant={article.status === 'published' ? 'default' : 'secondary'}
									class="text-xs"
								>
									{article.status}
								</Badge>
								{#if article.status === 'published'}
									<span>•</span>
									<span>{article.views} views</span>
									<span>•</span>
									<!-- <span>{formatDate(article.publishedAt)}</span> -->
								{/if}
							</div>
						</div>
					{/each}
				</CardContent>
			</Card>

			<!-- Achievements -->
			<Card>
				<CardHeader>
					<CardTitle class="text-lg">Achievements</CardTitle>
				</CardHeader>
				<CardContent class="space-y-3">
					{#each achievements.slice(0, 4) as achievement}
						<div class="flex items-center gap-3">
							<div
								class="h-8 w-8 rounded-full bg-{achievement.earned
									? 'primary'
									: 'muted'} flex items-center justify-center"
							>
								{#if achievement.earned}
									<Badge class="h-2 w-2 bg-white p-0"></Badge>
								{:else}
									<div class="bg-muted-foreground h-2 w-2 rounded-full"></div>
								{/if}
							</div>
							<div class="flex-1">
								<h4 class="text-sm font-medium">{achievement.title}</h4>
								<p class="text-muted-foreground text-xs">{achievement.description}</p>
							</div>
						</div>
					{/each}
				</CardContent>
			</Card>
		</div>
	</div>

	<!-- Settings Tabs -->
	<Card>
		<CardHeader>
			<CardTitle>Account Settings</CardTitle>
			<CardDescription>Manage your account preferences and privacy settings</CardDescription>
		</CardHeader>
		<CardContent>
			<Tabs.Root value="notifications" class="w-full">
				<Tabs.List class="grid w-full grid-cols-3">
					<Tabs.Trigger value="notifications">Notifications</Tabs.Trigger>
					<Tabs.Trigger value="privacy">Privacy</Tabs.Trigger>
					<Tabs.Trigger value="account">Account</Tabs.Trigger>
				</Tabs.List>

				<Tabs.Content value="notifications" class="space-y-4">
					<div class="space-y-4">
						<div class="flex items-center justify-between">
							<div class="space-y-0.5">
								<Label>Email Notifications</Label>
								<p class="text-muted-foreground text-sm">
									Receive email notifications for comments and likes
								</p>
							</div>
							<Button
								variant={settings.emailNotifications ? 'default' : 'outline'}
								size="sm"
								onclick={() => (settings.emailNotifications = !settings.emailNotifications)}
							>
								{settings.emailNotifications ? 'On' : 'Off'}
							</Button>
						</div>
						<div class="flex items-center justify-between">
							<div class="space-y-0.5">
								<Label>Browser Notifications</Label>
								<p class="text-muted-foreground text-sm">
									Show browser notifications for real-time updates
								</p>
							</div>
							<Button
								variant={settings.browserNotifications ? 'default' : 'outline'}
								size="sm"
								onclick={() => (settings.browserNotifications = !settings.browserNotifications)}
							>
								{settings.browserNotifications ? 'On' : 'Off'}
							</Button>
						</div>
						<div class="flex items-center justify-between">
							<div class="space-y-0.5">
								<Label>Weekly Digest</Label>
								<p class="text-muted-foreground text-sm">
									Receive a weekly summary of your content performance
								</p>
							</div>
							<Button
								variant={settings.weeklyDigest ? 'default' : 'outline'}
								size="sm"
								onclick={() => (settings.weeklyDigest = !settings.weeklyDigest)}
							>
								{settings.weeklyDigest ? 'On' : 'Off'}
							</Button>
						</div>
					</div>
				</Tabs.Content>

				<Tabs.Content value="privacy" class="space-y-4">
					<div class="space-y-4">
						<div class="flex items-center justify-between">
							<div class="space-y-0.5">
								<Label>Profile Visibility</Label>
								<p class="text-muted-foreground text-sm">Control who can see your profile</p>
							</div>
							<Select.Root type="single">
								<Select.Trigger class="w-[120px]">
									<!-- <Select.Value /> -->
								</Select.Trigger>
								<Select.Content>
									<Select.Item value="public">Public</Select.Item>
									<Select.Item value="private">Private</Select.Item>
									<Select.Item value="followers">Followers Only</Select.Item>
								</Select.Content>
							</Select.Root>
						</div>
						<div class="flex items-center justify-between">
							<div class="space-y-0.5">
								<Label>Show Email</Label>
								<p class="text-muted-foreground text-sm">
									Display your email address on your public profile
								</p>
							</div>
							<Button
								variant={settings.showEmail ? 'default' : 'outline'}
								size="sm"
								onclick={() => (settings.showEmail = !settings.showEmail)}
							>
								{settings.showEmail ? 'On' : 'Off'}
							</Button>
						</div>
						<div class="flex items-center justify-between">
							<div class="space-y-0.5">
								<Label>Show Location</Label>
								<p class="text-muted-foreground text-sm">
									Display your location on your public profile
								</p>
							</div>
							<Button
								variant={settings.showLocation ? 'default' : 'outline'}
								size="sm"
								onclick={() => (settings.showLocation = !settings.showLocation)}
							>
								{settings.showLocation ? 'On' : 'Off'}
							</Button>
						</div>
					</div>
				</Tabs.Content>

				<Tabs.Content value="account" class="space-y-4">
					<div class="space-y-4">
						<div class="space-y-2">
							<Label>Member Since</Label>
							<p class="text-muted-foreground flex items-center gap-2 text-sm">
								<Calendar class="h-4 w-4" />
								{formatDate(profile.joinDate)}
							</p>
						</div>
						<Separator />
						<div class="space-y-2">
							<Label>Danger Zone</Label>
							<div class="space-y-2">
								<Button variant="outline" class="w-full justify-start">Export Account Data</Button>
								<Button variant="outline" class="text-destructive w-full justify-start">
									Delete Account
								</Button>
							</div>
						</div>
					</div>
				</Tabs.Content>
			</Tabs.Root>
		</CardContent>
	</Card>
</div>
