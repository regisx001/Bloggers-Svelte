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

<!-- Rich Text Editor Documentation -->
<div class="bg-muted/30 py-16">
	<div class="container mx-auto max-w-6xl px-4">
		<div class="mb-12 text-center">
			<h1 class="mb-4 text-4xl font-bold tracking-tight">Rich Text Editor Documentation</h1>
			<p class="text-muted-foreground text-lg">
				Complete guide to understanding, using, and customizing the Rich Text Editor
			</p>
		</div>

		<div class="space-y-16">
			<!-- Table of Contents -->
			<Card.Root>
				<Card.Header>
					<Card.Title class="text-2xl">📋 Table of Contents</Card.Title>
				</Card.Header>
				<Card.Content>
					<div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
						<div>
							<h3 class="mb-2 font-semibold">Understanding Rich Text Editors</h3>
							<ul class="text-muted-foreground space-y-1 text-sm">
								<li>• What is a Rich Text Editor?</li>
								<li>• How Do They Work?</li>
								<li>• ContentEditable API</li>
								<li>• Document.execCommand</li>
							</ul>
						</div>
						<div>
							<h3 class="mb-2 font-semibold">Component Architecture</h3>
							<ul class="text-muted-foreground space-y-1 text-sm">
								<li>• Component Structure</li>
								<li>• Props & Configuration</li>
								<li>• Event Handling</li>
								<li>• State Management</li>
							</ul>
						</div>
						<div>
							<h3 class="mb-2 font-semibold">Features & Usage</h3>
							<ul class="text-muted-foreground space-y-1 text-sm">
								<li>• Text Formatting</li>
								<li>• Keyboard Shortcuts</li>
								<li>• Toolbar Controls</li>
								<li>• Media Insertion</li>
							</ul>
						</div>
						<div>
							<h3 class="mb-2 font-semibold">Customization</h3>
							<ul class="text-muted-foreground space-y-1 text-sm">
								<li>• Adding New Commands</li>
								<li>• Custom Toolbar Buttons</li>
								<li>• Styling & Themes</li>
								<li>• Plugin System</li>
							</ul>
						</div>
						<div>
							<h3 class="mb-2 font-semibold">Advanced Topics</h3>
							<ul class="text-muted-foreground space-y-1 text-sm">
								<li>• Performance Optimization</li>
								<li>• Security Considerations</li>
								<li>• Accessibility</li>
								<li>• Browser Compatibility</li>
							</ul>
						</div>
						<div>
							<h3 class="mb-2 font-semibold">Examples & Recipes</h3>
							<ul class="text-muted-foreground space-y-1 text-sm">
								<li>• Code Examples</li>
								<li>• Integration Patterns</li>
								<li>• Common Use Cases</li>
								<li>• Troubleshooting</li>
							</ul>
						</div>
					</div>
				</Card.Content>
			</Card.Root>

			<!-- Understanding Rich Text Editors -->
			<section class="space-y-8">
				<h2 class="border-border border-b pb-2 text-3xl font-bold">
					🧠 Understanding Rich Text Editors
				</h2>

				<Card.Root>
					<Card.Header>
						<Card.Title>What is a Rich Text Editor?</Card.Title>
					</Card.Header>
					<Card.Content class="space-y-4">
						<p>
							A Rich Text Editor (RTE) is a user interface component that allows users to edit and
							format text content in a visual way, similar to word processors like Microsoft Word or
							Google Docs. Unlike plain text editors, RTEs provide:
						</p>
						<ul class="text-muted-foreground space-y-2">
							<li>• <strong>WYSIWYG editing</strong> - What You See Is What You Get</li>
							<li>• <strong>Text formatting</strong> - Bold, italic, underline, colors</li>
							<li>• <strong>Structural elements</strong> - Headings, lists, tables</li>
							<li>• <strong>Media insertion</strong> - Images, links, videos</li>
							<li>• <strong>Advanced features</strong> - Code blocks, quotes, alignment</li>
						</ul>
					</Card.Content>
				</Card.Root>

				<Card.Root>
					<Card.Header>
						<Card.Title>How Do Rich Text Editors Work?</Card.Title>
					</Card.Header>
					<Card.Content class="space-y-4">
						<p>Modern web-based rich text editors rely on several browser APIs and technologies:</p>

						<div class="space-y-6">
							<div>
								<h4 class="mb-2 text-lg font-semibold">1. ContentEditable API</h4>
								<p class="text-muted-foreground mb-2">
									The foundation of web-based editors. Makes any HTML element editable:
								</p>
								<div class="bg-muted rounded-lg p-4">
									<pre class="text-sm"><code
											>&lt;div contenteditable="true"&gt;
  This text can be edited directly!
&lt;/div&gt;</code
										></pre>
								</div>
							</div>

							<div>
								<h4 class="mb-2 text-lg font-semibold">2. Document.execCommand API</h4>
								<p class="text-muted-foreground mb-2">
									Provides commands to manipulate editable content:
								</p>
								<div class="bg-muted rounded-lg p-4">
									<pre class="text-sm"><code
											>// Make selected text bold
document.execCommand('bold', false, null);

// Insert HTML content
document.execCommand('insertHTML', false, '&lt;strong&gt;Bold text&lt;/strong&gt;');

// Change block format
document.execCommand('formatBlock', false, 'h1');</code
										></pre>
								</div>
							</div>

							<div>
								<h4 class="mb-2 text-lg font-semibold">3. Selection and Range APIs</h4>
								<p class="text-muted-foreground mb-2">Track and manipulate text selection:</p>
								<div class="bg-muted rounded-lg p-4">
									<pre class="text-sm"><code
											>// Get current selection
const selection = window.getSelection();
const range = selection.getRangeAt(0);

// Check what's selected
const selectedText = selection.toString();

// Manipulate selection
range.deleteContents();
range.insertNode(newElement);</code
										></pre>
								</div>
							</div>

							<div>
								<h4 class="mb-2 text-lg font-semibold">4. Event Handling</h4>
								<p class="text-muted-foreground mb-2">Monitor and respond to user interactions:</p>
								<div class="bg-muted rounded-lg p-4">
									<pre class="text-sm"><code
											>editor.addEventListener('input', handleInput);
editor.addEventListener('keydown', handleKeydown);
editor.addEventListener('selectionchange', updateToolbar);
editor.addEventListener('paste', handlePaste);</code
										></pre>
								</div>
							</div>
						</div>
					</Card.Content>
				</Card.Root>
			</section>

			<!-- Component Architecture -->
			<section class="space-y-8">
				<h2 class="border-border border-b pb-2 text-3xl font-bold">🏗️ Component Architecture</h2>

				<Card.Root>
					<Card.Header>
						<Card.Title>Component Structure</Card.Title>
					</Card.Header>
					<Card.Content class="space-y-4">
						<p>Our Rich Text Editor is built as a Svelte component with the following structure:</p>

						<div class="bg-muted rounded-lg p-4">
							<pre class="text-sm"><code
									>RichTextEditor/
├── Script Section
│   ├── Props & Variables
│   ├── Event Handlers
│   ├── Command Functions
│   └── State Management
├── Template Section
│   ├── Toolbar
│   ├── Editor Content
│   └── Dialogs
└── Styles Section
    ├── Component Styles
    ├── Content Styles
    └── Responsive Design</code
								></pre>
						</div>

						<div class="space-y-4">
							<div>
								<h4 class="mb-2 font-semibold">Key Components:</h4>
								<ul class="text-muted-foreground space-y-1">
									<li>• <strong>Toolbar</strong> - Contains formatting buttons and controls</li>
									<li>
										• <strong>Editor Content</strong> - The contenteditable div where users type
									</li>
									<li>• <strong>Dialogs</strong> - Modal windows for link and image insertion</li>
									<li>• <strong>Event System</strong> - Handles user interactions and updates</li>
								</ul>
							</div>
						</div>
					</Card.Content>
				</Card.Root>

				<Card.Root>
					<Card.Header>
						<Card.Title>Props & Configuration</Card.Title>
					</Card.Header>
					<Card.Content class="space-y-4">
						<p>The editor accepts several props for customization:</p>

						<div class="overflow-x-auto">
							<table class="border-border w-full border-collapse border">
								<thead>
									<tr class="bg-muted/50">
										<th class="border-border border p-2 text-left">Prop</th>
										<th class="border-border border p-2 text-left">Type</th>
										<th class="border-border border p-2 text-left">Default</th>
										<th class="border-border border p-2 text-left">Description</th>
									</tr>
								</thead>
								<tbody class="text-sm">
									<tr>
										<td class="border-border border p-2"><code>content</code></td>
										<td class="border-border border p-2">string</td>
										<td class="border-border border p-2">''</td>
										<td class="border-border border p-2">HTML content of the editor</td>
									</tr>
									<tr>
										<td class="border-border border p-2"><code>placeholder</code></td>
										<td class="border-border border p-2">string</td>
										<td class="border-border border p-2">'Start writing...'</td>
										<td class="border-border border p-2">Placeholder text when empty</td>
									</tr>
									<tr>
										<td class="border-border border p-2"><code>readonly</code></td>
										<td class="border-border border p-2">boolean</td>
										<td class="border-border border p-2">false</td>
										<td class="border-border border p-2">Makes editor read-only</td>
									</tr>
									<tr>
										<td class="border-border border p-2"><code>minHeight</code></td>
										<td class="border-border border p-2">string</td>
										<td class="border-border border p-2">'300px'</td>
										<td class="border-border border p-2">Minimum height of editor</td>
									</tr>
								</tbody>
							</table>
						</div>

						<div>
							<h4 class="mb-2 font-semibold">Usage Example:</h4>
							<div class="bg-muted rounded-lg p-4">
								<pre class="text-sm"><code
										>&lt;script&gt;
  import {RichTextEditor} from '$lib/components/editor';
  let content = '&lt;p&gt;Initial content&lt;/p&gt;';
&lt;/script&gt;

&lt;RichTextEditor
  bind:content= &lcub content &rcub
  placeholder="Write your article..."
  minHeight="500px"
  readonly={false}
/&gt;</code
									></pre>
							</div>
						</div>
					</Card.Content>
				</Card.Root>

				<Card.Root>
					<Card.Header>
						<Card.Title>State Management</Card.Title>
					</Card.Header>
					<Card.Content class="space-y-4">
						<p>
							The editor maintains several reactive state variables to track the current formatting:
						</p>

						<div class="bg-muted rounded-lg p-4">
							<pre class="text-sm"><code
									>// Active states for toolbar buttons
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

// Dialog states
let linkDialogOpen = false;
let imageDialogOpen = false;
let linkUrl = '';
let linkText = '';
let imageUrl = '';
let imageAlt = '';</code
								></pre>
						</div>

						<p>
							These states are automatically updated whenever the selection changes, providing
							real-time feedback about the current formatting.
						</p>
					</Card.Content>
				</Card.Root>
			</section>

			<!-- Features & Usage -->
			<section class="space-y-8">
				<h2 class="border-border border-b pb-2 text-3xl font-bold">✨ Features & Usage</h2>

				<Card.Root>
					<Card.Header>
						<Card.Title>Text Formatting Features</Card.Title>
					</Card.Header>
					<Card.Content class="space-y-4">
						<div class="grid gap-6 md:grid-cols-2">
							<div>
								<h4 class="mb-2 font-semibold">Basic Formatting</h4>
								<ul class="text-muted-foreground space-y-1 text-sm">
									<li>• <strong>Bold</strong> - Ctrl+B or toolbar button</li>
									<li>• <em>Italic</em> - Ctrl+I or toolbar button</li>
									<li>• <u>Underline</u> - Ctrl+U or toolbar button</li>
									<li>• <s>Strikethrough</s> - Toolbar button</li>
								</ul>
							</div>

							<div>
								<h4 class="mb-2 font-semibold">Block Elements</h4>
								<ul class="text-muted-foreground space-y-1 text-sm">
									<li>• Headings (H1, H2, H3)</li>
									<li>• Paragraphs</li>
									<li>• Blockquotes</li>
									<li>• Code blocks</li>
								</ul>
							</div>

							<div>
								<h4 class="mb-2 font-semibold">Lists</h4>
								<ul class="text-muted-foreground space-y-1 text-sm">
									<li>• Bullet lists (unordered)</li>
									<li>• Numbered lists (ordered)</li>
									<li>• Nested lists support</li>
									<li>• Auto-outdent on empty items</li>
								</ul>
							</div>

							<div>
								<h4 class="mb-2 font-semibold">Alignment</h4>
								<ul class="text-muted-foreground space-y-1 text-sm">
									<li>• Left align</li>
									<li>• Center align</li>
									<li>• Right align</li>
									<li>• Visual feedback</li>
								</ul>
							</div>
						</div>
					</Card.Content>
				</Card.Root>

				<Card.Root>
					<Card.Header>
						<Card.Title>Media & Links</Card.Title>
					</Card.Header>
					<Card.Content class="space-y-4">
						<div class="space-y-6">
							<div>
								<h4 class="mb-2 font-semibold">Link Insertion</h4>
								<p class="text-muted-foreground mb-2 text-sm">
									Insert links with a user-friendly dialog:
								</p>
								<div class="bg-muted rounded-lg p-4">
									<pre class="text-sm"><code
											>// Link insertion process:
1. Select text (optional)
2. Click link button or use dialog
3. Enter URL and optional link text
4. Link is inserted with target="_blank"</code
										></pre>
								</div>
							</div>

							<div>
								<h4 class="mb-2 font-semibold">Image Insertion</h4>
								<p class="text-muted-foreground mb-2 text-sm">
									Add images with automatic styling and fallbacks:
								</p>
								<div class="bg-muted rounded-lg p-4">
									<pre class="text-sm"><code
											>// Image insertion features:
- URL validation
- Alt text support
- Responsive styling (max-width: 100%)
- Automatic margin and border-radius
- Hover effects
- Fallback insertion methods</code
										></pre>
								</div>
							</div>

							<div>
								<h4 class="mb-2 font-semibold">Code Support</h4>
								<ul class="text-muted-foreground space-y-1 text-sm">
									<li>• Inline code with proper styling</li>
									<li>• Code blocks with syntax highlighting</li>
									<li>• Monospace font family</li>
									<li>• Proper background and padding</li>
								</ul>
							</div>
						</div>
					</Card.Content>
				</Card.Root>

				<Card.Root>
					<Card.Header>
						<Card.Title>Keyboard Shortcuts</Card.Title>
					</Card.Header>
					<Card.Content class="space-y-4">
						<p>The editor supports standard keyboard shortcuts for efficient editing:</p>

						<div class="grid gap-4 md:grid-cols-2">
							<div>
								<h4 class="mb-2 font-semibold">Formatting Shortcuts</h4>
								<div class="space-y-2 text-sm">
									<div class="flex justify-between">
										<span><code>Ctrl + B</code></span>
										<span class="text-muted-foreground">Bold</span>
									</div>
									<div class="flex justify-between">
										<span><code>Ctrl + I</code></span>
										<span class="text-muted-foreground">Italic</span>
									</div>
									<div class="flex justify-between">
										<span><code>Ctrl + U</code></span>
										<span class="text-muted-foreground">Underline</span>
									</div>
								</div>
							</div>

							<div>
								<h4 class="mb-2 font-semibold">Action Shortcuts</h4>
								<div class="space-y-2 text-sm">
									<div class="flex justify-between">
										<span><code>Ctrl + Z</code></span>
										<span class="text-muted-foreground">Undo</span>
									</div>
									<div class="flex justify-between">
										<span><code>Ctrl + Shift + Z</code></span>
										<span class="text-muted-foreground">Redo</span>
									</div>
									<div class="flex justify-between">
										<span><code>Enter</code></span>
										<span class="text-muted-foreground">Smart list handling</span>
									</div>
								</div>
							</div>
						</div>
					</Card.Content>
				</Card.Root>
			</section>

			<!-- Customization -->
			<section class="space-y-8">
				<h2 class="border-border border-b pb-2 text-3xl font-bold">🎨 Customization Guide</h2>

				<Card.Root>
					<Card.Header>
						<Card.Title>Adding New Toolbar Buttons</Card.Title>
					</Card.Header>
					<Card.Content class="space-y-4">
						<p>To add a new formatting button to the toolbar:</p>

						<div class="space-y-4">
							<div>
								<h4 class="mb-2 font-semibold">1. Add State Variable</h4>
								<div class="bg-muted rounded-lg p-4">
									<pre class="text-sm"><code
											>// Add to reactive variables
let activeCustomFormat = false;</code
										></pre>
								</div>
							</div>

							<div>
								<h4 class="mb-2 font-semibold">2. Update Toolbar State Function</h4>
								<div class="bg-muted rounded-lg p-4">
									<pre class="text-sm"><code
											>function updateToolbarState() &lcub;
  // ...existing code...
  activeCustomFormat = document.queryCommandState('customCommand');
&rcub;</code
										></pre>
								</div>
							</div>

							<div>
								<h4 class="mb-2 font-semibold">3. Add Button to Toolbar</h4>
								<div class="bg-muted rounded-lg p-4">
									<pre class="text-sm"><code
											>&lt;Button
  variant=&lcub;activeCustomFormat ? 'default' : 'ghost'&rcub;
  size="sm"
  onclick=&lcub;() => execCommand('customCommand')&rcub;
  disabled=&lcub;readonly&rcub;
  title="Custom Format"
  class=&lcub;activeCustomFormat
    ? '!bg-primary !text-primary-foreground hover:!bg-primary/90'
    : 'hover:bg-muted'&rcub;
&gt;
  &lt;CustomIcon class="h-4 w-4" /&gt;
&lt;/Button&gt;</code
										></pre>
								</div>
							</div>
						</div>
					</Card.Content>
				</Card.Root>

				<Card.Root>
					<Card.Header>
						<Card.Title>Creating Custom Commands</Card.Title>
					</Card.Header>
					<Card.Content class="space-y-4">
						<p>For complex functionality, create custom command functions:</p>

						<div class="bg-muted rounded-lg p-4">
							<pre class="text-sm"><code
									>function insertTable() &lcub;
  if (typeof document === 'undefined' || !editor) return;
  
  const html = `
    &lt;table style="border-collapse: collapse; width: 100%;"&gt;
      &lt;tr&gt;
        &lt;th style="border: 1px solid #ccc; padding: 8px;"&gt;Header 1&lt;/th&gt;
        &lt;th style="border: 1px solid #ccc; padding: 8px;"&gt;Header 2&lt;/th&gt;
      &lt;/tr&gt;
      &lt;tr&gt;
        &lt;td style="border: 1px solid #ccc; padding: 8px;"&gt;Cell 1&lt;/td&gt;
        &lt;td style="border: 1px solid #ccc; padding: 8px;"&gt;Cell 2&lt;/td&gt;
      &lt;/tr&gt;
    &lt;/table&gt;
  `;
  
  document.execCommand('insertHTML', false, html);
  editor.focus();
&rcub;

function insertCurrentDate() &lcub;
  const date = new Date().toLocaleDateString();
  document.execCommand('insertText', false, date);
  editor.focus();
&rcub;</code
								></pre>
						</div>
					</Card.Content>
				</Card.Root>

				<Card.Root>
					<Card.Header>
						<Card.Title>Styling Customization</Card.Title>
					</Card.Header>
					<Card.Content class="space-y-4">
						<p>Customize the editor's appearance with CSS:</p>

						<div class="space-y-4">
							<div>
								<h4 class="mb-2 font-semibold">Editor Container</h4>
								<div class="bg-muted rounded-lg p-4">
									<pre class="text-sm"><code
											>/* Custom editor border and background */
.rich-text-editor &lcub;
  border: 2px solid hsl(var(--primary));
  border-radius: 12px;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
&rcub;

/* Custom toolbar styling */
.rich-text-editor .toolbar &lcub;
  background: hsl(var(--primary));
  color: hsl(var(--primary-foreground));
&rcub;</code
										></pre>
								</div>
							</div>

							<div>
								<h4 class="mb-2 font-semibold">Content Styling</h4>
								<div class="bg-muted rounded-lg p-4">
									<pre class="text-sm"><code
											>/* Custom typography */
.rich-text-editor :global(.prose) &lcub;
  font-family: 'Georgia', serif;
  font-size: 16px;
  line-height: 1.8;
&rcub;

/* Custom heading styles */
.rich-text-editor :global(.prose h1) &lcub;
  color: hsl(var(--primary));
  border-bottom: 3px solid hsl(var(--primary));
  font-family: 'Helvetica', sans-serif;
&rcub;</code
										></pre>
								</div>
							</div>
						</div>
					</Card.Content>
				</Card.Root>

				<Card.Root>
					<Card.Header>
						<Card.Title>Plugin System Architecture</Card.Title>
					</Card.Header>
					<Card.Content class="space-y-4">
						<p>Design a plugin system for extensibility:</p>

						<div class="bg-muted rounded-lg p-4">
							<pre class="text-sm"><code
									>// Plugin interface
interface EditorPlugin &lcub;
  name: string;
  commands?: Record&lt;string, Function&gt;;
  toolbar?: ToolbarItem[];
  styles?: string;
  onInit?: (editor: HTMLElement) => void;
  onDestroy?: () => void;
&rcub;

// Example plugin
const tablePlugin: EditorPlugin = &lcub;
  name: 'table',
  commands: &lcub;
    insertTable: () => insertTable(),
    insertRow: () => insertTableRow(),
    insertColumn: () => insertTableColumn()
  &rcub;,
  toolbar: [
    &lcub;
      icon: TableIcon,
      command: 'insertTable',
      title: 'Insert Table'
    &rcub;
  ],
  styles: `
    .table-cell &lcub;
      border: 1px solid #ccc;
      padding: 8px;
    &rcub;
  `
&rcub;;

// Plugin registration
function registerPlugin(plugin: EditorPlugin) &lcub;
  // Register commands
  Object.entries(plugin.commands || &lcub;&rcub;).forEach(([name, fn]) => &lcub;
    editorCommands[name] = fn;
  &rcub;);
  
  // Add toolbar items
  if (plugin.toolbar) &lcub;
    toolbarItems.push(...plugin.toolbar);
  &rcub;
  
  // Inject styles
  if (plugin.styles) &lcub;
    injectStyles(plugin.styles);
  &rcub;
&rcub;</code
								></pre>
						</div>
					</Card.Content>
				</Card.Root>
			</section>

			<!-- Advanced Topics -->
			<section class="space-y-8">
				<h2 class="border-border border-b pb-2 text-3xl font-bold">🚀 Advanced Topics</h2>

				<Card.Root>
					<Card.Header>
						<Card.Title>Performance Optimization</Card.Title>
					</Card.Header>
					<Card.Content class="space-y-4">
						<div class="space-y-6">
							<div>
								<h4 class="mb-2 font-semibold">Debouncing Updates</h4>
								<div class="bg-muted rounded-lg p-4">
									<pre class="text-sm"><code
											>import &lcub debounce &rcub from 'lodash-es';

// Debounce toolbar updates to improve performance
const debouncedUpdateToolbar = debounce(updateToolbarState, 100);

// Use debounced version for frequent events
editor.addEventListener('selectionchange', debouncedUpdateToolbar);</code
										></pre>
								</div>
							</div>

							<div>
								<h4 class="mb-2 font-semibold">Virtual Scrolling for Large Content</h4>
								<div class="bg-muted rounded-lg p-4">
									<pre class="text-sm"><code
											>// For very large documents, implement virtual scrolling
function implementVirtualScrolling() &lcub;
  const observer = new IntersectionObserver((entries) => &lcub;
    entries.forEach(entry => &lcub;
      if (entry.isIntersecting) &lcub;
        // Load content chunk
        loadContentChunk(entry.target);
      &rcub; else &lcub;
        // Unload content chunk to save memory
        unloadContentChunk(entry.target);
      &rcub;
    &rcub;);
  &rcub;);
&rcub;</code
										></pre>
								</div>
							</div>

							<div>
								<h4 class="mb-2 font-semibold">Memory Management</h4>
								<ul class="text-muted-foreground space-y-1 text-sm">
									<li>• Remove event listeners on component destroy</li>
									<li>• Clear timers and intervals</li>
									<li>• Limit undo/redo history</li>
									<li>• Clean up DOM references</li>
								</ul>
							</div>
						</div>
					</Card.Content>
				</Card.Root>

				<Card.Root>
					<Card.Header>
						<Card.Title>Security Considerations</Card.Title>
					</Card.Header>
					<Card.Content class="space-y-4">
						<div class="space-y-6">
							<div>
								<h4 class="mb-2 font-semibold">XSS Prevention</h4>
								<div class="bg-muted rounded-lg p-4">
									<pre class="text-sm"><code
											>import DOMPurify from 'dompurify';

function sanitizeContent(html: string): string &lcub;
  return DOMPurify.sanitize(html, &lcub;
    ALLOWED_TAGS: ['p', 'br', 'strong', 'em', 'u', 'h1', 'h2', 'h3', 'ul', 'ol', 'li', 'a', 'img'],
    ALLOWED_ATTR: ['href', 'src', 'alt', 'title'],
    ALLOW_DATA_ATTR: false
  &rcub;);
&rcub;

// Use when setting content
function setContent(html: string) &lcub;
  const sanitized = sanitizeContent(html);
  editor.innerHTML = sanitized;
&rcub;</code
										></pre>
								</div>
							</div>

							<div>
								<h4 class="mb-2 font-semibold">Content Validation</h4>
								<div class="bg-muted rounded-lg p-4">
									<pre class="text-sm"><code
											>function validateContent(content: string): ValidationResult &lcub;
  const errors: string[] = [];
  
  // Check for malicious scripts
  if (content.includes('&lt;script')) &lcub;
    errors.push('Script tags are not allowed');
  &rcub;
  
  // Check for suspicious attributes
  if (content.includes('javascript:')) &lcub;
    errors.push('JavaScript URLs are not allowed');
  &rcub;
  
  // Check content length
  if (content.length > MAX_CONTENT_LENGTH) &lcub;
    errors.push('Content exceeds maximum length');
  &rcub;
  
  return &lcub; isValid: errors.length === 0, errors &rcub;;
&rcub;</code
										></pre>
								</div>
							</div>

							<div>
								<h4 class="mb-2 font-semibold">Safe Link Handling</h4>
								<div class="bg-muted rounded-lg p-4">
									<pre class="text-sm"><code
											>function createSafeLink(url: string, text: string): string &lcub;
  // Validate URL
  try &lcub;
    const parsedUrl = new URL(url);
    if (!['http:', 'https:'].includes(parsedUrl.protocol)) &lcub;
      throw new Error('Invalid protocol');
    &rcub;
  &rcub; catch &lcub;
    return text; // Return plain text if URL is invalid
  &rcub;
  
  // Create safe link with rel attributes
  return `&lt;a href="\$&lcub;escapeHtml(url)&rcub;" target="_blank" rel="noopener noreferrer nofollow"&gt;\$&lcub;escapeHtml(text)&rcub;&lt;/a&gt;`;
&rcub;</code
										></pre>
								</div>
							</div>
						</div>
					</Card.Content>
				</Card.Root>

				<Card.Root>
					<Card.Header>
						<Card.Title>Accessibility Features</Card.Title>
					</Card.Header>
					<Card.Content class="space-y-4">
						<div class="space-y-6">
							<div>
								<h4 class="mb-2 font-semibold">ARIA Attributes</h4>
								<div class="bg-muted rounded-lg p-4">
									<pre class="text-sm"><code
											>&lt;div
  contenteditable="true"
  role="textbox"
  aria-label="Rich text editor"
  aria-multiline="true"
  aria-required="false"
  tabindex="0"
&gt;</code
										></pre>
								</div>
							</div>

							<div>
								<h4 class="mb-2 font-semibold">Keyboard Navigation</h4>
								<div class="bg-muted rounded-lg p-4">
									<pre class="text-sm"><code
											>function handleKeyboardNavigation(e: KeyboardEvent) &lcub;
  // Tab through toolbar buttons
  if (e.key === 'Tab' && e.target === editor) &lcub;
    e.preventDefault();
    focusNextToolbarButton();
  &rcub;
  
  // Escape to exit editor
  if (e.key === 'Escape') &lcub;
    editor.blur();
    announceToScreenReader('Exited editor');
  &rcub;
  
  // Alt + F10 to focus toolbar
  if (e.altKey && e.key === 'F10') &lcub;
    e.preventDefault();
    focusToolbar();
  &rcub;
&rcub;</code
										></pre>
								</div>
							</div>

							<div>
								<h4 class="mb-2 font-semibold">Screen Reader Support</h4>
								<ul class="text-muted-foreground space-y-1 text-sm">
									<li>• Announce formatting changes</li>
									<li>• Provide text alternatives for images</li>
									<li>• Clear button labels and shortcuts</li>
									<li>• Status updates for actions</li>
								</ul>
							</div>
						</div>
					</Card.Content>
				</Card.Root>

				<Card.Root>
					<Card.Header>
						<Card.Title>Browser Compatibility</Card.Title>
					</Card.Header>
					<Card.Content class="space-y-4">
						<div class="space-y-6">
							<div>
								<h4 class="mb-2 font-semibold">Feature Detection</h4>
								<div class="bg-muted rounded-lg p-4">
									<pre class="text-sm"><code
											>function checkBrowserSupport(): BrowserSupport &lcub;
  return &lcub;
    contentEditable: 'contentEditable' in document.createElement('div'),
    execCommand: typeof document.execCommand === 'function',
    getSelection: typeof window.getSelection === 'function',
    clipboard: 'clipboard' in navigator,
    intersectionObserver: 'IntersectionObserver' in window
  &rcub;;
&rcub;

function initializeEditor() &lcub;
  const support = checkBrowserSupport();
  
  if (!support.contentEditable || !support.execCommand) &lcub;
    // Fallback to textarea
    showFallbackEditor();
    return;
  &rcub;
  
  // Initialize full editor
  initializeRichTextEditor();
&rcub;</code
										></pre>
								</div>
							</div>

							<div>
								<h4 class="mb-2 font-semibold">Polyfills and Fallbacks</h4>
								<div class="bg-muted rounded-lg p-4">
									<pre class="text-sm"><code
											>// Selection API polyfill for older browsers
if (!window.getSelection) &lcub;
  window.getSelection = function() &lcub;
    return document.selection;
  &rcub;;
&rcub;

// execCommand fallback for unsupported commands
function execCommandWithFallback(command: string, value?: string) &lcub;
  try &lcub;
    const success = document.execCommand(command, false, value);
    if (!success) &lcub;
      handleCommandFallback(command, value);
    &rcub;
  &rcub; catch (error) &lcub;
    handleCommandFallback(command, value);
  &rcub;
&rcub;</code
										></pre>
								</div>
							</div>
						</div>
					</Card.Content>
				</Card.Root>
			</section>

			<!-- Examples & Recipes -->
			<section class="space-y-8">
				<h2 class="border-border border-b pb-2 text-3xl font-bold">📚 Examples & Recipes</h2>

				<Card.Root>
					<Card.Header>
						<Card.Title>Integration Examples</Card.Title>
					</Card.Header>
					<Card.Content class="space-y-4">
						<div class="space-y-6">
							<div>
								<h4 class="mb-2 font-semibold">Form Integration</h4>
								<div class="bg-muted rounded-lg p-4">
									<pre class="text-sm"><code
											>&lt;script&gt;
  import &lcub; RichTextEditor &rcub; from '$lib/components/editor';
  import &lcub; enhance &rcub; from '$app/forms';
  
  let content = '';
  let title = '';
  
  function handleSubmit() &lcub;
    // Validate and sanitize before submission
    const sanitizedContent = sanitizeContent(content);
    return async (&lcub; formData &rcub;) => &lcub;
      formData.set('title', title);
      formData.set('content', sanitizedContent);
    &rcub;;
  &rcub;
&lt;/script&gt;

&lt;form method="POST" use:enhance=&lcub;handleSubmit&rcub;&gt;
  &lt;input name="title" bind:value=&lcub;title&rcub; /&gt;
  &lt;RichTextEditor bind:content=&lcub;content&rcub; /&gt;
  &lt;button type="submit"&gt;Save Article&lt;/button&gt;
&lt;/form&gt;</code
										></pre>
								</div>
							</div>

							<div>
								<h4 class="mb-2 font-semibold">Auto-save Implementation</h4>
								<div class="bg-muted rounded-lg p-4">
									<pre class="text-sm"><code
											>import &lcub; debounce &rcub; from 'lodash-es';

let content = '';
let lastSaved = '';
let saving = false;

const autoSave = debounce(async () => &lcub;
  if (content === lastSaved || saving) return;
  
  saving = true;
  try &lcub;
    await fetch('/api/autosave', &lcub;
      method: 'POST',
      headers: &lcub; 'Content-Type': 'application/json' &rcub;,
      body: JSON.stringify(&lcub; content &rcub;)
    &rcub;);
    lastSaved = content;
  &rcub; catch (error) &lcub;
    console.error('Auto-save failed:', error);
  &rcub; finally &lcub;
    saving = false;
  &rcub;
&rcub;, 2000);

// Watch for content changes
$: if (content) &lcub;
  autoSave();
&rcub;</code
										></pre>
								</div>
							</div>

							<div>
								<h4 class="mb-2 font-semibold">Real-time Collaboration</h4>
								<div class="bg-muted rounded-lg p-4">
									<pre class="text-sm"><code
											>import &lcub; io &rcub; from 'socket.io-client';

let socket: Socket;
let documentId: string;

function initializeCollaboration() &lcub;
  socket = io('/collaboration');
  
  socket.emit('join-document', documentId);
  
  // Send changes to other users
  const sendChanges = debounce((delta) => &lcub;
    socket.emit('content-change', &lcub;
      documentId,
      delta,
      userId: currentUser.id
    &rcub;);
  &rcub;, 100);
  
  // Receive changes from other users
  socket.on('content-change', (&lcub;delta, userId&rcub;) => &lcub;
    if (userId !== currentUser.id) &lcub;
      applyDelta(delta);
    &rcub;
  &rcub;);
  
  // Show other users' cursors
  socket.on('cursor-update', (&lcub;userId, position&rcub;) => &lcub;
    updateUserCursor(userId, position);
  &rcub;);
&rcub;</code
										></pre>
								</div>
							</div>
						</div>
					</Card.Content>
				</Card.Root>

				<Card.Root>
					<Card.Header>
						<Card.Title>Common Use Cases</Card.Title>
					</Card.Header>
					<Card.Content class="space-y-4">
						<div class="grid gap-6 md:grid-cols-2">
							<div>
								<h4 class="mb-2 font-semibold">Blog Editor</h4>
								<ul class="text-muted-foreground space-y-1 text-sm">
									<li>• Article writing with rich formatting</li>
									<li>• Image upload and management</li>
									<li>• SEO-friendly HTML output</li>
									<li>• Draft saving and publishing</li>
								</ul>
							</div>

							<div>
								<h4 class="mb-2 font-semibold">CMS Content Editor</h4>
								<ul class="text-muted-foreground space-y-1 text-sm">
									<li>• Page content editing</li>
									<li>• Template integration</li>
									<li>• Multi-language support</li>
									<li>• Workflow management</li>
								</ul>
							</div>

							<div>
								<h4 class="mb-2 font-semibold">Email Composer</h4>
								<ul class="text-muted-foreground space-y-1 text-sm">
									<li>• Rich text email formatting</li>
									<li>• Attachment handling</li>
									<li>• Template system</li>
									<li>• Contact integration</li>
								</ul>
							</div>

							<div>
								<h4 class="mb-2 font-semibold">Documentation Tool</h4>
								<ul class="text-muted-foreground space-y-1 text-sm">
									<li>• Technical documentation</li>
									<li>• Code syntax highlighting</li>
									<li>• Table of contents</li>
									<li>• Export functionality</li>
								</ul>
							</div>
						</div>
					</Card.Content>
				</Card.Root>

				<Card.Root>
					<Card.Header>
						<Card.Title>Troubleshooting Guide</Card.Title>
					</Card.Header>
					<Card.Content class="space-y-4">
						<div class="space-y-6">
							<div>
								<h4 class="mb-2 font-semibold">Common Issues</h4>
								<div class="space-y-4">
									<div>
										<strong class="text-red-600">Issue:</strong> Toolbar buttons not showing active
										state
										<div class="bg-muted mt-1 rounded-lg p-3">
											<strong>Solution:</strong> Check that updateToolbarState() is called on selection
											changes and that the editor has focus.
										</div>
									</div>

									<div>
										<strong class="text-red-600">Issue:</strong> Images not inserting properly
										<div class="bg-muted mt-1 rounded-lg p-3">
											<strong>Solution:</strong> Ensure editor has focus before insertion and implement
											fallback DOM manipulation.
										</div>
									</div>

									<div>
										<strong class="text-red-600">Issue:</strong> Lists not displaying
										bullets/numbers
										<div class="bg-muted mt-1 rounded-lg p-3">
											<strong>Solution:</strong> Add CSS rules with !important for list-style-type and
											use :global() in Svelte.
										</div>
									</div>

									<div>
										<strong class="text-red-600">Issue:</strong> Paste operation not working
										correctly
										<div class="bg-muted mt-1 rounded-lg p-3">
											<strong>Solution:</strong> Handle paste events, sanitize content, and use insertText
											for plain text.
										</div>
									</div>
								</div>
							</div>

							<div>
								<h4 class="mb-2 font-semibold">Debugging Tips</h4>
								<ul class="text-muted-foreground space-y-1 text-sm">
									<li>• Use browser dev tools to inspect contenteditable behavior</li>
									<li>• Log selection and range information for debugging</li>
									<li>• Test across different browsers and devices</li>
									<li>• Validate HTML output regularly</li>
									<li>• Monitor performance with large content</li>
								</ul>
							</div>
						</div>
					</Card.Content>
				</Card.Root>
			</section>

			<!-- Conclusion -->
			<Card.Root>
				<Card.Header>
					<Card.Title class="text-2xl">🎯 Summary</Card.Title>
				</Card.Header>
				<Card.Content class="space-y-4">
					<p class="text-lg">
						This Rich Text Editor provides a solid foundation for content creation with modern web
						technologies. It combines the power of the ContentEditable API with a clean, accessible
						interface built with Svelte and ShadCN UI components.
					</p>

					<div class="grid gap-4 md:grid-cols-2">
						<div>
							<h4 class="mb-2 font-semibold">Key Strengths</h4>
							<ul class="text-muted-foreground space-y-1 text-sm">
								<li>• Reactive state management</li>
								<li>• Accessibility features</li>
								<li>• Extensible architecture</li>
								<li>• Modern UI components</li>
								<li>• Cross-browser compatibility</li>
							</ul>
						</div>

						<div>
							<h4 class="mb-2 font-semibold">Best Practices</h4>
							<ul class="text-muted-foreground space-y-1 text-sm">
								<li>• Always sanitize user content</li>
								<li>• Implement proper error handling</li>
								<li>• Test across different browsers</li>
								<li>• Consider performance implications</li>
								<li>• Follow accessibility guidelines</li>
							</ul>
						</div>
					</div>

					<p class="text-muted-foreground">
						For additional support or feature requests, refer to the component source code or
						contribute to the project repository.
					</p>
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
