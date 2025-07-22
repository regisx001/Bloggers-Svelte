<script lang="ts">
	import CameraIcon from '@tabler/icons-svelte/icons/camera';
	import DashboardIcon from '@tabler/icons-svelte/icons/dashboard';
	import DatabaseIcon from '@tabler/icons-svelte/icons/database';
	import FileAiIcon from '@tabler/icons-svelte/icons/file-ai';
	import FileDescriptionIcon from '@tabler/icons-svelte/icons/file-description';
	import FileWordIcon from '@tabler/icons-svelte/icons/file-word';
	import HelpIcon from '@tabler/icons-svelte/icons/help';
	import InnerShadowTopIcon from '@tabler/icons-svelte/icons/inner-shadow-top';
	import ReportIcon from '@tabler/icons-svelte/icons/report';
	import SearchIcon from '@tabler/icons-svelte/icons/search';
	import SettingsIcon from '@tabler/icons-svelte/icons/settings';
	import Category from '@tabler/icons-svelte/icons/category';
	import Article from '@tabler/icons-svelte/icons/article';
	import Tag from '@lucide/svelte/icons/tag';

	import NavMain from '../navigation/nav-main.svelte';

	import NavUser from '../navigation/nav-user.svelte';
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import { base } from '$app/paths';

	const data = {
		// user: {
		// 	name: 'shadcn',
		// 	email: 'm@example.com',
		// 	avatar:
		// 		'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
		// },
		navMain: [
			{
				title: 'Overview',
				url: '/admin',
				icon: DashboardIcon
			},
			// {
			// 	title: 'Insight',
			// 	url: '/admin/insight',
			// 	icon: DashboardIcon
			// },

			{
				title: 'Articles',
				url: '/admin/articles',
				icon: Article
			},
			{
				title: 'Tags',
				url: '/admin/tags',
				icon: Article
			},
			{
				title: 'Categories',
				url: '/admin/categories',
				icon: Category
			}
			// {
			// 	title: 'Lifecycle',
			// 	url: '#',
			// 	icon: ListDetailsIcon
			// },
			// {
			// 	title: 'Analytics',
			// 	url: '#',
			// 	icon: ChartBarIcon
			// },
			// {
			// 	title: 'Projects',
			// 	url: '#',
			// 	icon: FolderIcon
			// },
			// {
			// 	title: 'Team',
			// 	url: '#',
			// 	icon: UsersIcon
			// }
		],
		navClouds: [
			{
				title: 'Capture',
				icon: CameraIcon,
				isActive: true,
				url: '#',
				items: [
					{
						title: 'Active Proposals',
						url: '#'
					},
					{
						title: 'Archived',
						url: '#'
					}
				]
			},
			{
				title: 'Proposal',
				icon: FileDescriptionIcon,
				url: '#',
				items: [
					{
						title: 'Active Proposals',
						url: '#'
					},
					{
						title: 'Archived',
						url: '#'
					}
				]
			},
			{
				title: 'Prompts',
				icon: FileAiIcon,
				url: '#',
				items: [
					{
						title: 'Active Proposals',
						url: '#'
					},
					{
						title: 'Archived',
						url: '#'
					}
				]
			}
		],
		navSecondary: [
			{
				title: 'Settings',
				url: '#',
				icon: SettingsIcon
			},
			{
				title: 'Get Help',
				url: '#',
				icon: HelpIcon
			},
			{
				title: 'Search',
				url: '#',
				icon: SearchIcon
			}
		],
		documents: [
			{
				name: 'Data Library',
				url: '#',
				icon: DatabaseIcon
			},
			{
				name: 'Reports',
				url: '#',
				icon: ReportIcon
			},
			{
				name: 'Word Assistant',
				url: '#',
				icon: FileWordIcon
			}
		]
	};

	// let { ...restProps }: ComponentProps<typeof Sidebar.Root> = $$restProps;
	let { user, variant }: { user: User; variant: any } = $props();
</script>

<Sidebar.Root collapsible="offcanvas" {variant}>
	<!-- <Sidebar.Root collapsible="offcanvas"> -->
	<Sidebar.Header>
		<Sidebar.Menu>
			<Sidebar.MenuItem>
				<Sidebar.MenuButton class="data-[slot=sidebar-menu-button]:!p-1.5">
					{#snippet child({ props })}
						<a href="{base}/" {...props}>
							<InnerShadowTopIcon class="!size-5" />
							<span class="text-base font-semibold">Bloggers</span>
						</a>
					{/snippet}
				</Sidebar.MenuButton>
			</Sidebar.MenuItem>
		</Sidebar.Menu>
	</Sidebar.Header>
	<Sidebar.Content>
		<NavMain items={data.navMain} />
		<!-- <NavDocuments items={data.documents} /> -->
		<!-- <NavSecondary items={data.navSecondary} class="mt-auto" /> -->
	</Sidebar.Content>
	<Sidebar.Footer>
		<NavUser {user} />
	</Sidebar.Footer>
</Sidebar.Root>
