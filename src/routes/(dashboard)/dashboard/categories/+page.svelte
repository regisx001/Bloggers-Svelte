<script lang="ts">
	import type { PageProps } from './$types';
	import GenericDataTable from '$lib/components/data-tables/generic-data-table.svelte';
	import type { ColumnDef } from '@tanstack/table-core';
	import { createRawSnippet, onMount } from 'svelte';
	let { data, form }: PageProps = $props();
	import { renderSnippet } from '$lib/components/ui/data-table/index.js';
	import DataTableCheckbox from '$lib/components/data-tables/data-table-checkbox.svelte';
	import { renderComponent } from '$lib/components/ui/data-table/index.js';
	import GenericDataTableActions from '$lib/components/data-tables/generic-data-table-actions.svelte';
	import { Button, buttonVariants } from '$lib/components/ui/button/index.js';
	import { Input } from '$lib/components/ui/input';
	import { Plus } from '@lucide/svelte';

	import * as AlertDialog from '$lib/components/ui/alert-dialog';
	import { Label } from '$lib/components/ui/label/index.js';

	import { enhance } from '$app/forms';
	import { toast } from 'svelte-sonner';
	import TimeStamp from '$lib/components/time-stamp.svelte';

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
			accessorKey: 'image',
			header: () => {
				const updatedAtHeaderSnippet = createRawSnippet(() => ({
					render: () => `<div class="">Image</div>`
				}));
				return renderSnippet(updatedAtHeaderSnippet, '');
			},
			cell: ({ row }) => {
				const imageCellSnippet = createRawSnippet(() => ({
					render: () =>
						row.original.image
							? `<a href="${row.original.image}" target="_blank" rel="noopener noreferrer">
								<div class="h-8 w-14 bg-cover bg-center cursor-pointer hover:opacity-80 transition-opacity" style="background-image: url('${row.original.image}');"></div>
							</a>`
							: `<div class="h-8 w-14 bg-gray-200 flex items-center justify-center text-gray-500 text-xs">No Image</div>`
				}));
				return renderSnippet(imageCellSnippet, '');
			}
		},
		{
			accessorKey: 'title',
			header: 'Title'
		},
		{
			accessorKey: 'description',
			header: 'Description',

			cell: ({ row }) => {
				return row.original.description.length <= 30
					? row.original.description
					: row.original.description.slice(0, 30) + '...';
			}
		},
		{
			accessorKey: 'createdAt',
			header: () => {
				const createdAtHeaderSnippet = createRawSnippet(() => ({
					render: () => `<div class="">Created At</div>`
				}));
				return renderSnippet(createdAtHeaderSnippet, '');
			},
			cell: ({ row }) => {
				return renderComponent(TimeStamp, {
					date: row.original.createdAt
				});
			}
		},

		{
			accessorKey: 'updatedAt',
			header: () => {
				const updatedAtHeaderSnippet = createRawSnippet(() => ({
					render: () => `<div class="">Updated At</div>`
				}));
				return renderSnippet(updatedAtHeaderSnippet, '');
			},
			cell: ({ row }) => {
				return renderComponent(TimeStamp, {
					date: row.original.updatedAt
				});
			}
		},
		{
			id: 'actions',
			cell: ({ row }) => {
				return renderComponent(GenericDataTableActions, {
					entityId: row.original.id,
					entityName: 'category',
					deleteAction: '?/deleteCategory'
				});
			}
		}
	];

	$effect(() => {
		if (form?.success) {
			if (form?.action === 'createCategory') {
				createDialogOpen = false;
				toast.success(form?.message || 'Category created successfully');
			} else if (form?.action === 'delete') {
				toast.error(form?.message);
			} else {
				toast.success(form?.message);
			}
		}
	});

	// onMount(() => {
	// 	if (form?.success) {
	// 		toast.success('Category Created');
	// 	}
	// });

	let createDialogOpen = $state(false);
</script>

<!-- {JSON.stringify(createDialogOpen, null, 2)}
{JSON.stringify(form, null, 2)} -->

{#snippet addCategory()}
	<AlertDialog.Root bind:open={createDialogOpen}>
		<AlertDialog.Trigger class={buttonVariants({ variant: 'outline' })}>
			<Plus />
			<span>Add Category</span>
		</AlertDialog.Trigger>
		<AlertDialog.Content class="sm:max-w-[425px]">
			<AlertDialog.Header>
				<AlertDialog.Title>Add Category</AlertDialog.Title>
				<AlertDialog.Description>Fill the nessesary fields :</AlertDialog.Description>
			</AlertDialog.Header>
			<form
				action="?/createCategory"
				method="post"
				enctype="multipart/form-data"
				use:enhance={() => {
					return async ({ result, update }) => {
						await update();
						if (result.type == 'success') {
							createDialogOpen = false;
						}
					};
				}}
			>
				<div class="grid gap-4 py-4">
					<div class="grid grid-cols-4 items-center gap-4">
						<Label for="title" class="text-right">Title*</Label>
						<Input id="title" name="title" value="" placeholder="title" class="col-span-3" />
					</div>
					<div class="grid grid-cols-4 items-center gap-4">
						<Label for="description" class="text-right">Description*</Label>
						<!-- <Textarea name="description" placeholder="description" class="col-span-3" /> -->
						<Input
							id="description"
							name="description"
							value=""
							placeholder="description"
							class="col-span-3"
						/>
					</div>
					<div class="grid grid-cols-4 items-center gap-4">
						<Label for="image" class="text-right">Image</Label>
						<Input id="image" name="image" type="file" accept="image/*" class="col-span-3" />
					</div>
				</div>

				<AlertDialog.Footer>
					<Button type="submit">Save changes</Button>
				</AlertDialog.Footer>
			</form>
		</AlertDialog.Content>
	</AlertDialog.Root>
{/snippet}

<section class="p-6">
	<GenericDataTable
		showHeader
		data={data.categories?.content || []}
		{columns}
		entityName="category"
		deleteBatchAction="?/deleteCategoriesBatch"
		filterColumn="title"
		filterPlaceholder="Filter categories..."
		pageSize={10}
	>
		{#snippet triggerAdd()}
			{@render addCategory()}
		{/snippet}
	</GenericDataTable>
	<!-- <pre class="pre">
		{JSON.stringify(data.categories, null, 2)}
		</pre> -->
</section>
