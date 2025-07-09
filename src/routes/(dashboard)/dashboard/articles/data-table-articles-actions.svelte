<script lang="ts">
	import EllipsisIcon from '@lucide/svelte/icons/ellipsis';
	import { Button } from '$lib/components/ui/button/index.js';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
	import { enhance } from '$app/forms';
	import * as Dialog from '$lib/components/ui/dialog';
	import { Trash } from '@lucide/svelte';
	import * as AlertDialog from '$lib/components/ui/alert-dialog/index.js';
	let { id }: { id: string } = $props();
</script>

{#snippet DeleteConfirm()}
	<AlertDialog.Root>
		<AlertDialog.Trigger class="hover:bg-muted hover:cursor-pointer">
			<Trash size="16" class="text-destructive" />
		</AlertDialog.Trigger>
		<AlertDialog.Content>
			<AlertDialog.Header>
				<AlertDialog.Title>Are you sure?</AlertDialog.Title>
				<AlertDialog.Description>
					This action cannot be undone. This will permanently delete the category and remove the
					data from our servers.
				</AlertDialog.Description>
			</AlertDialog.Header>
			<AlertDialog.Footer>
				<AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
				<form action="?/deleteCategory" method="post" use:enhance>
					<input type="hidden" name="categoryId" value={id} />
					<AlertDialog.Action type="submit">Continue</AlertDialog.Action>
				</form>
			</AlertDialog.Footer>
		</AlertDialog.Content>
	</AlertDialog.Root>
{/snippet}
<div class="flex justify-around">
	<div class="flex items-center">
		{@render DeleteConfirm()}
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
					Copy Category ID
				</DropdownMenu.Item>
			</DropdownMenu.Group>
			<DropdownMenu.Separator />
			<!-- <form action="?/deleteCategory" method="post" use:enhance>
			<input type="hidden" name="categoryId" value={id} />
			<button class="w-full" type="submit">
				<DropdownMenu.Item class="hover:!bg-destructive">Delete Category</DropdownMenu.Item>
			</button>
		</form> -->

			<DropdownMenu.Item>View Category details</DropdownMenu.Item>
		</DropdownMenu.Content>
	</DropdownMenu.Root>
</div>
