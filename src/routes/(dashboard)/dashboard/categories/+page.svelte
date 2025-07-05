<script lang="ts">
	import type { PageProps } from './$types';
	import DataTable from './data-table-categories.svelte';
	import type { ColumnDef } from '@tanstack/table-core';
	import { createRawSnippet, onMount } from 'svelte';
	let { data, form }: PageProps = $props();
	import { renderSnippet } from '$lib/components/ui/data-table/index.js';
	import DataTableCheckbox from '$lib/components/data-tables/data-table-checkbox.svelte';
	import { renderComponent } from '$lib/components/ui/data-table/index.js';
	import DataTableCategoriesActions from './data-table-categories-actions.svelte';
	import { Button, buttonVariants } from '$lib/components/ui/button/index.js';
	import { Input } from '$lib/components/ui/input';
	import { Plus } from '@lucide/svelte';

	import * as Dialog from '$lib/components/ui/dialog';
	import { Label } from '$lib/components/ui/label/index.js';

	import { enhance } from '$app/forms';
	import { toast } from 'svelte-sonner';
	// import { Textarea } from '$lib/components/ui/textarea/';
	// import { toast } from 'svelte-sonner';
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

	$effect(() => {
		if (form?.success) {
			if (form?.action === 'delete') {
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
	<Dialog.Root bind:open={createDialogOpen}>
		<Dialog.Trigger class={buttonVariants({ variant: 'outline' })}>
			<Plus />
			<span>Add Category</span>
		</Dialog.Trigger>
		<Dialog.Content class="sm:max-w-[425px]">
			<Dialog.Header>
				<Dialog.Title>Add Category</Dialog.Title>
				<Dialog.Description>Fill the nessesary fields :</Dialog.Description>
			</Dialog.Header>
			<form action="?/createCategory" method="post" use:enhance>
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
				</div>

				<Dialog.Footer>
					<Button
						onclick={() => {
							if (form?.action == 'create' && form?.success && createDialogOpen === true) {
								createDialogOpen = false;
							}
						}}
						type="submit">Save changes</Button
					>
				</Dialog.Footer>
			</form>
		</Dialog.Content>
	</Dialog.Root>
{/snippet}

<section class="p-6">
	<DataTable showHeader data={data.categories?.content || []} {columns}>
		{#snippet trigger()}
			{@render addCategory()}
		{/snippet}
	</DataTable>
	<!-- <pre class="pre">
		{JSON.stringify(data.categories, null, 2)}
		</pre> -->
</section>
