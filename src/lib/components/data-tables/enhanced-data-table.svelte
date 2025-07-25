<script lang="ts" generics="TData, TValue">
	import { createSvelteTable, FlexRender } from '$lib/components/ui/data-table/index.js';
	import * as Table from '$lib/components/ui/table/index.js';
	import {
		type ColumnDef,
		type PaginationState,
		type SortingState,
		type ColumnFiltersState,
		type VisibilityState,
		type RowSelectionState,
		getCoreRowModel,
		getPaginationRowModel,
		getSortedRowModel,
		getFilteredRowModel,
		type Row
	} from '@tanstack/table-core';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { Input } from '$lib/components/ui/input';
	import { Badge } from '$lib/components/ui/badge/index.js';
	import type { Snippet, ComponentType } from 'svelte';
	import { enhance } from '$app/forms';
	import DeleteConfirmation from '$lib/components/dialogs/delete-confirmation-dialog.svelte';
	import { Search, Filter, Download, RefreshCw, Settings } from '@lucide/svelte';
	import type { TableAction, FilterOption } from './types.js';

	interface EnhancedDataTableProps {
		columns: ColumnDef<TData, TValue>[];
		data: TData[];
		
		// Basic config
		entityName: string;
		deleteBatchAction?: string;
		pageSize?: number;
		emptyMessage?: string;
		
		// Header customization
		showHeader?: boolean;
		title?: string;
		description?: string;
		
		// Search and filtering
		enableSearch?: boolean;
		searchPlaceholder?: string;
		primarySearchColumn?: string;
		additionalFilters?: FilterOption[];
		
		// Actions and controls
		headerActions?: TableAction[];
		bulkActions?: TableAction[];
		enableColumnVisibility?: boolean;
		enableExport?: boolean;
		enableRefresh?: boolean;
		
		// Selection
		enableRowSelection?: boolean;
		enableSelectAll?: boolean;
		
		// Layout and styling
		stickyHeader?: boolean;
		compactMode?: boolean;
		showRowNumbers?: boolean;
		stripedRows?: boolean;
		
		// Custom snippets
		customHeader?: Snippet<[{ table: any; selectedCount: number }]>;
		customToolbar?: Snippet<[{ table: any; selectedCount: number }]>;
		customEmptyState?: Snippet;
		customRowActions?: Snippet<[{ row: Row<TData>; rowIndex: number }]>;
		triggerAdd?: Snippet;
		
		// Pagination
		showPagination?: boolean;
		paginationInfo?: boolean;
		
		// Events
		onRowClick?: (row: Row<TData>, event: MouseEvent) => void;
		onSelectionChange?: (selectedRows: Row<TData>[]) => void;
		onRefresh?: () => void;
		onExport?: (data: TData[], selectedData: TData[]) => void;
	}

	let {
		data,
		columns,
		entityName,
		deleteBatchAction,
		pageSize = 10,
		emptyMessage = 'No results.',
		
		showHeader = true,
		title,
		description,
		
		enableSearch = true,
		searchPlaceholder = 'Search...',
		primarySearchColumn = 'title',
		additionalFilters = [],
		
		headerActions = [],
		bulkActions = [],
		enableColumnVisibility = true,
		enableExport = false,
		enableRefresh = false,
		
		enableRowSelection = true,
		enableSelectAll = true,
		
		stickyHeader = true,
		compactMode = false,
		showRowNumbers = false,
		stripedRows = false,
		
		customHeader,
		customToolbar,
		customEmptyState,
		customRowActions,
		triggerAdd,
		
		showPagination = true,
		paginationInfo = true,
		
		onRowClick,
		onSelectionChange,
		onRefresh,
		onExport
	}: EnhancedDataTableProps = $props();

	let pagination = $state<PaginationState>({ pageIndex: 0, pageSize });
	let sorting = $state<SortingState>([]);
	let columnFilters = $state<ColumnFiltersState>([]);
	let columnVisibility = $state<VisibilityState>({});
	let rowSelection = $state<RowSelectionState>({});

	const table = createSvelteTable({
		get data() {
			return data;
		},
		columns,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		onPaginationChange: (updater) => {
			if (typeof updater === 'function') {
				pagination = updater(pagination);
			} else {
				pagination = updater;
			}
		},
		onSortingChange: (updater) => {
			if (typeof updater === 'function') {
				sorting = updater(sorting);
			} else {
				sorting = updater;
			}
		},
		onColumnFiltersChange: (updater) => {
			if (typeof updater === 'function') {
				columnFilters = updater(columnFilters);
			} else {
				columnFilters = updater;
			}
		},
		onColumnVisibilityChange: (updater) => {
			if (typeof updater === 'function') {
				columnVisibility = updater(columnVisibility);
			} else {
				columnVisibility = updater;
			}
		},
		onRowSelectionChange: (updater) => {
			if (typeof updater === 'function') {
				rowSelection = updater(rowSelection);
			} else {
				rowSelection = updater;
			}
		},
		state: {
			get pagination() {
				return pagination;
			},
			get sorting() {
				return sorting;
			},
			get columnFilters() {
				return columnFilters;
			},
			get columnVisibility() {
				return columnVisibility;
			},
			get rowSelection() {
				return rowSelection;
			}
		}
	});

	let deleteDialogOpen = $state(false);

	const selectedRows = $derived(table.getFilteredSelectedRowModel().rows);
	const selectedCount = $derived(selectedRows.length);

	// Watch for selection changes
	$effect(() => {
		if (onSelectionChange) {
			onSelectionChange(selectedRows);
		}
	});

	const handleDeleteSuccess = () => {
		table.toggleAllRowsSelected(false);
	};

	const getSelectedIds = () => {
		return selectedRows.map((row: Row<TData>) => (row.original as any).id);
	};

	const handleRefresh = () => {
		if (onRefresh) {
			onRefresh();
		}
	};

	const handleExport = () => {
		if (onExport) {
			const selectedData = selectedRows.map(row => row.original);
			onExport(data, selectedData);
		}
	};

	const executeAction = (action: TableAction) => {
		if (action.requiresSelection && selectedCount === 0) {
			return;
		}
		action.action(selectedRows, data);
	};

	const visibleHeaderActions = $derived(headerActions.filter(action => action.show !== false));
	const visibleBulkActions = $derived(bulkActions.filter(action => action.show !== false));
</script>

<div class="space-y-4">
	<!-- Custom Header -->
	{#if customHeader}
		{@render customHeader({ table, selectedCount })}
	{:else if showHeader}
		<div class="flex flex-col gap-4">
			<!-- Title and Description -->
			{#if title || description}
				<div>
					{#if title}
						<h2 class="text-2xl font-bold tracking-tight">{title}</h2>
					{/if}
					{#if description}
						<p class="text-muted-foreground">{description}</p>
					{/if}
				</div>
			{/if}

			<!-- Toolbar -->
			<div class="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
				<!-- Search and Filters -->
				<div class="flex flex-1 items-center gap-2">
					{#if enableSearch}
						<div class="relative">
							<Search class="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
							<Input
								placeholder={searchPlaceholder}
								value={table.getColumn(primarySearchColumn)?.getFilterValue() as string}
								onchange={(e) => table.getColumn(primarySearchColumn)?.setFilterValue(e.currentTarget.value)}
								oninput={(e) => table.getColumn(primarySearchColumn)?.setFilterValue(e.currentTarget.value)}
								class="pl-8 max-w-sm"
							/>
						</div>
					{/if}

					<!-- Additional Filters -->
					{#each additionalFilters as filter}
						<div class="flex flex-col gap-1">
							{#if filter.type === 'select'}
								<select
									class="border-input bg-background text-sm rounded-md border px-3 py-2"
									onchange={(e) => table.getColumn(filter.column)?.setFilterValue(e.currentTarget.value)}
								>
									<option value="">{filter.placeholder}</option>
									{#each filter.options || [] as option}
										<option value={option.value}>{option.label}</option>
									{/each}
								</select>
							{:else}
								<Input
									placeholder={filter.placeholder}
									value={table.getColumn(filter.column)?.getFilterValue() as string}
									onchange={(e) => table.getColumn(filter.column)?.setFilterValue(e.currentTarget.value)}
									class="max-w-sm"
								/>
							{/if}
						</div>
					{/each}

					<!-- Selection Badge -->
					{#if selectedCount > 0}
						<Badge variant="secondary" class="ml-2">
							{selectedCount} selected
						</Badge>
					{/if}
				</div>

				<!-- Actions -->
				<div class="flex items-center gap-2">
					<!-- Bulk Actions -->
					{#if selectedCount > 0 && visibleBulkActions.length > 0}
						{#each visibleBulkActions as action}
							<Button
								variant={action.variant || 'outline'}
								size="sm"
								onclick={() => executeAction(action)}
								class="flex items-center gap-2"
							>
								{#if action.icon}
									{@const IconComponent = action.icon}
									<IconComponent class="h-4 w-4" />
								{/if}
								{action.label}
							</Button>
						{/each}
					{/if}

					<!-- Default Bulk Delete -->
					{#if selectedCount > 0 && deleteBatchAction}
						<Button 
							variant="outline" 
							size="sm"
							onclick={() => (deleteDialogOpen = true)}
							class="flex items-center gap-2"
						>
							Delete Selected
						</Button>
					{/if}

					<!-- Header Actions -->
					{#each visibleHeaderActions as action}
						<Button
							variant={action.variant || 'outline'}
							size="sm"
							onclick={() => executeAction(action)}
							disabled={action.requiresSelection && selectedCount === 0}
							class="flex items-center gap-2"
						>
							{#if action.icon}
								{@const IconComponent = action.icon}
								<IconComponent class="h-4 w-4" />
							{/if}
							{action.label}
						</Button>
					{/each}

					<!-- Built-in Actions -->
					{#if enableRefresh}
						<Button variant="outline" size="sm" onclick={handleRefresh}>
							<RefreshCw class="h-4 w-4" />
						</Button>
					{/if}

					{#if enableExport}
						<Button variant="outline" size="sm" onclick={handleExport}>
							<Download class="h-4 w-4" />
						</Button>
					{/if}

					<!-- Column Visibility -->
					{#if enableColumnVisibility}
						<DropdownMenu.Root>
							<DropdownMenu.Trigger>
								{#snippet child({ props })}
									<Button {...props} variant="outline" size="sm">
										<Settings class="h-4 w-4" />
									</Button>
								{/snippet}
							</DropdownMenu.Trigger>
							<DropdownMenu.Content align="end">
								<DropdownMenu.Label>Toggle Columns</DropdownMenu.Label>
								<DropdownMenu.Separator />
								{#each table.getAllColumns().filter((col) => col.getCanHide()) as column (column.id)}
									<DropdownMenu.CheckboxItem
										class="capitalize"
										bind:checked={() => column.getIsVisible(), (v) => column.toggleVisibility(!!v)}
									>
										{column.id}
									</DropdownMenu.CheckboxItem>
								{/each}
							</DropdownMenu.Content>
						</DropdownMenu.Root>
					{/if}

					<!-- Add Button -->
					{#if triggerAdd}
						{@render triggerAdd()}
					{/if}
				</div>
			</div>

			<!-- Custom Toolbar -->
			{#if customToolbar}
				{@render customToolbar({ table, selectedCount })}
			{/if}
		</div>
	{/if}

	<!-- Data Table -->
	<div class="rounded-md border">
		<Table.Root>
			<Table.Header class="{stickyHeader ? 'sticky top-0 z-10' : ''} bg-muted">
				{#each table.getHeaderGroups() as headerGroup (headerGroup.id)}
					<Table.Row>
						{#if showRowNumbers}
							<Table.Head class="w-12">#</Table.Head>
						{/if}
						{#each headerGroup.headers as header (header.id)}
							<Table.Head colspan={header.colSpan}>
								{#if !header.isPlaceholder}
									<FlexRender
										content={header.column.columnDef.header}
										context={header.getContext()}
									/>
								{/if}
							</Table.Head>
						{/each}
						{#if customRowActions}
							<Table.Head>Actions</Table.Head>
						{/if}
					</Table.Row>
				{/each}
			</Table.Header>
			<Table.Body>
				{#each table.getRowModel().rows as row, index (row.id)}
					<Table.Row 
						data-state={row.getIsSelected() && 'selected'}
						class="{stripedRows && index % 2 === 1 ? 'bg-muted/50' : ''} {compactMode ? 'h-10' : ''} {onRowClick ? 'cursor-pointer hover:bg-muted/50' : ''}"
						onclick={(e) => onRowClick && onRowClick(row, e)}
					>
						{#if showRowNumbers}
							<Table.Cell class="text-center text-sm text-muted-foreground">
								{pagination.pageIndex * pagination.pageSize + index + 1}
							</Table.Cell>
						{/if}
						{#each row.getVisibleCells() as cell (cell.id)}
							<Table.Cell class={compactMode ? 'py-2' : ''}>
								<FlexRender content={cell.column.columnDef.cell} context={cell.getContext()} />
							</Table.Cell>
						{/each}
						{#if customRowActions}
							<Table.Cell>
								{@render customRowActions({ row, rowIndex: index })}
							</Table.Cell>
						{/if}
					</Table.Row>
				{:else}
					<Table.Row>
						<Table.Cell colspan={columns.length + (showRowNumbers ? 1 : 0) + (customRowActions ? 1 : 0)} class="h-24 text-center">
							{#if customEmptyState}
								{@render customEmptyState()}
							{:else}
								{emptyMessage}
							{/if}
						</Table.Cell>
					</Table.Row>
				{/each}
			</Table.Body>
		</Table.Root>
	</div>

	<!-- Pagination and Info -->
	{#if showPagination || paginationInfo}
		<div class="flex items-center justify-between">
			{#if paginationInfo}
				<div class="text-muted-foreground text-sm">
					{#if selectedCount > 0}
						{selectedCount} of {table.getFilteredRowModel().rows.length} row(s) selected.
					{:else}
						Showing {table.getRowModel().rows.length} of {table.getFilteredRowModel().rows.length} entries
					{/if}
				</div>
			{/if}

			{#if showPagination}
				<div class="flex items-center gap-2">
					<Button
						variant="outline"
						size="sm"
						onclick={() => table.previousPage()}
						disabled={!table.getCanPreviousPage()}
					>
						Previous
					</Button>
					<div class="flex items-center gap-1">
						<span class="text-sm">Page</span>
						<span class="text-sm font-medium">
							{table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
						</span>
					</div>
					<Button
						variant="outline"
						size="sm"
						onclick={() => table.nextPage()}
						disabled={!table.getCanNextPage()}
					>
						Next
					</Button>
				</div>
			{/if}
		</div>
	{/if}
</div>

<!-- Delete Confirmation Dialog -->
{#if deleteBatchAction}
	<DeleteConfirmation
		bind:open={deleteDialogOpen}
		{entityName}
		entityType="batch"
		deleteAction={deleteBatchAction}
		selectedIds={getSelectedIds()}
		onSuccess={handleDeleteSuccess}
	/>
{/if}
