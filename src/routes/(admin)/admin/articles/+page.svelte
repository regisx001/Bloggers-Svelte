<script lang="ts">
	import type { PageProps } from './$types';
	import ServerDataTable from '$lib/components/data-tables/server-data-table.svelte';
	import EnhancedDataTableActions from '$lib/components/data-tables/enhanced-data-table-actions.svelte';
	import type { ColumnDef, Row } from '@tanstack/table-core';
	import { createRawSnippet, onMount } from 'svelte';
	let { data, form }: PageProps = $props();
	import { renderSnippet } from '$lib/components/ui/data-table/index.js';
	import DataTableCheckbox from '$lib/components/data-tables/data-table-checkbox.svelte';
	import { renderComponent } from '$lib/components/ui/data-table/index.js';
	import { Button, buttonVariants } from '$lib/components/ui/button/index.js';
	import { Input } from '$lib/components/ui/input';
	import { Plus, Eye, ThumbsUp, Trash, Download, RefreshCw } from '@lucide/svelte';
	import Ai from '@tabler/icons-svelte/icons/ai';
	import type {
		TableAction,
		FilterOption,
		ActionItem,
		QuickAction
	} from '$lib/components/data-tables/types.js';
	import { Badge, badgeVariants } from '$lib/components/ui/badge/index.js';
	import * as Avatar from '$lib/components/ui/avatar';
	import * as AlertDialog from '$lib/components/ui/alert-dialog';
	import { Label } from '$lib/components/ui/label/index.js';
	import { XIcon, Clock } from '@lucide/svelte';
	import { enhance } from '$app/forms';
	import { toast } from 'svelte-sonner';
	import TimeStamp from '$lib/components/time-stamp.svelte';
	import CircleCheckFilledIcon from '@tabler/icons-svelte/icons/circle-check-filled';
	import LoaderIcon from '@tabler/icons-svelte/icons/loader';
	import TagInput from '$lib/components/ui/tag-input/tag-input.svelte';
	import * as Select from '$lib/components/ui/select/index.js';
	import * as Tooltip from '$lib/components/ui/tooltip/index.js';
	import RichTextEditor from '$lib/components/editor/rich-text-editor.svelte';
	import { invalidateAll } from '$app/navigation';
	import { PUBLIC_BACKEND_URL } from '$env/static/public';

	import CheckIcon from '@lucide/svelte/icons/check';
	import ChevronsUpDownIcon from '@lucide/svelte/icons/chevrons-up-down';
	import CircleDashedX from '@tabler/icons-svelte/icons/circle-dashed-x';
	import { tick } from 'svelte';
	import * as Command from '$lib/components/ui/command/index.js';
	import * as Popover from '$lib/components/ui/popover/index.js';
	import { cn } from '$lib/utils.js';
	import { base } from '$app/paths';

	const columns: ColumnDef<Article>[] = [
		{
			id: 'select',
			header: ({ table }) =>
				renderComponent(DataTableCheckbox, {
					checked: table.getIsAllPageRowsSelected(),
					indeterminate: table.getIsSomePageRowsSelected() && !table.getIsAllPageRowsSelected(),
					onCheckedChange: (value) => table.toggleAllPageRowsSelected(!!value),
					'aria-label': 'Select all'
				}),
			cell: ({ row }) =>
				renderComponent(DataTableCheckbox, {
					checked: row.getIsSelected(),
					onCheckedChange: (value) => row.toggleSelected(!!value),
					'aria-label': 'Select row'
				}),
			enableSorting: false,
			enableHiding: false
		},
		{
			accessorKey: 'image',
			header: () => {
				const updatedAtHeaderSnippet = createRawSnippet(() => ({
					render: () => `<div class="">Image</div>`
				}));
				return renderSnippet(updatedAtHeaderSnippet, '');
			},
			cell: ({ row }) => {
				const imageCellSnippet = createRawSnippet(() => ({
					render: () =>
						row.original.featuredImage
							? `<a href="${row.original.featuredImage}" target="_blank" rel="noopener noreferrer">
								<div class="h-8 w-14 bg-cover bg-center cursor-pointer hover:opacity-80 transition-opacity" style="background-image: url('${row.original.featuredImage}');"></div>
							</a>`
							: `<div class="h-8 w-14 bg-gray-200 flex items-center justify-center text-gray-500 text-xs">No Image</div>`
				}));
				return renderSnippet(imageCellSnippet, '');
			},
			enableSorting: false
		},
		{
			accessorKey: 'title',
			header: 'Title',
			cell: ({ row }) => {
				// TODO: add tooltip Later
				return row.original.title.length > 20
					? row.original.title.slice(0, 20) + '...'
					: row.original.title;
			},
			enableSorting: true
		},
		{
			accessorKey: 'author',
			header: 'Author',
			cell: ({ row }) => {
				return renderSnippet(AuthorCellSnippet, { row });
			},
			enableSorting: false
		},
		{
			accessorKey: 'tags',
			header: 'Tags',
			cell: ({ row }) => {
				return renderSnippet(TagsCellSnippet, { row });
			},

			enableSorting: false
		},
		// DEPRECATED: WERE GOING TO TRY A DIFFRENT APPROCH WITH CATEGORIES
		// {
		// 	accessorKey: 'category',
		// 	header: 'Category',
		// 	cell: ({ row }) => {
		// 		return renderSnippet(CategoryCellSnippet, { row });
		// 	}
		// },
		{
			accessorKey: 'status',
			header: 'Status',
			cell: ({ row }) => {
				return renderSnippet(statusCellSnippet, { row });
			},
			enableSorting: true
		},
		{
			accessorKey: 'publishedAt',
			header: () => {
				const publishedAtHeaderSnippet = createRawSnippet(() => ({
					render: () => `<div class="">Published At</div>`
				}));
				return renderSnippet(publishedAtHeaderSnippet, '');
			},
			cell: ({ row }) => {
				return row.original?.publishedAt
					? renderComponent(TimeStamp, {
							date: row.original.publishedAt
						})
					: 'Not Published';
			},
			enableSorting: true
		},
		{
			accessorKey: 'createdAt',
			header: () => {
				const createdAtHeaderSnippet = createRawSnippet(() => ({
					render: () => `<div class="">Created At</div>`
				}));
				return renderSnippet(createdAtHeaderSnippet, '');
			},
			cell: ({ row }) => {
				return renderComponent(TimeStamp, {
					date: row.original.createdAt
				});
			},
			enableSorting: true
		}

		// {
		// 	accessorKey: 'updatedAt',
		// 	header: () => {
		// 		const updatedAtHeaderSnippet = createRawSnippet(() => ({
		// 			render: () => `<div class="">Updated At</div>`
		// 		}));
		// 		return renderSnippet(updatedAtHeaderSnippet, '');
		// 	},
		// 	cell: ({ row }) => {
		// 		return renderComponent(TimeStamp, {
		// 			date: row.original.updatedAt
		// 		});
		// 	}
		// }
	];

	// Enhanced Table Actions Configuration
	const headerActions: TableAction[] = [];

	const bulkActions: TableAction[] = [
		{
			id: 'approve-selected',
			label: 'Approve Selected',
			icon: ThumbsUp,
			variant: 'outline',
			requiresSelection: true,
			action: (selectedRows) => {
				handleBulkApprove(selectedRows);
			}
		},
		{
			id: 'archive-selected',
			label: 'Archive Selected',
			icon: Trash,
			variant: 'outline',
			requiresSelection: true,
			action: (selectedRows) => {
				handleBulkArchive(selectedRows);
			}
		}
	];

	const statusFilters: FilterOption = {
		column: 'status',
		type: 'select',
		placeholder: 'Filter by status...',
		serverParam: 'status',
		options: [
			{ label: 'Published', value: 'PUBLISHED' },
			{ label: 'Draft', value: 'DRAFT' },
			{ label: 'Approved', value: 'APPROVED' },
			{ label: 'Rejected', value: 'REJECTED' },
			{ label: 'Pending Review', value: 'PENDING_REVIEW' },
			{ label: 'Scheduled', value: 'SCHEDULED' },
			{ label: 'Archived', value: 'ARCHIVED' }
		]
	};

	// Row Actions Configuration
	const getRowQuickActions = (row: Row<Article>): QuickAction[] => {
		const article = row.original;
		return [
			{
				id: 'view',
				icon: Eye,
				label: 'View',
				action: () => window.open(`${base}/admin/articles/${article.id}`, '_blank')
			}
		];
	};

	const getRowDropdownActions = (row: Row<Article>): ActionItem[] => {
		const article = row.original;
		const actions: ActionItem[] = [];

		// Add conditional actions based on article status
		if (article.status !== 'APPROVED' && article.status !== 'PUBLISHED') {
			actions.push({
				id: 'analyse',
				icon: Ai,
				label: 'AI Analysis',
				formAction: '?/analyseArticle',
				formData: { articleId: article.id },
				variant: 'default',
				confirmDialog: {
					title: 'Analyse Article',
					description: `Are you sure you want to analyse "${article.title}"? This will make it available for publishing.`
				}
			});

			actions.push({
				id: 'approve',
				icon: ThumbsUp,
				label: 'Approve Article',
				formAction: '?/approveArticle',
				formData: { articleId: article.id },
				variant: 'default',
				confirmDialog: {
					title: 'Approve Article',
					description: `Are you sure you want to approve "${article.title}"? This will make it available for publishing.`
				}
			});
		}

		if (article.status === 'APPROVED' || article.status === 'PUBLISHED') {
			actions.push({
				id: 'reject',
				icon: CircleDashedX,
				label: 'Reject Article',
				formAction: '?/rejectArticle',
				formData: { articleId: article.id },
				variant: 'destructive',
				confirmDialog: {
					title: 'Reject Article',
					description: `Are you sure you want to reject "${article.title}"? This will prevent it from being published.`
				}
			});
		}

		actions.push(
			{
				id: 'copy-id',
				label: 'Copy Article ID',
				action: () => navigator.clipboard.writeText(article.id)
			},
			{
				id: 'edit',
				label: 'Edit Article',
				action: () => window.open(`${base}/admin/articles/${article.id}/edit`, '_blank')
			},
			{
				id: 'separator-1',
				label: '',
				action: () => {},
				separator: true
			}
		);

		return actions;
	};

	// Action Handlers
	const handleExportArticles = async () => {
		try {
			const response = await fetch(PUBLIC_BACKEND_URL + '/api/v1/admin/users/export', {
				method: 'GET',
				headers: {
					Authorization: 'Bearer ' + data.user?.accessToken
				}
			});

			if (!response.ok) {
				toast.error('Download failed: ' + response.statusText);
				return;
			}

			const blob = await response.blob();
			const url = window.URL.createObjectURL(blob);

			const a = document.createElement('a');
			a.href = url;
			a.download = 'articles.csv';
			document.body.appendChild(a);
			a.click();
			a.remove();
			window.URL.revokeObjectURL(url);
			toast.success('Successfully exported articles to CSV');
		} catch (error) {
			console.error('Export error:', error);
			toast.error('Failed to export articles data');
		}
	};

	const handleRefreshData = async () => {
		toast.info('Refreshing articles data...');
		try {
			await invalidateAll();
			toast.success('Data refreshed successfully');
		} catch (error) {
			toast.error('Failed to refresh data');
		}
	};

	const handleBulkApprove = (selectedRows: Row<Article>[]) => {
		const articleIds = selectedRows.map((row) => row.original.id);
		// Implement bulk approve logic here
		toast.success(`Approved ${articleIds.length} articles`);
	};

	const handleBulkArchive = (selectedRows: Row<Article>[]) => {
		const articleIds = selectedRows.map((row) => row.original.id);
		// Implement bulk archive logic here
		toast.success(`Archived ${articleIds.length} articles`);
	};

	const handleDeleteArticle = (articleId: string) => {
		// Implement delete logic here
		toast.success('Article deleted');
	};

	// Removed convertToCSV and downloadCSV functions since we're now using server-side export

	$effect(() => {
		if (form?.success) {
			if (form?.action === 'createArticle') {
				createDialogOpen = false;
				toast.success(form?.message || 'Article created successfully');
			} else if (form?.action === 'publish') {
				// This handles both approve and reject actions
				toast.success(form?.message || 'Article status updated successfully');
			} else if (form?.action === 'delete') {
				toast.success(form?.message || 'Article deleted successfully');
			} else {
				toast.success(form?.message || 'Action completed successfully');
			}
		} else if (form && !form.success && form.message) {
			toast.error(form?.message);
		}
	});

	let createDialogOpen = $state(false);

	let selectCategoryOpen = $state(false);
	let selectedCategory = $state('');
	let triggerRef = $state<HTMLButtonElement>(null!);

	// @ts-ignore
	const selectedValue = $derived(data?.categories.find((f) => f === selectedCategory));

	// We want to refocus the trigger button when the user selects
	// an item from the list so users can continue navigating the
	// rest of the form with the keyboard.
	function closeAndFocusTrigger() {
		selectCategoryOpen = false;
		tick().then(() => {
			triggerRef.focus();
		});
	}

	import { LineChart } from 'layerchart';
	import TrendingUpIcon from '@lucide/svelte/icons/trending-up';
	import { curveLinearClosed } from 'd3-shape';
	import { scaleBand } from 'd3-scale';
	import * as Chart from '$lib/components/ui/chart/index.js';
	import * as Card from '$lib/components/ui/card/index.js';

	const chartData01 = [
		{ month: 'January', desktop: 186 },
		{ month: 'February', desktop: 305 },
		{ month: 'March', desktop: 237 },
		{ month: 'April', desktop: 273 },
		{ month: 'May', desktop: 209 },
		{ month: 'June', desktop: 214 }
	];

	const chartConfig01 = {
		desktop: { label: 'Desktop', color: 'var(--chart-1)' }
	} satisfies Chart.ChartConfig;

	import { scaleUtc } from 'd3-scale';
	import { curveNatural } from 'd3-shape';
	import { Area, AreaChart, LinearGradient } from 'layerchart';

	const chartData02 = [
		{ date: new Date('2024-01-01'), desktop: 186, mobile: 80 },
		{ date: new Date('2024-02-01'), desktop: 305, mobile: 200 },
		{ date: new Date('2024-03-01'), desktop: 237, mobile: 120 },
		{ date: new Date('2024-04-01'), desktop: 73, mobile: 190 },
		{ date: new Date('2024-05-01'), desktop: 209, mobile: 130 },
		{ date: new Date('2024-06-01'), desktop: 214, mobile: 140 }
	];

	const chartConfig02 = {
		desktop: { label: 'Desktop', color: 'var(--chart-1)' },
		mobile: { label: 'Mobile', color: 'var(--chart-2)' }
	} satisfies Chart.ChartConfig;

	import { ArcChart, Text } from 'layerchart';

	const chartData03 = [{ browser: 'safari', visitors: 1260, color: 'var(--color-safari)' }];

	const chartConfig03 = {
		visitors: { label: 'Visitors' },
		safari: { label: 'Safari', color: 'var(--chart-2)' }
	} satisfies Chart.ChartConfig;

	const chartData04 = [
		{ date: new Date('2024-01-01'), desktop: 186 },
		{ date: new Date('2024-02-01'), desktop: 305 },
		{ date: new Date('2024-03-01'), desktop: 237 },
		{ date: new Date('2024-04-01'), desktop: 73 },
		{ date: new Date('2024-05-01'), desktop: 209 },
		{ date: new Date('2024-06-01'), desktop: 214 }
	];

	const chartConfig04 = {
		desktop: { label: 'Desktop', color: 'var(--chart-1)' }
	} satisfies Chart.ChartConfig;
</script>

<!-- <pre>
	{JSON.stringify(data.articles, null, 2)}
</pre> -->

{#snippet addArticle()}
	<AlertDialog.Root bind:open={createDialogOpen}>
		<AlertDialog.Trigger class={buttonVariants({ variant: 'outline' })}>
			<Plus />
			<span>Add Article</span>
		</AlertDialog.Trigger>
		<AlertDialog.Content class="sm:max-w-[750px]">
			<AlertDialog.Header>
				<AlertDialog.Title>Add Article</AlertDialog.Title>
				<AlertDialog.Description>Fill the nessesary fields :</AlertDialog.Description>
			</AlertDialog.Header>
			<form
				action="?/createArticle"
				method="post"
				enctype="multipart/form-data"
				use:enhance={() => {
					return async ({ result, update }) => {
						await update();
						if (result.type == 'success') {
							createDialogOpen = false;
						}
					};
				}}
			>
				<div class="grid gap-4 py-4">
					<div class="grid grid-cols-4 items-center gap-4">
						<Label for="title" class="text-right">Title*</Label>
						<Input id="title" name="title" value="" placeholder="title" class="col-span-3" />
					</div>

					<!-- DEPRECATED: WERE GOING TO TRY A DIFFRENT APPROCH WITH CATEGORIES -->

					<!-- <div class="grid grid-cols-4 items-center gap-4">
						<Label for="Category" class="text-right">Category</Label>

						<Popover.Root bind:open={selectCategoryOpen}>
							<Popover.Trigger bind:ref={triggerRef}>
								{#snippet child({ props })}
									<Button
										{...props}
										variant="outline"
										class="col-span-3 w-full justify-between"
										role="combobox"
										aria-expanded={selectCategoryOpen}
									>
										{selectedValue || 'Select a Category...'}
										<ChevronsUpDownIcon class="opacity-50" />
									</Button>
								{/snippet}
							</Popover.Trigger>
							<Popover.Content class="col-span-3 w-[500px] p-0">
								<Command.Root>
									<Command.Input placeholder="Search Category..." />
									<Command.List>
										<Command.Empty>No Category found.</Command.Empty>
										<Command.Group value="category">
											{#each data.categories || [] as category}
												<Command.Item
													class="cursor-pointer"
													value={category}
													onSelect={() => {
														selectedCategory = category;
														closeAndFocusTrigger();
													}}
												>
													<CheckIcon
														class={cn(selectedCategory !== category && 'text-transparent')}
													/>
													{category}
												</Command.Item>
											{/each}
										</Command.Group>
									</Command.List>
								</Command.Root>
							</Popover.Content>
						</Popover.Root>
						<input type="hidden" bind:value={selectedCategory} name="category" />
					</div> -->
					<div class="mb-8 grid h-96 grid-cols-4 items-center gap-4">
						<Label for="description" class="text-right">Content*</Label>
						<div class="relative col-span-4">
							<RichTextEditor name="content" class="col-span-4 max-h-96" />
						</div>
					</div>
					<div class="grid grid-cols-4 items-center gap-4">
						<Label for="image" class="text-right">Image</Label>
						<Input
							id="image"
							name="featuredImage"
							type="file"
							accept="image/*"
							class="col-span-3"
						/>
					</div>

					<div class="items-center gap-4">
						<TagInput name="tags" placeholder="add tags" />
					</div>
				</div>

				<AlertDialog.Footer>
					<Button type="submit">Save changes</Button>
				</AlertDialog.Footer>
			</form>
		</AlertDialog.Content>
	</AlertDialog.Root>
{/snippet}

<section class="flex-1 space-y-4 p-4 pt-6 md:p-8">
	<Card.Root class="grid grid-cols-3  border-0 bg-transparent p-0 shadow-none">
		<Card.Root>
			<Card.Header class="items-center">
				<Card.Title>Radar Chart</Card.Title>
				<Card.Description>Showing total visitors for the last 6 months</Card.Description>
			</Card.Header>
			<Card.Content class="flex-1">
				<Chart.Container config={chartConfig01} class="mx-auto aspect-square max-h-[200px]">
					<LineChart
						data={chartData01}
						series={[
							{
								key: 'desktop',
								label: 'Desktop',
								color: chartConfig01.desktop.color
							}
						]}
						radial
						x="month"
						xScale={scaleBand()}
						padding={12}
						props={{
							spline: {
								curve: curveLinearClosed,
								fill: 'var(--color-desktop)',
								fillOpacity: 0.6,
								stroke: '0',
								motion: 'tween'
							},
							xAxis: {
								tickLength: 0
							},
							yAxis: {
								format: () => ''
							},
							grid: {
								radialY: 'linear'
							},
							tooltip: {
								context: {
									mode: 'voronoi'
								}
							},
							highlight: {
								lines: false
							}
						}}
					>
						{#snippet tooltip()}
							<Chart.Tooltip />
						{/snippet}
					</LineChart>
				</Chart.Container>
			</Card.Content>
			<Card.Footer class="flex-col gap-2 text-sm">
				<div class="flex items-center gap-2 leading-none font-medium">
					Trending up by 5.2% this month <TrendingUpIcon class="size-4" />
				</div>
				<div class="text-muted-foreground flex items-center gap-2 leading-none">
					January - June 2024
				</div>
			</Card.Footer>
		</Card.Root>
		<Card.Root class="col-span-2 flex">
			<Card.Header>
				<Card.Title>Article Engagement</Card.Title>
				<Card.Description>Showing users commitment in the last 6 months</Card.Description>
			</Card.Header>
			<Card.Content>
				<Chart.Container config={chartConfig02} class="aspect-auto h-[200px] w-full">
					<AreaChart
						data={chartData02}
						x="date"
						xScale={scaleUtc()}
						yPadding={[0, 25]}
						series={[
							{
								key: 'mobile',
								label: 'Mobile',
								color: 'var(--color-mobile)'
							},
							{
								key: 'desktop',
								label: 'Desktop',
								color: 'var(--color-desktop)'
							}
						]}
						seriesLayout="stack"
						props={{
							area: {
								curve: curveNatural,
								'fill-opacity': 0.4,
								line: { class: 'stroke-1' },
								motion: 'tween'
							},
							xAxis: {
								format: (v: Date) => v.toLocaleDateString('en-US', { month: 'short' }),
								ticks: chartData01.length
							},
							yAxis: { format: () => '' }
						}}
					>
						{#snippet tooltip()}
							<Chart.Tooltip
								indicator="dot"
								labelFormatter={(v: Date) => {
									return v.toLocaleDateString('en-US', {
										month: 'long'
									});
								}}
							/>
						{/snippet}
						{#snippet marks({ series, getAreaProps })}
							{#each series as s, i (s.key)}
								<LinearGradient
									stops={[s.color ?? '', 'color-mix(in lch, ' + s.color + ' 10%, transparent)']}
									vertical
								>
									{#snippet children({ gradient })}
										<Area {...getAreaProps(s, i)} fill={gradient} />
									{/snippet}
								</LinearGradient>
							{/each}
						{/snippet}
					</AreaChart>
				</Chart.Container>
			</Card.Content>
			<Card.Footer>
				<div class="flex w-full items-start gap-2 text-sm">
					<div class="grid gap-2">
						<div class="flex items-center gap-2 leading-none font-medium">
							Users commitment up by 5.2% this month <TrendingUpIcon class="size-4" />
						</div>
						<div class="text-muted-foreground flex items-center gap-2 leading-none">
							January - June 2024
						</div>
					</div>
				</div>
			</Card.Footer>
		</Card.Root>
	</Card.Root>

	<Card.Root class="grid grid-cols-3  border-0 bg-transparent p-0 shadow-none">
		<Card.Root class="col-span-2 flex">
			<Card.Header>
				<Card.Title>Line Chart - Label</Card.Title>
				<Card.Description>Showing total visitors for the last 6 months</Card.Description>
			</Card.Header>
			<Card.Content>
				<Chart.Container config={chartConfig04} class="aspect-auto h-[200px] w-full">
					<LineChart
						points={{ r: 4 }}
						labels={{ offset: 12 }}
						data={chartData04}
						x="date"
						axis="x"
						xScale={scaleUtc()}
						series={[
							{
								key: 'desktop',
								label: 'Desktop',
								color: chartConfig04.desktop.color
							}
						]}
						props={{
							spline: { curve: curveNatural, motion: 'tween', strokeWidth: 2 },
							highlight: {
								points: {
									motion: 'none',
									r: 6
								}
							},
							xAxis: {
								format: (v: Date) => v.toLocaleDateString('en-US', { month: 'short' }),
								ticks: chartData04.length
							}
						}}
					>
						{#snippet tooltip()}
							<Chart.Tooltip
								labelFormatter={(v: Date) => {
									return v.toLocaleDateString('en-US', {
										month: 'long'
									});
								}}
								indicator="line"
							/>
						{/snippet}
					</LineChart>
				</Chart.Container>
			</Card.Content>
			<Card.Footer>
				<div class="flex w-full items-start gap-2 text-sm">
					<div class="grid gap-2">
						<div class="flex items-center gap-2 leading-none font-medium">
							Trending up by 5.2% this month <TrendingUpIcon class="size-4" />
						</div>
						<div class="text-muted-foreground flex items-center gap-2 leading-none">
							January - June 2024
						</div>
					</div>
				</div>
			</Card.Footer>
		</Card.Root>

		<Card.Root class="col-span-1 flex">
			<Card.Header class="items-center">
				<Card.Title>Radial Chart - Shape</Card.Title>
				<Card.Description>Showing total visitors for the last 6 months</Card.Description>
			</Card.Header>
			<Card.Content class="flex-1">
				<Chart.Container config={chartConfig03} class="mx-auto aspect-square max-h-[200px]">
					<ArcChart
						label="browser"
						value="visitors"
						outerRadius={88}
						innerRadius={66}
						trackOuterRadius={83}
						trackInnerRadius={72}
						padding={40}
						range={[90, -270]}
						maxValue={chartData03[0].visitors * 4}
						series={chartData03.map((d) => ({
							key: d.browser,
							color: d.color,
							data: [d]
						}))}
						props={{
							arc: { track: { fill: 'var(--muted)' }, motion: 'tween' },
							tooltip: { context: { hideDelay: 350 } }
						}}
						tooltip={false}
					>
						{#snippet belowMarks()}
							<circle cx="0" cy="0" r="80" class="fill-background" />
						{/snippet}
						{#snippet aboveMarks()}
							<Text
								value={String(chartData03[0].visitors)}
								textAnchor="middle"
								verticalAnchor="middle"
								class="fill-foreground text-4xl! font-bold"
								dy={3}
							/>
							<Text
								value="Visitors"
								textAnchor="middle"
								verticalAnchor="middle"
								class="fill-muted-foreground!"
								dy={22}
							/>
						{/snippet}
					</ArcChart>
				</Chart.Container>
			</Card.Content>
			<Card.Footer class="flex-col gap-2 text-sm">
				<div class="flex items-center gap-2 leading-none font-medium">
					Trending up by 5.2% this month <TrendingUpIcon class="size-4" />
				</div>
				<div class="text-muted-foreground flex items-center gap-2 leading-none">
					January - June 2024
				</div>
			</Card.Footer>
		</Card.Root>
	</Card.Root>
	<ServerDataTable
		title="Articles Management"
		description="Manage your blog articles, approve submissions, and track publishing status"
		data={data.articles?.content || []}
		{columns}
		entityName="article"
		deleteBatchAction="?/deleteArticlesBatch"
		enableServerSearch={true}
		searchParam="searchTerm"
		searchPlaceholder="Search articles by title..."
		enableServerSorting={true}
		sortParam="sort"
		additionalFilters={[statusFilters]}
		{bulkActions}
		enableColumnVisibility={true}
		showRowNumbers={true}
		stripedRows={true}
		onRefresh={handleRefreshData}
		onExport={handleExportArticles}
	>
		{#snippet triggerAdd()}
			{@render addArticle()}
		{/snippet}

		{#snippet customRowActions({ row })}
			<EnhancedDataTableActions
				entityId={row.original.id}
				entityName="article"
				entityData={row.original}
				quickActions={getRowQuickActions(row)}
				dropdownActions={getRowDropdownActions(row)}
				layout="horizontal"
				showDropdownTrigger={true}
				deleteAction="?/deleteArticle"
			/>
		{/snippet}
	</ServerDataTable>
</section>

{#snippet statusCellSnippet({ row }: { row: Row<Article> })}
	{#if row.original.status === 'PUBLISHED'}
		<Badge variant="outline" class="px-1.5 text-green-600 dark:text-green-400">
			<CircleCheckFilledIcon class="mr-1 fill-green-500 dark:fill-green-400" />
			Published
		</Badge>
	{:else if row.original.status === 'DRAFT'}
		<Badge variant="secondary" class="px-1.5 text-gray-500">Draft</Badge>
	{:else if row.original.status === 'APPROVED'}
		<Badge variant="outline" class="px-1.5 text-blue-600 dark:text-blue-400">
			<CheckIcon class="mr-1" />
			Approved
		</Badge>
	{:else if row.original.status === 'REJECTED'}
		<Badge variant="destructive" class="px-1.5"><XIcon /> Rejected</Badge>
	{:else if row.original.status === 'ARCHIVED'}
		<Badge variant="outline" class="text-muted-foreground px-1.5">Archived</Badge>
	{:else if row.original.status === 'DELETED'}
		<Badge variant="destructive" class="px-1.5">Deleted</Badge>
	{:else if row.original.status === 'PENDING_REVIEW'}
		<Badge variant="outline" class="px-1.5 text-yellow-600 dark:text-yellow-400">
			<Clock />
			Pending Review
		</Badge>
	{:else if row.original.status === 'SCHEDULED'}
		<Badge variant="outline" class="px-1.5 text-blue-600 dark:text-blue-400">Scheduled</Badge>
	{:else}
		<Badge variant="outline" class="text-muted-foreground px-1.5">
			<LoaderIcon class="mr-1" />
			{row.original.status}
		</Badge>
	{/if}
{/snippet}

{#snippet AuthorCellSnippet({ row }: { row: Row<Article> })}
	<div class="flex items-center gap-2">
		<Avatar.Root class="border-border/50 size-8 rounded-lg border">
			<Avatar.Image src={row.original.author.avatar} alt={row.original.author.username} />
			<Avatar.Fallback class="bg-muted text-muted-foreground rounded-lg text-sm font-medium">
				{row.original.author.username.slice(0, 2).toUpperCase()}
			</Avatar.Fallback>
		</Avatar.Root>
		<div class="flex flex-col">
			<span class="text-foreground text-sm font-medium">{row.original.author.username}</span>
			<span class="text-muted-foreground text-xs">Author</span>
		</div>
	</div>
{/snippet}

{#snippet TagsCellSnippet({ row }: { row: Row<Article> })}
	<div class="flex max-w-48 flex-wrap gap-1">
		{#if row.original.tags && row.original.tags.length > 0}
			{#each row.original.tags.slice(0, 2) as tag}
				<Badge variant="secondary" class="px-2 py-1 text-xs">
					{tag}
				</Badge>
			{/each}
			{#if row.original.tags.length > 2}
				<Tooltip.Root>
					<Tooltip.Trigger>
						<Badge variant="outline" class="cursor-help px-2 py-1 text-xs">
							+{row.original.tags.length - 2} more
						</Badge>
					</Tooltip.Trigger>
					<Tooltip.Content>
						<div class="flex max-w-64 flex-wrap gap-1">
							{#each row.original.tags.slice(2) as tag}
								<Badge variant="secondary" class="px-2 py-1 text-xs">
									{tag}
								</Badge>
							{/each}
						</div>
					</Tooltip.Content>
				</Tooltip.Root>
			{/if}
		{:else}
			<span class="text-muted-foreground text-xs italic">No tags</span>
		{/if}
	</div>
{/snippet}

{#snippet CategoryCellSnippet({ row }: { row: Row<Article> })}
	<div class="flex items-center gap-2">
		{#if row.original.category}
			{#if row.original.category.image}
				<div
					class="border-border/50 aspect-video h-full w-full rounded border bg-cover bg-center"
					style="background-image: url('{row.original.category.image}');"
					title={row.original.category.title}
				></div>
			{:else}
				<div
					class="bg-muted border-border/50 flex h-6 w-6 items-center justify-center rounded border"
				>
					<span class="text-muted-foreground text-xs font-medium">
						{row.original.category.title.charAt(0).toUpperCase()}
					</span>
				</div>
			{/if}
			<Badge variant="outline" class="px-2 py-1 text-xs font-medium">
				{row.original.category.title}
			</Badge>
		{:else}
			<Badge variant="secondary" class="text-muted-foreground px-2 py-1 text-xs">No Category</Badge>
		{/if}
	</div>
{/snippet}
