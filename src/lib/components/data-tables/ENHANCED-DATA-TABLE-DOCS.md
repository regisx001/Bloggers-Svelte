# Enhanced Data Table System Documentation

## Overview

The Enhanced Data Table system is a powerful, flexible, and feature-rich table component built on top of TanStack Table for Svelte applications. It provides advanced functionality for data management, filtering, searching, bulk operations, and customizable actions.

## Table of Contents

1. [Architecture](#architecture)
2. [Quick Start](#quick-start)
3. [Core Components](#core-components)
4. [Configuration Options](#configuration-options)
5. [Actions System](#actions-system)
6. [Filtering & Search](#filtering--search)
7. [Bulk Operations](#bulk-operations)
8. [Customization](#customization)
9. [Examples](#examples)
10. [Best Practices](#best-practices)

## Architecture

The Enhanced Data Table system consists of three main components:

```
├── enhanced-data-table.svelte          # Main table component
├── enhanced-data-table-actions.svelte  # Row actions component
└── types.ts                           # TypeScript definitions
```

### Component Hierarchy

```
EnhancedDataTable
├── Header (title, description, actions)
├── Toolbar (search, filters, bulk actions)
├── Table (columns, rows, selection)
│   └── Row Actions (quick actions + dropdown)
└── Footer (pagination, row info)
```

## Quick Start

### Basic Implementation

```svelte
<script lang="ts">
	import EnhancedDataTable from '$lib/components/data-tables/enhanced-data-table.svelte';
	import type { ColumnDef } from '@tanstack/table-core';

	const columns: ColumnDef<User>[] = [
		{ accessorKey: 'name', header: 'Name' },
		{ accessorKey: 'email', header: 'Email' },
		{ accessorKey: 'role', header: 'Role' }
	];

	const data = [
		{ id: '1', name: 'John Doe', email: 'john@example.com', role: 'Admin' },
		{ id: '2', name: 'Jane Smith', email: 'jane@example.com', role: 'User' }
	];
</script>

<EnhancedDataTable
	title="User Management"
	description="Manage users and their permissions"
	{data}
	{columns}
	entityName="user"
/>
```

### Advanced Implementation

```svelte
<script lang="ts">
	import { Eye, Edit, Trash, Download } from '@lucide/svelte';
	import type {
		TableAction,
		FilterOption,
		QuickAction,
		ActionItem
	} from '$lib/components/data-tables/types.js';

	// Header actions
	const headerActions: TableAction[] = [
		{
			id: 'export',
			label: 'Export Data',
			icon: Download,
			variant: 'outline',
			action: (selectedRows, allData) => exportData(allData)
		}
	];

	// Bulk actions
	const bulkActions: TableAction[] = [
		{
			id: 'delete-selected',
			label: 'Delete Selected',
			icon: Trash,
			variant: 'destructive',
			requiresSelection: true,
			action: (selectedRows) => bulkDelete(selectedRows)
		}
	];

	// Status filter
	const statusFilter: FilterOption = {
		column: 'status',
		type: 'select',
		placeholder: 'Filter by status...',
		options: [
			{ label: 'Active', value: 'active' },
			{ label: 'Inactive', value: 'inactive' }
		]
	};

	// Row actions
	const getRowQuickActions = (row): QuickAction[] => [
		{
			id: 'view',
			icon: Eye,
			label: 'View',
			action: () => viewUser(row.original.id)
		}
	];

	const getRowDropdownActions = (row): ActionItem[] => [
		{
			id: 'edit',
			icon: Edit,
			label: 'Edit User',
			action: () => editUser(row.original.id)
		},
		{
			id: 'delete',
			icon: Trash,
			label: 'Delete User',
			action: () => deleteUser(row.original.id),
			variant: 'destructive'
		}
	];
</script>

<EnhancedDataTable
	title="Advanced User Management"
	description="Complete user management with advanced features"
	{data}
	{columns}
	entityName="user"
	deleteBatchAction="?/deleteUsers"
	primarySearchColumn="name"
	searchPlaceholder="Search users..."
	additionalFilters={[statusFilter]}
	{headerActions}
	{bulkActions}
	enableExport={true}
	enableRefresh={true}
	enableColumnVisibility={true}
	showRowNumbers={true}
>
	{#snippet customRowActions({ row })}
		<EnhancedDataTableActions
			entityId={row.original.id}
			entityName="user"
			entityData={row.original}
			quickActions={getRowQuickActions(row)}
			dropdownActions={getRowDropdownActions(row)}
			layout="horizontal"
			deleteAction="?/deleteUser"
		/>
	{/snippet}
</EnhancedDataTable>
```

## Core Components

### EnhancedDataTable

The main table component that handles data display, filtering, sorting, and pagination.

**Key Props:**

- `data`: Array of data objects
- `columns`: TanStack Table column definitions
- `entityName`: Name of the entity (for UI text)
- `title`: Table title
- `description`: Table description

### EnhancedDataTableActions

Handles row-level actions with quick buttons and dropdown menus.

**Key Props:**

- `entityId`: Unique identifier for the row
- `entityName`: Entity type name
- `quickActions`: Array of quick action buttons
- `dropdownActions`: Array of dropdown menu items
- `layout`: Action layout style

## Configuration Options

### Table Configuration

```typescript
interface EnhancedDataTableConfig {
	// Basic config
	entityName: string;
	deleteBatchAction?: string;
	pageSize?: number;
	emptyMessage?: string;

	// Header customization
	showHeader?: boolean;
	title?: string;
	description?: string;

	// Search and filtering
	enableSearch?: boolean;
	searchPlaceholder?: string;
	primarySearchColumn?: string;
	additionalFilters?: FilterOption[];

	// Actions and controls
	headerActions?: TableAction[];
	bulkActions?: TableAction[];
	enableColumnVisibility?: boolean;
	enableExport?: boolean;
	enableRefresh?: boolean;

	// Selection
	enableRowSelection?: boolean;
	enableSelectAll?: boolean;

	// Layout and styling
	stickyHeader?: boolean;
	compactMode?: boolean;
	showRowNumbers?: boolean;
	stripedRows?: boolean;
}
```

### Action Configuration

```typescript
interface TableAction {
	id: string;
	label: string;
	icon?: any;
	variant?: 'default' | 'destructive' | 'secondary' | 'outline';
	action: (selectedRows: Row<any>[], allData: any[]) => void;
	requiresSelection?: boolean;
	show?: boolean;
}

interface QuickAction {
	id: string;
	icon: any;
	label?: string;
	variant?: 'default' | 'destructive' | 'secondary' | 'outline' | 'ghost';
	action: (entityId: string, entityData?: any) => void;
	disabled?: boolean;
	show?: boolean;
}

interface ActionItem {
	id: string;
	label: string;
	icon?: any;
	variant?: 'default' | 'destructive' | 'secondary' | 'outline';
	action: (entityId: string, entityData?: any) => void;
	href?: string;
	disabled?: boolean;
	show?: boolean;
	separator?: boolean;
}
```

## Actions System

### Header Actions

Actions displayed in the table header, typically for global operations:

```typescript
const headerActions: TableAction[] = [
	{
		id: 'export',
		label: 'Export Data',
		icon: Download,
		variant: 'outline',
		action: (selectedRows, allData) => {
			// Export all data or selected rows
			exportData(allData);
		}
	},
	{
		id: 'refresh',
		label: 'Refresh',
		icon: RefreshCw,
		variant: 'outline',
		action: () => {
			// Refresh data
			window.location.reload();
		}
	}
];
```

### Bulk Actions

Actions that operate on selected rows:

```typescript
const bulkActions: TableAction[] = [
	{
		id: 'bulk-approve',
		label: 'Approve Selected',
		icon: Check,
		variant: 'outline',
		requiresSelection: true,
		action: (selectedRows) => {
			const ids = selectedRows.map((row) => row.original.id);
			bulkApprove(ids);
		}
	}
];
```

### Row Actions

Actions for individual rows, split into quick actions and dropdown items:

```typescript
// Quick actions (always visible)
const quickActions: QuickAction[] = [
	{
		id: 'view',
		icon: Eye,
		label: 'View',
		action: (entityId) => viewEntity(entityId)
	}
];

// Dropdown actions (in menu)
const dropdownActions: ActionItem[] = [
	{
		id: 'edit',
		icon: Edit,
		label: 'Edit',
		action: (entityId) => editEntity(entityId)
	},
	{
		id: 'separator',
		label: '',
		action: () => {},
		separator: true
	},
	{
		id: 'delete',
		icon: Trash,
		label: 'Delete',
		action: (entityId) => deleteEntity(entityId),
		variant: 'destructive'
	}
];
```

## Filtering & Search

### Primary Search

Search across a primary column (usually name or title):

```typescript
<EnhancedDataTable
  primarySearchColumn="title"
  searchPlaceholder="Search articles..."
  // ...
/>
```

### Additional Filters

Add dropdown filters for specific columns:

```typescript
const statusFilter: FilterOption = {
  column: 'status',
  type: 'select',
  placeholder: 'Filter by status...',
  options: [
    { label: 'Active', value: 'active' },
    { label: 'Inactive', value: 'inactive' }
  ]
};

const dateFilter: FilterOption = {
  column: 'createdAt',
  type: 'date',
  placeholder: 'Filter by date...'
};

<EnhancedDataTable
  additionalFilters={[statusFilter, dateFilter]}
  // ...
/>
```

## Bulk Operations

### Selection

The table automatically handles row selection when `enableRowSelection` is true:

```typescript
<EnhancedDataTable
  enableRowSelection={true}
  enableSelectAll={true}
  onSelectionChange={(selectedRows) => {
    console.log('Selected:', selectedRows);
  }}
  // ...
/>
```

### Bulk Actions

Define actions that work on multiple selected rows:

```typescript
const bulkActions: TableAction[] = [
	{
		id: 'bulk-delete',
		label: 'Delete Selected',
		icon: Trash,
		variant: 'destructive',
		requiresSelection: true,
		action: (selectedRows) => {
			const ids = selectedRows.map((row) => row.original.id);
			// Call your bulk delete API
			fetch('/api/bulk-delete', {
				method: 'POST',
				body: JSON.stringify({ ids }),
				headers: { 'Content-Type': 'application/json' }
			});
		}
	}
];
```

## Customization

### Custom Snippets

Override default UI with custom snippets:

```svelte
<EnhancedDataTable {data} {columns}>
	{#snippet customHeader({ table, selectedCount })}
		<div class="custom-header">
			<h1>My Custom Header</h1>
			<p>Selected: {selectedCount}</p>
		</div>
	{/snippet}

	{#snippet customEmptyState()}
		<div class="empty-state">
			<img src="/empty.svg" alt="No data" />
			<p>No items found</p>
		</div>
	{/snippet}

	{#snippet triggerAdd()}
		<Button onclick={() => addNew()}>
			<Plus /> Add New Item
		</Button>
	{/snippet}
</EnhancedDataTable>
```

### Styling Options

Control table appearance:

```typescript
<EnhancedDataTable
  compactMode={true}        // Smaller row height
  stripedRows={true}        // Alternating row colors
  stickyHeader={true}       // Header stays visible on scroll
  showRowNumbers={true}     // Show row numbers
  // ...
/>
```

## Examples

### Simple CRUD Table

```svelte
<script>
	const columns = [
		{ accessorKey: 'name', header: 'Name' },
		{ accessorKey: 'email', header: 'Email' },
		{ accessorKey: 'role', header: 'Role' }
	];

	const quickActions = (row) => [
		{
			id: 'edit',
			icon: Edit,
			action: () => edit(row.original.id)
		}
	];

	const dropdownActions = (row) => [
		{
			id: 'delete',
			icon: Trash,
			label: 'Delete',
			action: () => deleteUser(row.original.id),
			variant: 'destructive'
		}
	];
</script>

<EnhancedDataTable title="Users" {data} {columns} entityName="user">
	{#snippet customRowActions({ row })}
		<EnhancedDataTableActions
			entityId={row.original.id}
			entityName="user"
			quickActions={quickActions(row)}
			dropdownActions={dropdownActions(row)}
		/>
	{/snippet}
</EnhancedDataTable>
```

### Advanced Table with All Features

See the Articles Management example in the main file for a complete implementation with:

- Header and bulk actions
- Status filtering
- Conditional row actions
- Export functionality
- Custom styling

## Best Practices

### 1. Action Organization

- Use **quick actions** for most common operations (view, edit)
- Put destructive actions in the **dropdown menu**
- Group related actions together
- Use separators to organize menu items

### 2. Performance

- Implement server-side pagination for large datasets
- Use virtual scrolling for very large tables
- Debounce search input
- Memoize expensive column calculations

### 3. Accessibility

- Provide meaningful `aria-label` attributes
- Use proper semantic HTML
- Ensure keyboard navigation works
- Test with screen readers

### 4. User Experience

- Show loading states during operations
- Provide clear feedback for actions
- Use consistent iconography
- Handle empty states gracefully

### 5. Data Management

- Validate data before displaying
- Handle API errors gracefully
- Implement optimistic updates
- Cache frequently accessed data

### 6. Security

- Validate all user inputs
- Implement proper authorization
- Sanitize data before display
- Use CSRF protection for forms

## Migration from GenericDataTable

To migrate from the old GenericDataTable:

1. **Update imports**:

   ```typescript
   // Old
   import GenericDataTable from '$lib/components/data-tables/generic-data-table.svelte';

   // New
   import EnhancedDataTable from '$lib/components/data-tables/enhanced-data-table.svelte';
   import EnhancedDataTableActions from '$lib/components/data-tables/enhanced-data-table-actions.svelte';
   ```

2. **Update props**:

   ```typescript
   // Old
   <GenericDataTable
     filterColumn="title"
     filterPlaceholder="Search..."
   />

   // New
   <EnhancedDataTable
     primarySearchColumn="title"
     searchPlaceholder="Search..."
   />
   ```

3. **Replace custom actions**:

   ```svelte
   <!-- Old -->
   {
     id: 'actions',
     cell: ({ row }) => renderComponent(CustomActions, { row })
   }

   <!-- New -->
   {#snippet customRowActions({ row })}
     <EnhancedDataTableActions
       entityId={row.original.id}
       quickActions={getQuickActions(row)}
       dropdownActions={getDropdownActions(row)}
     />
   {/snippet}
   ```

## Troubleshooting

### Common Issues

1. **Actions not showing**: Check that action functions are properly defined and `show` property is not `false`
2. **Selection not working**: Ensure `enableRowSelection` is `true` and select column is included
3. **Filters not working**: Verify column names match between filter config and column definitions
4. **Styling issues**: Check that all required CSS classes are imported

### Debug Tips

- Use browser dev tools to inspect component props
- Check console for TypeScript errors
- Verify that all required dependencies are installed
- Test with minimal data first, then add complexity

---

For more examples and advanced usage, see the implementation in `/routes/(admin)/admin/articles/+page.svelte`.
