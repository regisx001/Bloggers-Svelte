<script lang="ts">
	import type { PageProps } from './$types';
	import DataTable from './data-table-categories.svelte';
	import type { ColumnDef } from '@tanstack/table-core';
	import { createRawSnippet } from 'svelte';
	let { data }: PageProps = $props();
	import { renderSnippet } from '$lib/components/ui/data-table/index.js';
	import DataTableCheckbox from '$lib/components/data-tables/data-table-checkbox.svelte';
	import { renderComponent } from '$lib/components/ui/data-table/index.js';
	import DataTableCategoriesActions from './data-table-categories-actions.svelte';
	const columns: ColumnDef<Category>[] = [
		{
			id: 'select',
			header: ({ table }) =>
				renderComponent(DataTableCheckbox, {
					checked: table.getIsAllPageRowsSelected(),
					indeterminate: table.getIsSomePageRowsSelected() && !table.getIsAllPageRowsSelected(),
					onCheckedChange: (value) => table.toggleAllPageRowsSelected(!!value),
					'aria-label': 'Select all'
				}),
			cell: ({ row }) =>
				renderComponent(DataTableCheckbox, {
					checked: row.getIsSelected(),
					onCheckedChange: (value) => row.toggleSelected(!!value),
					'aria-label': 'Select row'
				}),
			enableSorting: false,
			enableHiding: false
		},
		{
			accessorKey: 'title',
			header: 'Title'
		},
		{
			accessorKey: 'description',
			header: 'Description'
		},
		{
			accessorKey: 'createdAt',
			header: () => {
				const createdAtHeaderSnippet = createRawSnippet(() => ({
					render: () => `<div class="">Created At</div>`
				}));
				return renderSnippet(createdAtHeaderSnippet, '');
			}
		},
		{
			accessorKey: 'updatedAt',
			header: () => {
				const updatedAtHeaderSnippet = createRawSnippet(() => ({
					render: () => `<div class="">Updated At</div>`
				}));
				return renderSnippet(updatedAtHeaderSnippet, '');
			}
		},
		{
			id: 'actions',
			cell: ({ row }) => {
				return renderComponent(DataTableCategoriesActions, { id: row.original.id });
			}
		}
	];
</script>

<section class="p-6">
	<DataTable showHeader data={data.categories?.content || []} {columns} />
	<!-- <pre class="pre">
		{JSON.stringify(data.categories, null, 2)}
		</pre> -->
</section>
