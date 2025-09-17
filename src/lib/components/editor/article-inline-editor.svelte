<script lang="ts">
	import { onMount, createEventDispatcher } from 'svelte';
	import { writable, derived } from 'svelte/store';
	import { Card, CardContent } from '$lib/components/ui/card';
	import EditorToolbar from './editor-toolbar.svelte';
	import SlashCommandMenu from './slash-command-menu.svelte';
	import DocumentStats from './document-stats.svelte';
	import { Code, Quote, List, ListOrdered, Image, FileText } from '@lucide/svelte';

	// Props
	export let title = 'Untitled Document';
	export let content = '';
	export let author = 'Anonymous';
	export let tags: string[] = [];
	export let status: 'draft' | 'published' = 'draft';
	export let autoSave = true;
	export let showToolbar = true;
	export let showStats = true;

	// Event dispatcher
	const dispatch = createEventDispatcher();

	// Editor state stores
	const editorState = writable({
		title,
		content,
		author,
		tags,
		status,
		lastSaved: new Date(),
		hasUnsavedChanges: false,
		isAutoSaving: false
	});

	// Slash command state
	const slashMenuState = writable({
		isOpen: false,
		position: { x: 0, y: 0 },
		query: '',
		selectedIndex: 0
	});

	// Selection and formatting state
	const formatState = writable({
		bold: false,
		italic: false,
		underline: false,
		heading: null as string | null,
		listType: null as string | null
	});

	// Document statistics
	const documentStats = derived(editorState, ($state) => {
		const text = $state.content.replace(/<[^>]*>/g, ''); // Strip HTML
		const words = text.trim() ? text.trim().split(/\s+/).length : 0;
		const characters = text.length;
		const charactersNoSpaces = text.replace(/\s/g, '').length;
		const readingTime = Math.ceil(words / 200); // Average reading speed

		return {
			words,
			characters,
			charactersNoSpaces,
			readingTime,
			lines: text.split('\n').length
		};
	});

	// DOM references
	let titleElement: HTMLElement;
	let contentElement: HTMLElement;

	// Auto-save functionality
	let autoSaveTimer: number;

	function scheduleAutoSave() {
		if (!autoSave) return;

		clearTimeout(autoSaveTimer);
		editorState.update((state) => ({ ...state, hasUnsavedChanges: true }));

		autoSaveTimer = setTimeout(async () => {
			editorState.update((state) => ({ ...state, isAutoSaving: true }));

			// Simulate save operation
			await new Promise((resolve) => setTimeout(resolve, 500));

			editorState.update((state) => ({
				...state,
				lastSaved: new Date(),
				hasUnsavedChanges: false,
				isAutoSaving: false
			}));

			dispatch('save', {
				title: $editorState.title,
				content: $editorState.content,
				tags: $editorState.tags
			});
		}, 2000);
	}

	// Title editing
	function handleTitleInput(event: Event) {
		const target = event.target as HTMLElement;
		const newTitle = target.textContent || '';
		editorState.update((state) => ({ ...state, title: newTitle }));
		scheduleAutoSave();
	}

	// Content editing
	function handleContentInput() {
		if (contentElement) {
			content = contentElement.innerHTML;
			editorState.update((state) => ({ ...state, content, hasUnsavedChanges: true }));

			// Clean up any nested block elements that shouldn't be nested
			cleanupInvalidNesting();
			scheduleAutoSave();
		}
	}

	// Prevent invalid nesting (e.g., lists inside quotes when they shouldn't be)
	function cleanupInvalidNesting() {
		if (!contentElement) return;

		// Find all blockquotes that contain lists as direct children
		const blockquotes = contentElement.querySelectorAll('blockquote');
		blockquotes.forEach((blockquote) => {
			const lists = blockquote.querySelectorAll(':scope > ul, :scope > ol');
			lists.forEach((list) => {
				// Move the list outside the blockquote
				if (blockquote.parentElement) {
					blockquote.parentElement.insertBefore(list, blockquote.nextSibling);
				}
			});
		});

		// Remove empty blockquotes
		const emptyBlockquotes = contentElement.querySelectorAll('blockquote:empty');
		emptyBlockquotes.forEach((bq) => bq.remove());

		// Remove empty code blocks
		const emptyCodeBlocks = contentElement.querySelectorAll('pre:empty');
		emptyCodeBlocks.forEach((pre) => pre.remove());
	} // Handle keydown for slash commands and shortcuts
	function handleKeyDown(event: KeyboardEvent) {
		// Handle Enter key to escape from block elements
		if (event.key === 'Enter') {
			const selection = window.getSelection();
			if (selection && selection.rangeCount > 0) {
				const node = selection.anchorNode;
				const element = node?.nodeType === Node.TEXT_NODE ? node.parentElement : (node as Element);

				// Check if we're in a blockquote and at the end
				if (element && element instanceof Element && isInsideBlockquote(element)) {
					const blockquote = getParentBlockquote(element);
					if (blockquote && isAtEndOfBlock(selection, blockquote)) {
						event.preventDefault();
						exitBlockElement(blockquote);
						return;
					}
				}

				// Check if we're in a code block
				if (element && element instanceof Element && isInsideCodeBlock(element)) {
					const codeBlock = getParentCodeBlock(element);
					if (codeBlock && isAtEndOfBlock(selection, codeBlock)) {
						event.preventDefault();
						exitBlockElement(codeBlock);
						return;
					}
				}
			}
		}

		// Handle Shift+Enter to add line break without exiting block
		if (event.key === 'Enter' && event.shiftKey) {
			event.preventDefault();
			document.execCommand('insertHTML', false, '<br>');
			return;
		}

		// Handle Escape key to exit current block
		if (event.key === 'Escape') {
			const selection = window.getSelection();
			if (selection && selection.rangeCount > 0) {
				const node = selection.anchorNode;
				const element = node?.nodeType === Node.TEXT_NODE ? node.parentElement : (node as Element);

				if (element && element instanceof Element) {
					const blockquote = getParentBlockquote(element);
					const codeBlock = getParentCodeBlock(element);

					if (blockquote) {
						event.preventDefault();
						exitBlockElement(blockquote);
						return;
					} else if (codeBlock) {
						event.preventDefault();
						exitBlockElement(codeBlock);
						return;
					}
				}
			}

			// Close slash menu if open
			slashMenuState.update((state) => ({ ...state, isOpen: false }));
			return;
		}

		// Slash command detection
		if (event.key === '/') {
			const selection = window.getSelection();
			if (selection && selection.rangeCount > 0) {
				const range = selection.getRangeAt(0);
				const rect = range.getBoundingClientRect();

				slashMenuState.update((state) => ({
					...state,
					isOpen: true,
					position: { x: rect.left, y: rect.bottom + window.scrollY },
					query: '',
					selectedIndex: 0
				}));
			}
			return;
		}

		// Keyboard shortcuts
		if (event.ctrlKey || event.metaKey) {
			switch (event.key) {
				case 'b':
					event.preventDefault();
					toggleFormat('bold');
					break;
				case 'i':
					event.preventDefault();
					toggleFormat('italic');
					break;
				case 'u':
					event.preventDefault();
					toggleFormat('underline');
					break;
				case 's':
					event.preventDefault();
					saveDocument();
					break;
				case '1':
				case '2':
				case '3':
				case '4':
				case '5':
				case '6':
					event.preventDefault();
					insertHeading(parseInt(event.key));
					break;
			}
		}

		// Handle slash menu navigation
		if ($slashMenuState.isOpen) {
			handleSlashMenuKeydown(event);
		}
	}

	// Handle slash menu navigation
	function handleSlashMenuKeydown(event: KeyboardEvent) {
		switch (event.key) {
			case 'ArrowDown':
				event.preventDefault();
				slashMenuState.update((state) => ({
					...state,
					selectedIndex: Math.min(state.selectedIndex + 1, slashCommands.length - 1)
				}));
				break;
			case 'ArrowUp':
				event.preventDefault();
				slashMenuState.update((state) => ({
					...state,
					selectedIndex: Math.max(state.selectedIndex - 1, 0)
				}));
				break;
			case 'Enter':
				event.preventDefault();
				executeSlashCommand(slashCommands[$slashMenuState.selectedIndex]);
				break;
			case 'Escape':
				slashMenuState.update((state) => ({ ...state, isOpen: false }));
				break;
		}
	}

	// Slash commands definition
	const slashCommands = [
		{
			id: 'text',
			label: 'Text',
			description: 'Just start writing with plain text.',
			icon: FileText,
			command: () => insertParagraph()
		},
		{
			id: 'h1',
			label: 'Heading 1',
			description: 'Big section heading.',
			icon: 'H1',
			command: () => insertHeading(1)
		},
		{
			id: 'h2',
			label: 'Heading 2',
			description: 'Medium section heading.',
			icon: 'H2',
			command: () => insertHeading(2)
		},
		{
			id: 'h3',
			label: 'Heading 3',
			description: 'Small section heading.',
			icon: 'H3',
			command: () => insertHeading(3)
		},
		{
			id: 'bulletlist',
			label: 'Bullet List',
			description: 'Create a simple bulleted list.',
			icon: List,
			command: () => insertList('ul')
		},
		{
			id: 'numberlist',
			label: 'Numbered List',
			description: 'Create a numbered list.',
			icon: ListOrdered,
			command: () => insertList('ol')
		},
		{
			id: 'codeblock',
			label: 'Code Block',
			description: 'Capture a code snippet.',
			icon: Code,
			command: () => insertCodeBlock()
		},
		{
			id: 'quote',
			label: 'Quote',
			description: 'Capture a quote.',
			icon: Quote,
			command: () => insertQuote()
		},
		{
			id: 'divider',
			label: 'Divider',
			description: 'Add a horizontal divider.',
			icon: 'HR',
			command: () => insertDivider()
		},
		{
			id: 'image',
			label: 'Image',
			description: 'Upload or embed an image.',
			icon: Image,
			command: () => insertImage()
		}
	];

	// Format detection
	function updateFormatState() {
		const selection = window.getSelection();
		if (!selection || selection.rangeCount === 0) return;

		formatState.update(() => ({
			bold: document.queryCommandState('bold'),
			italic: document.queryCommandState('italic'),
			underline: document.queryCommandState('underline'),
			heading: getHeadingLevel(),
			listType: getListType()
		}));
	}

	function getHeadingLevel(): string | null {
		const selection = window.getSelection();
		if (!selection || selection.rangeCount === 0) return null;

		let node = selection.anchorNode;
		while (node) {
			if (node.nodeType === Node.ELEMENT_NODE) {
				const element = node as Element;
				if (element.tagName && /^H[1-6]$/.test(element.tagName)) {
					return element.tagName.toLowerCase();
				}
			}
			node = node.parentNode;
		}
		return null;
	}

	function getListType(): string | null {
		const selection = window.getSelection();
		if (!selection || selection.rangeCount === 0) return null;

		let node = selection.anchorNode;
		while (node) {
			if (node.nodeType === Node.ELEMENT_NODE) {
				const element = node as Element;
				if (element.tagName === 'UL') return 'ul';
				if (element.tagName === 'OL') return 'ol';
			}
			node = node.parentNode;
		}
		return null;
	}

	// Block element helper functions
	function isInsideBlockquote(element: Element | null): boolean {
		return getParentBlockquote(element) !== null;
	}

	function getParentBlockquote(element: Element | null): Element | null {
		let current = element;
		while (current) {
			if (current.tagName === 'BLOCKQUOTE') {
				return current;
			}
			current = current.parentElement;
		}
		return null;
	}

	function isInsideCodeBlock(element: Element | null): boolean {
		return getParentCodeBlock(element) !== null;
	}

	function getParentCodeBlock(element: Element | null): Element | null {
		let current = element;
		while (current) {
			if (current.tagName === 'PRE' || current.tagName === 'CODE') {
				return current.tagName === 'PRE' ? current : current.closest('pre');
			}
			current = current.parentElement;
		}
		return null;
	}

	function isAtEndOfBlock(selection: Selection, blockElement: Element): boolean {
		const range = selection.getRangeAt(0);
		const textContent = blockElement.textContent || '';

		// Check if cursor is at or near the end of the block
		const endOffset = range.endOffset;
		const containerText = range.endContainer.textContent || '';

		return (
			endOffset >= containerText.length - 1 ||
			(containerText.trim() === '' && endOffset === containerText.length)
		);
	}

	function exitBlockElement(blockElement: Element): void {
		// Create a new paragraph after the block element
		const newParagraph = document.createElement('p');
		newParagraph.innerHTML = '<br>';

		// Insert after the block element
		blockElement.parentNode?.insertBefore(newParagraph, blockElement.nextSibling);

		// Move cursor to the new paragraph
		const selection = window.getSelection();
		if (selection) {
			const range = document.createRange();
			range.setStart(newParagraph, 0);
			range.setEnd(newParagraph, 0);
			selection.removeAllRanges();
			selection.addRange(range);
		}

		scheduleAutoSave();
	}

	// Formatting functions
	function toggleFormat(format: string) {
		document.execCommand(format, false);
		updateFormatState();
		scheduleAutoSave();
	}

	function insertHeading(level: number) {
		const selection = window.getSelection();
		if (!selection || selection.rangeCount === 0) return;

		const currentElement =
			selection.anchorNode?.nodeType === Node.TEXT_NODE
				? selection.anchorNode.parentElement
				: (selection.anchorNode as Element);

		// Check if we're in a blockquote or code block and exit first
		const blockquote = currentElement?.closest('blockquote');
		const codeBlock = currentElement?.closest('pre');
		const listItem = currentElement?.closest('li');

		if (blockquote) {
			exitBlockElement(blockquote);
			setTimeout(() => insertHeading(level), 10);
			return;
		}

		if (codeBlock) {
			exitBlockElement(codeBlock);
			setTimeout(() => insertHeading(level), 10);
			return;
		}

		if (listItem) {
			const list = listItem.closest('ul, ol');
			if (list) {
				exitBlockElement(list);
				setTimeout(() => insertHeading(level), 10);
				return;
			}
		}

		const tag = `h${level}`;
		document.execCommand('formatBlock', false, tag);
		closeSlashMenu();
		scheduleAutoSave();
	}

	function insertList(type: 'ul' | 'ol') {
		const selection = window.getSelection();
		if (!selection || selection.rangeCount === 0) return;

		// Check if we're already in a list to avoid nesting issues
		const currentElement =
			selection.anchorNode?.nodeType === Node.TEXT_NODE
				? selection.anchorNode.parentElement
				: (selection.anchorNode as Element);

		const existingList = currentElement?.closest('ul, ol');
		if (existingList) {
			// If we're in a different type of list, exit it first
			if (
				(type === 'ul' && existingList.tagName === 'OL') ||
				(type === 'ol' && existingList.tagName === 'UL')
			) {
				exitBlockElement(existingList);
				setTimeout(() => insertList(type), 10);
				return;
			}
			// If same type, just continue with current list
			closeSlashMenu();
			return;
		}

		// Check if we're in a blockquote and exit it first
		const blockquote = currentElement?.closest('blockquote');
		if (blockquote) {
			exitBlockElement(blockquote);
			setTimeout(() => insertList(type), 10);
			return;
		}

		const command = type === 'ul' ? 'insertUnorderedList' : 'insertOrderedList';
		document.execCommand(command, false);
		closeSlashMenu();
		scheduleAutoSave();
	}

	function insertCodeBlock() {
		const selection = window.getSelection();
		if (!selection || selection.rangeCount === 0) return;

		const codeHTML = `
			<pre class="bg-muted rounded-lg p-4 font-mono text-sm overflow-x-auto my-4">
				<code contenteditable="true" spellcheck="false">// Enter your code here</code>
			</pre>
			<p><br></p>
		`;

		document.execCommand('insertHTML', false, codeHTML);

		// Focus on the code element
		setTimeout(() => {
			const codeElement = contentElement?.querySelector('pre:last-of-type code');
			if (codeElement) {
				const range = document.createRange();
				range.selectNodeContents(codeElement);
				range.collapse(true);
				selection.removeAllRanges();
				selection.addRange(range);
				(codeElement as HTMLElement).focus();
			}
		}, 10);

		closeSlashMenu();
		scheduleAutoSave();
	}

	function insertQuote() {
		const selection = window.getSelection();
		if (!selection || selection.rangeCount === 0) return;

		const quoteHTML = `
			<blockquote class="border-l-4 border-primary bg-muted/50 py-4 pl-6 italic rounded-r-md my-6">
				<p>Enter your quote here...</p>
			</blockquote>
			<p><br></p>
		`;

		document.execCommand('insertHTML', false, quoteHTML);

		// Focus on the quote paragraph
		setTimeout(() => {
			const quoteP = contentElement?.querySelector('blockquote:last-of-type p');
			if (quoteP) {
				const range = document.createRange();
				range.selectNodeContents(quoteP);
				range.collapse(true);
				selection.removeAllRanges();
				selection.addRange(range);
			}
		}, 10);

		closeSlashMenu();
		scheduleAutoSave();
	}

	function insertImage() {
		// Create file input for image upload
		const input = document.createElement('input');
		input.type = 'file';
		input.accept = 'image/*';
		input.onchange = handleImageUpload;
		input.click();
		closeSlashMenu();
	}

	function handleImageUpload(event: Event) {
		const target = event.target as HTMLInputElement;
		const file = target.files?.[0];
		if (!file) return;

		// Create image preview while uploading
		const reader = new FileReader();
		reader.onload = (e) => {
			const imgHTML = `<img src="${e.target?.result}" alt="${file.name}" class="w-full h-auto rounded-lg my-4" /><p><br></p>`;
			document.execCommand('insertHTML', false, imgHTML);
			scheduleAutoSave();
		};
		reader.readAsDataURL(file);

		// Dispatch upload event for handling
		dispatch('imageUpload', { file });
	}

	function insertText(text: string) {
		if (text) {
			document.execCommand('insertText', false, text);
		}
		closeSlashMenu();
	}

	function insertParagraph() {
		const selection = window.getSelection();
		if (!selection || selection.rangeCount === 0) return;

		// If we're already in a paragraph, just clear formatting
		const currentElement =
			selection.anchorNode?.nodeType === Node.TEXT_NODE
				? selection.anchorNode.parentElement
				: (selection.anchorNode as Element);

		if (currentElement && (currentElement.tagName === 'P' || currentElement.closest('p'))) {
			// Just continue typing in current paragraph
			closeSlashMenu();
			return;
		}

		// Insert a new paragraph
		const pHTML = '<p><br></p>';
		document.execCommand('insertHTML', false, pHTML);
		closeSlashMenu();
		scheduleAutoSave();
	}

	function insertDivider() {
		const dividerHTML = `
			<div class="my-8 flex items-center justify-center">
				<hr class="border-border w-full" />
			</div>
			<p><br></p>
		`;
		document.execCommand('insertHTML', false, dividerHTML);
		closeSlashMenu();
		scheduleAutoSave();
	}

	function closeSlashMenu() {
		slashMenuState.update((state) => ({ ...state, isOpen: false }));
	}

	// Execute slash command
	function executeSlashCommand(command: any) {
		// Remove the slash character
		const selection = window.getSelection();
		if (selection && selection.rangeCount > 0) {
			const range = selection.getRangeAt(0);
			range.setStart(range.startContainer, Math.max(0, range.startOffset - 1));
			range.deleteContents();
		}

		command.command();
	}

	// Document actions
	function saveDocument() {
		editorState.update((state) => ({
			...state,
			lastSaved: new Date(),
			hasUnsavedChanges: false
		}));

		dispatch('save', {
			title: $editorState.title,
			content: $editorState.content,
			tags: $editorState.tags
		});
	}

	// Tag management
	function addTag(tag: string) {
		editorState.update((state) => ({
			...state,
			tags: [...state.tags, tag]
		}));
		scheduleAutoSave();
	}

	function removeTag(index: number) {
		editorState.update((state) => ({
			...state,
			tags: state.tags.filter((_, i) => i !== index)
		}));
		scheduleAutoSave();
	}

	// Initialize
	onMount(() => {
		updateFormatState();

		// Set initial content
		if (titleElement) titleElement.textContent = title;
		if (contentElement) contentElement.innerHTML = content;

		// Focus on title initially
		titleElement?.focus();

		return () => {
			clearTimeout(autoSaveTimer);
		};
	});

	// Initialize content on mount only
	onMount(() => {
		updateFormatState();

		// Set initial content
		if (titleElement) titleElement.textContent = title;
		if (contentElement) contentElement.innerHTML = content;

		// Focus on title initially
		titleElement?.focus();

		return () => {
			clearTimeout(autoSaveTimer);
		};
	});
</script>

<!-- Core Editor Component -->
<div class="relative">
	<!-- Editor Container -->
	<Card class="relative bg-transparent">
		<!-- Floating Toolbar -->
		{#if showToolbar}
			<EditorToolbar
				{formatState}
				on:format={(e) => toggleFormat(e.detail)}
				on:heading={(e) => insertHeading(e.detail)}
				on:list={(e) => insertList(e.detail)}
				on:link={() => insertText('')}
				on:image={insertImage}
				on:code={insertCodeBlock}
			/>
		{/if}

		<CardContent class="p-8">
			<!-- Title Section -->
			<div class="mb-8">
				<h1
					bind:this={titleElement}
					class="text-foreground text-4xl font-bold tracking-tight focus:outline-none"
					contenteditable="true"
					on:input={handleTitleInput}
					on:keydown={handleKeyDown}
					aria-label="Article title"
				>
					<!-- Title will be set via JavaScript to avoid reactive conflicts -->
				</h1>
				<div class="text-muted-foreground mt-2 flex items-center space-x-4 text-sm">
					<span>By {$editorState.author}</span>
					<span>•</span>
					<span>{new Date().toLocaleDateString()}</span>
					<span>•</span>
					<span>{$documentStats.readingTime} min read</span>
				</div>
			</div>

			<!-- Content Section -->
			<div
				bind:this={contentElement}
				class="editor-content prose prose-lg dark:prose-invert min-h-[400px] max-w-none focus:outline-none"
				contenteditable="true"
				on:input={handleContentInput}
				on:keydown={handleKeyDown}
				on:keyup={updateFormatState}
				on:mouseup={updateFormatState}
				role="textbox"
				tabindex="0"
				aria-label="Article content"
			>
				<!-- Content will be set via JavaScript to avoid reactive conflicts -->
			</div>

			<!-- Slash Command Menu -->
			{#if $slashMenuState.isOpen}
				<SlashCommandMenu
					commands={slashCommands}
					position={$slashMenuState.position}
					selectedIndex={$slashMenuState.selectedIndex}
					on:execute={(e) => executeSlashCommand(e.detail)}
					on:close={closeSlashMenu}
				/>
			{/if}
		</CardContent>

		<!-- Bottom Stats Bar -->
		{#if showStats}
			<DocumentStats
				stats={$documentStats}
				lastSaved={$editorState.lastSaved}
				hasUnsavedChanges={$editorState.hasUnsavedChanges}
			/>
		{/if}
	</Card>
</div>

<style>
	/* Custom styles for the editor */
	:global(.prose) {
		color: inherit;
		direction: ltr;
		text-align: left;
	}

	/* Ensure contenteditable elements have proper text direction */
	[contenteditable='true'] {
		direction: ltr;
		text-align: left;
		unicode-bidi: embed;
	}

	:global(.prose h1),
	:global(.prose h2),
	:global(.prose h3),
	:global(.prose h4),
	:global(.prose h5),
	:global(.prose h6) {
		color: inherit;
		margin-top: 1.5em;
		margin-bottom: 0.5em;
	}

	:global(.prose h1) {
		font-size: 2.25rem;
		font-weight: 800;
	}
	:global(.prose h2) {
		font-size: 1.875rem;
		font-weight: 700;
	}
	:global(.prose h3) {
		font-size: 1.5rem;
		font-weight: 600;
	}

	:global(.prose strong) {
		color: inherit;
		font-weight: 600;
	}

	:global(.prose blockquote) {
		font-style: italic;
		border-left: 4px solid hsl(var(--primary));
		background: hsl(var(--muted) / 0.5);
		border-radius: 0 0.375rem 0.375rem 0;
		padding: 1rem 1.5rem;
		margin: 1.5rem 0;
		position: relative;
	}

	:global(.prose blockquote p) {
		margin: 0;
		line-height: 1.6;
	}

	:global(.prose blockquote:focus-within) {
		border-left-color: hsl(var(--primary));
		background: hsl(var(--muted) / 0.7);
	}

	:global(.prose ul) {
		list-style-type: disc;
		padding-left: 1.5rem;
	}

	:global(.prose ol) {
		list-style-type: decimal;
		padding-left: 1.5rem;
	}

	:global(.prose li) {
		margin: 0.5rem 0;
		line-height: 1.6;
	}

	:global(.prose ul) {
		margin: 1rem 0;
		padding-left: 1.5rem;
	}

	:global(.prose ol) {
		margin: 1rem 0;
		padding-left: 1.5rem;
	}

	:global(.prose ul ul, .prose ol ol, .prose ul ol, .prose ol ul) {
		margin: 0.25rem 0;
	}

	:global(.prose li:focus-within) {
		background: hsl(var(--muted) / 0.3);
		border-radius: 0.25rem;
		padding: 0.25rem;
		margin: 0.25rem -0.25rem;
	}

	:global(.prose pre) {
		background: hsl(var(--muted));
		border: 1px solid hsl(var(--border));
		border-radius: 0.5rem;
		padding: 1.5rem;
		margin: 1.5rem 0;
		font-family: 'Fira Code', 'Monaco', 'Cascadia Code', 'Ubuntu Mono', monospace;
		font-size: 0.875rem;
		line-height: 1.7;
		overflow-x: auto;
		position: relative;
	}

	:global(.prose code) {
		background: hsl(var(--muted));
		border: 1px solid hsl(var(--border));
		border-radius: 0.25rem;
		padding: 0.125rem 0.375rem;
		font-family: 'Fira Code', 'Monaco', 'Cascadia Code', 'Ubuntu Mono', monospace;
		font-size: 0.875rem;
	}

	:global(.prose pre code) {
		background: transparent;
		border: none;
		padding: 0;
		border-radius: 0;
	}

	:global(.prose pre:focus-within) {
		border-color: hsl(var(--primary));
		background: hsl(var(--muted) / 0.8);
	}

	:global(.prose img) {
		width: 100%;
		max-width: 100%;
		height: auto;
		border-radius: 0.5rem;
		margin: 1rem 0;
		display: block;
	}

	/* Focus styles */
	[contenteditable='true']:focus {
		outline: none;
	}

	/* Block element focus indicators */
	:global(.prose blockquote:focus-within::before) {
		content: '';
		position: absolute;
		left: -2px;
		top: 0;
		bottom: 0;
		width: 4px;
		background: hsl(var(--primary));
		border-radius: 2px;
	}

	/* Helpful hints for empty blocks and main content */
	:global(.prose blockquote:empty::before) {
		content: 'Type your quote here... (Press Enter to exit)';
		color: hsl(var(--muted-foreground));
		font-style: italic;
	}

	:global(.prose pre:empty::before) {
		content: 'Type your code here... (Press Enter to exit)';
		color: hsl(var(--muted-foreground));
		font-family: inherit;
	}

	/* Title placeholder */
	[contenteditable='true'][aria-label='Article title']:empty::before {
		content: 'Enter your title...';
		color: hsl(var(--muted-foreground));
		font-weight: normal;
	}

	/* Content placeholder */
	.editor-content:empty::before {
		content: 'Start writing your article... (Type "/" for commands)';
		color: hsl(var(--muted-foreground));
		position: absolute;
		top: 0;
		left: 0;
		pointer-events: none;
	}

	/* Selection styles */
	[contenteditable='true']::selection {
		background: hsl(var(--primary) / 0.2);
	}

	[contenteditable='true']:empty:before {
		content: attr(data-placeholder);
		color: hsl(var(--muted-foreground));
	}
</style>
