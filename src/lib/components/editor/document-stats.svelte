<script lang="ts">
	import { BarChart3, Clock } from '@lucide/svelte';

	export let stats: {
		words: number;
		characters: number;
		charactersNoSpaces: number;
		readingTime: number;
		lines: number;
	};
	export let lastSaved: Date;
	export let hasUnsavedChanges: boolean;

	function formatTime(date: Date): string {
		return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
	}
</script>

<!-- Bottom Stats Bar -->
<div class="bg-muted/50 border-t px-8 py-3">
	<div class="text-muted-foreground flex items-center justify-between text-sm">
		<div class="flex items-center space-x-4">
			<span>{stats.words.toLocaleString()} words</span>
			<span>•</span>
			<span>{stats.characters.toLocaleString()} characters</span>
			<span>•</span>
			<span>{stats.readingTime} min read</span>
		</div>

		<div class="flex items-center space-x-4">
			<span>Line {stats.lines}</span>
			<button class="hover:text-foreground flex items-center space-x-1 transition-colors">
				<BarChart3 class="h-4 w-4" />
				<span>Analytics</span>
			</button>
		</div>
	</div>
</div>
