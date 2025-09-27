<script lang="ts">
	import type { PageProps } from './$types';
	import ServerDataTable from '$lib/components/data-tables/server-data-table.svelte';
	import EnhancedDataTableActions from '$lib/components/data-tables/enhanced-data-table-actions.svelte';
	import type { ColumnDef, Row } from '@tanstack/table-core';
	import type {
		ActionItem,
		QuickAction,
		TableAction,
		FilterOption
	} from '$lib/components/data-tables/types';
	import { createRawSnippet } from 'svelte';
	import { renderSnippet, renderComponent } from '$lib/components/ui/data-table/index.js';
	import DataTableCheckbox from '$lib/components/data-tables/data-table-checkbox.svelte';
	import { Button } from '$lib/components/ui/button/index.js';
	import { Input } from '$lib/components/ui/input';
	import { Badge } from '$lib/components/ui/badge/index.js';
	import * as Avatar from '$lib/components/ui/avatar';
	import * as AlertDialog from '$lib/components/ui/alert-dialog';
	import { Label } from '$lib/components/ui/label/index.js';
	import {
		Plus,
		Shield,
		Users,
		UserCheck,
		UserX,
		Crown,
		User,
		Edit,
		Lock,
		Unlock,
		Mail,
		MessageSquare,
		Settings,
		Download,
		Upload,
		FileText,
		Eye,
		Ban,
		CheckCircle
	} from '@lucide/svelte';
	import { enhance } from '$app/forms';
	import { toast } from 'svelte-sonner';
	import TimeStamp from '$lib/components/time-stamp.svelte';
	import { invalidate, invalidateAll } from '$app/navigation';
	import { PUBLIC_BACKEND_URL } from '$env/static/public';

	let { data, form }: PageProps = $props();

	// Handle form action results
	// $effect(() => {
	// 	if (form?.success) {
	// 		toast.success(form.message || 'Action completed successfully');
	// 	} else if (form?.message) {
	// 		toast.error(form.message);
	// 	}
	// });

	// Define columns for the users data table
	const columns: ColumnDef<any, any>[] = [
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
			id: 'user',
			header: 'User',
			cell: ({ row }) => {
				const userCellSnippet = createRawSnippet(() => ({
					render: () => `
						<div class="flex items-center gap-2">
							<img 
								src="${row.original.avatar}" 
								alt="${row.original.username}" 
								class="h-8 w-8 rounded-full object-cover"
								onerror="this.src='https://api.dicebear.com/9.x/avataaars/svg?seed=${row.original.username}'"
							/>
							<div class="flex flex-col">
								<span class="font-medium text-sm">${row.original.username}</span>
								<span class="text-xs text-muted-foreground">${row.original.email}</span>
							</div>
						</div>
					`
				}));
				return renderSnippet(userCellSnippet, '');
			},
			enableSorting: false
		},
		{
			accessorKey: 'username',
			header: 'Username',
			cell: ({ row }) => {
				return row.original.username;
			},
			enableSorting: true
		},
		{
			accessorKey: 'email',
			header: 'Email Address',
			cell: ({ row }) => {
				return row.original.email;
			},
			enableSorting: true
		},
		{
			id: 'roles',
			header: 'Roles',
			cell: ({ row }) => {
				const rolesCellSnippet = createRawSnippet(() => {
					const roles = row.original.roles || [];
					const roleColors = {
						ROLE_ADMIN: 'bg-red-100 text-red-800 border-red-200',
						ROLE_MODERATOR: 'bg-orange-100 text-orange-800 border-orange-200',
						ROLE_USER: 'bg-blue-100 text-blue-800 border-blue-200'
					};

					const rolesHtml = roles
						.map((role: string) => {
							const cleanRole = role.replace('ROLE_', '');
							const colorClass =
								roleColors[role as keyof typeof roleColors] ||
								'bg-gray-100 text-gray-800 border-gray-200';
							return `<span class="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-md border ${colorClass}">
							${cleanRole.charAt(0).toUpperCase() + cleanRole.slice(1).toLowerCase()}
						</span>`;
						})
						.join(' ');

					return {
						render: () => `<div class="flex flex-wrap gap-1">${rolesHtml}</div>`
					};
				});
				return renderSnippet(rolesCellSnippet, '');
			},
			filterFn: (row, id, value) => {
				// Custom filter function for array-based roles
				if (!value) return true;
				const roles = row.original.roles || [];
				return roles.includes(value);
			},
			enableSorting: false
		},
		{
			id: 'status',
			header: 'Status',
			cell: ({ row }) => {
				const statusCellSnippet = createRawSnippet(() => {
					const isEnabled = row.original.enabled;
					return {
						render: () => `
							<span class="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-md border ${
								isEnabled
									? 'bg-green-100 text-green-800 border-green-200'
									: 'bg-red-100 text-red-800 border-red-200'
							}">
								${isEnabled ? 'Active' : 'Disabled'}
							</span>
						`
					};
				});
				return renderSnippet(statusCellSnippet, '');
			},
			filterFn: (row, id, value) => {
				// Custom filter function for boolean enabled status
				if (!value) return true;
				const isEnabled = row.original.enabled;
				return String(isEnabled) === value;
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
		},
		{
			accessorKey: 'updatedAt',
			header: () => {
				const updatedAtHeaderSnippet = createRawSnippet(() => ({
					render: () => `<div class="">Last Updated</div>`
				}));
				return renderSnippet(updatedAtHeaderSnippet, '');
			},
			cell: ({ row }) => {
				return renderComponent(TimeStamp, {
					date: row.original.updatedAt
				});
			},
			enableSorting: true
		},
		{
			id: 'actions',
			header: 'Actions',
			cell: ({ row }) => {
				// Define quick actions for each user row
				const quickActions: QuickAction[] = [
					{
						id: 'edit',
						icon: Edit,
						label: 'Edit User',
						variant: 'ghost',
						href: `/admin/users/${row.original.id}/edit`
					}
				];

				// Define dropdown actions
				const dropdownActions: ActionItem[] = [
					{
						id: 'send-message',
						label: 'Send Message',
						icon: MessageSquare,
						formAction: '?/sendMessage',
						formData: { userId: row.original.id, email: row.original.email }
					},
					{
						id: 'toggle-status',
						label: row.original.enabled ? 'Disable User' : 'Enable User',
						icon: row.original.enabled ? Lock : Unlock,
						variant: row.original.enabled ? 'destructive' : 'default',
						formAction: row.original.enabled ? '?/disableUser' : '?/enableUser',
						formData: { userId: row.original.id },
						confirmDialog: {
							title: row.original.enabled ? 'Disable User' : 'Enable User',
							description: `Are you sure you want to ${row.original.enabled ? 'disable' : 'enable'} ${row.original.username}?`
						},
						separator: true
					},
					{
						id: 'view-profile',
						label: 'View Profile',
						icon: Eye,
						href: `/admin/users/${row.original.id}`
					},
					{
						id: 'view-activity',
						label: 'View Activity',
						icon: FileText,
						href: `/admin/users/${row.original.id}/activity`
					},
					{
						id: 'reset-password',
						label: 'Reset Password',
						icon: Lock,
						formAction: '?/resetPassword',
						formData: { userId: row.original.id },
						confirmDialog: {
							title: 'Reset Password',
							description: `Send password reset email to ${row.original.email}?`
						}
					},
					{
						id: 'promote-to-admin',
						label: 'Promote to Admin',
						icon: Crown,
						formAction: '?/promoteToAdmin',
						formData: { userId: row.original.id },
						hidden: row.original.roles?.includes('ROLE_ADMIN'),
						confirmDialog: {
							title: 'Promote User',
							description: `Grant administrator privileges to ${row.original.username}?`
						},
						variant: 'default'
					},

					{
						id: 'downgrade-to-user',
						label: 'Downgrade to User',
						icon: Crown,
						formAction: '?/downgradToUser',
						formData: { userId: row.original.id },
						hidden: row.original.roles?.includes('ROLE_USER'),
						confirmDialog: {
							title: 'Downgrade to User',
							description: `Downgrade to User privileges to ${row.original.username}?`
						},
						variant: 'default'
					}
				];

				return renderComponent(EnhancedDataTableActions, {
					entityId: row.original.id,
					entityName: 'user',
					entityData: row.original,
					deleteAction: '?/deleteUser',
					quickActions,
					dropdownActions,
					viewDetailsRoute: `/admin/users/${row.original.id}`,
					layout: 'horizontal'
				});
			},
			enableSorting: false
		}
	];

	// Define bulk actions for selected rows
	const bulkActions: TableAction[] = [
		{
			id: 'enable-users',
			label: 'Enable',
			icon: CheckCircle,
			variant: 'default',
			requiresSelection: true,
			formAction: '?/enableUsers',
			action: (selectedRows: Row<any>[]) => {
				// This will be handled by the form action instead
			}
		},
		{
			id: 'disable-users',
			label: 'Disable',
			icon: Ban,
			variant: 'destructive',
			requiresSelection: true,
			formAction: '?/disableUsers',
			action: (selectedRows: Row<any>[]) => {
				// This will be handled by the form action instead
			}
		},
		{
			id: 'send-notification',
			label: 'Send Notification',
			icon: Mail,
			variant: 'outline',
			requiresSelection: true,
			formAction: '?/sendNotification',
			action: (selectedRows: Row<any>[]) => {
				// This will be handled by the form action instead
			}
		}
	];

	// Define additional filters (all server-side now)
	const additionalFilters: FilterOption[] = [
		{
			column: 'roles',
			placeholder: 'Filter by role',
			type: 'select',
			serverParam: 'role',
			options: [
				{ value: 'ROLE_ADMIN', label: 'Admin' },
				{ value: 'ROLE_MODERATOR', label: 'Moderator' },
				{ value: 'ROLE_USER', label: 'User' }
			]
		},
		{
			column: 'status',
			placeholder: 'Filter by status',
			type: 'select',
			serverParam: 'enabled',
			options: [
				{ value: 'true', label: 'Active' },
				{ value: 'false', label: 'Disabled' }
			]
		}
	];

	// Form state for creating new users
	let isCreateDialogOpen = $state(false);
	let newUserForm = $state({
		username: '',
		email: '',
		role: 'ROLE_USER'
	});

	function handleCreateUser() {
		isCreateDialogOpen = true;
	}

	async function handleRefresh() {
		toast.info('Refreshing users data...');
		try {
			await invalidateAll();
			toast.success('Data refreshed successfully');
		} catch (error) {
			toast.error('Failed to refresh data');
		}
	}

	async function handleExport(allData: any[], selectedData: any[]) {
		try {
			const response = await fetch(PUBLIC_BACKEND_URL + '/api/v1/admin/users/export', {
				method: 'GET',
				headers: {
					Authorization: 'Bearer ' + data.user.accessToken
				}
			});

			if (!response.ok) {
				alert('Download failed: ' + response.statusText);
				return;
			}

			const blob = await response.blob();
			const url = window.URL.createObjectURL(blob);

			const a = document.createElement('a');
			a.href = url;
			a.download = 'users.csv';
			document.body.appendChild(a);
			a.click();
			a.remove();
			window.URL.revokeObjectURL(url);
			toast.success(`Successfully exported users to CSV`);
		} catch (error) {
			console.error('Export error:', error);
			toast.error('Failed to export users data');
		}
	}

	function handleSelectionChange(selectedRows: any[]) {
		console.log('Selection changed:', selectedRows.length, 'users selected');
	}

	// CHART RELATED
	import { PieChart } from 'layerchart';
	import * as Chart from '$lib/components/ui/chart/index.js';
	import * as Card from '$lib/components/ui/card/index.js';

	const userStatusChartData = [
		{ key: 'active', value: data.usersAnalytics.activeUsers, color: 'var(--chart-1)' },
		{ key: 'non-active', value: data.usersAnalytics.nonActiveUsers, color: 'var(--chart-2)' }
	];

	const userStatusChartConfig = {
		value: { label: 'Value' },
		active: { label: 'Active' },
		'non-active': { label: 'Non Active' }
	} satisfies Chart.ChartConfig;

	import { scaleUtc } from 'd3-scale';
	import { curveNatural } from 'd3-shape';
	import { Area, AreaChart, LinearGradient } from 'layerchart';
	import TrendingUpIcon from '@lucide/svelte/icons/trending-up';

	const chartData = [
		{ date: new Date('2024-01-01'), desktop: 186, mobile: 80 },
		{ date: new Date('2024-02-01'), desktop: 305, mobile: 200 },
		{ date: new Date('2024-03-01'), desktop: 237, mobile: 120 },
		{ date: new Date('2024-04-01'), desktop: 73, mobile: 190 },
		{ date: new Date('2024-05-01'), desktop: 209, mobile: 130 },
		{ date: new Date('2024-06-01'), desktop: 214, mobile: 140 }
	];

	const chartConfig = {
		desktop: { label: 'Desktop', color: 'var(--chart-1)' },
		mobile: { label: 'Mobile', color: 'var(--chart-2)' }
	} satisfies Chart.ChartConfig;
</script>

<svelte:head>
	<title>Users Management | Admin - Blog App</title>
	<meta
		name="description"
		content="Manage user accounts, roles, and permissions. View user activity and maintain platform security."
	/>
	<meta
		name="keywords"
		content="user management, admin panel, user roles, account administration"
	/>
	<meta property="og:title" content="Users Management | Admin - Blog App" />
	<meta
		property="og:description"
		content="Manage user accounts, roles, and permissions from the admin panel."
	/>
	<meta name="robots" content="noindex, nofollow" />
</svelte:head>

<div class="flex-1 space-y-4 p-4 pt-6 md:p-8">
	<Card.Root class="grid grid-cols-3  border-0 bg-transparent">
		<Card.Root class=" flex flex-col ">
			<Card.Header class="items-center">
				<Card.Title>Users Status</Card.Title>
			</Card.Header>
			<Card.Content class="flex-1">
				<Chart.Container config={userStatusChartConfig} class="mx-auto aspect-square max-h-[250px]">
					<PieChart
						data={userStatusChartData}
						key="key"
						value="value"
						cRange={userStatusChartData.map((d) => d.color)}
						c="color"
						props={{
							pie: {
								motion: 'tween'
							}
						}}
					>
						{#snippet tooltip()}
							<Chart.Tooltip hideLabel />
						{/snippet}
					</PieChart>
				</Chart.Container>
			</Card.Content>
			<Card.Footer class="flex-col gap-2 text-sm">
				<div class="text-muted-foreground leading-none">
					Showing total Users spllitted by Status
				</div>
			</Card.Footer>
		</Card.Root>
		<Card.Root class="col-span-2 flex">
			<Card.Header>
				<Card.Title>Users commitment</Card.Title>
				<Card.Description>Showing users commitment in the last 6 months</Card.Description>
			</Card.Header>
			<Card.Content>
				<Chart.Container config={chartConfig} class="aspect-auto h-[250px] w-full">
					<AreaChart
						data={chartData}
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
								ticks: chartData.length
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

	<!-- Stats Cards -->
	<div class="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
		<div class="bg-card text-card-foreground rounded-lg border shadow-sm">
			<div class="flex flex-row items-center justify-between space-y-0 p-6 pb-2">
				<h3 class="text-sm font-medium tracking-tight">Total Users</h3>
				<Users class="text-muted-foreground h-4 w-4" />
			</div>
			<div class="p-6 pt-0">
				<div class="text-2xl font-bold">{data.users?.totalElements || 0}</div>
				<p class="text-muted-foreground text-xs">Registered accounts</p>
			</div>
		</div>

		<div class="bg-card text-card-foreground rounded-lg border shadow-sm">
			<div class="flex flex-row items-center justify-between space-y-0 p-6 pb-2">
				<h3 class="text-sm font-medium tracking-tight">Active Users</h3>
				<UserCheck class="h-4 w-4 text-green-600" />
			</div>
			<div class="p-6 pt-0">
				<div class="text-2xl font-bold text-green-600">
					{data.users?.content?.filter((user) => user.enabled).length || 0}
				</div>
				<p class="text-muted-foreground text-xs">Currently active</p>
			</div>
		</div>

		<div class="bg-card text-card-foreground rounded-lg border shadow-sm">
			<div class="flex flex-row items-center justify-between space-y-0 p-6 pb-2">
				<h3 class="text-sm font-medium tracking-tight">Administrators</h3>
				<Crown class="h-4 w-4 text-red-600" />
			</div>
			<div class="p-6 pt-0">
				<div class="text-2xl font-bold text-red-600">
					{data.users?.content?.filter((user) => user.roles?.includes('ROLE_ADMIN')).length || 0}
				</div>
				<p class="text-muted-foreground text-xs">Admin accounts</p>
			</div>
		</div>

		<div class="bg-card text-card-foreground rounded-lg border shadow-sm">
			<div class="flex flex-row items-center justify-between space-y-0 p-6 pb-2">
				<h3 class="text-sm font-medium tracking-tight">Disabled Users</h3>
				<UserX class="h-4 w-4 text-red-600" />
			</div>
			<div class="p-6 pt-0">
				<div class="text-2xl font-bold text-red-600">
					{data.users?.content?.filter((user) => !user.enabled).length || 0}
				</div>
				<p class="text-muted-foreground text-xs">Inactive accounts</p>
			</div>
		</div>
	</div>

	<!-- Enhanced Data Table -->
	<div class="space-y-4">
		<ServerDataTable
			columns={columns as any}
			data={data.users?.content || []}
			entityName="user"
			deleteBatchAction="?/deleteBatchUsers"
			title="Users Management"
			description="Manage user accounts, roles, and permissions across the platform"
			{bulkActions}
			{additionalFilters}
			enableServerSearch={true}
			searchParam="searchTerms"
			searchPlaceholder="Search users..."
			enableServerSorting={true}
			sortParam="sort"
			enableColumnVisibility={true}
			showRowNumbers={true}
			stripedRows={true}
			onRefresh={handleRefresh}
			onExport={handleExport}
			onSelectionChange={handleSelectionChange}
		>
			{#snippet triggerAdd()}
				<Button onclick={handleCreateUser} class="flex items-center gap-2">
					<Plus class="h-4 w-4" />
					Add New User
				</Button>
			{/snippet}
		</ServerDataTable>
	</div>
</div>

<!-- Create User Dialog -->
<AlertDialog.Root bind:open={isCreateDialogOpen}>
	<AlertDialog.Content class="max-w-lg">
		<AlertDialog.Header>
			<AlertDialog.Title>Add New User</AlertDialog.Title>
			<AlertDialog.Description>
				Create a new user account with the specified details and role.
			</AlertDialog.Description>
		</AlertDialog.Header>

		<form
			method="POST"
			action="?/createUser"
			use:enhance={({ formElement, formData, action, cancel, submitter }) => {
				return async ({ result, update }) => {
					if (result.type === 'success') {
						isCreateDialogOpen = false;
						newUserForm = {
							username: '',
							email: '',
							role: 'ROLE_USER'
						};
					}
					await update();
				};
			}}
			class="space-y-4"
		>
			<div class="space-y-2">
				<Label for="username">Username</Label>
				<Input
					id="username"
					name="username"
					type="text"
					placeholder="Enter username"
					bind:value={newUserForm.username}
					required
				/>
			</div>

			<div class="space-y-2">
				<Label for="email">Email Address</Label>
				<Input
					id="email"
					name="email"
					type="email"
					placeholder="Enter email address"
					bind:value={newUserForm.email}
					required
				/>
			</div>

			<div class="space-y-2">
				<Label for="role">User Role</Label>
				<select
					id="role"
					name="role"
					bind:value={newUserForm.role}
					class="border-input bg-background placeholder:text-muted-foreground focus-visible:ring-ring flex h-9 w-full rounded-md border px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:ring-1 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
				>
					<option value="ROLE_USER">User</option>
					<option value="ROLE_MODERATOR">Moderator</option>
					<option value="ROLE_ADMIN">Administrator</option>
				</select>
			</div>

			<AlertDialog.Footer>
				<AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
				<Button type="submit">Create User</Button>
			</AlertDialog.Footer>
		</form>
	</AlertDialog.Content>
</AlertDialog.Root>
