<script lang="ts">
	import type { PageProps } from './$types';
	import GenericDataTable from '$lib/components/data-tables/generic-data-table.svelte';
	import type { ColumnDef, Row } from '@tanstack/table-core';
	import { createRawSnippet, onMount } from 'svelte';
	let { data, form }: PageProps = $props();
	import { renderSnippet } from '$lib/components/ui/data-table/index.js';
	import DataTableCheckbox from '$lib/components/data-tables/data-table-checkbox.svelte';
	import { renderComponent } from '$lib/components/ui/data-table/index.js';
	import GenericDataTableActions from '$lib/components/data-tables/generic-data-table-actions.svelte';
	import { Button, buttonVariants } from '$lib/components/ui/button/index.js';
	import { Input } from '$lib/components/ui/input';
	import { Plus } from '@lucide/svelte';
	import { Badge, badgeVariants } from '$lib/components/ui/badge/index.js';
	import * as Avatar from '$lib/components/ui/avatar';
	import * as AlertDialog from '$lib/components/ui/alert-dialog';
	import { Label } from '$lib/components/ui/label/index.js';

	import { enhance } from '$app/forms';
	import { toast } from 'svelte-sonner';
	import TimeStamp from '$lib/components/time-stamp.svelte';
	import CircleCheckFilledIcon from '@tabler/icons-svelte/icons/circle-check-filled';
	import LoaderIcon from '@tabler/icons-svelte/icons/loader';
	import TagInput from '$lib/components/ui/tag-input/tag-input.svelte';
	import * as Select from '$lib/components/ui/select/index.js';
	import * as Tooltip from '$lib/components/ui/tooltip/index.js';
	import RichTextEditor from '$lib/components/editor/rich-text-editor.svelte';

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
				return renderSnippet(AuthorCellSnippet, { row });
			}
		},
		{
			accessorKey: 'tags',
			header: 'Tags',
			cell: ({ row }) => {
				return renderSnippet(TagsCellSnippet, { row });
			}
		},
		{
			accessorKey: 'category',
			header: 'Category',
			cell: ({ row }) => {
				return renderSnippet(CategoryCellSnippet, { row });
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
				return renderComponent(GenericDataTableActions, { 
					entityId: row.original.id,
					entityName: 'article',
					deleteAction: '?/deleteArticle'
				});
			}
		}
	];

	$effect(() => {
		if (form?.success) {
			if (form?.action === 'createArticle') {
				createDialogOpen = false;
				toast.success(form?.message || 'Article created successfully');
			} else if (form?.action === 'delete') {
				toast.error(form?.message);
			} else {
				toast.success(form?.message);
			}
		}
	});

	let createDialogOpen = $state(false);
	let selectedCategory: string | undefined = $state(undefined);
</script>

<!-- <pre>
	{JSON.stringify(data.articles, null, 2)}
</pre> -->

{#snippet addArticle()}
	<AlertDialog.Root bind:open={createDialogOpen}>
		<AlertDialog.Trigger class={buttonVariants({ variant: 'outline' })}>
			<Plus />
			<span>Add Article</span>
		</AlertDialog.Trigger>
		<AlertDialog.Content class="sm:max-w-[750px]">
			<AlertDialog.Header>
				<AlertDialog.Title>Add Article</AlertDialog.Title>
				<AlertDialog.Description>Fill the nessesary fields :</AlertDialog.Description>
			</AlertDialog.Header>
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
					<div class="mb-8 grid h-96 grid-cols-4 items-center gap-4">
						<Label for="description" class="text-right">Description*</Label>
						<!-- <Textarea name="description" placeholder="description" class="col-span-3" /> -->
						<!-- <Input id="content" name="content" value="" placeholder="content" class="col-span-3" /> -->
						<div class="relative col-span-4">
							<RichTextEditor name="content" class="col-span-4 max-h-96" />
						</div>
					</div>
					<div class="grid grid-cols-4 items-center gap-4">
						<Label for="image" class="text-right">Image</Label>
						<Input
							id="image"
							name="featuredImage"
							type="file"
							accept="image/*"
							class="col-span-3"
						/>
					</div>
					<div class="grid grid-cols-4 items-center gap-4">
						<Label for="Category" class="text-right">Category</Label>
						<Select.Root name="category" type="single" bind:value={selectedCategory}>
							<Select.Trigger class="col-span-3 w-full"
								>{selectedCategory ? selectedCategory : 'Select a category'}</Select.Trigger
							>
							<Select.Content>
								{#each data?.categories || [] as category}
									<Select.Item value={category}>{category}</Select.Item>
								{/each}
							</Select.Content>
						</Select.Root>
					</div>
					<div class="items-center gap-4">
						<TagInput name="tags" placeholder="add tags" />
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
		data={data.articles?.content || []} 
		{columns}
		entityName="article"
		deleteBatchAction="?/deleteArticlesBatch"
		filterColumn="title"
		filterPlaceholder="Filter articles..."
		pageSize={30}
	>
		{#snippet triggerAdd()}
			{@render addArticle()}
		{/snippet}
	</GenericDataTable>
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

{#snippet AuthorCellSnippet({ row }: { row: Row<Article> })}
	<div class="flex items-center gap-2">
		<Avatar.Root class="border-border/50 size-8 rounded-lg border">
			<Avatar.Image src={row.original.author.avatar} alt={row.original.author.username} />
			<Avatar.Fallback class="bg-muted text-muted-foreground rounded-lg text-sm font-medium">
				{row.original.author.username.slice(0, 2).toUpperCase()}
			</Avatar.Fallback>
		</Avatar.Root>
		<div class="flex flex-col">
			<span class="text-foreground text-sm font-medium">{row.original.author.username}</span>
			<span class="text-muted-foreground text-xs">Author</span>
		</div>
	</div>
{/snippet}

{#snippet TagsCellSnippet({ row }: { row: Row<Article> })}
	<div class="flex max-w-48 flex-wrap gap-1">
		{#if row.original.tags && row.original.tags.length > 0}
			{#each row.original.tags.slice(0, 2) as tag}
				<Badge variant="secondary" class="px-2 py-1 text-xs">
					{tag}
				</Badge>
			{/each}
			{#if row.original.tags.length > 2}
				<Tooltip.Root>
					<Tooltip.Trigger>
						<Badge variant="outline" class="cursor-help px-2 py-1 text-xs">
							+{row.original.tags.length - 2} more
						</Badge>
					</Tooltip.Trigger>
					<Tooltip.Content>
						<div class="flex max-w-64 flex-wrap gap-1">
							{#each row.original.tags.slice(2) as tag}
								<Badge variant="secondary" class="px-2 py-1 text-xs">
									{tag}
								</Badge>
							{/each}
						</div>
					</Tooltip.Content>
				</Tooltip.Root>
			{/if}
		{:else}
			<span class="text-muted-foreground text-xs italic">No tags</span>
		{/if}
	</div>
{/snippet}

{#snippet CategoryCellSnippet({ row }: { row: Row<Article> })}
	<div class="flex items-center gap-2">
		{#if row.original.category}
			{#if row.original.category.image}
				<div
					class="border-border/50 aspect-video h-full w-full rounded border bg-cover bg-center"
					style="background-image: url('{row.original.category.image}');"
					title={row.original.category.title}
				></div>
			{:else}
				<div
					class="bg-muted border-border/50 flex h-6 w-6 items-center justify-center rounded border"
				>
					<span class="text-muted-foreground text-xs font-medium">
						{row.original.category.title.charAt(0).toUpperCase()}
					</span>
				</div>
			{/if}
			<Badge variant="outline" class="px-2 py-1 text-xs font-medium">
				{row.original.category.title}
			</Badge>
		{:else}
			<Badge variant="secondary" class="text-muted-foreground px-2 py-1 text-xs">No Category</Badge>
		{/if}
	</div>
{/snippet}
