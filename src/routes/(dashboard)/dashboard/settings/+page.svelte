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
	import * as Select from '$lib/components/ui/select';
	import * as Tabs from '$lib/components/ui/tabs';
	import { Separator } from '$lib/components/ui/separator';
	import {
		Settings as SettingsIcon,
		Bell,
		Shield,
		Palette,
		Globe,
		Monitor,
		Moon,
		Sun,
		Eye,
		EyeOff,
		Key,
		Smartphone,
		Mail,
		Save,
		Download,
		Trash2,
		AlertTriangle
	} from '@lucide/svelte';

	// Static data for demonstration
	let settings = {
		// Appearance
		theme: { value: 'system', label: 'System' },
		language: { value: 'en', label: 'English' },
		timezone: { value: 'PST', label: 'Pacific Standard Time' },

		// Notifications
		emailNotifications: true,
		pushNotifications: false,
		weeklyDigest: true,
		commentNotifications: true,
		likeNotifications: false,
		followNotifications: true,

		// Privacy
		profileVisibility: { value: 'public', label: 'Public' },
		showEmail: false,
		showLocation: true,
		indexProfile: true,
		allowComments: true,
		moderateComments: false,

		// Content
		defaultVisibility: { value: 'public', label: 'Public' },
		autoSave: true,
		autoSaveInterval: { value: '30', label: '30 seconds' },

		// Security
		twoFactorEnabled: false,
		sessionTimeout: { value: '24', label: '24 hours' },
		loginAlerts: true
	};

	const themeOptions = [
		{ value: 'light', label: 'Light' },
		{ value: 'dark', label: 'Dark' },
		{ value: 'system', label: 'System' }
	];

	const languageOptions = [
		{ value: 'en', label: 'English' },
		{ value: 'es', label: 'Spanish' },
		{ value: 'fr', label: 'French' },
		{ value: 'de', label: 'German' },
		{ value: 'ja', label: 'Japanese' }
	];

	const timezoneOptions = [
		{ value: 'PST', label: 'Pacific Standard Time' },
		{ value: 'EST', label: 'Eastern Standard Time' },
		{ value: 'CST', label: 'Central Standard Time' },
		{ value: 'MST', label: 'Mountain Standard Time' },
		{ value: 'UTC', label: 'UTC' }
	];

	const visibilityOptions = [
		{ value: 'public', label: 'Public' },
		{ value: 'private', label: 'Private' },
		{ value: 'followers', label: 'Followers Only' }
	];

	const autoSaveOptions = [
		{ value: '10', label: '10 seconds' },
		{ value: '30', label: '30 seconds' },
		{ value: '60', label: '1 minute' },
		{ value: '300', label: '5 minutes' }
	];

	const sessionTimeoutOptions = [
		{ value: '1', label: '1 hour' },
		{ value: '24', label: '24 hours' },
		{ value: '168', label: '1 week' },
		{ value: '720', label: '1 month' }
	];

	let showDeleteDialog = false;

	function handleSave() {
		// Here you would typically save to a server
		console.log('Settings saved:', settings);
	}

	function handleExportData() {
		// Simulate data export
		console.log('Exporting account data...');
	}

	function handleDeleteAccount() {
		showDeleteDialog = true;
	}

	function enableTwoFactor() {
		settings.twoFactorEnabled = true;
		console.log('Two-factor authentication enabled');
	}

	function disableTwoFactor() {
		settings.twoFactorEnabled = false;
		console.log('Two-factor authentication disabled');
	}
</script>

<div class="flex-1 space-y-4 p-4 pt-6 md:p-8">
	<div class="flex items-center justify-between space-y-2">
		<div>
			<h2 class="text-3xl font-bold tracking-tight">Settings</h2>
			<p class="text-muted-foreground">Manage your account preferences and application settings</p>
		</div>
		<div class="flex items-center space-x-2">
			<Button onclick={handleSave}>
				<Save class="mr-2 h-4 w-4" />
				Save All Changes
			</Button>
		</div>
	</div>

	<Tabs.Root value="appearance" class="w-full">
		<Tabs.List class="grid w-full grid-cols-5">
			<Tabs.Trigger value="appearance">Appearance</Tabs.Trigger>
			<Tabs.Trigger value="notifications">Notifications</Tabs.Trigger>
			<Tabs.Trigger value="privacy">Privacy</Tabs.Trigger>
			<Tabs.Trigger value="content">Content</Tabs.Trigger>
			<Tabs.Trigger value="security">Security</Tabs.Trigger>
		</Tabs.List>

		<!-- Appearance Tab -->
		<Tabs.Content value="appearance" class="space-y-4">
			<Card>
				<CardHeader>
					<CardTitle class="flex items-center gap-2">
						<Palette class="h-5 w-5" />
						Appearance Settings
					</CardTitle>
					<CardDescription>Customize how the application looks and feels</CardDescription>
				</CardHeader>
				<CardContent class="space-y-6">
					<div class="space-y-4">
						<div class="space-y-2">
							<Label>Theme</Label>
							<Select.Root type="single">
								<Select.Trigger class="w-[180px]">
									<!-- <Select.Value /> -->
								</Select.Trigger>
								<Select.Content>
									{#each themeOptions as option}
										<Select.Item value={option.value} class="flex items-center gap-2">
											{#if option.value === 'light'}
												<Sun class="h-4 w-4" />
											{:else if option.value === 'dark'}
												<Moon class="h-4 w-4" />
											{:else}
												<Monitor class="h-4 w-4" />
											{/if}
											{option.label}
										</Select.Item>
									{/each}
								</Select.Content>
							</Select.Root>
							<p class="text-muted-foreground text-sm">Choose your preferred color scheme</p>
						</div>

						<div class="space-y-2">
							<Label>Language</Label>
							<Select.Root type="single">
								<Select.Trigger class="w-[180px]">
									<Globe class="mr-2 h-4 w-4" />
									<!-- <Select.Value /> -->
								</Select.Trigger>
								<Select.Content>
									{#each languageOptions as option}
										<Select.Item value={option.value}>{option.label}</Select.Item>
									{/each}
								</Select.Content>
							</Select.Root>
							<p class="text-muted-foreground text-sm">Select your preferred language</p>
						</div>

						<div class="space-y-2">
							<Label>Timezone</Label>
							<Select.Root type="single">
								<Select.Trigger class="w-[200px]">
									<!-- <Select.Value /> -->
								</Select.Trigger>
								<Select.Content>
									{#each timezoneOptions as option}
										<Select.Item value={option.value}>{option.label}</Select.Item>
									{/each}
								</Select.Content>
							</Select.Root>
							<p class="text-muted-foreground text-sm">Used for displaying dates and times</p>
						</div>
					</div>
				</CardContent>
			</Card>
		</Tabs.Content>

		<!-- Notifications Tab -->
		<Tabs.Content value="notifications" class="space-y-4">
			<Card>
				<CardHeader>
					<CardTitle class="flex items-center gap-2">
						<Bell class="h-5 w-5" />
						Notification Preferences
					</CardTitle>
					<CardDescription>Control when and how you receive notifications</CardDescription>
				</CardHeader>
				<CardContent class="space-y-6">
					<div class="space-y-4">
						<div class="flex items-center justify-between">
							<div class="space-y-0.5">
								<Label>Email Notifications</Label>
								<p class="text-muted-foreground text-sm">Receive notifications via email</p>
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
								<Label>Push Notifications</Label>
								<p class="text-muted-foreground text-sm">Receive browser push notifications</p>
							</div>
							<Button
								variant={settings.pushNotifications ? 'default' : 'outline'}
								size="sm"
								onclick={() => (settings.pushNotifications = !settings.pushNotifications)}
							>
								{settings.pushNotifications ? 'On' : 'Off'}
							</Button>
						</div>

						<Separator />

						<div class="space-y-3">
							<h4 class="text-sm font-medium">Notification Types</h4>

							<div class="flex items-center justify-between">
								<div class="space-y-0.5">
									<Label>Comments</Label>
									<p class="text-muted-foreground text-sm">
										When someone comments on your articles
									</p>
								</div>
								<Button
									variant={settings.commentNotifications ? 'default' : 'outline'}
									size="sm"
									onclick={() => (settings.commentNotifications = !settings.commentNotifications)}
								>
									{settings.commentNotifications ? 'On' : 'Off'}
								</Button>
							</div>

							<div class="flex items-center justify-between">
								<div class="space-y-0.5">
									<Label>Likes</Label>
									<p class="text-muted-foreground text-sm">When someone likes your content</p>
								</div>
								<Button
									variant={settings.likeNotifications ? 'default' : 'outline'}
									size="sm"
									onclick={() => (settings.likeNotifications = !settings.likeNotifications)}
								>
									{settings.likeNotifications ? 'On' : 'Off'}
								</Button>
							</div>

							<div class="flex items-center justify-between">
								<div class="space-y-0.5">
									<Label>New Followers</Label>
									<p class="text-muted-foreground text-sm">When someone follows you</p>
								</div>
								<Button
									variant={settings.followNotifications ? 'default' : 'outline'}
									size="sm"
									onclick={() => (settings.followNotifications = !settings.followNotifications)}
								>
									{settings.followNotifications ? 'On' : 'Off'}
								</Button>
							</div>

							<div class="flex items-center justify-between">
								<div class="space-y-0.5">
									<Label>Weekly Digest</Label>
									<p class="text-muted-foreground text-sm">
										Weekly summary of your content performance
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
					</div>
				</CardContent>
			</Card>
		</Tabs.Content>

		<!-- Privacy Tab -->
		<Tabs.Content value="privacy" class="space-y-4">
			<Card>
				<CardHeader>
					<CardTitle class="flex items-center gap-2">
						<Shield class="h-5 w-5" />
						Privacy Settings
					</CardTitle>
					<CardDescription>Control your privacy and what others can see</CardDescription>
				</CardHeader>
				<CardContent class="space-y-6">
					<div class="space-y-4">
						<div class="space-y-2">
							<Label>Profile Visibility</Label>
							<Select.Root type="single">
								<Select.Trigger class="w-[180px]">
									<!-- <Select.Value /> -->
								</Select.Trigger>
								<Select.Content>
									{#each visibilityOptions as option}
										<Select.Item value={option.value}>{option.label}</Select.Item>
									{/each}
								</Select.Content>
							</Select.Root>
							<p class="text-muted-foreground text-sm">Who can view your profile and articles</p>
						</div>

						<Separator />

						<div class="space-y-3">
							<h4 class="text-sm font-medium">Profile Information</h4>

							<div class="flex items-center justify-between">
								<div class="space-y-0.5">
									<Label>Show Email Address</Label>
									<p class="text-muted-foreground text-sm">
										Display your email on your public profile
									</p>
								</div>
								<Button
									variant={settings.showEmail ? 'default' : 'outline'}
									size="sm"
									onclick={() => (settings.showEmail = !settings.showEmail)}
								>
									{#if settings.showEmail}
										<Eye class="h-4 w-4" />
									{:else}
										<EyeOff class="h-4 w-4" />
									{/if}
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
									{#if settings.showLocation}
										<Eye class="h-4 w-4" />
									{:else}
										<EyeOff class="h-4 w-4" />
									{/if}
								</Button>
							</div>

							<div class="flex items-center justify-between">
								<div class="space-y-0.5">
									<Label>Search Engine Indexing</Label>
									<p class="text-muted-foreground text-sm">
										Allow search engines to index your profile
									</p>
								</div>
								<Button
									variant={settings.indexProfile ? 'default' : 'outline'}
									size="sm"
									onclick={() => (settings.indexProfile = !settings.indexProfile)}
								>
									{settings.indexProfile ? 'On' : 'Off'}
								</Button>
							</div>
						</div>

						<Separator />

						<div class="space-y-3">
							<h4 class="text-sm font-medium">Content Settings</h4>

							<div class="flex items-center justify-between">
								<div class="space-y-0.5">
									<Label>Allow Comments</Label>
									<p class="text-muted-foreground text-sm">Let others comment on your articles</p>
								</div>
								<Button
									variant={settings.allowComments ? 'default' : 'outline'}
									size="sm"
									onclick={() => (settings.allowComments = !settings.allowComments)}
								>
									{settings.allowComments ? 'On' : 'Off'}
								</Button>
							</div>

							<div class="flex items-center justify-between">
								<div class="space-y-0.5">
									<Label>Moderate Comments</Label>
									<p class="text-muted-foreground text-sm">
										Require approval before comments are published
									</p>
								</div>
								<Button
									variant={settings.moderateComments ? 'default' : 'outline'}
									size="sm"
									onclick={() => (settings.moderateComments = !settings.moderateComments)}
								>
									{settings.moderateComments ? 'On' : 'Off'}
								</Button>
							</div>
						</div>
					</div>
				</CardContent>
			</Card>
		</Tabs.Content>

		<!-- Content Tab -->
		<Tabs.Content value="content" class="space-y-4">
			<Card>
				<CardHeader>
					<CardTitle>Content Preferences</CardTitle>
					<CardDescription>Configure default settings for your content creation</CardDescription>
				</CardHeader>
				<CardContent class="space-y-6">
					<div class="space-y-4">
						<div class="space-y-2">
							<Label>Default Article Visibility</Label>
							<Select.Root type="single">
								<Select.Trigger class="w-[180px]">
									<!-- <Select.Value /> -->
								</Select.Trigger>
								<Select.Content>
									{#each visibilityOptions as option}
										<Select.Item value={option.value}>{option.label}</Select.Item>
									{/each}
								</Select.Content>
							</Select.Root>
							<p class="text-muted-foreground text-sm">Default visibility for new articles</p>
						</div>

						<div class="flex items-center justify-between">
							<div class="space-y-0.5">
								<Label>Auto-save Drafts</Label>
								<p class="text-muted-foreground text-sm">
									Automatically save your work while writing
								</p>
							</div>
							<Button
								variant={settings.autoSave ? 'default' : 'outline'}
								size="sm"
								onclick={() => (settings.autoSave = !settings.autoSave)}
							>
								{settings.autoSave ? 'On' : 'Off'}
							</Button>
						</div>

						{#if settings.autoSave}
							<div class="space-y-2">
								<Label>Auto-save Interval</Label>
								<Select.Root type="single">
									<Select.Trigger class="w-[150px]">
										<!-- <Select.Value /> -->
									</Select.Trigger>
									<Select.Content>
										{#each autoSaveOptions as option}
											<Select.Item value={option.value}>{option.label}</Select.Item>
										{/each}
									</Select.Content>
								</Select.Root>
								<p class="text-muted-foreground text-sm">How often to auto-save your drafts</p>
							</div>
						{/if}
					</div>
				</CardContent>
			</Card>
		</Tabs.Content>

		<!-- Security Tab -->
		<Tabs.Content value="security" class="space-y-4">
			<Card>
				<CardHeader>
					<CardTitle class="flex items-center gap-2">
						<Shield class="h-5 w-5" />
						Security Settings
					</CardTitle>
					<CardDescription>Manage your account security and authentication</CardDescription>
				</CardHeader>
				<CardContent class="space-y-6">
					<div class="space-y-4">
						<div class="flex items-center justify-between">
							<div class="space-y-0.5">
								<Label>Two-Factor Authentication</Label>
								<p class="text-muted-foreground text-sm">
									Add an extra layer of security to your account
								</p>
							</div>
							<Button
								variant={settings.twoFactorEnabled ? 'destructive' : 'default'}
								size="sm"
								onclick={settings.twoFactorEnabled ? disableTwoFactor : enableTwoFactor}
							>
								<Key class="mr-2 h-4 w-4" />
								{settings.twoFactorEnabled ? 'Disable' : 'Enable'}
							</Button>
						</div>

						<div class="space-y-2">
							<Label>Session Timeout</Label>
							<Select.Root type="single">
								<Select.Trigger class="w-[150px]">
									<!-- <Select.Value /> -->
								</Select.Trigger>
								<Select.Content>
									{#each sessionTimeoutOptions as option}
										<Select.Item value={option.value}>{option.label}</Select.Item>
									{/each}
								</Select.Content>
							</Select.Root>
							<p class="text-muted-foreground text-sm">How long to keep you logged in</p>
						</div>

						<div class="flex items-center justify-between">
							<div class="space-y-0.5">
								<Label>Login Alerts</Label>
								<p class="text-muted-foreground text-sm">
									Get notified when someone logs into your account
								</p>
							</div>
							<Button
								variant={settings.loginAlerts ? 'default' : 'outline'}
								size="sm"
								onclick={() => (settings.loginAlerts = !settings.loginAlerts)}
							>
								{settings.loginAlerts ? 'On' : 'Off'}
							</Button>
						</div>

						<Separator />

						<div class="space-y-3">
							<h4 class="text-sm font-medium">Account Management</h4>

							<Button variant="outline" onclick={handleExportData} class="w-full justify-start">
								<Download class="mr-2 h-4 w-4" />
								Export Account Data
							</Button>

							<Button variant="outline" class="w-full justify-start">
								<Key class="mr-2 h-4 w-4" />
								Change Password
							</Button>

							<div class="border-destructive/20 bg-destructive/5 rounded-lg border-t p-4 pt-4">
								<div class="flex items-start gap-3">
									<AlertTriangle class="text-destructive mt-0.5 h-5 w-5" />
									<div class="space-y-2">
										<h4 class="text-destructive text-sm font-medium">Danger Zone</h4>
										<p class="text-muted-foreground text-sm">
											Once you delete your account, there is no going back. Please be certain.
										</p>
										<Button variant="destructive" size="sm" onclick={handleDeleteAccount}>
											<Trash2 class="mr-2 h-4 w-4" />
											Delete Account
										</Button>
									</div>
								</div>
							</div>
						</div>
					</div>
				</CardContent>
			</Card>
		</Tabs.Content>
	</Tabs.Root>
</div>
