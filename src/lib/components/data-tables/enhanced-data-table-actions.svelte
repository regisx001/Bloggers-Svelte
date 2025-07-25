<script lang="ts">
	import EllipsisIcon from '@lucide/svelte/icons/ellipsis';
	import { Button } from '$lib/components/ui/button/index.js';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
	import { Trash, Edit, Eye, Copy, MoreHorizontal } from '@lucide/svelte';
	import DeleteConfirmation from '$lib/components/dialogs/delete-confirmation-dialog.svelte';
	import type { Snippet, ComponentType } from 'svelte';
	import type { ActionItem, QuickAction } from './types.js';

	interface EnhancedDataTableActionsProps {
		entityId: string;
		entityName: string;
		entityData?: any; // Full row data for complex actions
		deleteAction?: string;
		
		// Quick actions (shown as buttons)
		quickActions?: QuickAction[];
		
		// Dropdown menu actions
		dropdownActions?: ActionItem[];
		
		// Built-in actions control
		showDelete?: boolean;
		showCopyId?: boolean;
		showViewDetails?: boolean;
		viewDetailsRoute?: string;
		
		// Custom snippets for complete customization
		customQuickActions?: Snippet<[{ entityId: string; entityData: any }]>;
		customDropdownContent?: Snippet<[{ entityId: string; entityData: any }]>;
		
		// Layout options
		layout?: 'horizontal' | 'vertical' | 'compact';
		showDropdownTrigger?: boolean;
	}

	let {
		entityId,
		entityName,
		entityData = {},
		deleteAction,
		quickActions = [],
		dropdownActions = [],
		showDelete = true,
		showCopyId = true,
		showViewDetails = false,
		viewDetailsRoute,
		customQuickActions,
		customDropdownContent,
		layout = 'horizontal',
		showDropdownTrigger = true
	}: EnhancedDataTableActionsProps = $props();

	let deleteConfirmOpen = $state(false);

	// Filter visible quick actions
	const visibleQuickActions = $derived(
		quickActions.filter(action => action.show !== false)
	);

	// Filter visible dropdown actions
	const visibleDropdownActions = $derived(
		dropdownActions.filter(action => action.show !== false)
	);

	// Default actions
	const defaultDropdownActions: ActionItem[] = [
		...(showCopyId ? [{
			id: 'copy-id',
			label: `Copy ${entityName.charAt(0).toUpperCase() + entityName.slice(1)} ID`,
			icon: Copy,
			action: () => navigator.clipboard.writeText(entityId)
		}] : []),
		...(showViewDetails ? [{
			id: 'view-details',
			label: `View ${entityName.charAt(0).toUpperCase() + entityName.slice(1)} Details`,
			icon: Eye,
			href: viewDetailsRoute,
			action: () => {
				if (viewDetailsRoute) {
					window.location.href = viewDetailsRoute;
				}
			}
		}] : [])
	];

	const allDropdownActions = $derived([...defaultDropdownActions, ...visibleDropdownActions]);

	const handleActionClick = (action: ActionItem | QuickAction) => {
		if (!action.disabled) {
			action.action(entityId, entityData);
		}
	};

	const layoutClasses = $derived({
		horizontal: 'flex items-center gap-1',
		vertical: 'flex flex-col gap-1',
		compact: 'flex items-center'
	}[layout]);
</script>

<div class={layoutClasses}>
	<!-- Quick Actions (Direct Buttons) -->
	{#if visibleQuickActions.length > 0}
		{#each visibleQuickActions as action}
			<Button
				variant={action.variant || 'ghost'}
				size="sm"
				class="hover:bg-muted p-1 hover:cursor-pointer {action.disabled ? 'opacity-50 cursor-not-allowed' : ''}"
				onclick={() => handleActionClick(action)}
				disabled={action.disabled}
				title={action.label}
			>
				{#if action.icon}
					{@const IconComponent = action.icon}
					<IconComponent size="16" />
				{/if}
				{#if action.label && layout !== 'compact'}
					<span class="ml-1">{action.label}</span>
				{/if}
			</Button>
		{/each}
	{/if}

	<!-- Delete Quick Action -->
	{#if showDelete && deleteAction}
		<Button
			variant="ghost"
			size="sm"
			class="hover:bg-muted p-1 hover:cursor-pointer"
			onclick={() => (deleteConfirmOpen = true)}
			title="Delete {entityName}"
		>
			<Trash size="16" class="text-destructive" />
		</Button>
	{/if}

	<!-- Custom Quick Actions Snippet -->
	{#if customQuickActions}
		{@render customQuickActions({ entityId, entityData })}
	{/if}

	<!-- Dropdown Menu -->
	{#if showDropdownTrigger && (allDropdownActions.length > 0 || customDropdownContent)}
		<DropdownMenu.Root>
			<DropdownMenu.Trigger>
				{#snippet child({ props })}
					<Button {...props} variant="ghost" size="icon" class="relative size-8 p-0">
						<span class="sr-only">Open menu</span>
						<MoreHorizontal size="16" />
					</Button>
				{/snippet}
			</DropdownMenu.Trigger>
			<DropdownMenu.Content align="end">
				{#if allDropdownActions.length > 0}
					<DropdownMenu.Group>
						<DropdownMenu.Label>Actions</DropdownMenu.Label>
						{#each allDropdownActions as action}
							{#if action.href}
								<DropdownMenu.Item class={action.disabled ? 'opacity-50 cursor-not-allowed' : ''}>
									<a 
										href={action.disabled ? '#' : action.href} 
										class="w-full flex items-center gap-2"
										onclick={(e) => action.disabled && e.preventDefault()}
									>
										{#if action.icon}
											{@const IconComponent = action.icon}
											<IconComponent size="16" />
										{/if}
										{action.label}
									</a>
								</DropdownMenu.Item>
							{:else}
								<DropdownMenu.Item
									onclick={() => !action.disabled && handleActionClick(action)}
									class={action.disabled ? 'opacity-50 cursor-not-allowed' : ''}
								>
									<div class="flex items-center gap-2">
										{#if action.icon}
											{@const IconComponent = action.icon}
											<IconComponent size="16" />
										{/if}
										{action.label}
									</div>
								</DropdownMenu.Item>
							{/if}
							{#if action.separator}
								<DropdownMenu.Separator />
							{/if}
						{/each}
					</DropdownMenu.Group>
				{/if}

				<!-- Custom Dropdown Content -->
				{#if customDropdownContent}
					{#if allDropdownActions.length > 0}
						<DropdownMenu.Separator />
					{/if}
					{@render customDropdownContent({ entityId, entityData })}
				{/if}
			</DropdownMenu.Content>
		</DropdownMenu.Root>
	{/if}
</div>

<!-- Delete Confirmation Dialog -->
{#if showDelete && deleteAction}
	<DeleteConfirmation
		bind:open={deleteConfirmOpen}
		{entityName}
		entityType="single"
		{deleteAction}
		selectedIds={entityId}
	/>
{/if}
