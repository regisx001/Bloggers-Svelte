<script lang="ts">
	import ArticleInlineEditor from '$lib/components/editor/article-inline-editor.svelte';

	let editorData = {
		title: 'Building the Future of Content Creation',
		content: `<p class="text-muted-foreground mb-6 text-xl leading-relaxed">
			In this comprehensive guide, we'll explore how modern rich text editors are revolutionizing the way we create and edit content online.
		</p>
		
		<h2 class="mt-8 mb-4 text-2xl font-semibold">The Evolution of Text Editors</h2>
		
		<p class="mb-4">
			Traditional text editors required users to work in separate editing and preview modes. This created a disconnect between the writing experience and the final output. Modern editors bridge this gap by providing <strong>inline editing capabilities</strong> that feel natural and intuitive.
		</p>
		
		<blockquote class="border-primary text-muted-foreground bg-muted/50 my-6 rounded-r-md border-l-4 py-4 pl-6 italic">
			"The best interface is no interface. When editing feels invisible, creativity flows."
		</blockquote>`,
		author: 'regisx001',
		tags: ['Technology', 'Web Development'],
		status: 'draft' as const
	};

	function handleSave(event: CustomEvent) {
		console.log('Document saved:', event.detail);
	}

	function handleExport(event: CustomEvent) {
		console.log('Export requested:', event.detail);
	}

	function handleShare(event: CustomEvent) {
		console.log('Share requested:', event.detail);
	}

	function handleImageUpload(event: CustomEvent) {
		console.log('Image upload:', event.detail);
		// Here you would handle the actual file upload
	}
</script>

<svelte:head>
	<title>Rich Text Editor Demo</title>
</svelte:head>

<ArticleInlineEditor
	title={editorData.title}
	content={editorData.content}
	author={editorData.author}
	tags={editorData.tags}
	status={editorData.status}
	autoSave={true}
	showToolbar={true}
	showStats={true}
	on:save={handleSave}
	on:export={handleExport}
	on:share={handleShare}
	on:imageUpload={handleImageUpload}
/>
