<script lang="ts">
	import { onMount } from 'svelte';
	import { Button } from '$lib/components/ui/button/index.js';
	import { Separator } from '$lib/components/ui/separator/index.js';
	import {
		Bold,
		Italic,
		Underline,
		Strikethrough,
		AlignLeft,
		AlignCenter,
		AlignRight,
		List,
		ListOrdered,
		Quote,
		Code,
		Code2,
		Link,
		Image,
		Undo,
		Redo,
		Type,
		Heading1,
		Heading2,
		Heading3,
		MoreHorizontal
	} from '@lucide/svelte';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';

	export let content: string = '';
	export let placeholder: string = 'Start writing your content...';
	export let readonly: boolean = false;
	export let minHeight: string = '300px';

	let editor: HTMLDivElement;
	let linkDialogOpen = false;
	let imageDialogOpen = false;
	let linkUrl = '';
	let linkText = '';
	let imageUrl = '';
	let imageAlt = '';

	// Active states for toolbar buttons
	let activeBold = false;
	let activeItalic = false;
	let activeUnderline = false;
	let activeStrikethrough = false;
	let activeAlignLeft = false;
	let activeAlignCenter = false;
	let activeAlignRight = false;
	let activeBulletList = false;
	let activeNumberedList = false;
	let currentBlockFormat = 'p';

	onMount(() => {
		if (editor) {
			editor.innerHTML = content;

			// Set up event listeners
			editor.addEventListener('input', handleInput);
			editor.addEventListener('paste', handlePaste);
			editor.addEventListener('keydown', handleKeydown);
			editor.addEventListener('mouseup', updateToolbarState);
			editor.addEventListener('keyup', updateToolbarState);
			editor.addEventListener('focus', updateToolbarState);
			editor.addEventListener('selectionchange', updateToolbarState);

			// Also listen to document selection change
			document.addEventListener('selectionchange', updateToolbarState);

			// Initial toolbar state update
			setTimeout(updateToolbarState, 100);
		}
	});

	function handleInput() {
		content = editor.innerHTML;
		updateToolbarState();
	}

	function handlePaste(e: ClipboardEvent) {
		e.preventDefault();
		const text = e.clipboardData?.getData('text/plain') || '';
		document.execCommand('insertText', false, text);
	}

	function handleKeydown(e: KeyboardEvent) {
		// Handle keyboard shortcuts
		if (e.ctrlKey || e.metaKey) {
			switch (e.key) {
				case 'b':
					e.preventDefault();
					execCommand('bold');
					break;
				case 'i':
					e.preventDefault();
					execCommand('italic');
					break;
				case 'u':
					e.preventDefault();
					execCommand('underline');
					break;
				case 'z':
					e.preventDefault();
					if (e.shiftKey) {
						execCommand('redo');
					} else {
						execCommand('undo');
					}
					break;
			}
		}

		// Handle Enter key for better list formatting
		if (e.key === 'Enter') {
			const selection = window.getSelection();
			if (selection && selection.rangeCount > 0) {
				const range = selection.getRangeAt(0);
				const listItem = range.startContainer.parentElement?.closest('li');
				if (listItem && listItem.textContent?.trim() === '') {
					e.preventDefault();
					execCommand('outdent');
				}
			}
		}
	}

	function execCommand(command: string, value?: string) {
		if (typeof document === 'undefined') return;
		document.execCommand(command, false, value);
		if (editor) {
			editor.focus();
			// Update toolbar state after command execution
			setTimeout(updateToolbarState, 10);
		}
	}

	function formatBlock(tag: string) {
		if (typeof document === 'undefined') return;
		document.execCommand('formatBlock', false, tag);
		if (editor) {
			editor.focus();
			// Update toolbar state after command execution
			setTimeout(updateToolbarState, 10);
		}
	}

	function insertLink() {
		if (typeof window === 'undefined') return;
		const selection = window.getSelection();
		if (selection && selection.toString()) {
			linkText = selection.toString();
		}
		linkDialogOpen = true;
	}

	function applyLink() {
		if (linkUrl && typeof document !== 'undefined') {
			if (linkText) {
				const html = `<a href="${linkUrl}" target="_blank" rel="noopener noreferrer">${linkText}</a>`;
				document.execCommand('insertHTML', false, html);
			} else {
				document.execCommand('createLink', false, linkUrl);
			}
		}
		linkDialogOpen = false;
		linkUrl = '';
		linkText = '';
		editor.focus();
	}

	function insertImage() {
		if (typeof window === 'undefined') return;

		// If there's selected text, use it as alt text
		const selection = window.getSelection();
		if (selection && selection.toString().trim()) {
			imageAlt = selection.toString().trim();
		}

		imageDialogOpen = true;
	}

	function applyImage() {
		// Validate inputs
		if (!imageUrl.trim() || typeof document === 'undefined' || !editor) {
			return;
		}

		// Focus the editor first to ensure we have an active selection
		editor.focus();

		// Create the image HTML with better styling
		const cleanImageUrl = imageUrl.trim();
		const cleanImageAlt = imageAlt.trim() || 'Image';
		const html = `<img src="${cleanImageUrl}" alt="${cleanImageAlt}" style="max-width: 100%; height: auto; margin: 10px 0; display: block;" />`;

		// Use insertHTML to insert the image
		const success = document.execCommand('insertHTML', false, html);

		// Fallback method if insertHTML doesn't work
		if (!success) {
			try {
				const selection = window.getSelection();
				if (selection && selection.rangeCount > 0) {
					const range = selection.getRangeAt(0);
					range.deleteContents();

					const img = document.createElement('img');
					img.src = cleanImageUrl;
					img.alt = cleanImageAlt;
					img.style.maxWidth = '100%';
					img.style.height = 'auto';
					img.style.margin = '10px 0';
					img.style.display = 'block';

					range.insertNode(img);

					// Move cursor after the image
					const newRange = document.createRange();
					newRange.setStartAfter(img);
					newRange.collapse(true);
					selection.removeAllRanges();
					selection.addRange(newRange);
				}
			} catch (error) {
				console.error('Error inserting image:', error);
			}
		}

		// Update content and trigger input event
		content = editor.innerHTML;
		editor.dispatchEvent(new Event('input', { bubbles: true }));

		// Close dialog and reset values
		imageDialogOpen = false;
		imageUrl = '';
		imageAlt = '';

		// Ensure editor stays focused
		if (editor) {
			editor.focus();
		}
	}

	function isCommandActive(command: string): boolean {
		if (typeof document === 'undefined') return false;
		try {
			return document.queryCommandState(command);
		} catch {
			return false;
		}
	}

	function updateToolbarState() {
		if (typeof document === 'undefined' || !editor) return;

		// Check if editor is focused or contains the selection
		const selection = window.getSelection();
		if (!selection || selection.rangeCount === 0) return;

		const range = selection.getRangeAt(0);
		if (
			!editor.contains(range.commonAncestorContainer) &&
			range.commonAncestorContainer !== editor
		) {
			return;
		}

		try {
			activeBold = document.queryCommandState('bold');
			activeItalic = document.queryCommandState('italic');
			activeUnderline = document.queryCommandState('underline');
			activeStrikethrough = document.queryCommandState('strikeThrough');
			activeAlignLeft = document.queryCommandState('justifyLeft');
			activeAlignCenter = document.queryCommandState('justifyCenter');
			activeAlignRight = document.queryCommandState('justifyRight');
			activeBulletList = document.queryCommandState('insertUnorderedList');
			activeNumberedList = document.queryCommandState('insertOrderedList');

			// Update current block format
			currentBlockFormat = getCurrentBlockFormat();

			console.log('Toolbar updated:', {
				bold: activeBold,
				italic: activeItalic,
				format: currentBlockFormat
			});
		} catch (error) {
			console.log('Error updating toolbar:', error);
			// Reset all states if there's an error
			activeBold = false;
			activeItalic = false;
			activeUnderline = false;
			activeStrikethrough = false;
			activeAlignLeft = false;
			activeAlignCenter = false;
			activeAlignRight = false;
			activeBulletList = false;
			activeNumberedList = false;
			currentBlockFormat = 'p';
		}
	}

	function getCurrentBlockFormat(): string {
		if (typeof window === 'undefined') return 'p';

		try {
			const selection = window.getSelection();
			if (!selection || selection.rangeCount === 0) return 'p';

			const range = selection.getRangeAt(0);
			let element =
				range.startContainer.nodeType === Node.TEXT_NODE
					? range.startContainer.parentElement
					: (range.startContainer as Element);

			// Walk up the DOM tree to find a block-level element
			while (element && element !== editor && element.parentElement) {
				const tagName = element.tagName?.toLowerCase();
				if (['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'div', 'blockquote'].includes(tagName)) {
					return tagName;
				}
				element = element.parentElement;
			}
		} catch (error) {
			console.log('Error getting block format:', error);
		}

		return 'p';
	}

	$: if (editor && content !== editor.innerHTML) {
		editor.innerHTML = content;
	}
</script>

<div class="rich-text-editor bg-background overflow-hidden rounded-lg border">
	<!-- Toolbar -->
	<div class="bg-muted/30 border-b p-2">
		<div class="flex flex-wrap items-center gap-1">
			<!-- Text Formatting Group -->
			<div class="flex items-center gap-1">
				<Button
					variant={activeBold ? 'default' : 'ghost'}
					size="sm"
					onclick={() => execCommand('bold')}
					disabled={readonly}
					title="Bold (Ctrl+B)"
					class={activeBold
						? '!bg-primary !text-primary-foreground hover:!bg-primary/90'
						: 'hover:bg-muted'}
				>
					<Bold class="h-4 w-4" />
				</Button>
				<Button
					variant={activeItalic ? 'default' : 'ghost'}
					size="sm"
					onclick={() => execCommand('italic')}
					disabled={readonly}
					title="Italic (Ctrl+I)"
					class={activeItalic
						? '!bg-primary !text-primary-foreground hover:!bg-primary/90'
						: 'hover:bg-muted'}
				>
					<Italic class="h-4 w-4" />
				</Button>
				<Button
					variant={activeUnderline ? 'default' : 'ghost'}
					size="sm"
					onclick={() => execCommand('underline')}
					disabled={readonly}
					title="Underline (Ctrl+U)"
					class={activeUnderline
						? '!bg-primary !text-primary-foreground hover:!bg-primary/90'
						: 'hover:bg-muted'}
				>
					<Underline class="h-4 w-4" />
				</Button>
				<Button
					variant={activeStrikethrough ? 'default' : 'ghost'}
					size="sm"
					onclick={() => execCommand('strikeThrough')}
					disabled={readonly}
					title="Strikethrough"
					class={activeStrikethrough
						? '!bg-primary !text-primary-foreground hover:!bg-primary/90'
						: 'hover:bg-muted'}
				>
					<Strikethrough class="h-4 w-4" />
				</Button>
			</div>

			<Separator orientation="vertical" class="h-6" />

			<!-- Heading Dropdown -->
			<DropdownMenu.Root>
				<DropdownMenu.Trigger>
					<Button
						variant={currentBlockFormat !== 'p' ? 'default' : 'ghost'}
						size="sm"
						disabled={readonly}
						class={currentBlockFormat !== 'p'
							? '!bg-primary !text-primary-foreground hover:!bg-primary/90'
							: 'hover:bg-muted'}
					>
						{#if currentBlockFormat === 'h1'}
							<Heading1 class="h-4 w-4" />
						{:else if currentBlockFormat === 'h2'}
							<Heading2 class="h-4 w-4" />
						{:else if currentBlockFormat === 'h3'}
							<Heading3 class="h-4 w-4" />
						{:else}
							<Type class="h-4 w-4" />
						{/if}
					</Button>
				</DropdownMenu.Trigger>
				<DropdownMenu.Content>
					<DropdownMenu.Item
						onclick={() => formatBlock('p')}
						class={currentBlockFormat === 'p' ? 'bg-muted' : ''}
					>
						<Type class="mr-2 h-4 w-4" />
						Normal Text
					</DropdownMenu.Item>
					<DropdownMenu.Item
						onclick={() => formatBlock('h1')}
						class={currentBlockFormat === 'h1' ? 'bg-muted' : ''}
					>
						<Heading1 class="mr-2 h-4 w-4" />
						Heading 1
					</DropdownMenu.Item>
					<DropdownMenu.Item
						onclick={() => formatBlock('h2')}
						class={currentBlockFormat === 'h2' ? 'bg-muted' : ''}
					>
						<Heading2 class="mr-2 h-4 w-4" />
						Heading 2
					</DropdownMenu.Item>
					<DropdownMenu.Item
						onclick={() => formatBlock('h3')}
						class={currentBlockFormat === 'h3' ? 'bg-muted' : ''}
					>
						<Heading3 class="mr-2 h-4 w-4" />
						Heading 3
					</DropdownMenu.Item>
				</DropdownMenu.Content>
			</DropdownMenu.Root>

			<Separator orientation="vertical" class="h-6" />

			<!-- Alignment Group -->
			<div class="flex items-center gap-1">
				<Button
					variant={activeAlignLeft ? 'default' : 'ghost'}
					size="sm"
					onclick={() => execCommand('justifyLeft')}
					disabled={readonly}
					title="Align Left"
					class={activeAlignLeft
						? '!bg-primary !text-primary-foreground hover:!bg-primary/90'
						: 'hover:bg-muted'}
				>
					<AlignLeft class="h-4 w-4" />
				</Button>
				<Button
					variant={activeAlignCenter ? 'default' : 'ghost'}
					size="sm"
					onclick={() => execCommand('justifyCenter')}
					disabled={readonly}
					title="Align Center"
					class={activeAlignCenter
						? '!bg-primary !text-primary-foreground hover:!bg-primary/90'
						: 'hover:bg-muted'}
				>
					<AlignCenter class="h-4 w-4" />
				</Button>
				<Button
					variant={activeAlignRight ? 'default' : 'ghost'}
					size="sm"
					onclick={() => execCommand('justifyRight')}
					disabled={readonly}
					title="Align Right"
					class={activeAlignRight
						? '!bg-primary !text-primary-foreground hover:!bg-primary/90'
						: 'hover:bg-muted'}
				>
					<AlignRight class="h-4 w-4" />
				</Button>
			</div>

			<Separator orientation="vertical" class="h-6" />

			<!-- Lists Group -->
			<div class="flex items-center gap-1">
				<Button
					variant={activeBulletList ? 'default' : 'ghost'}
					size="sm"
					onclick={() => execCommand('insertUnorderedList')}
					disabled={readonly}
					title="Bullet List"
					class={activeBulletList
						? '!bg-primary !text-primary-foreground hover:!bg-primary/90'
						: 'hover:bg-muted'}
				>
					<List class="h-4 w-4" />
				</Button>
				<Button
					variant={activeNumberedList ? 'default' : 'ghost'}
					size="sm"
					onclick={() => execCommand('insertOrderedList')}
					disabled={readonly}
					title="Numbered List"
					class={activeNumberedList
						? '!bg-primary !text-primary-foreground hover:!bg-primary/90'
						: 'hover:bg-muted'}
				>
					<ListOrdered class="h-4 w-4" />
				</Button>
				<Button
					variant="ghost"
					size="sm"
					onclick={() => formatBlock('blockquote')}
					disabled={readonly}
					title="Quote"
					class="hover:bg-muted"
				>
					<Quote class="h-4 w-4" />
				</Button>
			</div>

			<Separator orientation="vertical" class="h-6" />

			<!-- Insert Group -->
			<div class="flex items-center gap-1">
				<Button
					variant="ghost"
					size="sm"
					onclick={insertLink}
					disabled={readonly}
					title="Insert Link"
				>
					<Link class="h-4 w-4" />
				</Button>
				<Button
					variant="ghost"
					size="sm"
					onclick={insertImage}
					disabled={readonly}
					title="Insert Image"
				>
					<Image class="h-4 w-4" />
				</Button>
				<Button
					variant="ghost"
					size="sm"
					onclick={() => execCommand('insertHTML', '<hr>')}
					disabled={readonly}
					title="Insert Horizontal Rule"
				>
					<MoreHorizontal class="h-4 w-4" />
				</Button>
			</div>

			<Separator orientation="vertical" class="h-6" />

			<!-- Code Group -->
			<div class="flex items-center gap-1">
				<Button
					variant="ghost"
					size="sm"
					onclick={() => execCommand('insertHTML', '<code></code>')}
					disabled={readonly}
					title="Inline Code"
				>
					<Code class="h-4 w-4" />
				</Button>
				<Button
					variant="ghost"
					size="sm"
					onclick={() => execCommand('insertHTML', '<pre><code></code></pre>')}
					disabled={readonly}
					title="Code Block"
				>
					<Code2 class="h-4 w-4" />
				</Button>
			</div>

			<Separator orientation="vertical" class="h-6" />

			<!-- Undo/Redo Group -->
			<div class="flex items-center gap-1">
				<Button
					variant="ghost"
					size="sm"
					onclick={() => execCommand('undo')}
					disabled={readonly}
					title="Undo (Ctrl+Z)"
				>
					<Undo class="h-4 w-4" />
				</Button>
				<Button
					variant="ghost"
					size="sm"
					onclick={() => execCommand('redo')}
					disabled={readonly}
					title="Redo (Ctrl+Shift+Z)"
				>
					<Redo class="h-4 w-4" />
				</Button>
			</div>
		</div>
	</div>

	<!-- Editor Content -->
	<div
		bind:this={editor}
		contenteditable={!readonly}
		class="prose prose-sm editor-content max-w-none p-4 focus:outline-none"
		style="min-height: {minHeight};"
		data-placeholder={placeholder}
		role="textbox"
		aria-label="Rich text editor"
	></div>
</div>

<!-- Link Dialog -->
<Dialog.Root bind:open={linkDialogOpen}>
	<Dialog.Content class="sm:max-w-md">
		<Dialog.Header>
			<Dialog.Title>Insert Link</Dialog.Title>
			<Dialog.Description>Add a link to your content</Dialog.Description>
		</Dialog.Header>
		<div class="grid gap-4 py-4">
			<div class="grid gap-2">
				<Label for="link-url">URL</Label>
				<Input id="link-url" bind:value={linkUrl} placeholder="https://example.com" type="url" />
			</div>
			<div class="grid gap-2">
				<Label for="link-text">Link Text (optional)</Label>
				<Input id="link-text" bind:value={linkText} placeholder="Link text" />
			</div>
		</div>
		<Dialog.Footer>
			<Button variant="outline" onclick={() => (linkDialogOpen = false)}>Cancel</Button>
			<Button onclick={applyLink}>Insert Link</Button>
		</Dialog.Footer>
	</Dialog.Content>
</Dialog.Root>

<!-- Image Dialog -->
<Dialog.Root bind:open={imageDialogOpen}>
	<Dialog.Content class="sm:max-w-md">
		<Dialog.Header>
			<Dialog.Title>Insert Image</Dialog.Title>
			<Dialog.Description>Add an image to your content</Dialog.Description>
		</Dialog.Header>
		<div class="grid gap-4 py-4">
			<div class="grid gap-2">
				<Label for="image-url">Image URL</Label>
				<Input
					id="image-url"
					bind:value={imageUrl}
					placeholder="https://example.com/image.jpg"
					type="url"
				/>
			</div>
			<div class="grid gap-2">
				<Label for="image-alt">Alt Text</Label>
				<Input id="image-alt" bind:value={imageAlt} placeholder="Description of the image" />
			</div>
		</div>
		<Dialog.Footer>
			<Button variant="outline" onclick={() => (imageDialogOpen = false)}>Cancel</Button>
			<Button onclick={applyImage} disabled={!imageUrl.trim()}>Insert Image</Button>
		</Dialog.Footer>
	</Dialog.Content>
</Dialog.Root>

<style>
	.rich-text-editor [contenteditable]:empty:before {
		content: attr(data-placeholder);
		color: hsl(var(--muted-foreground));
		pointer-events: none;
	}

	/* Enhanced active button styles using primary theme color */
	.rich-text-editor :global(.bg-primary) {
		background-color: hsl(var(--primary)) !important;
		color: hsl(var(--primary-foreground)) !important;
		transition: all 0.2s ease-in-out;
	}

	.rich-text-editor :global(.bg-primary:hover) {
		background-color: hsl(var(--primary) / 0.9) !important;
	}

	.rich-text-editor :global(.prose) {
		color: hsl(var(--foreground));
	}

	.rich-text-editor :global(.prose h1) {
		font-size: 2rem;
		font-weight: 700;
		line-height: 2.5rem;
		margin: 1rem 0 0.5rem 0;
	}

	.rich-text-editor :global(.prose h2) {
		font-size: 1.5rem;
		font-weight: 600;
		line-height: 2rem;
		margin: 0.875rem 0 0.5rem 0;
	}

	.rich-text-editor :global(.prose h3) {
		font-size: 1.25rem;
		font-weight: 600;
		line-height: 1.75rem;
		margin: 0.75rem 0 0.5rem 0;
	}

	.rich-text-editor :global(.prose p) {
		margin: 0.5rem 0;
		line-height: 1.6;
	}

	.rich-text-editor :global(.prose ul),
	.rich-text-editor :global(.prose ol) {
		margin: 0.5rem 0;
		padding-left: 1.5rem;
	}

	.rich-text-editor :global(.prose ul) {
		list-style-type: disc;
	}

	.rich-text-editor :global(.prose ol) {
		list-style-type: decimal;
	}

	.rich-text-editor :global(.prose li) {
		margin: 0.25rem 0;
		display: list-item;
	}

	.rich-text-editor :global(.prose ul li) {
		list-style-type: disc;
	}

	.rich-text-editor :global(.prose ol li) {
		list-style-type: decimal;
	}

	/* Ensure lists display properly in contenteditable */
	.rich-text-editor :global(.editor-content ul) {
		list-style-type: disc !important;
		padding-left: 1.5rem !important;
		margin: 0.5rem 0 !important;
	}

	.rich-text-editor :global(.editor-content ol) {
		list-style-type: decimal !important;
		padding-left: 1.5rem !important;
		margin: 0.5rem 0 !important;
	}

	.rich-text-editor :global(.editor-content li) {
		display: list-item !important;
		margin: 0.25rem 0 !important;
		list-style-position: outside !important;
	}

	.rich-text-editor :global(.editor-content ul li) {
		list-style-type: disc !important;
	}

	.rich-text-editor :global(.editor-content ol li) {
		list-style-type: decimal !important;
	}

	.rich-text-editor :global(.prose blockquote) {
		border-left: 4px solid hsl(var(--primary));
		padding-left: 1rem;
		margin: 1rem 0;
		font-style: italic;
		color: hsl(var(--muted-foreground));
	}

	.rich-text-editor :global(.prose code) {
		background: hsl(var(--muted));
		padding: 0.125rem 0.25rem;
		border-radius: 0.25rem;
		font-size: 0.875rem;
		font-family: ui-monospace, SFMono-Regular, 'SF Mono', Menlo, Consolas, monospace;
	}

	.rich-text-editor :global(.prose pre) {
		background: hsl(var(--muted));
		padding: 1rem;
		border-radius: 0.5rem;
		overflow-x: auto;
		margin: 1rem 0;
	}

	.rich-text-editor :global(.prose pre code) {
		background: none;
		padding: 0;
	}

	.rich-text-editor :global(.prose a) {
		color: hsl(var(--primary));
		text-decoration: underline;
	}

	.rich-text-editor :global(.prose a:hover) {
		color: hsl(var(--primary) / 0.8);
	}

	.rich-text-editor :global(.prose hr) {
		border: none;
		border-top: 1px solid hsl(var(--border));
		margin: 2rem 0;
	}

	.rich-text-editor :global(.prose img),
	.rich-text-editor :global(.editor-content img) {
		border-radius: 0.5rem;
		box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
		max-width: 100%;
		height: auto;
		margin: 10px 0;
		display: block;
		cursor: pointer;
		transition: transform 0.2s ease-in-out;
	}

	.rich-text-editor :global(.prose img:hover),
	.rich-text-editor :global(.editor-content img:hover) {
		transform: scale(1.02);
	}
</style>
