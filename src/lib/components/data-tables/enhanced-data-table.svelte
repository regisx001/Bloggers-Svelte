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
	import { toast } from 'svelte-sonner';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
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
		enableServerSearch?: boolean; // New: enable server-side search
		searchParam?: string; // New: parameter name for server search (default: 'searchTerms')
		primarySearchColumn?: string; // Deprecated: use enableServerSearch instead
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
		enableServerSearch = false,
		searchParam = 'searchTerms',
		primarySearchColumn = 'title', // Deprecated
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

	// Reactive values for table state
	const selectedRows = $derived(table.getSelectedRowModel().rows);
	const selectedCount = $derived(selectedRows.length);

	// Server-side filter state
	let serverFilters = $state<Record<string, string>>({});

	// Server-side search state
	let searchQuery = $state('');
	let searchInput = $state(''); // Separate input value from search query

	// Handle server-side search with button trigger
	const handleServerSearch = async () => {
		const url = new URL($page.url);

		if (searchInput.trim()) {
			url.searchParams.set(searchParam, searchInput.trim());
		} else {
			url.searchParams.delete(searchParam);
		}

		// Navigate to new URL (this will trigger load function re-run)
		await goto(url.toString(), { invalidateAll: true, replaceState: true });
	};

	// Handle search input changes (for local state only)
	const handleSearchInput = (value: string) => {
		searchInput = value;
	};

	// Handle Enter key press in search input
	const handleSearchKeydown = (event: KeyboardEvent) => {
		if (event.key === 'Enter') {
			event.preventDefault();
			handleServerSearch();
		}
	};

	// Initialize search query from URL params
	$effect(() => {
		const params = $page.url.searchParams;
		const currentSearch = params.get(searchParam) || '';
		if (currentSearch !== searchQuery) {
			searchQuery = currentSearch;
			searchInput = currentSearch; // Keep input in sync with URL
		}
	});

	// Handle server-side filter changes
	const handleServerFilterChange = async (filterKey: string, value: string, paramName?: string) => {
		const key = paramName || filterKey;

		if (value) {
			serverFilters[key] = value;
		} else {
			delete serverFilters[key];
		}

		// Update URL with new filters
		const url = new URL($page.url);

		// Clear existing filter params
		additionalFilters
			.filter((filter) => filter.mode === 'server')
			.forEach((filter) => {
				const param = filter.serverParam || filter.column;
				url.searchParams.delete(param);
			});

		// Add current filter params
		Object.entries(serverFilters).forEach(([key, value]) => {
			url.searchParams.set(key, value);
		});

		// Navigate to new URL (this will trigger load function re-run)
		await goto(url.toString(), { invalidateAll: true, replaceState: true });
	};

	// Initialize server filters from URL params
	$effect(() => {
		const params = $page.url.searchParams;
		const newServerFilters: Record<string, string> = {};

		additionalFilters
			.filter((filter) => filter.mode === 'server')
			.forEach((filter) => {
				const param = filter.serverParam || filter.column;
				const value = params.get(param);
				if (value) {
					newServerFilters[param] = value;
				}
			});

		serverFilters = newServerFilters;
	}); // Watch for selection changes
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
			const selectedData = selectedRows.map((row) => row.original);
			onExport(data, selectedData);
		}
	};

	const executeAction = (action: TableAction) => {
		if (action.requiresSelection && selectedCount === 0) {
			return;
		}

		// Handle form action for bulk operations with progressive enhancement
		if (action.formAction) {
			const formId = `bulk-action-form-${action.id}`;
			const form = document.getElementById(formId) as HTMLFormElement;
			if (form) {
				// Update the form with current selection
				updateBulkFormData(form, selectedRows);
				form.requestSubmit();
			}
			return;
		}

		// Handle client-side action
		action.action(selectedRows, data);
	};

	const updateBulkFormData = (form: HTMLFormElement, rows: Row<TData>[]) => {
		// Remove existing selection inputs
		const existingInputs = form.querySelectorAll('input[name^="selectedIds"]');
		existingInputs.forEach((input) => input.remove());

		// Add current selection
		rows.forEach((row, index) => {
			const input = document.createElement('input');
			input.type = 'hidden';
			input.name = `selectedIds[${index}]`;
			input.value = (row.original as any).id || (row as any).id;
			form.appendChild(input);
		});
	};
	const visibleHeaderActions = $derived(headerActions.filter((action) => action.show !== false));
	const visibleBulkActions = $derived(bulkActions.filter((action) => action.show !== false));
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
						{#if enableServerSearch}
							<!-- Server-side search with button trigger -->
							<div class="flex items-center gap-2">
								<div class="relative">
									<Search class="text-muted-foreground absolute top-2.5 left-2 h-4 w-4" />
									<Input
										placeholder={searchPlaceholder}
										value={searchInput}
										oninput={(e) => handleSearchInput(e.currentTarget.value)}
										onkeydown={handleSearchKeydown}
										class="max-w-sm pl-8"
									/>
								</div>
								<Button
									variant="outline"
									size="sm"
									onclick={handleServerSearch}
									class="flex items-center gap-1"
								>
									<Search class="h-4 w-4" />
									Search
								</Button>
							</div>
						{:else}
							<!-- Client-side search (deprecated) -->
							<div class="relative">
								<Search class="text-muted-foreground absolute top-2.5 left-2 h-4 w-4" />
								<Input
									placeholder={searchPlaceholder}
									value={table.getColumn(primarySearchColumn)?.getFilterValue() as string}
									onchange={(e) =>
										table.getColumn(primarySearchColumn)?.setFilterValue(e.currentTarget.value)}
									oninput={(e) =>
										table.getColumn(primarySearchColumn)?.setFilterValue(e.currentTarget.value)}
									class="max-w-sm pl-8"
								/>
							</div>
						{/if}
					{/if}

					<!-- Additional Filters -->
					{#each additionalFilters as filter}
						<div class="flex flex-col gap-1">
							{#if filter.type === 'select'}
								{#if filter.mode === 'server'}
									<!-- Server-side filter -->
									<select
										class="border-input bg-background rounded-md border px-3 py-2 text-sm"
										value={serverFilters[filter.serverParam || filter.column] || ''}
										onchange={(e) =>
											handleServerFilterChange(
												filter.column,
												e.currentTarget.value,
												filter.serverParam
											)}
									>
										<option value="">{filter.placeholder}</option>
										{#each filter.options || [] as option}
											<option value={option.value}>{option.label}</option>
										{/each}
									</select>
								{:else}
									<!-- Client-side filter (default) -->
									<select
										class="border-input bg-background rounded-md border px-3 py-2 text-sm"
										value={(table.getColumn(filter.column)?.getFilterValue() as string) || ''}
										onchange={(e) =>
											table.getColumn(filter.column)?.setFilterValue(e.currentTarget.value)}
									>
										<option value="">{filter.placeholder}</option>
										{#each filter.options || [] as option}
											<option value={option.value}>{option.label}</option>
										{/each}
									</select>
								{/if}
							{:else if filter.mode === 'server'}
								<!-- Server-side text filter -->
								<Input
									placeholder={filter.placeholder}
									value={serverFilters[filter.serverParam || filter.column] || ''}
									onchange={(e) =>
										handleServerFilterChange(
											filter.column,
											e.currentTarget.value,
											filter.serverParam
										)}
									class="max-w-sm"
								/>
								<small class="text-muted-foreground text-xs">Server-side filter</small>
							{:else}
								<!-- Client-side text filter (default) -->
								<Input
									placeholder={filter.placeholder}
									value={table.getColumn(filter.column)?.getFilterValue() as string}
									onchange={(e) =>
										table.getColumn(filter.column)?.setFilterValue(e.currentTarget.value)}
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
								{#each table
									.getAllColumns()
									.filter((col) => col.getCanHide()) as column (column.id)}
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
						class="{stripedRows && index % 2 === 1 ? 'bg-muted/50' : ''} {compactMode
							? 'h-10'
							: ''} {onRowClick ? 'hover:bg-muted/50 cursor-pointer' : ''}"
						onclick={(e) => onRowClick && onRowClick(row, e)}
					>
						{#if showRowNumbers}
							<Table.Cell class="text-muted-foreground text-center text-sm">
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
						<Table.Cell
							colspan={columns.length + (showRowNumbers ? 1 : 0) + (customRowActions ? 1 : 0)}
							class="h-24 text-center"
						>
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

<!-- Hidden Forms for Bulk Actions with Progressive Enhancement -->
{#each [...visibleBulkActions, ...visibleHeaderActions] as action}
	{#if action.formAction}
		<form
			id="bulk-action-form-{action.id}"
			method="POST"
			action={action.formAction}
			use:enhance={() => {
				const currentSelection = selectedRows.length;
				toast.loading(`Processing ${currentSelection} items...`);
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
						// Clear selection after successful bulk action
						table.resetRowSelection();
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
			<!-- Selected IDs will be dynamically added before submission -->
		</form>
	{/if}
{/each}
