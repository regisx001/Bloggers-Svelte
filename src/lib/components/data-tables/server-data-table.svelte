<script lang="ts" generics="TData, TValue">
	import { createSvelteTable, FlexRender } from '$lib/components/ui/data-table/index.js';
	import * as Table from '$lib/components/ui/table/index.js';
	import {
		type ColumnDef,
		type SortingState,
		type VisibilityState,
		type RowSelectionState,
		getCoreRowModel,
		type Row
	} from '@tanstack/table-core';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { Input } from '$lib/components/ui/input';
	import type { Snippet } from 'svelte';
	import { enhance } from '$app/forms';
	import DeleteConfirmation from '$lib/components/dialogs/delete-confirmation-dialog.svelte';
	import { Search, Download, RefreshCw, Settings, ChevronDown } from '@lucide/svelte';
	import { toast } from 'svelte-sonner';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import type { TableAction, FilterOption } from './types.js';

	interface ServerDataTableProps {
		columns: ColumnDef<TData, TValue>[];
		data: TData[];
		entityName: string;

		// Basic config
		deleteBatchAction?: string;
		emptyMessage?: string;
		title?: string;
		description?: string;

		// Server-side features
		enableServerSearch?: boolean;
		searchParam?: string;
		searchPlaceholder?: string;
		enableServerSorting?: boolean;
		sortParam?: string;
		additionalFilters?: FilterOption[];

		// Actions
		bulkActions?: TableAction[];
		enableColumnVisibility?: boolean;

		// Layout
		showRowNumbers?: boolean;
		stripedRows?: boolean;

		// Custom snippets
		triggerAdd?: Snippet;
		customRowActions?: Snippet<[{ row: Row<TData>; rowIndex: number }]>;

		// Events
		onRowClick?: (row: Row<TData>, event: MouseEvent) => void;
		onSelectionChange?: (selectedRows: Row<TData>[]) => void;
		onRefresh?: () => void;
		onExport?: (allData: TData[], selectedData: TData[]) => void;
	}

	let {
		data,
		columns,
		entityName,
		deleteBatchAction,
		emptyMessage = 'No results.',
		title,
		description,

		enableServerSearch = false,
		searchParam = 'searchTerms',
		searchPlaceholder = 'Search...',
		enableServerSorting = false,
		sortParam = 'sort',
		additionalFilters = [],

		bulkActions = [],
		enableColumnVisibility = true,

		showRowNumbers = false,
		stripedRows = false,

		triggerAdd,
		customRowActions,

		onRowClick,
		onSelectionChange,
		onRefresh,
		onExport
	}: ServerDataTableProps = $props();

	let sorting = $state<SortingState>([]);
	let columnVisibility = $state<VisibilityState>({});
	let rowSelection = $state<RowSelectionState>({});

	const table = createSvelteTable({
		get data() {
			return data;
		},
		columns,
		getCoreRowModel: getCoreRowModel(),
		manualSorting: enableServerSorting,
		onSortingChange: (updater) => {
			let newSorting: SortingState;
			if (typeof updater === 'function') {
				newSorting = updater(sorting);
			} else {
				newSorting = updater;
			}

			if (enableServerSorting) {
				handleServerSortingChange(newSorting);
			} else {
				sorting = newSorting;
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
			get sorting() {
				return sorting;
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

	// Server-side search state
	let searchInput = $state('');

	// Handle server-side search
	const handleServerSearch = async () => {
		const url = new URL($page.url);

		if (searchInput.trim()) {
			url.searchParams.set(searchParam, searchInput.trim());
		} else {
			url.searchParams.delete(searchParam);
		}

		await goto(url.toString(), { invalidateAll: true, replaceState: true });
	};

	// Handle Enter key press in search input
	const handleSearchKeydown = (event: KeyboardEvent) => {
		if (event.key === 'Enter') {
			event.preventDefault();
			handleServerSearch();
		}
	};

	// Initialize search input from URL params
	$effect(() => {
		const params = $page.url.searchParams;
		const currentSearch = params.get(searchParam) || '';
		searchInput = currentSearch;
	});

	// Server-side filter state
	let serverFilters = $state<Record<string, string>>({});

	// Handle server-side filter changes
	const handleServerFilterChange = async (filterKey: string, value: string, paramName?: string) => {
		const key = paramName || filterKey;

		if (value) {
			serverFilters[key] = value;
		} else {
			delete serverFilters[key];
		}

		const url = new URL($page.url);

		// Clear existing filter params
		additionalFilters.forEach((filter) => {
			const param = filter.serverParam || filter.column;
			url.searchParams.delete(param);
		});

		// Add current filter params
		Object.entries(serverFilters).forEach(([key, value]) => {
			url.searchParams.set(key, value);
		});

		await goto(url.toString(), { invalidateAll: true, replaceState: true });
	};

	// Initialize server filters from URL params
	$effect(() => {
		const params = $page.url.searchParams;
		const newServerFilters: Record<string, string> = {};

		additionalFilters.forEach((filter) => {
			const param = filter.serverParam || filter.column;
			const value = params.get(param);
			if (value) {
				newServerFilters[param] = value;
			}
		});

		serverFilters = newServerFilters;
	});

	// Server-side sorting functions
	const handleServerSortingChange = async (newSorting: SortingState) => {
		const url = new URL($page.url);

		// Clear existing sort params
		const keysToDelete = Array.from(url.searchParams.keys()).filter((key) => key === sortParam);
		keysToDelete.forEach((key) => url.searchParams.delete(key));

		// Add new sort params
		newSorting.forEach((sort) => {
			const direction = sort.desc ? 'desc' : 'asc';
			url.searchParams.append(sortParam, `${sort.id},${direction}`);
		});

		await goto(url.toString(), { invalidateAll: true, replaceState: true });
	};

	// Initialize server sorting from URL params
	$effect(() => {
		const params = $page.url.searchParams;
		const sortParams = params.getAll(sortParam);

		const newServerSorting: SortingState = sortParams.map((param) => {
			const [id, direction] = param.split(',');
			return {
				id,
				desc: direction === 'desc'
			};
		});

		if (enableServerSorting) {
			sorting = newServerSorting;
		}
	});

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
			onExport(
				data,
				selectedRows.map((row) => row.original)
			);
		}
	};
</script>

<div class="w-full">
	<!-- Header Section -->
	{#if title || description || triggerAdd || enableServerSearch || additionalFilters.length > 0 || bulkActions.length > 0}
		<div class="flex items-center justify-between py-4">
			<div class="space-y-1">
				{#if title}
					<h2 class="text-2xl font-bold tracking-tight">{title}</h2>
				{/if}
				{#if description}
					<p class="text-muted-foreground">{description}</p>
				{/if}
			</div>
		</div>

		<!-- Toolbar Section -->
		<div class="flex items-center justify-between space-y-2 py-4">
			<div class="flex flex-1 items-center space-x-2">
				<!-- Server Search -->
				{#if enableServerSearch}
					<div class="flex items-center space-x-2">
						<Input
							placeholder={searchPlaceholder}
							bind:value={searchInput}
							onkeydown={handleSearchKeydown}
							class="h-8 w-[150px] lg:w-[250px]"
						/>
						<Button onclick={handleServerSearch} size="sm" class="h-8">
							<Search class="h-4 w-4" />
						</Button>
					</div>
				{/if}

				<!-- Server Filters -->
				{#each additionalFilters as filter}
					{#if filter.type === 'select'}
						<select
							class="border-input bg-background ring-offset-background focus:ring-ring h-8 w-[180px] rounded-md border px-3 py-1 text-sm focus:ring-2 focus:ring-offset-2 focus:outline-none"
							onchange={(e) =>
								handleServerFilterChange(filter.column, e.currentTarget.value, filter.serverParam)}
							value={serverFilters[filter.serverParam || filter.column] || ''}
						>
							<option value="">{filter.placeholder}</option>
							{#each filter.options || [] as option}
								<option value={option.value}>{option.label}</option>
							{/each}
						</select>
					{/if}
				{/each}
			</div>

			<div class="flex items-center space-x-2">
				<!-- Bulk Actions -->
				{#if bulkActions.length > 0 && selectedCount > 0}
					<div class="flex items-center space-x-2">
						<span class="text-muted-foreground text-sm">
							{selectedCount} selected
						</span>
						{#each bulkActions as action}
							{#if !action.requiresSelection || selectedCount > 0}
								<Button
									variant={action.variant || 'outline'}
									size="sm"
									onclick={() => action.action && action.action(selectedRows, data)}
									class="h-8"
								>
									{#if action.icon}
										{@const IconComponent = action.icon}
										<IconComponent class="mr-2 h-4 w-4" />
									{/if}
									{action.label}
								</Button>
							{/if}
						{/each}
					</div>
				{/if}

				<!-- Refresh Button -->
				{#if onRefresh}
					<Button variant="outline" size="sm" onclick={handleRefresh} class="h-8">
						<RefreshCw class="h-4 w-4" />
					</Button>
				{/if}

				<!-- Export Button -->
				{#if onExport}
					<Button variant="outline" size="sm" onclick={handleExport} class="h-8">
						<Download class="h-4 w-4" />
					</Button>
				{/if}

				<!-- Column Visibility -->
				{#if enableColumnVisibility}
					<DropdownMenu.Root>
						<DropdownMenu.Trigger>
							<Button variant="outline" size="sm" class="ml-auto h-8">
								<Settings class="mr-2 h-4 w-4" />
								View
								<ChevronDown class="ml-2 h-4 w-4" />
							</Button>
						</DropdownMenu.Trigger>
						<DropdownMenu.Content align="end">
							{#each table.getAllColumns().filter((column) => column.getCanHide()) as column}
								<DropdownMenu.CheckboxItem
									class="capitalize"
									checked={column.getIsVisible()}
									onCheckedChange={(value) => column.toggleVisibility(!!value)}
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
	{/if}

	<!-- Data Table -->
	<div class="rounded-md border">
		<Table.Root>
			<Table.Header class="bg-muted">
				{#each table.getHeaderGroups() as headerGroup (headerGroup.id)}
					<Table.Row>
						{#if showRowNumbers}
							<Table.Head class="w-12">#</Table.Head>
						{/if}
						{#each headerGroup.headers as header (header.id)}
							<Table.Head colspan={header.colSpan}>
								{#if !header.isPlaceholder}
									{#if header.column.getCanSort()}
										<Button
											variant="ghost"
											onclick={() => header.column.toggleSorting()}
											class="h-auto p-0 font-medium hover:bg-transparent data-[state=open]:bg-transparent"
										>
											<FlexRender
												content={header.column.columnDef.header}
												context={header.getContext()}
											/>
											{#if header.column.getIsSorted() === 'asc'}
												<svg
													class="ml-1 h-4 w-4"
													fill="none"
													stroke="currentColor"
													viewBox="0 0 24 24"
													xmlns="http://www.w3.org/2000/svg"
												>
													<path
														stroke-linecap="round"
														stroke-linejoin="round"
														stroke-width="2"
														d="M5 15l7-7 7 7"
													/>
												</svg>
											{:else if header.column.getIsSorted() === 'desc'}
												<svg
													class="ml-1 h-4 w-4"
													fill="none"
													stroke="currentColor"
													viewBox="0 0 24 24"
													xmlns="http://www.w3.org/2000/svg"
												>
													<path
														stroke-linecap="round"
														stroke-linejoin="round"
														stroke-width="2"
														d="M19 9l-7 7-7-7"
													/>
												</svg>
											{:else}
												<svg
													class="ml-1 h-4 w-4 opacity-30"
													fill="none"
													stroke="currentColor"
													viewBox="0 0 24 24"
													xmlns="http://www.w3.org/2000/svg"
												>
													<path
														stroke-linecap="round"
														stroke-linejoin="round"
														stroke-width="2"
														d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"
													/>
												</svg>
											{/if}
										</Button>
									{:else}
										<FlexRender
											content={header.column.columnDef.header}
											context={header.getContext()}
										/>
									{/if}
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
						class="{stripedRows && index % 2 === 1 ? 'bg-muted/50' : ''} {onRowClick
							? 'hover:bg-muted/50 cursor-pointer'
							: ''}"
						onclick={(e) => onRowClick && onRowClick(row, e)}
					>
						{#if showRowNumbers}
							<Table.Cell class="text-muted-foreground text-center text-sm">
								{index + 1}
							</Table.Cell>
						{/if}
						{#each row.getVisibleCells() as cell (cell.id)}
							<Table.Cell>
								<FlexRender content={cell.column.columnDef.cell} context={cell.getContext()} />
							</Table.Cell>
						{/each}
						{#if customRowActions}
							<Table.Cell>
								{@render customRowActions({ row, rowIndex: index })}
							</Table.Cell>
						{/if}
					</Table.Row>
				{/each}
			</Table.Body>
		</Table.Root>

		{#if data.length === 0}
			<div class="flex h-24 items-center justify-center">
				<p class="text-muted-foreground">{emptyMessage}</p>
			</div>
		{/if}
	</div>
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
