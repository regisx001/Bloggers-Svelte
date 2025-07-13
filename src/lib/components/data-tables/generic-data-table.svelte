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
	import type { Snippet } from 'svelte';
	import { enhance } from '$app/forms';
	import DeleteConfirmation from '$lib/components/dialogs/delete-confirmation-dialog.svelte';

	let {
		data,
		columns,
		showHeader = false,
		triggerAdd,
		entityName,
		deleteBatchAction,
		filterColumn = 'title',
		filterPlaceholder = 'Filter...',
		pageSize = 10,
		emptyMessage = 'No results.'
	}: {
		columns: ColumnDef<TData, TValue>[];
		data: TData[];
		showHeader?: boolean;
		triggerAdd: Snippet;
		entityName: string; // 'article', 'category', 'tag'
		deleteBatchAction: string; // '?/deleteArticlesBatch'
		filterColumn?: string;
		filterPlaceholder?: string;
		pageSize?: number;
		emptyMessage?: string;
	} = $props();

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

	const handleDeleteSuccess = () => {
		table.toggleAllRowsSelected(false);
	};

	const getSelectedIds = () => {
		return table.getFilteredSelectedRowModel().rows.map((row: Row<TData>) => (row.original as any).id);
	};
</script>

<div>
	{#if showHeader}
		<div class="flex items-center justify-between py-4">
			<div class="flex items-center gap-4">
				<Input
					placeholder={filterPlaceholder}
					value={table.getColumn(filterColumn)?.getFilterValue() as string}
					onchange={(e) => table.getColumn(filterColumn)?.setFilterValue(e.currentTarget.value)}
					oninput={(e) => table.getColumn(filterColumn)?.setFilterValue(e.currentTarget.value)}
					class="max-w-sm"
				/>
				{#if table.getFilteredSelectedRowModel().rows.length > 0}
					<Button 
						variant="outline" 
						class="ml-auto"
						onclick={() => deleteDialogOpen = true}
					>
						Delete All
					</Button>
				{/if}
			</div>

			<div class="flex items-center gap-4">
				<DropdownMenu.Root>
					<DropdownMenu.Trigger>
						{#snippet child({ props })}
							<Button {...props} variant="outline" class="ml-auto">Columns</Button>
						{/snippet}
					</DropdownMenu.Trigger>
					<DropdownMenu.Content align="end">
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
				{@render triggerAdd()}
			</div>
		</div>
	{/if}

	<div class="rounded-md border">
		<Table.Root>
			<Table.Header class="bg-muted sticky top-0 z-10">
				{#each table.getHeaderGroups() as headerGroup (headerGroup.id)}
					<Table.Row>
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
					</Table.Row>
				{/each}
			</Table.Header>
			<Table.Body>
				{#each table.getRowModel().rows as row (row.id)}
					<Table.Row data-state={row.getIsSelected() && 'selected'}>
						{#each row.getVisibleCells() as cell (cell.id)}
							<Table.Cell>
								<FlexRender content={cell.column.columnDef.cell} context={cell.getContext()} />
							</Table.Cell>
						{/each}
					</Table.Row>
				{:else}
					<Table.Row>
						<Table.Cell colspan={columns.length} class="h-24 text-center">{emptyMessage}</Table.Cell>
					</Table.Row>
				{/each}
			</Table.Body>
		</Table.Root>
	</div>
	<div class="text-muted-foreground flex-1 p-4 text-sm">
		{table.getFilteredSelectedRowModel().rows.length} of{' '}
		{table.getFilteredRowModel().rows.length} row(s) selected.
	</div>
</div>

<DeleteConfirmation
	bind:open={deleteDialogOpen}
	entityName={entityName}
	entityType="batch"
	deleteAction={deleteBatchAction}
	selectedIds={getSelectedIds()}
	onSuccess={handleDeleteSuccess}
/>
