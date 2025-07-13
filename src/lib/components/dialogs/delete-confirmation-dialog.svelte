<script lang="ts">
	import * as AlertDialog from '$lib/components/ui/alert-dialog';
	import { Button } from '$lib/components/ui/button';
	import { enhance } from '$app/forms';

	interface DeleteConfirmationProps {
		open: boolean;
		entityName: string; // 'article', 'category', 'tag'
		entityType: 'single' | 'batch';
		deleteAction: string; // e.g., '?/deleteArticle' or '?/deleteArticlesBatch'
		selectedIds?: string | string[]; // single ID or array of IDs for batch
		onSuccess?: () => void;
		customDescription?: string;
	}

	let {
		open = $bindable(),
		entityName,
		entityType,
		deleteAction,
		selectedIds,
		onSuccess,
		customDescription
	}: DeleteConfirmationProps = $props();

	const getDescription = () => {
		if (customDescription) return customDescription;
		
		if (entityType === 'batch') {
			return `This action cannot be undone. This will permanently delete the selected ${entityName}s and remove the data from our servers.`;
		}
		return `This action cannot be undone. This will permanently delete the ${entityName} and remove the data from our servers.`;
	};

	const getTitle = () => {
		return entityType === 'batch' 
			? `Delete ${Array.isArray(selectedIds) ? selectedIds.length : 0} ${entityName}s?`
			: 'Are you sure?';
	};

	const handleEnhance = () => {
		return async ({ result, update }: any) => {
			if (result.type === 'success') {
				open = false;
				onSuccess?.();
			}
			await update();
		};
	};
</script>

<AlertDialog.Root bind:open={open}>
	<AlertDialog.Content>
		<AlertDialog.Header>
			<AlertDialog.Title>{getTitle()}</AlertDialog.Title>
			<AlertDialog.Description>
				{getDescription()}
			</AlertDialog.Description>
		</AlertDialog.Header>
		<AlertDialog.Footer>
			<AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
			<form
				action={deleteAction}
				method="post"
				use:enhance={handleEnhance}
			>
				{#if entityType === 'single' && typeof selectedIds === 'string'}
					<input type="hidden" name={`${entityName}Id`} value={selectedIds} />
				{:else if entityType === 'batch' && Array.isArray(selectedIds)}
					<input type="hidden" name="ids" value={selectedIds.join(',')} />
				{/if}
				<AlertDialog.Action type="submit">Continue</AlertDialog.Action>
			</form>
		</AlertDialog.Footer>
	</AlertDialog.Content>
</AlertDialog.Root>
