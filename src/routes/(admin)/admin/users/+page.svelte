<script lang="ts">
	import type { PageProps } from './$types';
	import GenericDataTable from '$lib/components/data-tables/generic-data-table.svelte';
	import type { ColumnDef } from '@tanstack/table-core';
	import { createRawSnippet } from 'svelte';
	import { renderSnippet, renderComponent } from '$lib/components/ui/data-table/index.js';
	import DataTableCheckbox from '$lib/components/data-tables/data-table-checkbox.svelte';
	import GenericDataTableActions from '$lib/components/data-tables/generic-data-table-actions.svelte';
	import { Button } from '$lib/components/ui/button/index.js';
	import { Input } from '$lib/components/ui/input';
	import { Badge } from '$lib/components/ui/badge/index.js';
	import * as Avatar from '$lib/components/ui/avatar';
	import * as AlertDialog from '$lib/components/ui/alert-dialog';
	import { Label } from '$lib/components/ui/label/index.js';
	import { Plus, Shield, Users, UserCheck, UserX, Crown, User } from '@lucide/svelte';
	import { enhance } from '$app/forms';
	import { toast } from 'svelte-sonner';
	import TimeStamp from '$lib/components/time-stamp.svelte';

	let { data, form }: PageProps = $props();

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
			accessorKey: 'email',
			header: 'Email Address',
			cell: ({ row }) => {
				return row.original.email;
			}
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
			enableSorting: false
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
			}
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
			}
		},
		{
			id: 'actions',
			header: 'Actions',
			cell: ({ row }) => {
				return renderComponent(GenericDataTableActions, {
					entityId: row.original.id,
					entityName: 'user',
					deleteAction: '?/deleteUser'
				});
			},
			enableSorting: false
		}
	];

	// Form state for creating new users
	let isCreateDialogOpen = $state(false);
	let newUserForm = $state({
		username: '',
		email: '',
		role: 'ROLE_USER'
	});

	// Handle form effects (temporarily disabled for type safety)
	// $effect(() => {
	// 	if (form?.success) {
	// 		toast.success(form.message);
	// 		if (form.action === 'createUser') {
	// 			isCreateDialogOpen = false;
	// 			newUserForm = { username: '', email: '', role: 'ROLE_USER' };
	// 		}
	// 	} else if (form?.success === false) {
	// 		toast.error(form.message || 'An error occurred');
	// 	}
	// });

	function handleCreateUser() {
		isCreateDialogOpen = true;
	}
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
	<!-- Header Section -->
	<div class="flex items-center justify-between space-y-2">
		<div>
			<h2 class="text-3xl font-bold tracking-tight">Users Management</h2>
			<p class="text-muted-foreground">
				Manage user accounts, roles, and permissions across the platform
			</p>
		</div>
	</div>

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

	<!-- Data Table -->
	<div class="rounded-md border">
		<GenericDataTable
			columns={columns as any}
			data={data.users?.content || []}
			entityName="user"
			deleteBatchAction="?/deleteBatchUsers"
		>
			{#snippet triggerAdd()}
				<Button onclick={handleCreateUser} class="flex items-center gap-2">
					<Plus class="h-4 w-4" />
					Add New User
				</Button>
			{/snippet}
		</GenericDataTable>
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

		<form method="POST" action="?/createUser" use:enhance class="space-y-4">
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
