<script lang="ts">
	import HomeNavbar from '$lib/components/navigation/home-navbar.svelte';
	let { children } = $props();
</script>

<HomeNavbar />

<main class="w-full overflow-y-scroll">
	{@render children?.()}
</main>
