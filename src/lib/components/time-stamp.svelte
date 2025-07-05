<script lang="ts">
	import { onMount, onDestroy } from 'svelte';

	interface Props {
		date: string;
		updateInterval?: number; // in milliseconds, default 1000 (1 second)
		showTooltip?: boolean; // show full date on hover
	}

	let { date, updateInterval = 1000, showTooltip = true }: Props = $props();

	let relativeTime = $state('');
	let fullDate = $state('');
	let intervalId: ReturnType<typeof setInterval> | null = null;

	function formatRelativeTime(dateString: string): string {
		const now = new Date();
		const targetDate = new Date(dateString);
		const diffInSeconds = Math.floor((now.getTime() - targetDate.getTime()) / 1000);

		// Handle future dates
		if (diffInSeconds < 0) {
			const futureDiff = Math.abs(diffInSeconds);
			if (futureDiff < 60) return `in ${futureDiff}s`;
			if (futureDiff < 3600) return `in ${Math.floor(futureDiff / 60)}m`;
			if (futureDiff < 86400) return `in ${Math.floor(futureDiff / 3600)}h`;
			if (futureDiff < 2592000) return `in ${Math.floor(futureDiff / 86400)}d`;
			if (futureDiff < 31536000) return `in ${Math.floor(futureDiff / 2592000)}mo`;
			return `in ${Math.floor(futureDiff / 31536000)}y`;
		}

		// Past dates
		if (diffInSeconds < 60) {
			return diffInSeconds <= 1 ? 'just now' : `${diffInSeconds}s ago`;
		}

		const diffInMinutes = Math.floor(diffInSeconds / 60);
		if (diffInMinutes < 60) {
			return diffInMinutes === 1 ? '1 min ago' : `${diffInMinutes} mins ago`;
		}

		const diffInHours = Math.floor(diffInMinutes / 60);
		if (diffInHours < 24) {
			return diffInHours === 1 ? '1 hour ago' : `${diffInHours} hours ago`;
		}

		const diffInDays = Math.floor(diffInHours / 24);
		if (diffInDays < 30) {
			return diffInDays === 1 ? '1 day ago' : `${diffInDays} days ago`;
		}

		const diffInMonths = Math.floor(diffInDays / 30);
		if (diffInMonths < 12) {
			return diffInMonths === 1 ? '1 month ago' : `${diffInMonths} months ago`;
		}

		const diffInYears = Math.floor(diffInDays / 365);
		return diffInYears === 1 ? '1 year ago' : `${diffInYears} years ago`;
	}

	function formatFullDate(dateString: string): string {
		const targetDate = new Date(dateString);
		return targetDate.toLocaleString('en-US', {
			year: 'numeric',
			month: 'long',
			day: 'numeric',
			hour: '2-digit',
			minute: '2-digit',
			second: '2-digit',
			timeZoneName: 'short'
		});
	}

	function updateTime() {
		relativeTime = formatRelativeTime(date);
		if (showTooltip) {
			fullDate = formatFullDate(date);
		}
	}

	function startInterval() {
		// Update immediately
		updateTime();

		// Set up interval for updates
		intervalId = setInterval(updateTime, updateInterval);
	}

	function stopInterval() {
		if (intervalId) {
			clearInterval(intervalId);
			intervalId = null;
		}
	}

	// Start when component mounts
	onMount(() => {
		startInterval();
	});

	// Clean up when component unmounts
	onDestroy(() => {
		stopInterval();
	});

	// Restart interval when date or updateInterval changes
	$effect(() => {
		date; // Track date changes
		updateInterval; // Track interval changes

		stopInterval();
		startInterval();
	});
</script>

{#if showTooltip}
	<time
		datetime={date}
		title={fullDate}
		class="text-muted-foreground hover:text-foreground cursor-help transition-colors"
	>
		{relativeTime}
	</time>
{:else}
	<time datetime={date} class="text-muted-foreground">
		{relativeTime}
	</time>
{/if}

<style>
	time {
		font-variant-numeric: tabular-nums;
	}
</style>
