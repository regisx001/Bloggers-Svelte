<script lang="ts">
	import EllipsisIcon from '@lucide/svelte/icons/ellipsis';
	import { Button } from '$lib/components/ui/button/index.js';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
	import { enhance } from '$app/forms';
	import { Trash } from '@lucide/svelte';
	import Eye from '@tabler/icons-svelte/icons/eye';
	import CircleDashedX from '@tabler/icons-svelte/icons/circle-dashed-x';
	import * as AlertDialog from '$lib/components/ui/alert-dialog/index.js';
	import { Input } from '$lib/components/ui/input';
	import ThumbUp from '@tabler/icons-svelte/icons/thumb-up';
	import Send from '@tabler/icons-svelte/icons/send';
	import type { Row } from '@tanstack/table-core';
	import { base } from '$app/paths';
	let { id, row }: { id: string; row: Row<Article> } = $props();
	let deleteAlertDialogOpen = $state(false);
	let publishAlertDialogOpen = $state(false);
	let feedback = $state('');
</script>

{#snippet deleteConfirm()}
	<AlertDialog.Root bind:open={deleteAlertDialogOpen}>
		<AlertDialog.Trigger class="hover:bg-muted hover:cursor-pointer">
			<Trash size="16" class=" text-destructive " />
		</AlertDialog.Trigger>
		<AlertDialog.Content>
			<AlertDialog.Header>
				<AlertDialog.Title>Are you sure?</AlertDialog.Title>
				<AlertDialog.Description>
					This action cannot be undone. This will permanently delete the article and remove the data
					from our servers.
				</AlertDialog.Description>
			</AlertDialog.Header>
			<AlertDialog.Footer>
				<AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
				<form
					action="?/deleteArticle"
					method="post"
					use:enhance={() => {
						return async ({ result, update }) => {
							if (result.type === 'success') {
								deleteAlertDialogOpen = false;
							}
							await update();
						};
					}}
				>
					<input type="hidden" name="articleId" value={id} />
					<AlertDialog.Action type="submit">Continue</AlertDialog.Action>
				</form>
			</AlertDialog.Footer>
		</AlertDialog.Content>
	</AlertDialog.Root>
{/snippet}

{#snippet approveConfirm()}
	<AlertDialog.Root bind:open={publishAlertDialogOpen}>
		<AlertDialog.Trigger class="hover:bg-muted hover:cursor-pointer">
			<ThumbUp class="text-green-600" />
		</AlertDialog.Trigger>
		<AlertDialog.Content>
			<AlertDialog.Header>
				<AlertDialog.Title>Are you sure?</AlertDialog.Title>
				<AlertDialog.Description>
					This action cannot be undone. This will approve the article and will ready to be visible
					by all the users !
					<div class="my-4">
						<Input bind:value={feedback} placeholder="feedback" />
					</div>
				</AlertDialog.Description>
			</AlertDialog.Header>

			<AlertDialog.Footer>
				<form
					action="?/approveArticle"
					method="post"
					use:enhance={() => {
						return async ({ result, update }) => {
							if (result.type === 'success') {
								publishAlertDialogOpen = false;
							}
							await update();
						};
					}}
				>
					<input type="hidden" name="articleId" value={id} />
					<!-- TODO: HANDLE THE FEEDBACK FROM THE BACKEND -->
					<input type="hidden" name="feedback" value={feedback} />
					<AlertDialog.Cancel>Cancel</AlertDialog.Cancel>

					<AlertDialog.Action type="submit">Continue</AlertDialog.Action>
				</form>
			</AlertDialog.Footer>
		</AlertDialog.Content>
	</AlertDialog.Root>
{/snippet}

{#snippet rejectConfirm()}
	<AlertDialog.Root bind:open={publishAlertDialogOpen}>
		<AlertDialog.Trigger class="hover:bg-muted hover:cursor-pointer">
			<CircleDashedX />
		</AlertDialog.Trigger>
		<AlertDialog.Content>
			<AlertDialog.Header>
				<AlertDialog.Title>Are you sure?</AlertDialog.Title>
				<AlertDialog.Description>
					This action cannot be undone. This will publish the article and will be visible by all the
					users !
					<div class="my-4">
						<Input bind:value={feedback} placeholder="feedback" />
					</div>
				</AlertDialog.Description>
			</AlertDialog.Header>

			<AlertDialog.Footer>
				<form
					action="?/rejectArticle"
					method="post"
					use:enhance={() => {
						return async ({ result, update }) => {
							if (result.type === 'success') {
								publishAlertDialogOpen = false;
							}
							await update();
						};
					}}
				>
					<input type="hidden" name="articleId" value={id} />
					<!-- TODO: HANDLE THE FEEDBACK FROM THE BACKEND -->
					<input type="hidden" name="feedback" value={feedback} />
					<AlertDialog.Cancel>Cancel</AlertDialog.Cancel>

					<AlertDialog.Action type="submit">Continue</AlertDialog.Action>
				</form>
			</AlertDialog.Footer>
		</AlertDialog.Content>
	</AlertDialog.Root>
{/snippet}

<div class="ml-2 flex justify-around gap-4">
	<div class="flex w-4 items-center justify-center">
		<a href="{base}/admin/articles/{id}">
			<Eye />
		</a>
	</div>
	<div class="flex w-4 items-center justify-center">
		{#if row.original.status !== 'APPROVED' && row.original.status !== 'PUBLISHED'}
			{@render approveConfirm()}
		{/if}
	</div>

	<div class="flex w-4 items-center justify-center">
		{#if !(row.original.status !== 'APPROVED' && row.original.status !== 'PUBLISHED')}
			{@render rejectConfirm()}
		{/if}
	</div>
	<div class="flex w-4 items-center justify-center">
		{@render deleteConfirm()}
	</div>

	<DropdownMenu.Root>
		<DropdownMenu.Trigger>
			{#snippet child({ props })}
				<Button {...props} variant="ghost" size="icon" class="relative size-8 p-0">
					<span class="sr-only">Open menu</span>
					<EllipsisIcon />
				</Button>
			{/snippet}
		</DropdownMenu.Trigger>
		<DropdownMenu.Content>
			<DropdownMenu.Group>
				<DropdownMenu.Label>Actions</DropdownMenu.Label>
				<DropdownMenu.Item onclick={() => navigator.clipboard.writeText(id)}>
					Copy Article ID
				</DropdownMenu.Item>
			</DropdownMenu.Group>
			<DropdownMenu.Separator />
			<!-- <form action="?/deleteCategory" method="post" use:enhance>
			<input type="hidden" name="categoryId" value={id} />
			<button class="w-full" type="submit">
				<DropdownMenu.Item class="hover:!bg-destructive">Delete Category</DropdownMenu.Item>
			</button>
		</form> -->

			<DropdownMenu.Item>View Article details</DropdownMenu.Item>
		</DropdownMenu.Content>
	</DropdownMenu.Root>
</div>
