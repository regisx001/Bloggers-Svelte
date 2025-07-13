<script lang="ts">
	import EllipsisIcon from '@lucide/svelte/icons/ellipsis';
	import { Button } from '$lib/components/ui/button/index.js';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
	import { Trash } from '@lucide/svelte';
	import DeleteConfirmation from '$lib/components/dialogs/delete-confirmation-dialog.svelte';

	interface DataTableActionsProps {
		entityId: string;
		entityName: string; // 'article', 'category', 'tag'
		deleteAction: string; // '?/deleteArticle', '?/deleteCategory'
		viewDetailsRoute?: string;
		additionalActions?: Array<{ label: string; action: () => void }>;
	}

	let {
		entityId,
		entityName,
		deleteAction,
		viewDetailsRoute,
		additionalActions = []
	}: DataTableActionsProps = $props();

	let deleteConfirmOpen = $state(false);
</script>

<div class="flex justify-around">
	<div class="flex items-center">
		<Button
			variant="ghost"
			size="sm"
			class="hover:bg-muted p-1 hover:cursor-pointer"
			onclick={() => (deleteConfirmOpen = true)}
		>
			<Trash size="16" class="text-destructive" />
		</Button>
	</div>
	<DropdownMenu.Root>
		<DropdownMenu.Trigger>
			{#snippet child({ props })}
				<Button {...props} variant="ghost" size="icon" class="relative size-8 p-0">
					<span class="sr-only">Open menu</span>
					<EllipsisIcon />
				</Button>
			{/snippet}
		</DropdownMenu.Trigger>
		<DropdownMenu.Content>
			<DropdownMenu.Group>
				<DropdownMenu.Label>Actions</DropdownMenu.Label>
				<DropdownMenu.Item onclick={() => navigator.clipboard.writeText(entityId)}>
					Copy {entityName.charAt(0).toUpperCase() + entityName.slice(1)} ID
				</DropdownMenu.Item>
			</DropdownMenu.Group>
			<DropdownMenu.Separator />

			{#if viewDetailsRoute}
				<DropdownMenu.Item>
					<a href={viewDetailsRoute} class="w-full">
						View {entityName.charAt(0).toUpperCase() + entityName.slice(1)} details
					</a>
				</DropdownMenu.Item>
			{:else}
				<DropdownMenu.Item>
					View {entityName.charAt(0).toUpperCase() + entityName.slice(1)} details
				</DropdownMenu.Item>
			{/if}

			{#each additionalActions as action}
				<DropdownMenu.Item onclick={action.action}>
					{action.label}
				</DropdownMenu.Item>
			{/each}
		</DropdownMenu.Content>
	</DropdownMenu.Root>
</div>

<!-- Delete Confirmation Dialog -->
<DeleteConfirmation
	bind:open={deleteConfirmOpen}
	{entityName}
	entityType="single"
	{deleteAction}
	selectedIds={entityId}
/>
