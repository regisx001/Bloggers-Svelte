<script lang="ts">
	import { RichTextEditor } from '$lib/components/editor';
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import { Badge } from '$lib/components/ui/badge/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import { Separator } from '$lib/components/ui/separator/index.js';
	import { Save, Eye, FileText } from '@lucide/svelte';

	let editorContent = `
		<h1>Welcome to the Rich Text Editor</h1>
		<p>This is a powerful rich text editor built for the blog application. You can format text, add links, images, and much more!</p>
		
		<h2>Features</h2>
		<ul>
			<li><strong>Text Formatting</strong>: Bold, italic, underline, strikethrough</li>
			<li><strong>Headings</strong>: H1, H2, H3 support</li>
			<li><strong>Lists</strong>: Bullet and numbered lists</li>
			<li><strong>Links & Images</strong>: Easy insertion with dialogs</li>
			<li><strong>Code</strong>: Inline code and code blocks</li>
		</ul>
		
		<blockquote>
			"A great editor makes writing a pleasure, not a chore."
		</blockquote>
		
		<h3>Try it out!</h3>
		<p>Start editing and see the magic happen. Use the toolbar above or keyboard shortcuts like <code>Ctrl+B</code> for bold and <code>Ctrl+I</code> for italic.</p>
	`;

	let articleTitle = 'My Amazing Blog Post';
	let articleTags = 'svelte, rich-text, editor';
	let previewMode = false;

	function saveArticle() {
		console.log('Saving article:', {
			title: articleTitle,
			content: editorContent,
			tags: articleTags.split(',').map((tag) => tag.trim())
		});
		// Here you would typically send this to your API
		alert('Article saved! (Check console for data)');
	}

	function togglePreview() {
		previewMode = !previewMode;
	}
</script>

<svelte:head>
	<title>Rich Text Editor Demo - Blog App</title>
</svelte:head>

<div class="container mx-auto max-w-6xl px-4 py-8">
	<div class="mb-8">
		<h1 class="mb-2 text-4xl font-bold tracking-tight">Rich Text Editor Demo</h1>
		<p class="text-muted-foreground text-lg">
			Experience the power of our modern rich text editor designed for blog writing.
		</p>
	</div>

	<div class="grid gap-8 lg:grid-cols-12">
		<!-- Editor Panel -->
		<div class="lg:col-span-8">
			<Card.Root>
				<Card.Header>
					<div class="flex items-center justify-between">
						<Card.Title class="flex items-center gap-2">
							<FileText class="h-5 w-5" />
							{previewMode ? 'Article Preview' : 'Write Article'}
						</Card.Title>
						<div class="flex items-center gap-2">
							<Button variant="outline" size="sm" onclick={togglePreview}>
								<Eye class="mr-2 h-4 w-4" />
								{previewMode ? 'Edit' : 'Preview'}
							</Button>
							<Button size="sm" onclick={saveArticle}>
								<Save class="mr-2 h-4 w-4" />
								Save
							</Button>
						</div>
					</div>
				</Card.Header>
				<Card.Content class="p-6">
					<div class="space-y-4">
						<!-- Article Title -->
						<div class="space-y-2">
							<Label for="title">Article Title</Label>
							<Input
								id="title"
								bind:value={articleTitle}
								placeholder="Enter your article title..."
								class="text-lg font-semibold"
								disabled={previewMode}
							/>
						</div>

						<!-- Tags -->
						<div class="space-y-2">
							<Label for="tags">Tags (comma-separated)</Label>
							<Input
								id="tags"
								bind:value={articleTags}
								placeholder="svelte, javascript, tutorial"
								disabled={previewMode}
							/>
						</div>

						<Separator />

						<!-- Editor or Preview -->
						{#if previewMode}
							<div class="prose prose-sm min-h-[400px] max-w-none rounded-lg border p-4">
								<h1 class="mb-4 text-3xl font-bold">{articleTitle}</h1>
								<div class="mb-6 flex flex-wrap gap-2">
									{#each articleTags.split(',') as tag}
										{#if tag.trim()}
											<Badge variant="secondary">{tag.trim()}</Badge>
										{/if}
									{/each}
								</div>
								{@html editorContent}
							</div>
						{:else}
							<RichTextEditor
								bind:content={editorContent}
								placeholder="Start writing your amazing article..."
								minHeight="400px"
							/>
						{/if}
					</div>
				</Card.Content>
			</Card.Root>
		</div>

		<!-- Sidebar -->
		<div class="space-y-6 lg:col-span-4">
			<!-- Writing Tips -->
			<Card.Root>
				<Card.Header>
					<Card.Title class="text-lg">✨ Writing Tips</Card.Title>
				</Card.Header>
				<Card.Content class="space-y-3 text-sm">
					<div>
						<strong>Keyboard Shortcuts:</strong>
						<ul class="text-muted-foreground mt-1 space-y-1">
							<li>• <code>Ctrl+B</code> - Bold</li>
							<li>• <code>Ctrl+I</code> - Italic</li>
							<li>• <code>Ctrl+U</code> - Underline</li>
							<li>• <code>Ctrl+Z</code> - Undo</li>
							<li>• <code>Ctrl+Shift+Z</code> - Redo</li>
						</ul>
					</div>
					<Separator />
					<div>
						<strong>Best Practices:</strong>
						<ul class="text-muted-foreground mt-1 space-y-1">
							<li>• Use headings to structure content</li>
							<li>• Keep paragraphs concise</li>
							<li>• Add alt text to images</li>
							<li>• Use lists for better readability</li>
						</ul>
					</div>
				</Card.Content>
			</Card.Root>

			<!-- Editor Features -->
			<Card.Root>
				<Card.Header>
					<Card.Title class="text-lg">🚀 Editor Features</Card.Title>
				</Card.Header>
				<Card.Content class="space-y-2 text-sm">
					<div class="grid grid-cols-2 gap-2">
						<Badge variant="outline" class="justify-center">Bold/Italic</Badge>
						<Badge variant="outline" class="justify-center">Headings</Badge>
						<Badge variant="outline" class="justify-center">Lists</Badge>
						<Badge variant="outline" class="justify-center">Links</Badge>
						<Badge variant="outline" class="justify-center">Images</Badge>
						<Badge variant="outline" class="justify-center">Code</Badge>
						<Badge variant="outline" class="justify-center">Quotes</Badge>
						<Badge variant="outline" class="justify-center">Alignment</Badge>
					</div>
				</Card.Content>
			</Card.Root>

			<!-- Stats -->
			<Card.Root>
				<Card.Header>
					<Card.Title class="text-lg">📊 Article Stats</Card.Title>
				</Card.Header>
				<Card.Content class="space-y-3">
					<div class="flex justify-between">
						<span class="text-muted-foreground text-sm">Characters:</span>
						<span class="text-sm font-medium">{editorContent.replace(/<[^>]*>/g, '').length}</span>
					</div>
					<div class="flex justify-between">
						<span class="text-muted-foreground text-sm">Words:</span>
						<span class="text-sm font-medium"
							>{editorContent
								.replace(/<[^>]*>/g, '')
								.split(/\s+/)
								.filter((word) => word.length > 0).length}</span
						>
					</div>
					<div class="flex justify-between">
						<span class="text-muted-foreground text-sm">Tags:</span>
						<span class="text-sm font-medium"
							>{articleTags.split(',').filter((tag) => tag.trim()).length}</span
						>
					</div>
				</Card.Content>
			</Card.Root>
		</div>
	</div>
</div>

<style>
	/* Custom styles for the preview */
	:global(.prose h1) {
		color: hsl(var(--foreground));
		border-bottom: 2px solid hsl(var(--border));
		padding-bottom: 0.5rem;
	}

	:global(.prose h2) {
		color: hsl(var(--foreground));
		margin-top: 2rem;
	}

	:global(.prose h3) {
		color: hsl(var(--foreground));
		margin-top: 1.5rem;
	}

	:global(.prose code) {
		background: hsl(var(--muted));
		color: hsl(var(--foreground));
		padding: 0.125rem 0.25rem;
		border-radius: 0.25rem;
		font-size: 0.875rem;
	}

	:global(.prose blockquote) {
		border-left: 4px solid hsl(var(--primary));
		padding-left: 1rem;
		margin: 1.5rem 0;
		font-style: italic;
		color: hsl(var(--muted-foreground));
	}

	:global(.prose ul),
	:global(.prose ol) {
		padding-left: 1.5rem;
	}

	:global(.prose li) {
		margin: 0.5rem 0;
	}

	:global(.prose a) {
		color: hsl(var(--primary));
		text-decoration: underline;
	}

	:global(.prose img) {
		border-radius: 0.5rem;
		box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
		margin: 1rem 0;
	}
</style>
