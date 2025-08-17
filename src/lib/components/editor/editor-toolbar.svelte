<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { Button } from '$lib/components/ui/button';
	import { Separator } from '$lib/components/ui/separator';
	import {
		Bold,
		Italic,
		Underline,
		Strikethrough,
		Link as LinkIcon,
		Image,
		Code,
		Quote,
		List,
		ListOrdered,
		AlignLeft,
		AlignCenter,
		AlignRight,
		MoreHorizontal
	} from '@lucide/svelte';

	export let formatState: any;

	const dispatch = createEventDispatcher();

	function handleFormat(format: string) {
		dispatch('format', format);
	}

	function handleHeading(level: number) {
		dispatch('heading', level);
	}

	function handleList(type: 'ul' | 'ol') {
		dispatch('list', type);
	}

	function handleLink() {
		dispatch('link');
	}

	function handleImage() {
		dispatch('image');
	}

	function handleCode() {
		dispatch('code');
	}
</script>

<!-- Floating Toolbar -->
<div
	class="bg-card/95 supports-[backdrop-filter]:bg-card/60 sticky top-0 z-10 border-b backdrop-blur"
>
	<div class="flex items-center justify-between p-3">
		<div class="flex items-center space-x-1">
			<!-- Text Formatting Group -->
			<div class="flex items-center rounded-md border">
				<Button
					variant={$formatState.bold ? 'secondary' : 'ghost'}
					size="sm"
					class="h-8 w-8 rounded-l-md rounded-r-none border-r p-0"
					onclick={() => handleFormat('bold')}
					title="Bold (Ctrl+B)"
				>
					<Bold class="h-4 w-4" />
				</Button>

				<Button
					variant={$formatState.italic ? 'secondary' : 'ghost'}
					size="sm"
					class="h-8 w-8 rounded-none border-r p-0"
					onclick={() => handleFormat('italic')}
					title="Italic (Ctrl+I)"
				>
					<Italic class="h-4 w-4" />
				</Button>

				<Button
					variant={$formatState.underline ? 'secondary' : 'ghost'}
					size="sm"
					class="h-8 w-8 rounded-l-none rounded-r-md p-0"
					onclick={() => handleFormat('underline')}
					title="Underline (Ctrl+U)"
				>
					<Underline class="h-4 w-4" />
				</Button>
			</div>

			<Separator orientation="vertical" class="h-6" />

			<!-- Headings Group -->
			<div class="flex items-center space-x-1">
				<Button
					variant={$formatState.heading === 'h1' ? 'secondary' : 'ghost'}
					size="sm"
					class="h-8 px-2 text-xs font-bold"
					onclick={() => handleHeading(1)}
					title="Heading 1"
				>
					H1
				</Button>
				<Button
					variant={$formatState.heading === 'h2' ? 'secondary' : 'ghost'}
					size="sm"
					class="h-8 px-2 text-xs font-bold"
					onclick={() => handleHeading(2)}
					title="Heading 2"
				>
					H2
				</Button>
				<Button
					variant={$formatState.heading === 'h3' ? 'secondary' : 'ghost'}
					size="sm"
					class="h-8 px-2 text-xs font-bold"
					onclick={() => handleHeading(3)}
					title="Heading 3"
				>
					H3
				</Button>
			</div>

			<Separator orientation="vertical" class="h-6" />

			<!-- Lists and Alignment -->
			<div class="flex items-center space-x-1">
				<Button
					variant={$formatState.listType === 'ul' ? 'secondary' : 'ghost'}
					size="sm"
					class="h-8 w-8 p-0"
					onclick={() => handleList('ul')}
					title="Bullet List"
				>
					<List class="h-4 w-4" />
				</Button>

				<Button
					variant={$formatState.listType === 'ol' ? 'secondary' : 'ghost'}
					size="sm"
					class="h-8 w-8 p-0"
					onclick={() => handleList('ol')}
					title="Numbered List"
				>
					<ListOrdered class="h-4 w-4" />
				</Button>

				<Button
					variant="ghost"
					size="sm"
					class="h-8 w-8 p-0"
					onclick={() => handleFormat('justifyLeft')}
					title="Align Left"
				>
					<AlignLeft class="h-4 w-4" />
				</Button>
			</div>

			<Separator orientation="vertical" class="h-6" />

			<!-- Insert Elements -->
			<div class="flex items-center space-x-1">
				<Button
					variant="ghost"
					size="sm"
					class="h-8 w-8 p-0"
					onclick={handleLink}
					title="Insert Link"
				>
					<LinkIcon class="h-4 w-4" />
				</Button>

				<Button
					variant="ghost"
					size="sm"
					class="h-8 w-8 p-0"
					onclick={handleImage}
					title="Insert Image"
				>
					<Image class="h-4 w-4" />
				</Button>

				<Button
					variant="ghost"
					size="sm"
					class="h-8 w-8 p-0"
					onclick={handleCode}
					title="Insert Code Block"
				>
					<Code class="h-4 w-4" />
				</Button>
			</div>
		</div>

		<!-- Right side actions -->
		<div class="flex items-center space-x-2">
			<Button variant="ghost" size="sm" class="h-8 w-8 p-0">
				<MoreHorizontal class="h-4 w-4" />
			</Button>
		</div>
	</div>
</div>
