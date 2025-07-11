<script lang="ts">
	import { page } from '$app/state';
	import HomeNavbar from '$lib/components/navigation/home-navbar.svelte';
	let { children, data } = $props();
</script>

<HomeNavbar user={data.user} isLoggedIn={!!data.user?.accessToken} />

<main class="w-full">
	{@render children?.()}
</main>
