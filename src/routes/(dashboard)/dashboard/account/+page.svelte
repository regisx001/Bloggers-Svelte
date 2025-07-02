<script lang="ts">
	import * as Avatar from '$lib/components/ui/avatar/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import * as InputOTP from '$lib/components/ui/input-otp/index.js';
	import { Badge } from '$lib/components/ui/badge/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Separator from '$lib/components/ui/separator/index.js';
	import * as Tabs from '$lib/components/ui/tabs/index.js';
	import {
		Calendar,
		Mail,
		Shield,
		Clock,
		Edit,
		Settings,
		Key,
		Camera,
		Lock,
		Activity
	} from '@lucide/svelte';
	import { onMount } from 'svelte';
	import { enhance } from '$app/forms';
	import { PUBLIC_BACKEND_URL } from '$env/static/public';
	import { REGEXP_ONLY_DIGITS } from 'bits-ui';

	let mounted = false;

	let { data, form } = $props();

	onMount(() => {
		mounted = true;
	});

	function formatDate(dateString: string) {
		return new Date(dateString).toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'long',
			day: 'numeric',
			hour: '2-digit',
			minute: '2-digit'
		});
	}

	function getInitials(username: string) {
		return username.slice(0, 2).toUpperCase();
	}

	function getRoleBadgeVariant(role: string) {
		switch (role) {
			case 'ROLE_ADMIN':
				return 'destructive';
			case 'ROLE_MODERATOR':
				return 'secondary';
			default:
				return 'default';
		}
	}
</script>

<div class="container mx-auto max-w-6xl px-4 py-8">
	<div class="mb-8 flex items-center justify-between">
		<div>
			<h1 class="text-3xl font-bold tracking-tight">Account Settings</h1>
			<p class="text-muted-foreground">Manage your account information and preferences</p>
		</div>
		<Button variant="outline" size="sm">
			<Settings class="mr-2 h-4 w-4" />
			Settings
		</Button>
	</div>

	<Tabs.Root value="verification" class="space-y-6">
		<Tabs.List class="grid w-full grid-cols-3">
			<Tabs.Trigger value="profile">Profile</Tabs.Trigger>
			<Tabs.Trigger value="verification">Verification</Tabs.Trigger>
			<Tabs.Trigger value="activity">Activity</Tabs.Trigger>
		</Tabs.List>

		<Tabs.Content value="profile" class="space-y-6">
			<!-- Profile Header Card -->
			<Card.Root>
				<Card.Header>
					<div class="flex items-center space-x-4">
						<Avatar.Root class="h-20 w-20">
							<Avatar.Image
								src={PUBLIC_BACKEND_URL + data.user?.avatar}
								alt={data.user?.username}
							/>
							<Avatar.Fallback class="text-lg">{getInitials(data.user?.username)}</Avatar.Fallback>
						</Avatar.Root>
						<div class="space-y-1">
							<div class="flex items-center space-x-2">
								<h2 class="text-2xl font-semibold">{data.user?.username}</h2>
								<Badge variant={data.user?.enabled ? 'default' : 'secondary'}>
									{data.user?.enabled ? 'Active' : 'Inactive'}
								</Badge>
							</div>
							<div class="text-muted-foreground flex items-center space-x-2">
								<Mail class="h-4 w-4" />
								<span>{data.user?.email}</span>
							</div>
							<div class="flex items-center space-x-2">
								{#each data.user?.roles as role}
									<Badge variant={getRoleBadgeVariant(role)}>
										<Shield class="mr-1 h-3 w-3" />
										{role.replace('ROLE_', '')}
									</Badge>
								{/each}
							</div>
						</div>
					</div>
				</Card.Header>
				<Card.Footer>
					<Button class="w-full sm:w-auto">
						<Edit class="mr-2 h-4 w-4" />
						Edit Profile
					</Button>
				</Card.Footer>
			</Card.Root>

			<!-- Account Information -->
			<div class="grid gap-6 md:grid-cols-2">
				<Card.Root>
					<Card.Header>
						<Card.Title>Account Details</Card.Title>
						<Card.Description>Your account information and status</Card.Description>
					</Card.Header>
					<Card.Content class="space-y-4">
						<div class="space-y-2">
							<div class="text-sm font-medium">User ID</div>
							<p class="text-muted-foreground bg-muted rounded p-2 font-mono text-xs break-all">
								{data.user?.id}
							</p>
						</div>
						<div class="space-y-2">
							<div class="text-sm font-medium">Username</div>
							<p class="text-sm">{data.user?.username}</p>
						</div>
						<div class="space-y-2">
							<div class="text-sm font-medium">Email Address</div>
							<p class="text-sm">{data.user?.email}</p>
						</div>
						<div class="space-y-2">
							<div class="text-sm font-medium">Account Status</div>
							<Badge variant={data.user?.enabled ? 'default' : 'secondary'}>
								{data.user?.enabled ? 'Enabled' : 'Disabled'}
							</Badge>
						</div>
					</Card.Content>
				</Card.Root>

				<Card.Root>
					<Card.Header>
						<Card.Title>Timestamps</Card.Title>
						<Card.Description>Account creation and modification dates</Card.Description>
					</Card.Header>
					<Card.Content class="space-y-4">
						<div class="flex items-center space-x-2">
							<Calendar class="text-muted-foreground h-4 w-4" />
							<div class="space-y-1">
								<p class="text-sm font-medium">Created</p>
								<p class="text-muted-foreground text-sm">{formatDate(data.user?.createdAt)}</p>
							</div>
						</div>
						<Separator.Root />
						<div class="flex items-center space-x-2">
							<Clock class="text-muted-foreground h-4 w-4" />
							<div class="space-y-1">
								<p class="text-sm font-medium">Last Updated</p>
								<p class="text-muted-foreground text-sm">{formatDate(data.user?.updatedAt)}</p>
							</div>
						</div>
					</Card.Content>
				</Card.Root>
			</div>

			<!-- Permissions & Roles -->
			<Card.Root>
				<Card.Header>
					<Card.Title>Roles & Permissions</Card.Title>
					<Card.Description>Your current roles and access levels</Card.Description>
				</Card.Header>
				<Card.Content>
					<div class="flex flex-wrap gap-2">
						{#each data.user?.roles as role}
							<Badge variant={getRoleBadgeVariant(role)} class="px-3 py-1 text-sm">
								<Shield class="mr-2 h-4 w-4" />
								{role.replace('ROLE_', '')}
							</Badge>
						{/each}
					</div>
					<Separator.Root class="my-4" />
					<div class="space-y-2">
						<h4 class="text-sm font-medium">Permissions</h4>
						<ul class="text-muted-foreground space-y-1 text-sm">
							<li>• Full administrative access</li>
							<li>• User management</li>
							<li>• System configuration</li>
							<li>• Content moderation</li>
						</ul>
					</div>
				</Card.Content>
			</Card.Root>
		</Tabs.Content>

		<Tabs.Content value="verification" class="space-y-6">
			<Card.Root>
				{#if !data.user?.enabled}
					<Card.Header>
						<Card.Title>Verify Account</Card.Title>
						<div class="h-2"></div>
						<Card.Description
							>You account isn't verified, complete the process to access all the platform</Card.Description
						>
						<Card.Description>Check your email adress and enter verification code</Card.Description>
					</Card.Header>

					<Card.Content class="space-y-4">
						<div class="h-2"></div>
						<form action="?/verifyUser" method="post" use:enhance>
							<input type="hidden" name="email" value={data.user?.email} id="" />
							<div class="flex justify-center">
								<InputOTP.Root name="verificationCode" maxlength={6} pattern={REGEXP_ONLY_DIGITS}>
									{#snippet children({ cells })}
										<InputOTP.Group>
											{#each cells.slice(0, 3) as cell}
												<InputOTP.Slot {cell} />
											{/each}
										</InputOTP.Group>
										<InputOTP.Separator />
										<InputOTP.Group>
											{#each cells.slice(3, 6) as cell}
												<InputOTP.Slot {cell} />
											{/each}
										</InputOTP.Group>
									{/snippet}
								</InputOTP.Root>
							</div>
							<div class="flex flex-col justify-center px-44 pt-8">
								<Button type="submit">Verify</Button>
							</div>
						</form>

						<!-- <h1 class="text-red-800">Hello</h1> -->
						{#if form?.success}
							<h1 class=" text-success text-2xl">{form.success}</h1>
						{/if}
					</Card.Content>
				{:else}
					<Card.Header>
						<Card.Title>Verify Account</Card.Title>
						<div class="h-2"></div>
						<Card.Description>You account already verified</Card.Description>
					</Card.Header>
				{/if}
			</Card.Root>
		</Tabs.Content>

		<Tabs.Content value="activity" class="space-y-6">
			<Card.Root>
				<Card.Header>
					<Card.Title>Recent Activity</Card.Title>
					<Card.Description>Your recent account activity and login history</Card.Description>
				</Card.Header>
				<Card.Content>
					<div class="space-y-4">
						<div class="flex items-center space-x-4">
							<div class="h-2 w-2 rounded-full bg-green-500"></div>
							<div class="space-y-1">
								<p class="text-sm">Logged in from Chrome on Windows</p>
								<p class="text-muted-foreground text-xs">2 hours ago • IP: 192.168.1.100</p>
							</div>
						</div>
						<div class="flex items-center space-x-4">
							<div class="h-2 w-2 rounded-full bg-blue-500"></div>
							<div class="space-y-1">
								<p class="text-sm">Profile updated</p>
								<p class="text-muted-foreground text-xs">1 day ago</p>
							</div>
						</div>
						<div class="flex items-center space-x-4">
							<div class="h-2 w-2 rounded-full bg-yellow-500"></div>
							<div class="space-y-1">
								<p class="text-sm">Password changed</p>
								<p class="text-muted-foreground text-xs">30 days ago</p>
							</div>
						</div>
					</div>
				</Card.Content>
			</Card.Root>
		</Tabs.Content>
	</Tabs.Root>
</div>
