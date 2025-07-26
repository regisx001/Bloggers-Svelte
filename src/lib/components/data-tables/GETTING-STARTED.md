# Enhanced Data Table - Getting Started Guide

## Quick Setup (5 minutes)

### 1. Install Dependencies

The Enhanced Data Table system requires these dependencies (likely already installed):

```bash
npm install @tanstack/table-core lucide-svelte
# or
pnpm add @tanstack/table-core lucide-svelte
```

### 2. Basic Implementation

Create your first enhanced data table:

```svelte
<script lang="ts">
	import EnhancedDataTable from '$lib/components/data-tables/enhanced-data-table.svelte';
	import type { ColumnDef } from '@tanstack/table-core';

	// Define your data type
	interface User {
		id: string;
		name: string;
		email: string;
		role: string;
		status: 'active' | 'inactive';
	}

	// Sample data
	const data: User[] = [
		{ id: '1', name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'active' },
		{ id: '2', name: 'Jane Smith', email: 'jane@example.com', role: 'User', status: 'active' },
		{ id: '3', name: 'Bob Johnson', email: 'bob@example.com', role: 'User', status: 'inactive' }
	];

	// Define columns
	const columns: ColumnDef<User>[] = [
		{
			accessorKey: 'name',
			header: 'Name'
		},
		{
			accessorKey: 'email',
			header: 'Email'
		},
		{
			accessorKey: 'role',
			header: 'Role'
		},
		{
			accessorKey: 'status',
			header: 'Status',
			cell: ({ row }) => {
				const status = row.original.status;
				return `<span class="px-2 py-1 rounded text-xs ${
					status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
				}">${status}</span>`;
			}
		}
	];
</script>

<EnhancedDataTable
	title="User Management"
	description="Manage your application users"
	{data}
	{columns}
	entityName="user"
/>
```

That's it! You now have a fully functional enhanced data table with:

- ✅ Search functionality
- ✅ Column sorting
- ✅ Pagination
- ✅ Row selection
- ✅ Column visibility toggle

## Adding Actions (10 minutes)

### 1. Import Action Types

```svelte
<script lang="ts">
	import EnhancedDataTableActions from '$lib/components/data-tables/enhanced-data-table-actions.svelte';
	import type {
		TableAction,
		FilterOption,
		QuickAction,
		ActionItem
	} from '$lib/components/data-tables/types.js';
	import { Eye, Edit, Trash, Download, UserPlus } from '@lucide/svelte';
	// ... other imports
</script>
```

### 2. Define Header Actions

```svelte
<script lang="ts">
	// Header actions (global operations)
	const headerActions: TableAction[] = [
		{
			id: 'export-users',
			label: 'Export Users',
			icon: Download,
			variant: 'outline',
			action: (selectedRows, allData) => {
				// Export logic here
				console.log('Exporting:', allData);
			}
		}
	];
</script>
```

### 3. Define Bulk Actions

```svelte
<script lang="ts">
	// Bulk actions (for selected rows)
	const bulkActions: TableAction[] = [
		{
			id: 'activate-users',
			label: 'Activate Selected',
			icon: UserPlus,
			variant: 'outline',
			requiresSelection: true,
			action: (selectedRows) => {
				const userIds = selectedRows.map((row) => row.original.id);
				console.log('Activating users:', userIds);
			}
		},
		{
			id: 'delete-users',
			label: 'Delete Selected',
			icon: Trash,
			variant: 'destructive',
			requiresSelection: true,
			action: (selectedRows) => {
				const userIds = selectedRows.map((row) => row.original.id);
				console.log('Deleting users:', userIds);
			}
		}
	];
</script>
```

### 4. Define Row Actions

```svelte
<script lang="ts">
	// Quick actions (always visible buttons)
	const getRowQuickActions = (row): QuickAction[] => [
		{
			id: 'view',
			icon: Eye,
			label: 'View User',
			action: (userId) => {
				console.log('Viewing user:', userId);
				// Navigate to user detail page
			}
		}
	];

	// Dropdown actions (in menu)
	const getRowDropdownActions = (row): ActionItem[] => {
		const user = row.original;
		return [
			{
				id: 'edit',
				icon: Edit,
				label: 'Edit User',
				action: (userId) => {
					console.log('Editing user:', userId);
					// Open edit dialog or navigate to edit page
				}
			},
			{
				id: 'toggle-status',
				label: user.status === 'active' ? 'Deactivate' : 'Activate',
				action: (userId) => {
					console.log('Toggling status for user:', userId);
					// Toggle user status
				}
			},
			{
				id: 'separator-1',
				label: '',
				action: () => {},
				separator: true
			},
			{
				id: 'delete',
				icon: Trash,
				label: 'Delete User',
				action: (userId) => {
					console.log('Deleting user:', userId);
					// Delete user
				},
				variant: 'destructive'
			}
		];
	};
</script>
```

### 5. Update the Table

```svelte
<EnhancedDataTable
	title="User Management"
	description="Manage your application users"
	{data}
	{columns}
	entityName="user"
	{headerActions}
	{bulkActions}
	enableExport={true}
	enableRefresh={true}
>
	{#snippet customRowActions({ row })}
		<EnhancedDataTableActions
			entityId={row.original.id}
			entityName="user"
			entityData={row.original}
			quickActions={getRowQuickActions(row)}
			dropdownActions={getRowDropdownActions(row)}
			layout="horizontal"
		/>
	{/snippet}
</EnhancedDataTable>
```

## Adding Filters (5 minutes)

### 1. Define Filter Options

```svelte
<script lang="ts">
	// Status filter dropdown
	const statusFilter: FilterOption = {
		column: 'status',
		type: 'select',
		placeholder: 'Filter by status...',
		options: [
			{ label: 'Active', value: 'active' },
			{ label: 'Inactive', value: 'inactive' }
		]
	};

	// Role filter dropdown
	const roleFilter: FilterOption = {
		column: 'role',
		type: 'select',
		placeholder: 'Filter by role...',
		options: [
			{ label: 'Admin', value: 'Admin' },
			{ label: 'User', value: 'User' },
			{ label: 'Manager', value: 'Manager' }
		]
	};
</script>
```

### 2. Add to Table

```svelte
<EnhancedDataTable
	title="User Management"
	description="Manage your application users"
	{data}
	{columns}
	entityName="user"
	primarySearchColumn="name"
	searchPlaceholder="Search users by name..."
	additionalFilters={[statusFilter, roleFilter]}
	{headerActions}
	{bulkActions}
>
	<!-- ... rest of the configuration -->
</EnhancedDataTable>
```

## Adding Custom Features (10 minutes)

### 1. Add Button

```svelte
{#snippet triggerAdd()}
	<Button onclick={openCreateUserDialog} variant="outline">
		<UserPlus class="h-4 w-4" />
		Add User
	</Button>
{/snippet}
```

### 2. Custom Empty State

```svelte
{#snippet customEmptyState()}
	<div class="flex flex-col items-center py-12">
		<img src="/empty-users.svg" alt="No users" class="h-24 w-24 opacity-50" />
		<h3 class="mt-4 text-lg font-medium">No users found</h3>
		<p class="mt-2 text-sm text-gray-500">Get started by adding your first user.</p>
		<Button onclick={openCreateUserDialog} class="mt-4">
			<UserPlus class="h-4 w-4" />
			Add User
		</Button>
	</div>
{/snippet}
```

### 3. Custom Header

```svelte
{#snippet customHeader({ table, selectedCount })}
	<div class="mb-6 flex items-center justify-between">
		<div>
			<h1 class="text-2xl font-bold">Team Members</h1>
			<p class="text-gray-600">
				{table.getRowCount()} total users
				{#if selectedCount > 0}
					• {selectedCount} selected
				{/if}
			</p>
		</div>
		<div class="flex gap-2">
			<Button onclick={handleBulkImport} variant="outline">
				<Upload class="h-4 w-4" />
				Import
			</Button>
			<Button onclick={openCreateUserDialog}>
				<UserPlus class="h-4 w-4" />
				Add User
			</Button>
		</div>
	</div>
{/snippet}
```

## Complete Example

Here's a complete working example:

```svelte
<script lang="ts">
	import EnhancedDataTable from '$lib/components/data-tables/enhanced-data-table.svelte';
	import EnhancedDataTableActions from '$lib/components/data-tables/enhanced-data-table-actions.svelte';
	import type { ColumnDef } from '@tanstack/table-core';
	import type {
		TableAction,
		FilterOption,
		QuickAction,
		ActionItem
	} from '$lib/components/data-tables/types.js';
	import { Eye, Edit, Trash, Download, UserPlus, Upload } from '@lucide/svelte';
	import { Button } from '$lib/components/ui/button';
	import { Badge } from '$lib/components/ui/badge';

	interface User {
		id: string;
		name: string;
		email: string;
		role: string;
		status: 'active' | 'inactive';
		lastLogin: string;
	}

	const data: User[] = [
		{
			id: '1',
			name: 'John Doe',
			email: 'john@example.com',
			role: 'Admin',
			status: 'active',
			lastLogin: '2024-01-15'
		},
		{
			id: '2',
			name: 'Jane Smith',
			email: 'jane@example.com',
			role: 'User',
			status: 'active',
			lastLogin: '2024-01-14'
		},
		{
			id: '3',
			name: 'Bob Johnson',
			email: 'bob@example.com',
			role: 'User',
			status: 'inactive',
			lastLogin: '2024-01-10'
		}
	];

	const columns: ColumnDef<User>[] = [
		{ accessorKey: 'name', header: 'Name' },
		{ accessorKey: 'email', header: 'Email' },
		{ accessorKey: 'role', header: 'Role' },
		{
			accessorKey: 'status',
			header: 'Status',
			cell: ({ row }) => {
				const status = row.original.status;
				return status === 'active'
					? '<span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">Active</span>'
					: '<span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">Inactive</span>';
			}
		},
		{ accessorKey: 'lastLogin', header: 'Last Login' }
	];

	// Actions
	const headerActions: TableAction[] = [
		{
			id: 'export',
			label: 'Export Users',
			icon: Download,
			variant: 'outline',
			action: (selectedRows, allData) => {
				console.log('Exporting users...');
			}
		}
	];

	const bulkActions: TableAction[] = [
		{
			id: 'activate',
			label: 'Activate Selected',
			icon: UserPlus,
			variant: 'outline',
			requiresSelection: true,
			action: (selectedRows) => {
				console.log('Activating users...');
			}
		}
	];

	const statusFilter: FilterOption = {
		column: 'status',
		type: 'select',
		placeholder: 'Filter by status...',
		options: [
			{ label: 'Active', value: 'active' },
			{ label: 'Inactive', value: 'inactive' }
		]
	};

	const getRowQuickActions = (row): QuickAction[] => [
		{
			id: 'view',
			icon: Eye,
			label: 'View',
			action: (userId) => console.log('View user:', userId)
		}
	];

	const getRowDropdownActions = (row): ActionItem[] => [
		{
			id: 'edit',
			icon: Edit,
			label: 'Edit User',
			action: (userId) => console.log('Edit user:', userId)
		},
		{
			id: 'delete',
			icon: Trash,
			label: 'Delete User',
			action: (userId) => console.log('Delete user:', userId),
			variant: 'destructive'
		}
	];

	const openCreateUserDialog = () => {
		console.log('Opening create user dialog...');
	};
</script>

<div class="p-6">
	<EnhancedDataTable
		title="User Management"
		description="Manage your application users and their permissions"
		{data}
		{columns}
		entityName="user"
		primarySearchColumn="name"
		searchPlaceholder="Search users..."
		additionalFilters={[statusFilter]}
		{headerActions}
		{bulkActions}
		enableExport={true}
		enableRefresh={true}
		enableColumnVisibility={true}
		showRowNumbers={true}
		pageSize={10}
	>
		{#snippet triggerAdd()}
			<Button onclick={openCreateUserDialog} variant="outline">
				<UserPlus class="h-4 w-4" />
				Add User
			</Button>
		{/snippet}

		{#snippet customRowActions({ row })}
			<EnhancedDataTableActions
				entityId={row.original.id}
				entityName="user"
				entityData={row.original}
				quickActions={getRowQuickActions(row)}
				dropdownActions={getRowDropdownActions(row)}
				layout="horizontal"
			/>
		{/snippet}
	</EnhancedDataTable>
</div>
```

## Next Steps

Now that you have a working enhanced data table:

1. **Connect to Real Data**: Replace the sample data with your actual API data
2. **Implement Actions**: Add real functionality to your action handlers
3. **Customize Styling**: Adjust the appearance to match your design system
4. **Add Validation**: Add form validation for create/edit operations
5. **Error Handling**: Add proper error handling and loading states

## Common Patterns

### Loading State

```svelte
<script>
	let loading = $state(false);
	let data = $state([]);

	const loadData = async () => {
		loading = true;
		try {
			const response = await fetch('/api/users');
			data = await response.json();
		} finally {
			loading = false;
		}
	};
</script>

{#if loading}
	<div class="flex items-center justify-center p-8">
		<div class="border-primary h-8 w-8 animate-spin rounded-full border-b-2"></div>
	</div>
{:else}
	<EnhancedDataTable {data} {columns} />
{/if}
```

### Form Integration

```svelte
<script>
	let createDialogOpen = $state(false);

	const handleCreateUser = async (formData) => {
		const response = await fetch('/api/users', {
			method: 'POST',
			body: formData
		});

		if (response.ok) {
			createDialogOpen = false;
			await loadData(); // Refresh the table
		}
	};
</script>

{#snippet triggerAdd()}
	<Button onclick={() => (createDialogOpen = true)}>
		<UserPlus class="h-4 w-4" />
		Add User
	</Button>
{/snippet}

<!-- Create User Dialog -->
{#if createDialogOpen}
	<CreateUserDialog bind:open={createDialogOpen} onSubmit={handleCreateUser} />
{/if}
```

### Server Actions

```svelte
<script>
	const bulkActions: TableAction[] = [
		{
			id: 'delete-users',
			label: 'Delete Selected',
			icon: Trash,
			variant: 'destructive',
			requiresSelection: true,
			action: async (selectedRows) => {
				const userIds = selectedRows.map((row) => row.original.id);

				const response = await fetch('/api/users/bulk-delete', {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({ ids: userIds })
				});

				if (response.ok) {
					await loadData(); // Refresh table
					toast.success(`Deleted ${userIds.length} users`);
				} else {
					toast.error('Failed to delete users');
				}
			}
		}
	];
</script>
```

## Troubleshooting

### Common Issues

1. **Table not showing data**: Check that your `data` array is properly formatted and `columns` match your data structure
2. **Actions not working**: Ensure action functions are defined and properly passed to the component
3. **Filters not working**: Verify that filter column names match your data properties
4. **Styling issues**: Make sure all required CSS dependencies are imported

### Debug Tips

```svelte
<script>
	// Add debug logging
	$effect(() => {
		console.log('Table data:', data);
		console.log('Columns:', columns);
	});
</script>

<!-- Temporary debug view -->
<!-- <pre>{JSON.stringify(data, null, 2)}</pre> -->
```

---

You're now ready to build powerful data tables with the Enhanced Data Table system! For more advanced features and customization options, check out the [Complete Documentation](./ENHANCED-DATA-TABLE-DOCS.md) and [API Reference](./API-REFERENCE.md).
