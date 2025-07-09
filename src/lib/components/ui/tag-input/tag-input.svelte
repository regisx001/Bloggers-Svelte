<script lang="ts">
	import { X } from '@lucide/svelte';
	import { cn } from '$lib/utils';

	interface Props {
		tags?: string[];
		placeholder?: string;
		maxTags?: number;
		allowDuplicates?: boolean;
		disabled?: boolean;
		class?: string;
		inputClass?: string;
		tagClass?: string;
		separators?: string[];
		validateTag?: (tag: string) => boolean;
		transformTag?: (tag: string) => string;
		name?: string;
		onTagAdded?: (event: { tag: string; tags: string[] }) => void;
		onTagRemoved?: (event: { tag: string; index: number; tags: string[] }) => void;
		onTagsChanged?: (event: { tags: string[] }) => void;
	}

	let {
		tags = $bindable([]),
		placeholder = 'Type and press Enter...',
		maxTags = Infinity,
		allowDuplicates = false,
		disabled = false,
		class: className = '',
		inputClass = '',
		tagClass = '',
		separators = [',', 'Enter'],
		validateTag = (tag: string) => tag.trim().length > 0,
		transformTag = (tag: string) => tag.trim(),
		name,
		onTagAdded,
		onTagRemoved,
		onTagsChanged
	}: Props = $props();

	let inputValue = $state('');
	let inputElement: HTMLInputElement;
	let containerElement: HTMLDivElement;

	function addTag(value: string) {
		if (!value || disabled) return;

		const transformedTag = transformTag(value);

		// Validate the tag
		if (!validateTag(transformedTag)) return;

		// Check for duplicates if not allowed
		if (!allowDuplicates && tags.includes(transformedTag)) return;

		// Check max tags limit
		if (tags.length >= maxTags) return;

		// Add the tag
		tags = [...tags, transformedTag];
		inputValue = '';

		// Call event handlers
		const eventData = { tag: transformedTag, tags };
		onTagAdded?.(eventData);
		onTagsChanged?.({ tags });
	}

	function removeTag(index: number) {
		if (disabled) return;

		const removedTag = tags[index];
		tags = tags.filter((_, i) => i !== index);

		// Call event handlers
		const eventData = { tag: removedTag, index, tags };
		onTagRemoved?.(eventData);
		onTagsChanged?.({ tags });
	}

	function handleKeydown(event: KeyboardEvent) {
		if (disabled) return;

		const { key } = event;

		// Add tag on Enter or comma
		if (separators.includes(key)) {
			event.preventDefault();
			addTag(inputValue);
			return;
		}

		// Remove last tag on Backspace if input is empty
		if (key === 'Backspace' && inputValue === '' && tags.length > 0) {
			event.preventDefault();
			removeTag(tags.length - 1);
			return;
		}

		// Navigate tags with arrow keys
		if (key === 'ArrowLeft' && inputValue === '' && tags.length > 0) {
			event.preventDefault();
			focusTag(tags.length - 1);
			return;
		}
	}

	function handleTagKeydown(event: KeyboardEvent, index: number) {
		if (disabled) return;

		const { key } = event;

		if (key === 'Delete' || key === 'Backspace') {
			event.preventDefault();
			removeTag(index);
			inputElement?.focus();
		} else if (key === 'ArrowLeft' && index > 0) {
			event.preventDefault();
			focusTag(index - 1);
		} else if (key === 'ArrowRight') {
			event.preventDefault();
			if (index < tags.length - 1) {
				focusTag(index + 1);
			} else {
				inputElement?.focus();
			}
		} else if (key === 'Enter' || key === ' ') {
			event.preventDefault();
			removeTag(index);
			inputElement?.focus();
		}
	}

	function focusTag(index: number) {
		const tagElement = containerElement?.querySelector(
			`[data-tag-index="${index}"]`
		) as HTMLElement;
		tagElement?.focus();
	}

	function handlePaste(event: ClipboardEvent) {
		if (disabled) return;

		const paste = event.clipboardData?.getData('text');
		if (!paste) return;

		event.preventDefault();

		// Split by common separators and add as tags
		const newTags = paste
			.split(/[,;\n\t]/)
			.map((tag) => tag.trim())
			.filter((tag) => tag.length > 0);

		newTags.forEach((tag) => addTag(tag));
	}

	// Focus input when container is clicked
	function handleContainerClick(event: MouseEvent) {
		if (
			event.target === containerElement ||
			(event.target as Element)?.closest('.tag-input-wrapper')
		) {
			inputElement?.focus();
		}
	}
</script>

<!-- Hidden input for form submission -->
{#if name}
	{#each tags as tag}
		<input type="hidden" {name} value={tag} />
	{/each}
{/if}

<!-- svelte-ignore a11y_interactive_supports_focus -->
<!-- svelte-ignore a11y_click_events_have_key_events -->
<div
	bind:this={containerElement}
	class={cn(
		'border-input bg-background ring-offset-background flex min-h-10 w-full flex-wrap items-center gap-2 rounded-md border px-3 py-2 text-sm transition-colors',
		'focus-within:ring-ring focus-within:ring-2 focus-within:ring-offset-2',
		disabled && 'cursor-not-allowed opacity-50',
		className
	)}
	onclick={handleContainerClick}
	role="textbox"
	aria-label="Tag input"
>
	<!-- Existing Tags -->
	{#each tags as tag, index}
		<div
			data-tag-index={index}
			class={cn(
				'bg-secondary text-secondary-foreground inline-flex items-center gap-1 rounded-md px-2 py-1 text-sm font-medium transition-colors',
				'focus:ring-ring focus:ring-2 focus:ring-offset-1 focus:outline-none',
				'hover:bg-secondary/80',
				!disabled && 'cursor-pointer',
				tagClass
			)}
			tabindex={disabled ? -1 : 0}
			role="button"
			aria-label={`Remove tag: ${tag}`}
			onkeydown={(e) => handleTagKeydown(e, index)}
		>
			<span class="max-w-xs truncate">{tag}</span>
			<button
				type="button"
				class={cn(
					'ring-offset-background ml-1 rounded-sm opacity-70 transition-opacity',
					'focus:ring-ring hover:opacity-100 focus:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-none',
					disabled && 'cursor-not-allowed'
				)}
				onclick={(e) => {
					e.stopPropagation();
					removeTag(index);
				}}
				{disabled}
				aria-label={`Remove ${tag}`}
			>
				<X class="h-3 w-3" />
			</button>
		</div>
	{/each}

	<!-- Input Field -->
	<input
		bind:this={inputElement}
		bind:value={inputValue}
		type="text"
		{placeholder}
		{disabled}
		class={cn(
			'placeholder:text-muted-foreground flex-1 border-0 bg-transparent outline-none',
			'min-w-[120px]',
			inputClass
		)}
		onkeydown={handleKeydown}
		onpaste={handlePaste}
		aria-label="Add new tag"
	/>
</div>

<!-- Helper Text -->
{#if tags.length >= maxTags && maxTags !== Infinity}
	<p class="text-muted-foreground mt-1 text-xs">
		Maximum of {maxTags} tags reached
	</p>
{:else if separators.includes('Enter') && separators.includes(',')}
	<p class="text-muted-foreground mt-1 text-xs">Press Enter or comma to add tags</p>
{:else if separators.includes('Enter')}
	<p class="text-muted-foreground mt-1 text-xs">Press Enter to add tags</p>
{/if}
