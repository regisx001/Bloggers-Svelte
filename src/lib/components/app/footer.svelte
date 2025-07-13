<script>
	import { enhance } from '$app/forms';
	import { Button } from '../ui/button';
	import { Separator } from '../ui/separator';

	let { user } = $props();
</script>

<footer class="border-t py-12">
	<div class="container mx-auto px-4">
		<div class="grid gap-8 md:grid-cols-4">
			<div class="space-y-4">
				<h3 class="text-lg font-semibold">Blog App</h3>
				<p class="text-muted-foreground text-sm">
					Sharing knowledge and inspiring developers worldwide.
				</p>
				<div class="flex space-x-2">
					{#if user}
						<Button variant="outline" size="sm" href="/admin">Dashboard</Button>
						<form action="/logout" method="post" use:enhance class="inline">
							<Button variant="ghost" size="sm" type="submit">Logout</Button>
						</form>
					{:else}
						<Button variant="outline" size="sm" href="/login">Login</Button>
						<Button size="sm" href="/register">Sign Up</Button>
					{/if}
				</div>
			</div>

			<div>
				<h4 class="mb-4 font-semibold">Categories</h4>
				<ul class="text-muted-foreground space-y-2 text-sm">
					<li>
						<Button variant="link" class="text-muted-foreground hover:text-foreground h-auto p-0"
							>Web Development</Button
						>
					</li>
					<li>
						<Button variant="link" class="text-muted-foreground hover:text-foreground h-auto p-0"
							>JavaScript</Button
						>
					</li>
					<li>
						<Button variant="link" class="text-muted-foreground hover:text-foreground h-auto p-0"
							>Backend</Button
						>
					</li>
					<li>
						<Button variant="link" class="text-muted-foreground hover:text-foreground h-auto p-0"
							>Design</Button
						>
					</li>
				</ul>
			</div>

			<div>
				<h4 class="mb-4 font-semibold">Resources</h4>
				<ul class="text-muted-foreground space-y-2 text-sm">
					<li>
						<Button variant="link" class="text-muted-foreground hover:text-foreground h-auto p-0"
							>Documentation</Button
						>
					</li>
					<li>
						<Button variant="link" class="text-muted-foreground hover:text-foreground h-auto p-0"
							>Tutorials</Button
						>
					</li>
					<li>
						<Button variant="link" class="text-muted-foreground hover:text-foreground h-auto p-0"
							>Community</Button
						>
					</li>
					<li>
						<Button variant="link" class="text-muted-foreground hover:text-foreground h-auto p-0"
							>Support</Button
						>
					</li>
				</ul>
			</div>

			<div>
				<h4 class="mb-4 font-semibold">Company</h4>
				<ul class="text-muted-foreground space-y-2 text-sm">
					<li>
						<Button variant="link" class="text-muted-foreground hover:text-foreground h-auto p-0"
							>About</Button
						>
					</li>
					<li>
						<Button variant="link" class="text-muted-foreground hover:text-foreground h-auto p-0"
							>Contact</Button
						>
					</li>
					<li>
						<Button variant="link" class="text-muted-foreground hover:text-foreground h-auto p-0"
							>Privacy</Button
						>
					</li>
					<li>
						<Button variant="link" class="text-muted-foreground hover:text-foreground h-auto p-0"
							>Terms</Button
						>
					</li>
				</ul>
			</div>
		</div>

		<Separator class="my-8" />

		<div class="flex flex-col items-center justify-between space-y-4 sm:flex-row sm:space-y-0">
			<p class="text-muted-foreground text-sm">© 2025 Blog App. All rights reserved.</p>
			<p class="text-muted-foreground text-sm">Made with ❤️ using SvelteKit</p>
		</div>
	</div>
</footer>
