# Enhanced Data Table System

This document explains how to use the enhanced data table system that provides flexible customization for different use cases.

## Components Overview

### 1. EnhancedDataTable

Main data table component with extensive customization options.

### 2. EnhancedDataTableActions

Flexible actions component for row-level operations.

### 3. Types and Presets

Type definitions and common presets for quick setup.

## Basic Usage

```svelte
<script>
	import EnhancedDataTable from '$lib/components/data-tables/enhanced-data-table.svelte';
	import type { TableAction, FilterOption } from '$lib/components/data-tables/types';

	const columns = [
		// Your column definitions
	];

	const data = [
		// Your data array
	];
</script>

<EnhancedDataTable
	{columns}
	{data}
	entityName="user"
	title="Users Management"
	description="Manage your users"
/>
```

## Advanced Customization

### Header Actions

Actions that appear in the table header, always visible:

```javascript
const headerActions = [
	{
		id: 'export',
		label: 'Export All',
		icon: Download,
		variant: 'outline',
		action: (selectedRows, allData) => {
			// Export logic here
		}
	},
	{
		id: 'import',
		label: 'Import',
		icon: Upload,
		variant: 'outline',
		action: () => {
			// Import logic here
		}
	}
];
```

### Bulk Actions

Actions that appear when rows are selected:

```javascript
const bulkActions = [
	{
		id: 'bulk-delete',
		label: 'Delete Selected',
		icon: Trash,
		variant: 'destructive',
		requiresSelection: true,
		action: (selectedRows) => {
			const ids = selectedRows.map((row) => row.original.id);
			// Delete logic here
		}
	},
	{
		id: 'bulk-enable',
		label: 'Enable Selected',
		icon: CheckCircle,
		variant: 'default',
		requiresSelection: true,
		action: (selectedRows) => {
			// Enable logic here
		}
	}
];
```

### Additional Filters

Add custom filters beyond the main search:

```javascript
const additionalFilters = [
	{
		column: 'status',
		placeholder: 'Filter by status',
		type: 'select',
		options: [
			{ value: 'active', label: 'Active' },
			{ value: 'inactive', label: 'Inactive' }
		]
	},
	{
		column: 'role',
		placeholder: 'Filter by role',
		type: 'select',
		options: [
			{ value: 'admin', label: 'Admin' },
			{ value: 'user', label: 'User' }
		]
	}
];
```

### Row-Level Actions

Customize actions for each row:

```javascript
// In your column definition
{
	id: 'actions',
	header: 'Actions',
	cell: ({ row }) => {
		const quickActions = [
			{
				id: 'edit',
				icon: Edit,
				label: 'Edit',
				action: (entityId, entityData) => {
					// Edit logic
				}
			}
		];

		const dropdownActions = [
			{
				id: 'message',
				label: 'Send Message',
				icon: MessageSquare,
				action: (entityId, entityData) => {
					// Message logic
				}
			},
			{
				id: 'toggle-status',
				label: row.original.enabled ? 'Disable' : 'Enable',
				icon: row.original.enabled ? Lock : Unlock,
				action: (entityId, entityData) => {
					// Toggle logic
				}
			}
		];

		return renderComponent(EnhancedDataTableActions, {
			entityId: row.original.id,
			entityName: 'user',
			entityData: row.original,
			quickActions,
			dropdownActions,
			deleteAction: '?/deleteUser',
			layout: 'horizontal'
		});
	}
}
```

## Configuration Options

### EnhancedDataTable Props

| Prop                     | Type             | Default     | Description                   |
| ------------------------ | ---------------- | ----------- | ----------------------------- |
| `columns`                | `ColumnDef[]`    | required    | Table column definitions      |
| `data`                   | `TData[]`        | required    | Table data array              |
| `entityName`             | `string`         | required    | Entity name for actions       |
| `title`                  | `string`         | undefined   | Table title                   |
| `description`            | `string`         | undefined   | Table description             |
| `enableSearch`           | `boolean`        | true        | Enable search functionality   |
| `searchPlaceholder`      | `string`         | "Search..." | Search input placeholder      |
| `primarySearchColumn`    | `string`         | "title"     | Column to search in           |
| `additionalFilters`      | `FilterOption[]` | []          | Additional filter options     |
| `headerActions`          | `TableAction[]`  | []          | Actions in header             |
| `bulkActions`            | `TableAction[]`  | []          | Actions for selected rows     |
| `enableColumnVisibility` | `boolean`        | true        | Show column visibility toggle |
| `enableExport`           | `boolean`        | false       | Show export button            |
| `enableRefresh`          | `boolean`        | false       | Show refresh button           |
| `enableRowSelection`     | `boolean`        | true        | Enable row selection          |
| `stickyHeader`           | `boolean`        | true        | Make header sticky            |
| `compactMode`            | `boolean`        | false       | Compact row spacing           |
| `showRowNumbers`         | `boolean`        | false       | Show row numbers              |
| `stripedRows`            | `boolean`        | false       | Alternate row colors          |
| `pageSize`               | `number`         | 10          | Rows per page                 |

### EnhancedDataTableActions Props

| Prop               | Type                                      | Default      | Description              |
| ------------------ | ----------------------------------------- | ------------ | ------------------------ |
| `entityId`         | `string`                                  | required     | Entity ID                |
| `entityName`       | `string`                                  | required     | Entity name              |
| `entityData`       | `any`                                     | {}           | Full entity data         |
| `quickActions`     | `QuickAction[]`                           | []           | Quick action buttons     |
| `dropdownActions`  | `ActionItem[]`                            | []           | Dropdown menu actions    |
| `deleteAction`     | `string`                                  | undefined    | Delete form action       |
| `showDelete`       | `boolean`                                 | true         | Show delete button       |
| `showCopyId`       | `boolean`                                 | true         | Show copy ID action      |
| `showViewDetails`  | `boolean`                                 | false        | Show view details action |
| `viewDetailsRoute` | `string`                                  | undefined    | Details page route       |
| `layout`           | `'horizontal' \| 'vertical' \| 'compact'` | 'horizontal' | Layout style             |

## Event Handlers

```svelte
<EnhancedDataTable
	{columns}
	{data}
	entityName="user"
	onRowClick={(row, event) => {
		console.log('Row clicked:', row.original);
	}}
	onSelectionChange={(selectedRows) => {
		console.log('Selection changed:', selectedRows.length);
	}}
	onRefresh={() => {
		// Refresh data
	}}
	onExport={(allData, selectedData) => {
		// Export data
	}}
/>
```

## Custom Snippets

### Custom Header

```svelte
<EnhancedDataTable {columns} {data} entityName="user">
	{#snippet customHeader({ table, selectedCount })}
		<div class="flex items-center justify-between">
			<h1>Custom Header</h1>
			<div>Selected: {selectedCount}</div>
		</div>
	{/snippet}
</EnhancedDataTable>
```

### Custom Row Actions

```svelte
<EnhancedDataTable {columns} {data} entityName="user">
	{#snippet customRowActions({ row, rowIndex })}
		<div class="flex gap-2">
			<Button onclick={() => console.log('Custom action', row.original)}>Custom Action</Button>
		</div>
	{/snippet}
</EnhancedDataTable>
```

### Custom Empty State

```svelte
<EnhancedDataTable {columns} {data} entityName="user">
	{#snippet customEmptyState()}
		<div class="py-8 text-center">
			<img src="/empty-state.svg" alt="No data" class="mx-auto mb-4" />
			<h3 class="text-lg font-semibold">No users found</h3>
			<p class="text-muted-foreground">Get started by adding your first user.</p>
		</div>
	{/snippet}
</EnhancedDataTable>
```

## Using Type Presets

```javascript
import {
	CommonBulkActions,
	CommonFilters,
	CommonQuickActions
} from '$lib/components/data-tables/types';

// Use preset bulk actions
const bulkActions = [
	CommonBulkActions.delete((rows) => {
		// Delete logic
	}),
	CommonBulkActions.export((rows) => {
		// Export logic
	})
];

// Use preset filters
const additionalFilters = [
	CommonFilters.status([
		{ value: 'active', label: 'Active' },
		{ value: 'inactive', label: 'Inactive' }
	]),
	CommonFilters.role([
		{ value: 'admin', label: 'Admin' },
		{ value: 'user', label: 'User' }
	])
];
```

## Migration from Basic GenericDataTable

To migrate from the basic `GenericDataTable`:

1. Replace imports:

```javascript
// Old
import GenericDataTable from '$lib/components/data-tables/generic-data-table.svelte';

// New
import EnhancedDataTable from '$lib/components/data-tables/enhanced-data-table.svelte';
```

2. Update props:

```svelte
<!-- Old -->
<GenericDataTable
	{columns}
	{data}
	entityName="user"
	deleteBatchAction="?/deleteUsers"
	filterColumn="username"
	filterPlaceholder="Search users..."
>
	{#snippet triggerAdd()}
		<Button>Add User</Button>
	{/snippet}
</GenericDataTable>

<!-- New -->
<EnhancedDataTable
	{columns}
	{data}
	entityName="user"
	deleteBatchAction="?/deleteUsers"
	primarySearchColumn="username"
	searchPlaceholder="Search users..."
	title="Users Management"
	description="Manage user accounts and permissions"
>
	{#snippet triggerAdd()}
		<Button>Add User</Button>
	{/snippet}
</EnhancedDataTable>
```

3. Enhanced actions in columns:

```javascript
// Update your actions column to use EnhancedDataTableActions
{
	id: 'actions',
	header: 'Actions',
	cell: ({ row }) => {
		return renderComponent(EnhancedDataTableActions, {
			entityId: row.original.id,
			entityName: 'user',
			entityData: row.original,
			deleteAction: '?/deleteUser',
			quickActions: [
				// Define quick actions
			],
			dropdownActions: [
				// Define dropdown actions
			]
		});
	}
}
```

## Best Practices

1. **Performance**: For large datasets, consider implementing server-side pagination and filtering.

2. **Accessibility**: The components include proper ARIA labels and keyboard navigation.

3. **Responsive**: Tables are responsive and work well on mobile devices.

4. **Consistency**: Use the same action patterns across different tables in your application.

5. **Error Handling**: Implement proper error handling in your action functions.

6. **Loading States**: Show loading indicators during long-running operations.

7. **Feedback**: Provide user feedback (toasts, notifications) for actions.

## Examples

See the example files:

- `/src/routes/(admin)/admin/users/+page-enhanced-example.svelte` - Full implementation
- `/src/lib/components/data-tables/types.ts` - Type definitions and presets
