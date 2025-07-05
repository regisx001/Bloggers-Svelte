<script lang="ts">
	// import { onNavigate } from '$app/navigation';

	import '../app.css';
	import { ModeWatcher } from 'mode-watcher';
	let { children } = $props();

	let isNavigating = $state(false);

	// onNavigate(() => {
	// 	isNavigating = true;
	// 	return new Promise((resolve) => {
	// 		setTimeout(() => {
	// 			isNavigating = false;
	// 			resolve();
	// 		}, 100); // Small delay to show loading
	// 	});
	// });

	import { Toaster } from '$lib/components/ui/sonner/index.js';
</script>

<Toaster />

<ModeWatcher />

{#if isNavigating}
	<div class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
		<div class="flex flex-col items-center space-y-4">
			<div class="loading-spinner h-8 w-8 border-white"></div>
			<p class="text-white">Loading page...</p>
		</div>
	</div>
{/if}

{@render children?.()}
