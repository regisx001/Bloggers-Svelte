<script lang="ts">
	import { onMount, createEventDispatcher } from 'svelte';
	import { writable, derived } from 'svelte/store';
	import { Button } from '$lib/components/ui/button';
	import { Badge } from '$lib/components/ui/badge';
	import { Card, CardContent } from '$lib/components/ui/card';
	import {
		Save,
		Share,
		Eye,
		Upload,
		FileText,
		Tag,
		Clock,
		Bold,
		Italic,
		Underline,
		Code,
		Image,
		List,
		ListOrdered,
		Quote,
		Link as LinkIcon
	} from '@lucide/svelte';

	// Props
	export let title = 'Untitled Document';
	export let content = '';
	export let author = 'Anonymous';
	export let tags: string[] = [];
	export let status: 'draft' | 'published' = 'draft';
	export let autoSave = true;

	// Event dispatcher
	const dispatch = createEventDispatcher();

	// Editor state
	let editorTitle = title;
	let editorContent = content;
	let lastSaved = new Date();
	let hasUnsavedChanges = false;
	let isAutoSaving = false;

	// Slash command state
	let showSlashMenu = false;
	let slashMenuPosition = { x: 0, y: 0 };
	let selectedCommandIndex = 0;

	// DOM references
	let titleElement: HTMLElement;
	let contentElement: HTMLElement;

	// Auto-save timer
	let autoSaveTimer: any;

	// Document statistics
	$: documentStats = (() => {
		const text = editorContent.replace(/<[^>]*>/g, ''); // Strip HTML
		const words = text.trim() ? text.trim().split(/\s+/).length : 0;
		const characters = text.length;
		const readingTime = Math.ceil(words / 200);

		return {
			words,
			characters,
			readingTime,
			lines: text.split('\n').length
		};
	})();

	// Slash commands
	const slashCommands = [
		{
			id: 'text',
			label: 'Text',
			description: 'Just start writing with plain text.',
			icon: FileText,
			command: () => insertText('')
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
			id: 'image',
			label: 'Image',
			description: 'Upload or embed an image.',
			icon: Image,
			command: () => insertImage()
		}
	];

	function scheduleAutoSave() {
		if (!autoSave) return;

		clearTimeout(autoSaveTimer);
		hasUnsavedChanges = true;

		autoSaveTimer = setTimeout(async () => {
			isAutoSaving = true;

			// Simulate save operation
			await new Promise((resolve) => setTimeout(resolve, 500));

			lastSaved = new Date();
			hasUnsavedChanges = false;
			isAutoSaving = false;

			dispatch('save', {
				title: editorTitle,
				content: editorContent,
				tags
			});
		}, 2000);
	}

	function handleTitleInput(event: Event) {
		const target = event.target as HTMLElement;
		editorTitle = target.textContent || '';
		scheduleAutoSave();
	}

	function handleContentInput(event: Event) {
		const target = event.target as HTMLElement;
		editorContent = target.innerHTML;
		scheduleAutoSave();
	}

	function handleKeyDown(event: KeyboardEvent) {
		// Slash command detection
		if (event.key === '/') {
			const selection = window.getSelection();
			if (selection && selection.rangeCount > 0) {
				const range = selection.getRangeAt(0);
				const rect = range.getBoundingClientRect();

				slashMenuPosition = { x: rect.left, y: rect.bottom + window.scrollY };
				showSlashMenu = true;
				selectedCommandIndex = 0;
			}
			return;
		}

		// Close slash menu on escape
		if (event.key === 'Escape') {
			showSlashMenu = false;
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
			}
		}

		// Handle slash menu navigation
		if (showSlashMenu) {
			handleSlashMenuKeydown(event);
		}
	}

	function handleSlashMenuKeydown(event: KeyboardEvent) {
		switch (event.key) {
			case 'ArrowDown':
				event.preventDefault();
				selectedCommandIndex = Math.min(selectedCommandIndex + 1, slashCommands.length - 1);
				break;
			case 'ArrowUp':
				event.preventDefault();
				selectedCommandIndex = Math.max(selectedCommandIndex - 1, 0);
				break;
			case 'Enter':
				event.preventDefault();
				executeSlashCommand(slashCommands[selectedCommandIndex]);
				break;
		}
	}

	function executeSlashCommand(command: any) {
		// Remove the slash character
		const selection = window.getSelection();
		if (selection && selection.rangeCount > 0) {
			const range = selection.getRangeAt(0);
			range.setStart(range.startContainer, Math.max(0, range.startOffset - 1));
			range.deleteContents();
		}

		command.command();
		showSlashMenu = false;
	}

	function toggleFormat(format: string) {
		document.execCommand(format, false);
		scheduleAutoSave();
	}

	function insertHeading(level: number) {
		const tag = `h${level}`;
		document.execCommand('formatBlock', false, tag);
		scheduleAutoSave();
	}

	function insertList(type: 'ul' | 'ol') {
		const command = type === 'ul' ? 'insertUnorderedList' : 'insertOrderedList';
		document.execCommand(command, false);
		scheduleAutoSave();
	}

	function insertCodeBlock() {
		const codeHTML = `<pre class="bg-muted rounded-lg p-4 font-mono text-sm overflow-x-auto"><code contenteditable="true">// Enter your code here</code></pre><p><br></p>`;
		document.execCommand('insertHTML', false, codeHTML);
		scheduleAutoSave();
	}

	function insertQuote() {
		const quoteHTML = `<blockquote class="border-l-4 border-primary bg-muted/50 py-4 pl-6 italic rounded-r-md my-6"><p contenteditable="true">Enter your quote here...</p></blockquote><p><br></p>`;
		document.execCommand('insertHTML', false, quoteHTML);
		scheduleAutoSave();
	}

	function insertImage() {
		const input = document.createElement('input');
		input.type = 'file';
		input.accept = 'image/*';
		input.onchange = handleImageUpload;
		input.click();
	}

	function handleImageUpload(event: Event) {
		const target = event.target as HTMLInputElement;
		const file = target.files?.[0];
		if (!file) return;

		const reader = new FileReader();
		reader.onload = (e) => {
			const imgHTML = `<img src="${e.target?.result}" alt="${file.name}" class="max-w-full h-auto rounded-lg my-4" /><p><br></p>`;
			document.execCommand('insertHTML', false, imgHTML);
			scheduleAutoSave();
		};
		reader.readAsDataURL(file);

		dispatch('imageUpload', { file });
	}

	function insertText(text: string) {
		if (text) {
			document.execCommand('insertText', false, text);
		}
	}

	function saveDocument() {
		lastSaved = new Date();
		hasUnsavedChanges = false;

		dispatch('save', {
			title: editorTitle,
			content: editorContent,
			tags
		});
	}

	function exportDocument(format: 'html' | 'markdown' | 'text') {
		dispatch('export', {
			format,
			title: editorTitle,
			content: editorContent
		});
	}

	function shareDocument() {
		dispatch('share', {
			title: editorTitle,
			content: editorContent
		});
	}

	onMount(() => {
		if (titleElement) titleElement.textContent = title;
		if (contentElement) contentElement.innerHTML = content;
		titleElement?.focus();

		return () => {
			clearTimeout(autoSaveTimer);
		};
	});
</script>

<div class="bg-background min-h-screen">
	<!-- App Header -->
	<header
		class="bg-background/95 supports-[backdrop-filter]:bg-background/60 border-b backdrop-blur"
	>
		<div class="container flex h-14 items-center">
			<div class="mr-4 flex">
				<a class="mr-6 flex items-center space-x-2" href="/">
					<div class="bg-primary h-6 w-6 rounded"></div>
					<span class="font-bold">TextCraft</span>
				</a>
			</div>

			<div class="flex flex-1 items-center justify-between space-x-2 md:justify-end">
				<nav class="flex items-center space-x-2">
					<!-- File Actions -->
					<Button variant="ghost" size="sm" onclick={() => exportDocument('html')}>
						<Upload class="mr-2 h-4 w-4" />
						Export
					</Button>

					<Button variant="ghost" size="sm" onclick={shareDocument}>
						<Share class="mr-2 h-4 w-4" />
						Share
					</Button>

					<!-- Auto-save indicator -->
					<div class="text-muted-foreground flex items-center space-x-2 text-sm">
						{#if isAutoSaving}
							<div class="h-2 w-2 animate-pulse rounded-full bg-yellow-500"></div>
							<span>Saving...</span>
						{:else if hasUnsavedChanges}
							<div class="h-2 w-2 rounded-full bg-orange-500"></div>
							<span>Unsaved</span>
						{:else}
							<div class="h-2 w-2 rounded-full bg-green-500"></div>
							<span>Saved</span>
						{/if}
					</div>
				</nav>
			</div>
		</div>
	</header>

	<!-- Main Content -->
	<div class="container mx-auto py-6">
		<div class="mx-auto max-w-4xl">
			<!-- Document Header -->
			<div class="mb-6 flex items-center justify-between">
				<div class="flex items-center space-x-2">
					<Badge variant={status === 'published' ? 'default' : 'secondary'}>
						{status === 'published' ? 'Published' : 'Draft'}
					</Badge>
					<span class="text-muted-foreground text-sm">
						Last edited {lastSaved.toLocaleTimeString()}
					</span>
				</div>

				<div class="flex items-center space-x-2">
					<Button variant="outline" size="sm">
						<Eye class="h-4 w-4" />
					</Button>

					<Button size="sm" onclick={saveDocument}>
						<Save class="mr-2 h-4 w-4" />
						{status === 'published' ? 'Update' : 'Publish'}
					</Button>
				</div>
			</div>

			<!-- Editor Container -->
			<Card class="relative">
				<!-- Floating Toolbar -->
				<div
					class="bg-card/95 supports-[backdrop-filter]:bg-card/60 sticky top-0 z-10 border-b backdrop-blur"
				>
					<div class="flex items-center justify-between p-3">
						<div class="flex items-center space-x-1">
							<!-- Text Formatting Group -->
							<div class="flex items-center rounded-md border">
								<Button
									variant="ghost"
									size="sm"
									class="h-8 w-8 rounded-l-md rounded-r-none border-r p-0"
									onclick={() => toggleFormat('bold')}
									title="Bold (Ctrl+B)"
								>
									<Bold class="h-4 w-4" />
								</Button>

								<Button
									variant="ghost"
									size="sm"
									class="h-8 w-8 rounded-none border-r p-0"
									onclick={() => toggleFormat('italic')}
									title="Italic (Ctrl+I)"
								>
									<Italic class="h-4 w-4" />
								</Button>

								<Button
									variant="ghost"
									size="sm"
									class="h-8 w-8 rounded-l-none rounded-r-md p-0"
									onclick={() => toggleFormat('underline')}
									title="Underline (Ctrl+U)"
								>
									<Underline class="h-4 w-4" />
								</Button>
							</div>

							<div class="bg-border mx-2 h-6 w-px"></div>

							<!-- Headings Group -->
							<div class="flex items-center space-x-1">
								<Button
									variant="ghost"
									size="sm"
									class="h-8 px-2 text-xs font-bold"
									onclick={() => insertHeading(1)}
									title="Heading 1"
								>
									H1
								</Button>
								<Button
									variant="ghost"
									size="sm"
									class="h-8 px-2 text-xs font-bold"
									onclick={() => insertHeading(2)}
									title="Heading 2"
								>
									H2
								</Button>
								<Button
									variant="ghost"
									size="sm"
									class="h-8 px-2 text-xs font-bold"
									onclick={() => insertHeading(3)}
									title="Heading 3"
								>
									H3
								</Button>
							</div>

							<div class="bg-border mx-2 h-6 w-px"></div>

							<!-- Lists and Insert -->
							<div class="flex items-center space-x-1">
								<Button
									variant="ghost"
									size="sm"
									class="h-8 w-8 p-0"
									onclick={() => insertList('ul')}
									title="Bullet List"
								>
									<List class="h-4 w-4" />
								</Button>

								<Button
									variant="ghost"
									size="sm"
									class="h-8 w-8 p-0"
									onclick={() => insertList('ol')}
									title="Numbered List"
								>
									<ListOrdered class="h-4 w-4" />
								</Button>

								<Button
									variant="ghost"
									size="sm"
									class="h-8 w-8 p-0"
									onclick={insertImage}
									title="Insert Image"
								>
									<Image class="h-4 w-4" />
								</Button>

								<Button
									variant="ghost"
									size="sm"
									class="h-8 w-8 p-0"
									onclick={insertCodeBlock}
									title="Insert Code Block"
								>
									<Code class="h-4 w-4" />
								</Button>
							</div>
						</div>
					</div>
				</div>

				<CardContent class="p-8">
					<!-- Title Section -->
					<div class="mb-8">
						<h1
							bind:this={titleElement}
							class="text-foreground text-4xl font-bold tracking-tight focus:outline-none"
							contenteditable="true"
							oninput={handleTitleInput}
							onkeydown={handleKeyDown}
							role="textbox"
							aria-label="Article title"
						>
							{editorTitle}
						</h1>
						<div class="text-muted-foreground mt-2 flex items-center space-x-4 text-sm">
							<span>By {author}</span>
							<span>•</span>
							<span>{new Date().toLocaleDateString()}</span>
							<span>•</span>
							<span>{documentStats.readingTime} min read</span>
						</div>
					</div>

					<!-- Content Section -->
					<div
						bind:this={contentElement}
						class="prose prose-lg dark:prose-invert min-h-[400px] max-w-none focus:outline-none"
						contenteditable="true"
						oninput={handleContentInput}
						onkeydown={handleKeyDown}
						role="textbox"
						aria-label="Article content"
					>
						{@html editorContent}
					</div>

					<!-- Slash Command Menu -->
					{#if showSlashMenu}
						<div
							class="bg-popover text-popover-foreground animate-in fade-in-0 zoom-in-95 absolute z-50 w-80 rounded-md border p-1 shadow-lg"
							style="left: {slashMenuPosition.x}px; top: {slashMenuPosition.y}px;"
						>
							<div class="text-muted-foreground border-b px-3 py-2 text-xs font-medium">
								BASIC BLOCKS
							</div>

							<div class="p-1">
								{#each slashCommands as command, index}
									<div
										class="flex cursor-pointer items-center rounded-sm px-2 py-1.5 text-sm transition-colors
											{index === selectedCommandIndex
											? 'bg-accent text-accent-foreground'
											: 'hover:bg-accent hover:text-accent-foreground'}"
										onclick={() => executeSlashCommand(command)}
										onkeydown={(e) => {
											if (e.key === 'Enter') executeSlashCommand(command);
										}}
										role="menuitem"
										tabindex="-1"
									>
										<div class="mr-3 flex h-8 w-8 items-center justify-center rounded border">
											{#if typeof command.icon === 'string'}
												<span class="text-xs font-bold">{command.icon}</span>
											{:else}
												<svelte:component this={command.icon} class="h-4 w-4" />
											{/if}
										</div>
										<div class="flex-1">
											<div class="font-medium">{command.label}</div>
											<div class="text-muted-foreground text-xs">
												{command.description}
											</div>
										</div>
									</div>
								{/each}
							</div>
						</div>
					{/if}
				</CardContent>

				<!-- Bottom Stats Bar -->
				<div class="bg-muted/50 border-t px-8 py-3">
					<div class="text-muted-foreground flex items-center justify-between text-sm">
						<div class="flex items-center space-x-4">
							<span>{documentStats.words.toLocaleString()} words</span>
							<span>•</span>
							<span>{documentStats.characters.toLocaleString()} characters</span>
							<span>•</span>
							<span>{documentStats.readingTime} min read</span>
						</div>

						<div class="flex items-center space-x-4">
							<span>Line {documentStats.lines}</span>
						</div>
					</div>
				</div>
			</Card>

			<!-- Additional Actions -->
			<div class="mt-6 flex items-center justify-between">
				<div class="flex items-center space-x-2">
					{#each tags as tag}
						<Badge variant="outline" class="cursor-pointer">
							{tag}
						</Badge>
					{/each}
					<Button variant="outline" size="sm" class="border-dashed">
						<Tag class="mr-1 h-3 w-3" />
						Add tag
					</Button>
				</div>

				<div class="text-muted-foreground flex items-center space-x-2 text-sm">
					<Clock class="h-4 w-4" />
					<span>Auto-saved at {lastSaved.toLocaleTimeString()}</span>
				</div>
			</div>
		</div>
	</div>
</div>

<style>
	/* Custom styles for the editor */
	:global(.prose) {
		color: inherit;
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
		margin: 0.25rem 0;
	}

	:global(.prose pre) {
		background: hsl(var(--muted));
		border-radius: 0.5rem;
		padding: 1rem;
		overflow-x: auto;
		font-family:
			ui-monospace, SFMono-Regular, 'SF Mono', Consolas, 'Liberation Mono', Menlo, monospace;
	}

	:global(.prose code) {
		background: hsl(var(--muted));
		border-radius: 0.25rem;
		padding: 0.125rem 0.25rem;
		font-family:
			ui-monospace, SFMono-Regular, 'SF Mono', Consolas, 'Liberation Mono', Menlo, monospace;
		font-size: 0.875em;
	}

	:global(.prose img) {
		max-width: 100%;
		height: auto;
		border-radius: 0.5rem;
		margin: 1rem 0;
	}

	/* Focus styles */
	[contenteditable='true']:focus {
		outline: none;
	}

	/* Selection styles */
	[contenteditable='true']::selection {
		background: hsl(var(--primary) / 0.2);
	}

	/* Animation for auto-save indicator */
	@keyframes pulse {
		0%,
		100% {
			opacity: 1;
		}
		50% {
			opacity: 0.5;
		}
	}

	.animate-pulse {
		animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
	}

	/* Slash menu animations */
	@keyframes animate-in {
		from {
			opacity: 0;
			transform: scale(0.95);
		}
		to {
			opacity: 1;
			transform: scale(1);
		}
	}

	.animate-in {
		animation: animate-in 0.15s ease-out;
	}

	.fade-in-0 {
		animation-name: animate-in;
	}

	.zoom-in-95 {
		animation-name: animate-in;
	}
</style>
