<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { FileText, List, ListOrdered, Code, Quote, Image } from '@lucide/svelte';

	export let commands: any[];
	export let position: { x: number; y: number };
	export let selectedIndex = 0;

	const dispatch = createEventDispatcher();

	function executeCommand(command: any) {
		dispatch('execute', command);
	}

	function close() {
		dispatch('close');
	}

	// Icon mapping for string icons
	const iconMap: Record<string, any> = {
		H1: 'H1',
		H2: 'H2',
		H3: 'H3'
	};

	function getIcon(icon: any) {
		if (typeof icon === 'string') {
			return iconMap[icon] || icon;
		}
		return icon;
	}
</script>

<!-- Slash Command Menu -->
<div
	class="bg-popover text-popover-foreground animate-in fade-in-0 zoom-in-95 absolute z-50 w-80 rounded-md border p-1 shadow-lg"
	style="left: {position.x}px; top: {position.y}px;"
>
	<div class="text-muted-foreground border-b px-3 py-2 text-xs font-medium">BASIC BLOCKS</div>

	<div class="p-1">
		{#each commands as command, index}
			<div
				class="flex cursor-pointer items-center rounded-sm px-2 py-1.5 text-sm transition-colors
					{index === selectedIndex
					? 'bg-accent text-accent-foreground'
					: 'hover:bg-accent hover:text-accent-foreground'}"
				on:click={() => executeCommand(command)}
				on:keydown={(e) => {
					if (e.key === 'Enter') executeCommand(command);
				}}
				role="menuitem"
				tabindex="-1"
			>
				<div class="mr-3 flex h-8 w-8 items-center justify-center rounded border">
					{#if typeof command.icon === 'string'}
						<span class="text-xs font-bold">{command.icon}</span>
					{:else}
						<svelte:component this={command.icon} class="h-4 w-4" />
					{/if}
				</div>
				<div class="flex-1">
					<div class="font-medium">{command.label}</div>
					<div class="text-muted-foreground text-xs">
						{command.description}
					</div>
				</div>
			</div>
		{/each}
	</div>
</div>

<style>
	/* Animation classes */
	@keyframes animate-in {
		from {
			opacity: 0;
			transform: scale(0.95);
		}
		to {
			opacity: 1;
			transform: scale(1);
		}
	}

	.animate-in {
		animation: animate-in 0.15s ease-out;
	}

	.fade-in-0 {
		animation-name: animate-in;
	}

	.zoom-in-95 {
		animation-name: animate-in;
	}
</style>
