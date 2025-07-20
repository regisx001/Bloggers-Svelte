<script lang="ts">
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<pre class="pre">
    {JSON.stringify(data, null, 2)}
</pre>
