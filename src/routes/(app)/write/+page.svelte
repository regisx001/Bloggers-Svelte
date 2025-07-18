<script lang="ts">
	import type { PageData } from './$types';
	import { enhance } from '$app/forms';
	import RichTextEditor from '$lib/components/editor/rich-text-editor.svelte';
	import { Input } from '$lib/components/ui/input';
	import { Button } from '$lib/components/ui/button';
	import { Label } from '$lib/components/ui/label';
	import { toast } from 'svelte-sonner';
	import * as Select from '$lib/components/ui/select';
	import { Card } from '$lib/components/ui/card';
	import { Separator } from '$lib/components/ui/separator';
	import { PenTool, Upload, FileText, Tag } from '@lucide/svelte';
	import TagInput from '$lib/components/ui/tag-input';

	let { data, form } = $props();
	let title = $state('');
	let content = $state('');
	let selectedCategory = $state({ value: '', label: 'Select a category' });
	let featuredImage: File | null = $state(null);
	let isSubmitting = $state(false);

	$effect(() => {
		if (form?.success) {
			toast.success(form.message);
			title = '';
			content = '';
			selectedCategory = { value: '', label: 'Select a category' };
			featuredImage = null;
		} else if (form?.success === false) {
			toast.error(form.message);
		}
	});

	const categoryOptions = $derived(
		data?.categories?.map((cat: string) => ({ value: cat, label: cat })) || []
	);

	// Handle image upload for rich text editor
	async function handleImageUpload(event: CustomEvent) {
		const { file, alt, callback } = event.detail;

		try {
			toast.loading('Uploading image...');

			const formData = new FormData();
			formData.append('image', file);
			formData.append('alt', alt);

			// Replace '/api/upload-image' with your actual upload endpoint
			const response = await fetch('/api/upload-image', {
				method: 'POST',
				body: formData
			});

			if (!response.ok) {
				throw new Error('Upload failed');
			}

			const result = await response.json();

			// Success - call callback with the URL
			callback(result.url);
			toast.success('Image uploaded successfully!');
		} catch (error) {
			console.error('Upload error:', error);
			callback(''); // Signal failure
			toast.error('Failed to upload image. Please try again.');
		}
	}
</script>

<section class="container mx-auto max-w-4xl px-4 py-8">
	<div class="mb-8 text-center">
		<h1 class="mb-2 text-3xl font-bold">Quick Write</h1>
		<p class="text-muted-foreground">Create and publish your blog article in minutes</p>
	</div>

	<Card class="p-6">
		<form
			use:enhance={() => {
				isSubmitting = true;
				return ({ update }) => {
					update();
					isSubmitting = false;
				};
			}}
			action="?/createArticle"
			method="post"
			enctype="multipart/form-data"
			class="space-y-6"
		>
			<!-- Title Section -->
			<div class="space-y-2">
				<div class="flex items-center gap-2">
					<FileText class="h-4 w-4" />
					<Label for="title" class="text-sm font-medium">Article Title</Label>
				</div>
				<Input
					id="title"
					name="title"
					bind:value={title}
					placeholder="Enter your article title..."
					class="text-lg"
					required
				/>
			</div>

			<Separator />

			<!-- Category and Image Section -->
			<div class="grid gap-6 md:grid-cols-2">
				<!-- DEPRECATED: WERE GOING TO TRY A DIFFRENT APPROCH WITH CATEGORIES -->
				<!-- <div class="space-y-2">
					<div class="flex items-center gap-2">
						<Tag class="h-4 w-4" />
						<Label class="text-sm font-medium">Category</Label>
					</div>
					<select
						name="category"
						bind:value={selectedCategory.value}
						class="border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex h-10 w-full rounded-md border px-3 py-2 text-sm focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
					>
						<option value="" disabled>Select a category</option>
						{#each categoryOptions as category}
							<option value={category.value}>{category.label}</option>
						{/each}
					</select>
				</div> -->

				<div class="space-y-2">
					<div class="flex items-center gap-2">
						<Upload class="h-4 w-4" />
						<Label for="featuredImage" class="text-sm font-medium">Featured Image</Label>
					</div>
					<Input
						id="featuredImage"
						type="file"
						name="featuredImage"
						accept="image/*"
						onchange={(e: Event) => {
							const files = (e.target as HTMLInputElement).files;
							featuredImage = files?.[0] ?? null;
						}}
					/>
					{#if featuredImage}
						<p class="text-muted-foreground text-sm">Selected: {featuredImage.name}</p>
					{/if}
				</div>
			</div>

			<Separator />

			<!-- Content Section -->
			<div class="space-y-2">
				<div class="flex items-center gap-2">
					<PenTool class="h-4 w-4" />
					<Label class="text-sm font-medium">Content</Label>
				</div>
				<div class="min-h-[400px] rounded-lg border">
					<RichTextEditor
						bind:content
						on:imageUpload={handleImageUpload}
						placeholder="Start writing your article..."
					/>
				</div>
				<textarea name="content" class="hidden" value={content}></textarea>
			</div>
			<div class="space-y-2">
				<TagInput name="tags" placeholder="add tags" />
			</div>

			<Separator />

			<!-- Actions -->
			<div class="flex flex-col gap-4 sm:flex-row sm:justify-between">
				<div class="flex gap-2">
					<Button type="button" variant="outline" onclick={() => history.back()}>Cancel</Button>
					<Button
						type="button"
						variant="ghost"
						onclick={() => {
							title = '';
							content = '';
							selectedCategory = { value: '', label: 'Select a category' };
							featuredImage = null;
						}}
					>
						Clear All
					</Button>
				</div>
				<Button type="submit" disabled={isSubmitting} class="min-w-[120px]">
					{#if isSubmitting}
						Publishing...
					{:else}
						Publish Article
					{/if}
				</Button>
			</div>
		</form>
	</Card>
</section>
