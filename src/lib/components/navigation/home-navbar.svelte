<script lang="ts">
	import * as NavigationMenu from '$lib/components/ui/navigation-menu/index.js';
	import * as Avatar from '$lib/components/ui/avatar';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
	import { cn } from '$lib/utils.js';
	import { navigationMenuTriggerStyle } from '$lib/components/ui/navigation-menu/navigation-menu-trigger.svelte';
	import type { HTMLAttributes } from 'svelte/elements';
	import {
		Sun,
		Moon,
		Menu,
		X,
		Search,
		PenTool,
		BookOpen,
		Bookmark,
		Settings,
		LogOut,
		User as UserIcon,
		TrendingUp,
		Home
	} from '@lucide/svelte';

	import { toggleMode } from 'mode-watcher';
	import { Button } from '$lib/components/ui/button/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { base } from '$app/paths';
	import { enhance } from '$app/forms';

	type ListItemProps = HTMLAttributes<HTMLAnchorElement> & {
		title: string;
		href: string;
		content: string;
	};

	let { user, isLoggedIn }: { user: User | null; isLoggedIn: boolean } = $props();
	let mobileMenuOpen = $state(false);
	let searchQuery = $state('');

	const navigationItems = [
		{ href: `${base}/`, label: 'Home', icon: Home },
		{ href: `${base}/articles`, label: 'Articles', icon: BookOpen },
		{ href: `${base}/trending`, label: 'Trending', icon: TrendingUp },
		{ href: `${base}/categories`, label: 'Categories', icon: Bookmark }
	];
</script>

{#snippet userInfo(user: User | null)}
	{#if user}
		<div class="flex items-center gap-2 py-1">
			<Avatar.Root class="border-primary/20 size-8 shrink-0 rounded-full border-2">
				<Avatar.Image src={user.avatar} alt={user.username} />
				<Avatar.Fallback class="bg-primary/10 text-primary rounded-full text-xs font-semibold">
					{user.username.slice(0, 2).toUpperCase()}
				</Avatar.Fallback>
			</Avatar.Root>
			<span class="hidden text-sm font-medium whitespace-nowrap sm:block">{user.username}</span>
		</div>
	{/if}
{/snippet}

{#snippet MobileMenu()}
	{#if mobileMenuOpen}
		<div class="bg-background/80 fixed inset-0 z-50 backdrop-blur-sm lg:hidden">
			<div class="bg-background fixed inset-y-0 right-0 z-50 w-3/4 max-w-sm border-l p-6 shadow-lg">
				<!-- Mobile menu header -->
				<div class="mb-6 flex items-center justify-between">
					<div class="flex items-center space-x-2">
						<img src="{base}/favicon.png" class="h-8 w-8" alt="Blog App" />
						<span class="text-xl font-bold">Blog App</span>
					</div>
					<Button variant="ghost" size="icon" onclick={() => (mobileMenuOpen = false)}>
						<X class="h-5 w-5" />
					</Button>
				</div>

				<!-- Mobile search -->
				<div class="mb-6">
					<div class="relative">
						<Search
							class="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2"
						/>
						<Input bind:value={searchQuery} placeholder="Search articles..." class="pl-10" />
					</div>
				</div>

				<!-- Mobile navigation links -->
				<nav class="mb-6 space-y-2">
					{#each navigationItems as item}
						<a
							href={item.href}
							class="hover:bg-accent hover:text-accent-foreground flex items-center space-x-3 rounded-md px-3 py-2 text-sm font-medium transition-colors"
							onclick={() => (mobileMenuOpen = false)}
						>
							<item.icon class="h-4 w-4" />
							<span>{item.label}</span>
						</a>
					{/each}
				</nav>

				<!-- Mobile user section -->
				{#if isLoggedIn}
					<div class="space-y-2 border-t pt-4">
						<a
							href="{base}/dashboard"
							class="hover:bg-accent hover:text-accent-foreground flex items-center space-x-3 rounded-md px-3 py-2 text-sm font-medium transition-colors"
							onclick={() => (mobileMenuOpen = false)}
						>
							<UserIcon class="h-4 w-4" />
							<span>Dashboard</span>
						</a>
						<a
							href="{base}/write"
							class="hover:bg-accent hover:text-accent-foreground flex items-center space-x-3 rounded-md px-3 py-2 text-sm font-medium transition-colors"
							onclick={() => (mobileMenuOpen = false)}
						>
							<PenTool class="h-4 w-4" />
							<span>Write Article</span>
						</a>
						<form action="/logout" method="post" use:enhance>
							<button
								type="submit"
								class="hover:bg-accent hover:text-accent-foreground flex w-full items-center space-x-3 rounded-md px-3 py-2 text-sm font-medium transition-colors"
							>
								<LogOut class="h-4 w-4" />
								<span>Logout</span>
							</button>
						</form>
					</div>
				{:else}
					<div class="space-y-2 border-t pt-4">
						<a
							href="{base}/login"
							class="bg-primary text-primary-foreground hover:bg-primary/90 flex items-center justify-center rounded-md px-3 py-2 text-sm font-medium transition-colors"
							onclick={() => (mobileMenuOpen = false)}
						>
							Login
						</a>
						<a
							href="{base}/register"
							class="border-input bg-background hover:bg-accent hover:text-accent-foreground flex items-center justify-center rounded-md border px-3 py-2 text-sm font-medium transition-colors"
							onclick={() => (mobileMenuOpen = false)}
						>
							Sign Up
						</a>
					</div>
				{/if}

				<!-- Mobile theme toggle -->
				<div class="border-t pt-4">
					<Button onclick={toggleMode} variant="outline" size="sm" class="w-full">
						<Sun class="h-4 w-4 scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
						<Moon class=" h-4 w-4 scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
						<span class="ml-2">Toggle theme</span>
					</Button>
				</div>
			</div>
		</div>
	{/if}
{/snippet}

<!-- Main Navigation Bar -->
<header
	class="bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-40 w-full border-b backdrop-blur"
>
	<div class="container mx-auto px-4">
		<div class="flex h-16 items-center justify-between gap-4">
			<!-- Logo Section -->
			<div class="flex shrink-0 items-center space-x-3">
				<img src="{base}/favicon.png" class="h-8 w-8" alt="Blog App Logo" />
				<div class="hidden sm:block">
					<h1 class="text-xl font-bold tracking-tight">Blog App</h1>
					<p class="text-muted-foreground hidden text-xs md:block">Discover amazing stories</p>
				</div>
			</div>

			<!-- Desktop Navigation -->
			<nav class="hidden shrink-0 items-center space-x-1 lg:flex">
				{#each navigationItems as item}
					<a
						href={item.href}
						class="hover:bg-accent hover:text-accent-foreground flex items-center space-x-2 rounded-md px-3 py-2 text-sm font-medium whitespace-nowrap transition-colors"
					>
						<item.icon class="h-4 w-4" />
						<span>{item.label}</span>
					</a>
				{/each}
			</nav>

			<!-- Search Bar (Desktop) -->
			<div class="mx-4 hidden max-w-lg flex-1 md:flex">
				<div class="relative w-full">
					<Search class="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
					<Input
						bind:value={searchQuery}
						placeholder="Search articles, tutorials..."
						class="bg-muted/50 focus-visible:bg-background border-0 pl-10"
					/>
				</div>
			</div>

			<!-- Right Section -->
			<div class="flex items-center space-x-3">
				<!-- Theme Toggle -->
				<Button onclick={toggleMode} variant="ghost" size="icon" class="hidden sm:flex">
					<Sun class="h-4 w-4 scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
					<Moon
						class="absolute h-4 w-4 scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0"
					/>
					<span class="sr-only">Toggle theme</span>
				</Button>

				{#if isLoggedIn}
					<!-- Write Button -->
					<Button href="{base}/write" size="sm" class="hidden shrink-0 sm:flex">
						<PenTool class="mr-2 h-4 w-4" />
						Write
					</Button>

					<!-- User Dropdown -->
					<DropdownMenu.Root>
						<DropdownMenu.Trigger>
							<Button variant="ghost" class="relative h-auto rounded-full px-2 py-1">
								{@render userInfo(user)}
							</Button>
						</DropdownMenu.Trigger>
						<DropdownMenu.Content class="w-56" align="end">
							<DropdownMenu.Label class="font-normal">
								<div class="flex flex-col space-y-1">
									<p class="text-sm leading-none font-medium">{user?.username || 'User'}</p>
									<p class="text-muted-foreground text-xs leading-none">
										{user?.email || 'user@example.com'}
									</p>
								</div>
							</DropdownMenu.Label>
							<DropdownMenu.Separator />
							<DropdownMenu.Item>
								<a href="{base}/dashboard" class="flex w-full items-center">
									<UserIcon class="mr-2 h-4 w-4" />
									<span>Dashboard</span>
								</a>
							</DropdownMenu.Item>
							<DropdownMenu.Item>
								<a href="{base}/profile" class="flex w-full items-center">
									<Settings class="mr-2 h-4 w-4" />
									<span>Settings</span>
								</a>
							</DropdownMenu.Item>
							<DropdownMenu.Item>
								<a href="{base}/bookmarks" class="flex w-full items-center">
									<Bookmark class="mr-2 h-4 w-4" />
									<span>Bookmarks</span>
								</a>
							</DropdownMenu.Item>
							<DropdownMenu.Separator />
							<DropdownMenu.Item>
								<form action="/logout" method="post" use:enhance class="w-full">
									<button type="submit" class="flex w-full items-center text-left">
										<LogOut class="mr-2 h-4 w-4" />
										<span>Log out</span>
									</button>
								</form>
							</DropdownMenu.Item>
						</DropdownMenu.Content>
					</DropdownMenu.Root>
				{:else}
					<!-- Auth Buttons -->
					<Button href="{base}/login" variant="ghost" size="sm" class="hidden shrink-0 sm:flex">
						Login
					</Button>
					<Button href="{base}/register" size="sm" class="hidden shrink-0 sm:flex">Sign Up</Button>
				{/if}

				<!-- Mobile Menu Toggle -->
				<Button
					onclick={() => (mobileMenuOpen = !mobileMenuOpen)}
					variant="ghost"
					size="icon"
					class="shrink-0 lg:hidden"
				>
					<Menu class="h-5 w-5" />
					<span class="sr-only">Toggle menu</span>
				</Button>
			</div>
		</div>
	</div>
</header>

<!-- Mobile Menu -->
{@render MobileMenu()}
