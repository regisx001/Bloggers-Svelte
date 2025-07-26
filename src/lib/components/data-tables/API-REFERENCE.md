# Enhanced Data Table API Reference

## Table of Contents

1. [EnhancedDataTable Component](#enhanceddatatable-component)
2. [EnhancedDataTableActions Component](#enhanceddatatableactions-component)
3. [Type Definitions](#type-definitions)
4. [Event Handlers](#event-handlers)
5. [Snippets](#snippets)
6. [Utility Functions](#utility-functions)

## EnhancedDataTable Component

### Props

#### Basic Configuration

| Prop                | Type                         | Default         | Description                             |
| ------------------- | ---------------------------- | --------------- | --------------------------------------- |
| `data`              | `TData[]`                    | **Required**    | Array of data objects to display        |
| `columns`           | `ColumnDef<TData, TValue>[]` | **Required**    | TanStack Table column definitions       |
| `entityName`        | `string`                     | **Required**    | Name of the entity (used in UI text)    |
| `deleteBatchAction` | `string`                     | `undefined`     | Form action for batch delete operations |
| `pageSize`          | `number`                     | `10`            | Number of rows per page                 |
| `emptyMessage`      | `string`                     | `'No results.'` | Message shown when no data              |

#### Header Configuration

| Prop          | Type      | Default     | Description                      |
| ------------- | --------- | ----------- | -------------------------------- |
| `showHeader`  | `boolean` | `true`      | Whether to show the table header |
| `title`       | `string`  | `undefined` | Table title                      |
| `description` | `string`  | `undefined` | Table description                |

#### Search and Filtering

| Prop                  | Type             | Default       | Description                         |
| --------------------- | ---------------- | ------------- | ----------------------------------- |
| `enableSearch`        | `boolean`        | `true`        | Enable primary search functionality |
| `searchPlaceholder`   | `string`         | `'Search...'` | Placeholder text for search input   |
| `primarySearchColumn` | `string`         | `'title'`     | Column to search in                 |
| `additionalFilters`   | `FilterOption[]` | `[]`          | Additional filter options           |

#### Actions and Controls

| Prop                     | Type            | Default | Description                    |
| ------------------------ | --------------- | ------- | ------------------------------ |
| `headerActions`          | `TableAction[]` | `[]`    | Actions displayed in header    |
| `bulkActions`            | `TableAction[]` | `[]`    | Actions for selected rows      |
| `enableColumnVisibility` | `boolean`       | `true`  | Enable column show/hide toggle |
| `enableExport`           | `boolean`       | `false` | Enable export functionality    |
| `enableRefresh`          | `boolean`       | `false` | Enable refresh button          |

#### Selection

| Prop                 | Type      | Default | Description                     |
| -------------------- | --------- | ------- | ------------------------------- |
| `enableRowSelection` | `boolean` | `true`  | Enable row selection checkboxes |
| `enableSelectAll`    | `boolean` | `true`  | Enable select all functionality |

#### Layout and Styling

| Prop             | Type      | Default | Description                     |
| ---------------- | --------- | ------- | ------------------------------- |
| `stickyHeader`   | `boolean` | `true`  | Keep header visible on scroll   |
| `compactMode`    | `boolean` | `false` | Reduce row height for more data |
| `showRowNumbers` | `boolean` | `false` | Show row numbers column         |
| `stripedRows`    | `boolean` | `false` | Alternate row background colors |

#### Pagination

| Prop             | Type      | Default | Description                 |
| ---------------- | --------- | ------- | --------------------------- |
| `showPagination` | `boolean` | `true`  | Show pagination controls    |
| `paginationInfo` | `boolean` | `true`  | Show pagination information |

#### Event Handlers

| Prop                | Type                                             | Description                        |
| ------------------- | ------------------------------------------------ | ---------------------------------- |
| `onRowClick`        | `(row: Row<TData>, event: MouseEvent) => void`   | Called when row is clicked         |
| `onSelectionChange` | `(selectedRows: Row<TData>[]) => void`           | Called when selection changes      |
| `onRefresh`         | `() => void`                                     | Called when refresh button clicked |
| `onExport`          | `(data: TData[], selectedData: TData[]) => void` | Called when export triggered       |

### Example Usage

```svelte
<EnhancedDataTable
	title="User Management"
	description="Manage system users and permissions"
	{data}
	{columns}
	entityName="user"
	deleteBatchAction="?/deleteUsers"
	primarySearchColumn="name"
	searchPlaceholder="Search users..."
	additionalFilters={[statusFilter, roleFilter]}
	headerActions={[exportAction, refreshAction]}
	bulkActions={[bulkDeleteAction, bulkActivateAction]}
	enableExport={true}
	enableRefresh={true}
	enableColumnVisibility={true}
	pageSize={25}
	showRowNumbers={true}
	stripedRows={true}
	onSelectionChange={(rows) => console.log('Selected:', rows)}
	onExport={handleExport}
	onRefresh={handleRefresh}
>
	{#snippet triggerAdd()}
		<Button onclick={openAddDialog}>
			<Plus /> Add User
		</Button>
	{/snippet}

	{#snippet customRowActions({ row })}
		<EnhancedDataTableActions
			entityId={row.original.id}
			entityName="user"
			quickActions={getQuickActions(row)}
			dropdownActions={getDropdownActions(row)}
		/>
	{/snippet}
</EnhancedDataTable>
```

## EnhancedDataTableActions Component

### Props

| Prop                  | Type                                      | Default        | Description                          |
| --------------------- | ----------------------------------------- | -------------- | ------------------------------------ |
| `entityId`            | `string`                                  | **Required**   | Unique identifier for the entity     |
| `entityName`          | `string`                                  | **Required**   | Human-readable entity name           |
| `entityData`          | `any`                                     | `undefined`    | Full entity data for complex actions |
| `deleteAction`        | `string`                                  | `undefined`    | Form action for delete operation     |
| `quickActions`        | `QuickAction[]`                           | `[]`           | Actions shown as buttons             |
| `dropdownActions`     | `ActionItem[]`                            | `[]`           | Actions shown in dropdown menu       |
| `showDelete`          | `boolean`                                 | `false`        | Show built-in delete action          |
| `showCopyId`          | `boolean`                                 | `false`        | Show built-in copy ID action         |
| `showViewDetails`     | `boolean`                                 | `false`        | Show built-in view details action    |
| `viewDetailsRoute`    | `string`                                  | `undefined`    | Route for view details action        |
| `layout`              | `'horizontal' \| 'vertical' \| 'compact'` | `'horizontal'` | Layout style                         |
| `showDropdownTrigger` | `boolean`                                 | `true`         | Show dropdown menu trigger           |

### Example Usage

```svelte
<EnhancedDataTableActions
	entityId={user.id}
	entityName="user"
	entityData={user}
	deleteAction="?/deleteUser"
	quickActions={[
		{
			id: 'edit',
			icon: Edit,
			label: 'Edit',
			action: () => editUser(user.id)
		}
	]}
	dropdownActions={[
		{
			id: 'activate',
			icon: Check,
			label: 'Activate User',
			action: () => activateUser(user.id),
			show: !user.active
		},
		{
			id: 'deactivate',
			icon: X,
			label: 'Deactivate User',
			action: () => deactivateUser(user.id),
			show: user.active,
			variant: 'destructive'
		}
	]}
	layout="horizontal"
	showDelete={true}
	showCopyId={true}
/>
```

## Type Definitions

### TableAction

```typescript
interface TableAction {
	id: string; // Unique identifier
	label: string; // Display text
	icon?: ComponentType; // Lucide icon component
	variant?: ButtonVariant; // Button style variant
	action: ActionHandler; // Function to execute
	requiresSelection?: boolean; // Requires selected rows
	show?: boolean; // Whether to show action
}

type ActionHandler = (selectedRows: Row<any>[], allData: any[]) => void;
type ButtonVariant = 'default' | 'destructive' | 'secondary' | 'outline';
```

### FilterOption

```typescript
interface FilterOption {
	column: string; // Column to filter
	placeholder: string; // Filter input placeholder
	type?: FilterType; // Filter input type
	options?: SelectOption[]; // Options for select filters
}

type FilterType = 'text' | 'select' | 'date';

interface SelectOption {
	value: string; // Option value
	label: string; // Option display text
}
```

### QuickAction

```typescript
interface QuickAction {
	id: string; // Unique identifier
	icon: ComponentType; // Lucide icon component (required)
	label?: string; // Optional tooltip text
	variant?: ButtonVariant; // Button style variant
	action: EntityActionHandler; // Function to execute
	disabled?: boolean; // Whether action is disabled
	show?: boolean; // Whether to show action
}

type EntityActionHandler = (entityId: string, entityData?: any) => void;
```

### ActionItem

```typescript
interface ActionItem {
	id: string; // Unique identifier
	label: string; // Display text
	icon?: ComponentType; // Optional icon
	variant?: ButtonVariant; // Style variant
	action: EntityActionHandler; // Function to execute
	href?: string; // Optional link URL
	disabled?: boolean; // Whether action is disabled
	show?: boolean; // Whether to show action
	separator?: boolean; // Whether this is a separator
}
```

### EnhancedActionsConfig

```typescript
interface EnhancedActionsConfig {
	entityId: string;
	entityName: string;
	entityData?: any;
	deleteAction?: string;
	quickActions?: QuickAction[];
	dropdownActions?: ActionItem[];
	showDelete?: boolean;
	showCopyId?: boolean;
	showViewDetails?: boolean;
	viewDetailsRoute?: string;
	layout?: 'horizontal' | 'vertical' | 'compact';
	showDropdownTrigger?: boolean;
}
```

## Event Handlers

### Row Selection Handler

```typescript
const onSelectionChange = (selectedRows: Row<TData>[]) => {
	console.log('Selected rows:', selectedRows);
	const selectedIds = selectedRows.map((row) => row.original.id);
	console.log('Selected IDs:', selectedIds);
};
```

### Export Handler

```typescript
const onExport = (allData: TData[], selectedData: TData[]) => {
	const dataToExport = selectedData.length > 0 ? selectedData : allData;

	// Convert to CSV
	const csv = convertToCSV(dataToExport);
	downloadCSV(csv, 'export.csv');

	// Or send to API
	fetch('/api/export', {
		method: 'POST',
		body: JSON.stringify({ data: dataToExport }),
		headers: { 'Content-Type': 'application/json' }
	});
};
```

### Row Click Handler

```typescript
const onRowClick = (row: Row<TData>, event: MouseEvent) => {
	// Prevent default action if clicking on interactive elements
	if ((event.target as HTMLElement).closest('button, a')) {
		return;
	}

	// Navigate to detail view
	goto(`/admin/users/${row.original.id}`);
};
```

## Snippets

### triggerAdd

Custom button for adding new entities:

```svelte
{#snippet triggerAdd()}
	<Button onclick={openCreateDialog} variant="outline">
		<Plus class="h-4 w-4" />
		Add New User
	</Button>
{/snippet}
```

### customHeader

Complete custom header replacement:

```svelte
{#snippet customHeader({ table, selectedCount })}
	<div class="custom-header">
		<div class="flex items-center justify-between">
			<div>
				<h1 class="text-2xl font-bold">Custom User Management</h1>
				<p class="text-muted-foreground">
					Total: {table.getRowCount()} users
					{#if selectedCount > 0}
						• Selected: {selectedCount}
					{/if}
				</p>
			</div>
			<div class="flex gap-2">
				<Button onclick={handleBulkImport}>
					<Upload class="h-4 w-4" />
					Import Users
				</Button>
				<Button onclick={openCreateDialog}>
					<Plus class="h-4 w-4" />
					Add User
				</Button>
			</div>
		</div>
	</div>
{/snippet}
```

### customToolbar

Additional toolbar content:

```svelte
{#snippet customToolbar({ table, selectedCount })}
	<div class="bg-muted flex items-center gap-4 rounded-lg p-4">
		<div class="flex items-center gap-2">
			<Calendar class="h-4 w-4" />
			<span class="text-sm">Last updated: {lastUpdated}</span>
		</div>

		{#if selectedCount > 0}
			<Badge variant="secondary">
				{selectedCount} selected
			</Badge>
		{/if}

		<div class="ml-auto">
			<Button onclick={handleAdvancedFilters} variant="outline" size="sm">
				<Filter class="h-4 w-4" />
				Advanced Filters
			</Button>
		</div>
	</div>
{/snippet}
```

### customEmptyState

Custom empty state with actions:

```svelte
{#snippet customEmptyState()}
	<div class="flex flex-col items-center justify-center py-12">
		<img src="/empty-state.svg" alt="No data" class="h-32 w-32 opacity-50" />
		<h3 class="mt-4 text-lg font-medium">No users found</h3>
		<p class="text-muted-foreground mt-2 max-w-sm text-center text-sm">
			Get started by creating your first user account or importing existing users.
		</p>
		<div class="mt-6 flex gap-2">
			<Button onclick={openCreateDialog}>
				<Plus class="h-4 w-4" />
				Create User
			</Button>
			<Button onclick={openImportDialog} variant="outline">
				<Upload class="h-4 w-4" />
				Import Users
			</Button>
		</div>
	</div>
{/snippet}
```

### customRowActions

Custom row actions with complex logic:

```svelte
{#snippet customRowActions({ row, rowIndex })}
	{@const user = row.original}

	<div class="flex items-center gap-1">
		<!-- Quick actions -->
		<Button onclick={() => viewUser(user.id)} variant="ghost" size="sm" class="h-8 w-8 p-0">
			<Eye class="h-4 w-4" />
		</Button>

		{#if canEdit(user)}
			<Button onclick={() => editUser(user.id)} variant="ghost" size="sm" class="h-8 w-8 p-0">
				<Edit class="h-4 w-4" />
			</Button>
		{/if}

		<!-- Dropdown menu -->
		<DropdownMenu.Root>
			<DropdownMenu.Trigger>
				{#snippet child({ props })}
					<Button {...props} variant="ghost" size="sm" class="h-8 w-8 p-0">
						<MoreHorizontal class="h-4 w-4" />
					</Button>
				{/snippet}
			</DropdownMenu.Trigger>
			<DropdownMenu.Content align="end">
				<DropdownMenu.Item onclick={() => copyUserId(user.id)}>
					<Copy class="h-4 w-4" />
					Copy ID
				</DropdownMenu.Item>

				{#if user.status === 'inactive'}
					<DropdownMenu.Item onclick={() => activateUser(user.id)}>
						<Check class="h-4 w-4" />
						Activate
					</DropdownMenu.Item>
				{:else}
					<DropdownMenu.Item onclick={() => deactivateUser(user.id)}>
						<X class="h-4 w-4" />
						Deactivate
					</DropdownMenu.Item>
				{/if}

				<DropdownMenu.Separator />

				{#if canDelete(user)}
					<DropdownMenu.Item
						onclick={() => deleteUser(user.id)}
						class="text-destructive focus:text-destructive"
					>
						<Trash class="h-4 w-4" />
						Delete
					</DropdownMenu.Item>
				{/if}
			</DropdownMenu.Content>
		</DropdownMenu.Root>
	</div>
{/snippet}
```

## Utility Functions

### CSV Export

```typescript
function convertToCSV<T>(data: T[]): string {
	if (data.length === 0) return '';

	const headers = Object.keys(data[0] as object);
	const csvHeaders = headers.join(',');

	const csvRows = data.map((row) =>
		headers
			.map((header) => {
				const value = (row as any)[header];
				// Escape quotes and wrap in quotes if contains comma or quote
				if (typeof value === 'string' && (value.includes(',') || value.includes('"'))) {
					return `"${value.replace(/"/g, '""')}"`;
				}
				return value;
			})
			.join(',')
	);

	return [csvHeaders, ...csvRows].join('\n');
}

function downloadCSV(csvContent: string, filename: string): void {
	const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
	const link = document.createElement('a');
	const url = URL.createObjectURL(blob);

	link.setAttribute('href', url);
	link.setAttribute('download', filename);
	link.style.visibility = 'hidden';

	document.body.appendChild(link);
	link.click();
	document.body.removeChild(link);
}
```

### Action Helpers

```typescript
function createBulkAction(
	id: string,
	label: string,
	icon: ComponentType,
	handler: (ids: string[]) => void,
	variant: ButtonVariant = 'outline'
): TableAction {
	return {
		id,
		label,
		icon,
		variant,
		requiresSelection: true,
		action: (selectedRows) => {
			const ids = selectedRows.map((row) => row.original.id);
			handler(ids);
		}
	};
}

function createQuickAction(
	id: string,
	icon: ComponentType,
	handler: (entityId: string) => void,
	label?: string
): QuickAction {
	return {
		id,
		icon,
		label,
		action: handler
	};
}

function createDropdownAction(
	id: string,
	label: string,
	handler: (entityId: string) => void,
	options: Partial<ActionItem> = {}
): ActionItem {
	return {
		id,
		label,
		action: handler,
		...options
	};
}
```

### Filter Helpers

```typescript
function createSelectFilter(
	column: string,
	placeholder: string,
	options: Array<{ label: string; value: string }>
): FilterOption {
	return {
		column,
		placeholder,
		type: 'select',
		options
	};
}

function createTextFilter(column: string, placeholder: string): FilterOption {
	return {
		column,
		placeholder,
		type: 'text'
	};
}

function createDateFilter(column: string, placeholder: string): FilterOption {
	return {
		column,
		placeholder,
		type: 'date'
	};
}
```

---

For complete examples and implementation details, refer to the [Enhanced Data Table Documentation](./ENHANCED-DATA-TABLE-DOCS.md).
