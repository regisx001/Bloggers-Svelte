<script lang="ts">
	import type { PageProps } from './$types';
	import DataTable from './data-table-articles.svelte';
	import type { ColumnDef, Row } from '@tanstack/table-core';
	import { createRawSnippet, onMount } from 'svelte';
	let { data, form }: PageProps = $props();
	import { renderSnippet } from '$lib/components/ui/data-table/index.js';
	import DataTableCheckbox from '$lib/components/data-tables/data-table-checkbox.svelte';
	import { renderComponent } from '$lib/components/ui/data-table/index.js';
	import DataTableCategoriesActions from './data-table-articles-actions.svelte';
	import { Button, buttonVariants } from '$lib/components/ui/button/index.js';
	import { Input } from '$lib/components/ui/input';
	import { Plus } from '@lucide/svelte';
	import { Badge, badgeVariants } from '$lib/components/ui/badge/index.js';

	import * as Dialog from '$lib/components/ui/dialog';
	import { Label } from '$lib/components/ui/label/index.js';

	import { enhance } from '$app/forms';
	import { toast } from 'svelte-sonner';
	import TimeStamp from '$lib/components/time-stamp.svelte';
	import CircleCheckFilledIcon from '@tabler/icons-svelte/icons/circle-check-filled';
	import LoaderIcon from '@tabler/icons-svelte/icons/loader';

	const columns: ColumnDef<Article>[] = [
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
						row.original.featuredImage
							? `<a href="${row.original.featuredImage}" target="_blank" rel="noopener noreferrer">
								<div class="h-8 w-14 bg-cover bg-center cursor-pointer hover:opacity-80 transition-opacity" style="background-image: url('${row.original.featuredImage}');"></div>
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
			accessorKey: 'author',
			header: 'Author',
			cell: ({ row }) => {
				return row.original.author.username;
			}
		},
		{
			accessorKey: 'status',
			header: 'Status',
			cell: ({ row }) => {
				return renderSnippet(statusCellSnippet, { row });
			}
		},
		{
			accessorKey: 'publishedAt',
			header: () => {
				const publishedAtHeaderSnippet = createRawSnippet(() => ({
					render: () => `<div class="">Published At</div>`
				}));
				return renderSnippet(publishedAtHeaderSnippet, '');
			},
			cell: ({ row }) => {
				return row.original?.publishedAt
					? renderComponent(TimeStamp, {
							date: row.original.publishedAt
						})
					: 'Not Published';
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

		// {
		// 	accessorKey: 'updatedAt',
		// 	header: () => {
		// 		const updatedAtHeaderSnippet = createRawSnippet(() => ({
		// 			render: () => `<div class="">Updated At</div>`
		// 		}));
		// 		return renderSnippet(updatedAtHeaderSnippet, '');
		// 	},
		// 	cell: ({ row }) => {
		// 		return renderComponent(TimeStamp, {
		// 			date: row.original.updatedAt
		// 		});
		// 	}
		// },
		{
			id: 'actions',
			cell: ({ row }) => {
				return renderComponent(DataTableCategoriesActions, { id: row.original.id });
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

<!-- <pre>
	{JSON.stringify(data.articles, null, 2)}
</pre> -->
<!-- {JSON.stringify(createDialogOpen, null, 2)}
{JSON.stringify(form, null, 2)} -->

{#snippet addCategory()}
	<Dialog.Root bind:open={createDialogOpen}>
		<Dialog.Trigger class={buttonVariants({ variant: 'outline' })}>
			<Plus />
			<span>Add Article</span>
		</Dialog.Trigger>
		<Dialog.Content class="sm:max-w-[425px]">
			<Dialog.Header>
				<Dialog.Title>Add Article</Dialog.Title>
				<Dialog.Description>Fill the nessesary fields :</Dialog.Description>
			</Dialog.Header>
			<form
				action="?/createArticle"
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

				<Dialog.Footer>
					<Button type="submit">Save changes</Button>
				</Dialog.Footer>
			</form>
		</Dialog.Content>
	</Dialog.Root>
{/snippet}

<section class="p-6">
	<DataTable showHeader data={data.articles?.content || []} {columns}>
		{#snippet triggerAddCategory()}
			{@render addCategory()}
		{/snippet}
	</DataTable>
	<!-- <pre class="pre">
		{JSON.stringify(data.categories, null, 2)}
		</pre> -->
</section>

{#snippet statusCellSnippet({ row }: { row: Row<Article> })}
	<Badge variant="outline" class="text-muted-foreground px-1.5">
		{#if row.original.status === 'PUBLISHED'}
			<CircleCheckFilledIcon class="fill-green-500 dark:fill-green-400" />
		{:else}
			<LoaderIcon />
		{/if}
		{row.original.status}
	</Badge>
{/snippet}
