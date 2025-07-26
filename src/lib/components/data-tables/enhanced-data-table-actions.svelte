<script lang="ts">
	import EllipsisIcon from '@lucide/svelte/icons/ellipsis';
	import { Button } from '$lib/components/ui/button/index.js';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
	import * as AlertDialog from '$lib/components/ui/alert-dialog/index.js';
	import { Trash, Edit, Eye, Copy, MoreHorizontal } from '@lucide/svelte';
	import DeleteConfirmation from '$lib/components/dialogs/delete-confirmation-dialog.svelte';
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import { toast } from 'svelte-sonner';
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
	let confirmDialogAction: ActionItem | QuickAction | null = $state(null);
	let confirmDialogOpen = $state(false);

	// Filter visible quick actions
	const visibleQuickActions = $derived(
		quickActions.filter((action) => action.show !== false && action.hidden !== true)
	);

	// Filter visible dropdown actions
	const visibleDropdownActions = $derived(
		dropdownActions.filter((action) => action.show !== false && action.hidden !== true)
	);

	// Default actions
	const defaultDropdownActions: ActionItem[] = [
		...(showCopyId
			? [
					{
						id: 'copy-id',
						label: `Copy ${entityName.charAt(0).toUpperCase() + entityName.slice(1)} ID`,
						icon: Copy,
						action: () => {
							navigator.clipboard.writeText(entityId);
							toast.success('ID copied to clipboard');
						}
					}
				]
			: []),
		...(showViewDetails
			? [
					{
						id: 'view-details',
						label: `View ${entityName.charAt(0).toUpperCase() + entityName.slice(1)} Details`,
						icon: Eye,
						href: viewDetailsRoute
					}
				]
			: [])
	];

	const allDropdownActions = $derived([...defaultDropdownActions, ...visibleDropdownActions]);

	const handleActionClick = (action: ActionItem | QuickAction) => {
		if (action.disabled) return;

		// Handle confirmation dialog
		if (action.confirmDialog) {
			confirmDialogAction = action;
			confirmDialogOpen = true;
			return;
		}

		executeAction(action);
	};

	const executeAction = (action: ActionItem | QuickAction) => {
		// Handle href navigation
		if (action.href) {
			goto(action.href);
			return;
		}

		// Handle form action - find and submit the corresponding form
		if (action.formAction) {
			const formId = `action-form-${action.id}-${entityId}`;
			const form = document.getElementById(formId) as HTMLFormElement;
			if (form) {
				form.requestSubmit();
			}
			return;
		}

		// Handle client-side action
		if (action.action) {
			action.action(entityId, entityData);
		}
	};
	const handleConfirmAction = () => {
		if (confirmDialogAction) {
			executeAction(confirmDialogAction);
			confirmDialogAction = null;
		}
		confirmDialogOpen = false;
	};

	const layoutClasses = $derived(
		{
			horizontal: 'flex items-center gap-1',
			vertical: 'flex flex-col gap-1',
			compact: 'flex items-center'
		}[layout]
	);
</script>

<div class={layoutClasses}>
	<!-- Quick Actions (Direct Buttons) -->
	{#if visibleQuickActions.length > 0}
		{#each visibleQuickActions as action}
			{#if action.href}
				<a
					href={action.disabled ? '#' : action.href}
					class={action.disabled ? 'pointer-events-none' : ''}
				>
					<Button
						variant={action.variant || 'ghost'}
						size="sm"
						class="hover:bg-muted p-1 hover:cursor-pointer {action.disabled
							? 'cursor-not-allowed opacity-50'
							: ''}"
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
				</a>
			{:else}
				<Button
					variant={action.variant || 'ghost'}
					size="sm"
					class="hover:bg-muted p-1 hover:cursor-pointer {action.disabled
						? 'cursor-not-allowed opacity-50'
						: ''}"
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
			{/if}
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
								<DropdownMenu.Item class={action.disabled ? 'cursor-not-allowed opacity-50' : ''}>
									<a
										href={action.disabled ? '#' : action.href}
										class="flex w-full items-center gap-2"
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
									class="{action.disabled
										? 'cursor-not-allowed opacity-50'
										: ''} {action.variant === 'destructive' ? 'text-destructive' : ''}"
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

<!-- Action Confirmation Dialog -->
{#if confirmDialogAction}
	<AlertDialog.Root bind:open={confirmDialogOpen}>
		<AlertDialog.Content>
			<AlertDialog.Header>
				<AlertDialog.Title>{confirmDialogAction.confirmDialog?.title}</AlertDialog.Title>
				<AlertDialog.Description>
					{confirmDialogAction.confirmDialog?.description}
				</AlertDialog.Description>
			</AlertDialog.Header>
			<AlertDialog.Footer>
				<AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
				<AlertDialog.Action onclick={handleConfirmAction}>Continue</AlertDialog.Action>
			</AlertDialog.Footer>
		</AlertDialog.Content>
	</AlertDialog.Root>
{/if}

<!-- Hidden Forms for Progressive Enhancement -->
{#each [...visibleQuickActions, ...visibleDropdownActions] as action}
	{#if action.formAction}
		<form
			id="action-form-{action.id}-{entityId}"
			method="POST"
			action={action.formAction}
			use:enhance={() => {
				toast.loading('Processing...');
				return ({ result, update }) => {
					toast.dismiss();
					if (result.type === 'success') {
						if (
							result.data &&
							typeof result.data === 'object' &&
							'message' in result.data &&
							typeof result.data.message === 'string'
						) {
							toast.success(result.data.message);
						}
					} else if (result.type === 'failure') {
						if (
							result.data &&
							typeof result.data === 'object' &&
							'message' in result.data &&
							typeof result.data.message === 'string'
						) {
							toast.error(result.data.message);
						}
					}
					update();
				};
			}}
			style="display: none;"
		>
			<input type="hidden" name="entityId" value={entityId} />
			{#if action.formData}
				{#each Object.entries(action.formData) as [key, value]}
					<input type="hidden" name={key} value={String(value)} />
				{/each}
			{/if}
		</form>
	{/if}
{/each}
