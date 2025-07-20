<script lang="ts">
	import { base } from '$app/paths';
	import { page } from '$app/state';
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import type { Icon } from '@tabler/icons-svelte';

	let { items }: { items: { title: string; url: string; icon?: Icon }[] } = $props();
</script>

<Sidebar.Group>
	<Sidebar.GroupContent class="flex flex-col gap-2">
		<!-- <Sidebar.Menu></Sidebar.Menu> -->
		<Sidebar.Menu>
			{#each items as item (item.title)}
				<Sidebar.MenuItem>
					<a href={base + item.url}>
						<Sidebar.MenuButton
							isActive={page.url.pathname === item.url}
							tooltipContent={item.title}
						>
							{#if item.icon}
								<item.icon />
							{/if}
							<span>{item.title}</span>
						</Sidebar.MenuButton>
					</a>
				</Sidebar.MenuItem>
			{/each}
		</Sidebar.Menu>
	</Sidebar.GroupContent>
</Sidebar.Group>
