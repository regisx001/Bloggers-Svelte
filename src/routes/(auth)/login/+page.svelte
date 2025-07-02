<script lang="ts">
	import { Label } from '$lib/components/ui/label/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { base } from '$app/paths';
	import { enhance } from '$app/forms';
	import type { PageProps } from './$types';

	let { data, form }: PageProps = $props();

	const id = $props.id();
</script>

<svelte:head>
	<title>Login | Blog App</title>
	<meta
		name="description"
		content="Login to your Blog App account to access your dashboard and manage your posts."
	/>
</svelte:head>

<!-- TODO: VALIDATION MESSAGES -->
<form class="flex flex-col gap-6" method="post" use:enhance>
	<div class="flex flex-col items-center gap-2 text-center">
		<h1 class="text-2xl font-bold">Login to your account</h1>
		<p class="text-muted-foreground text-sm text-balance">
			Enter your username below to login to your account
		</p>
	</div>
	<div class="grid gap-6">
		<div class="grid gap-3">
			<Label for="username-{id}">username</Label>
			<Input
				name="username"
				id="username-{id}"
				type="username"
				placeholder="m@example.com"
				required
			/>
		</div>
		<div class="grid gap-3">
			<div class="flex items-center">
				<Label for="password-{id}">Password</Label>
				<a href="##" class="ml-auto text-sm underline-offset-4 hover:underline">
					Forgot your password?
				</a>
			</div>
			<Input name="password" id="password-{id}" placeholder="password" type="password" required />
		</div>
		<Button type="submit" class="w-full cursor-pointer">Login</Button>
		<div
			class="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t"
		>
			<span class="bg-background text-muted-foreground relative z-10 px-2"> Or continue with </span>
		</div>
		<Button variant="outline" class="w-full cursor-pointer">
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
				<path
					d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
					fill="currentColor"
				/>
			</svg>
			Login with GitHub
		</Button>
	</div>
	<div class="text-center text-sm">
		Don&apos;t have an account?
		<a href="{base}/register" class="underline underline-offset-4"> Sign up </a>
	</div>
</form>
