<script lang="ts">
	import HomeNavbar from '$lib/components/navigation/home-navbar.svelte';
	import Footer from '$lib/components/app/footer.svelte';
	let { children, data } = $props();
</script>

<HomeNavbar user={data.user} isLoggedIn={!!data.user?.accessToken} />

<main class="w-full">
	{@render children?.()}
</main>

<Footer user={data.user} />
