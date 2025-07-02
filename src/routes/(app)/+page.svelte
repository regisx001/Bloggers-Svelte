<script lang="ts">
	import { enhance } from '$app/forms';
	import type { PageProps } from './$types';
	let { data }: PageProps = $props();
</script>

<pre class="pre">
	<code>
		{JSON.stringify(data)}
	</code>
</pre>

Home page

<a href="/login">Login</a>
<a href="/register">Register</a>

<form action="/logout" method="post" use:enhance>
	<button type="submit">Logout</button>
</form>
