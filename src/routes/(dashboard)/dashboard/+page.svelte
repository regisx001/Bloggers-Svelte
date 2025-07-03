<script lang="ts">
	import data from './data.js';
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import AppSidebar from '$lib/components/dashboard/dashboard-sidebar.svelte';
	import SiteHeader from '$lib/components/dashboard/site-header.svelte';
	import SectionCards from '$lib/components/dashboard/section-cards.svelte';
</script>

<SiteHeader />
<div class="flex flex-1 flex-col">
	<div class="@container/main flex flex-1 flex-col gap-2">
		<div class="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
			<SectionCards />
		</div>
	</div>
</div>
