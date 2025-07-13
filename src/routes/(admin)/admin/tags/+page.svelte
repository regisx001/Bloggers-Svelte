<script lang="ts">
	import { BarChart } from 'layerchart';
	import TrendingUpIcon from '@lucide/svelte/icons/trending-up';
	import { scaleBand } from 'd3-scale';
	import * as Chart from '$lib/components/ui/chart/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import { cubicInOut } from 'svelte/easing';
	import { onMount } from 'svelte';

	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
	let chartData = $state<{ name: string; articlesCount: number }[]>([]);

	let chartConfig = {
		tag: { label: 'Tag', color: 'var(--chart-1)' }
	} satisfies Chart.ChartConfig;

	onMount(() => {
		if (data.tags?.content && Array.isArray(data.tags.content)) {
			chartData = data.tags?.content
				.map((tag) => ({
					name: tag.name,
					articlesCount: tag.articlesCount
				}))
				.slice(0, 10);
		}
	});
</script>

<!-- <pre>
    {JSON.stringify(chartData, null, 2)}
</pre> -->
<div class="w-[500px]">
	<Card.Root>
		<Card.Header>
			<Card.Title>Bar Chart - Horizontal</Card.Title>
			<Card.Description>January - June 2024</Card.Description>
		</Card.Header>
		<Card.Content>
			<Chart.Container config={chartConfig}>
				<BarChart
					data={chartData}
					orientation="horizontal"
					yScale={scaleBand().padding(0.25)}
					y="name"
					series={[{ key: 'articlesCount', label: 'Articles Count', color: chartConfig.tag.color }]}
					padding={{ left: 20 }}
					grid={false}
					rule={false}
					axis="y"
					props={{
						bars: {
							stroke: 'none',
							radius: 5,
							insets: {
								left: 24
							},
							rounded: 'all',
							initialWidth: 0,
							initialX: 0,
							motion: {
								x: { type: 'tween', duration: 500, easing: cubicInOut },
								width: { type: 'tween', duration: 500, easing: cubicInOut }
							}
						},
						highlight: { area: { fill: 'none' } },
						yAxis: { format: (d) => d.slice(0, 3) }
					}}
				>
					{#snippet tooltip()}
						<Chart.Tooltip />
					{/snippet}
				</BarChart>
			</Chart.Container>
		</Card.Content>
		<Card.Footer>
			<div class="flex w-full items-start gap-2 text-sm">
				<div class="grid gap-2">
					<div class="flex items-center gap-2 leading-none font-medium">
						Trending up by 5.2% this month <TrendingUpIcon class="size-4" />
					</div>
					<div class="text-muted-foreground flex items-center gap-2 leading-none">
						Showing total visitors for the last 6 months
					</div>
				</div>
			</div>
		</Card.Footer>
	</Card.Root>
</div>
