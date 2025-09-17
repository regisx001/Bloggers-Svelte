<script lang="ts">
	import HomeNavbar from '$lib/components/navigation/home-navbar.svelte';
	import Footer from '$lib/components/app/footer.svelte';
	import ResizableChat from '$lib/components/chatLayout/resizable-chat.svelte';
	let { children, data } = $props();

	// Chat state
	let isChatVisible = $state(false);
</script>

<HomeNavbar user={data.user} isLoggedIn={!!data.user?.accessToken} />

<!-- Main layout with resizable chat -->
{#if isChatVisible}
	<!-- Resizable layout when chat is open -->
	<div class="flex h-[calc(100vh-64px)]">
		<!-- Adjust height based on your navbar height -->
		<main class="flex-1 overflow-auto">
			{@render children?.()}
			<Footer user={data.user} />
		</main>
		<!-- <ResizableChat bind:isVisible={isChatVisible} user={data.user} /> -->
	</div>
{:else}
	<!-- Full width layout when chat is closed -->
	<main class="w-full">
		{@render children?.()}
		<!-- <ResizableChat bind:isVisible={isChatVisible} user={data.user} /> -->
	</main>
	<Footer user={data.user} />
{/if}
