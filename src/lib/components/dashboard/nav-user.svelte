<script lang="ts">
	import CreditCardIcon from '@tabler/icons-svelte/icons/credit-card';
	import DotsVerticalIcon from '@tabler/icons-svelte/icons/dots-vertical';
	import LogoutIcon from '@tabler/icons-svelte/icons/logout';
	import NotificationIcon from '@tabler/icons-svelte/icons/notification';
	import UserCircleIcon from '@tabler/icons-svelte/icons/user-circle';
	import * as Avatar from '$lib/components/ui/avatar/index.js';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import { enhance } from '$app/forms';
	import { PUBLIC_BACKEND_URL } from '$env/static/public';
	import { base } from '$app/paths';

	let { user }: { user: User } = $props();

	const sidebar = Sidebar.useSidebar();
</script>

{#snippet userInfo(user: User)}
	<Avatar.Root class="size-8 rounded-lg grayscale hover:grayscale-0">
		<Avatar.Image src={PUBLIC_BACKEND_URL + user.avatar} alt={user.username} />
		<Avatar.Fallback class="rounded-lg">{user.username.slice(0, 2).toUpperCase()}</Avatar.Fallback>
	</Avatar.Root>
	<div class="grid flex-1 text-left text-sm leading-tight">
		<span class="truncate font-medium">{user.username}</span>
		<span class="text-muted-foreground truncate text-xs">
			{user.email}
		</span>
	</div>
{/snippet}

<Sidebar.Menu>
	<Sidebar.MenuItem>
		<DropdownMenu.Root>
			<DropdownMenu.Trigger>
				{#snippet child({ props })}
					<Sidebar.MenuButton
						{...props}
						size="lg"
						class="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
					>
						{@render userInfo(user)}
						<DotsVerticalIcon class="ml-auto size-4" />
					</Sidebar.MenuButton>
				{/snippet}
			</DropdownMenu.Trigger>
			<DropdownMenu.Content
				class="w-(--bits-dropdown-menu-anchor-width) min-w-56 rounded-lg"
				side={sidebar.isMobile ? 'bottom' : 'right'}
				align="end"
				sideOffset={4}
			>
				<DropdownMenu.Label class="p-0 font-normal">
					<div class="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
						{@render userInfo(user)}
					</div>
				</DropdownMenu.Label>
				<DropdownMenu.Separator />
				<DropdownMenu.Group>
					<a href="{base}/dashboard/account">
						<DropdownMenu.Item>
							<UserCircleIcon />
							Account
						</DropdownMenu.Item>
					</a>
					<DropdownMenu.Item>
						<CreditCardIcon />
						Billing
					</DropdownMenu.Item>
					<DropdownMenu.Item>
						<NotificationIcon />
						Notifications
					</DropdownMenu.Item>
				</DropdownMenu.Group>
				<DropdownMenu.Separator />
				<form action="/logout" method="post" use:enhance>
					<button class="w-full" type="submit">
						<DropdownMenu.Item>
							<LogoutIcon />
							Log out
						</DropdownMenu.Item>
					</button>
				</form>
			</DropdownMenu.Content>
		</DropdownMenu.Root>
	</Sidebar.MenuItem>
</Sidebar.Menu>
