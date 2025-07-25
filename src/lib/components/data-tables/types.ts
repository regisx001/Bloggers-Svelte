import type { ComponentType } from 'svelte';
import type { Row } from '@tanstack/table-core';

// Enhanced Data Table Types
export interface TableAction {
	id: string;
	label: string;
	icon?: any; // ComponentType or Lucide icon component
	variant?: 'default' | 'destructive' | 'secondary' | 'outline';
	action: (selectedRows: Row<any>[], allData: any[]) => void;
	requiresSelection?: boolean;
	show?: boolean;
}

export interface FilterOption {
	column: string;
	placeholder: string;
	type?: 'text' | 'select' | 'date';
	options?: Array<{ value: string; label: string }>;
}

export interface EnhancedDataTableConfig {
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
	
	// Pagination
	showPagination?: boolean;
	paginationInfo?: boolean;
}

// Enhanced Data Table Actions Types
export interface ActionItem {
	id: string;
	label: string;
	icon?: any; // ComponentType or Lucide icon component
	variant?: 'default' | 'destructive' | 'secondary' | 'outline';
	action: (entityId: string, entityData?: any) => void;
	href?: string;
	disabled?: boolean;
	show?: boolean;
	separator?: boolean;
}

export interface QuickAction {
	id: string;
	icon: any; // ComponentType or Lucide icon component
	label?: string;
	variant?: 'default' | 'destructive' | 'secondary' | 'outline' | 'ghost';
	action: (entityId: string, entityData?: any) => void;
	disabled?: boolean;
	show?: boolean;
}

export interface EnhancedActionsConfig {
	entityId: string;
	entityName: string;
	entityData?: any;
	deleteAction?: string;
	
	// Quick actions (shown as buttons)
	quickActions?: QuickAction[];
	
	// Dropdown menu actions
	dropdownActions?: ActionItem[];
	
	// Built-in actions control
	showDelete?: boolean;
	showCopyId?: boolean;
	showViewDetails?: boolean;
	viewDetailsRoute?: string;
	
	// Layout options
	layout?: 'horizontal' | 'vertical' | 'compact';
	showDropdownTrigger?: boolean;
}

// Common Action Presets - Note: Import actual icon components before using
// Example usage:
// import { Edit, Eye, Copy } from '@lucide/svelte';
// const editAction = CommonQuickActions.edit(Edit, (id, data) => { ... });

export const CommonQuickActions = {
	edit: (icon: any, action: (id: string, data?: any) => void): QuickAction => ({
		id: 'edit',
		icon,
		label: 'Edit',
		variant: 'ghost',
		action
	}),
	
	view: (icon: any, action: (id: string, data?: any) => void): QuickAction => ({
		id: 'view',
		icon,
		label: 'View',
		variant: 'ghost',
		action
	}),
	
	clone: (icon: any, action: (id: string, data?: any) => void): QuickAction => ({
		id: 'clone',
		icon,
		label: 'Clone',
		variant: 'ghost',
		action
	})
};

export const CommonDropdownActions = {
	sendMessage: (icon: any, action: (id: string, data?: any) => void): ActionItem => ({
		id: 'send-message',
		label: 'Send Message',
		icon,
		action
	}),
	
	exportData: (icon: any, action: (id: string, data?: any) => void): ActionItem => ({
		id: 'export',
		label: 'Export Data',
		icon,
		action
	}),
	
	viewHistory: (icon: any, action: (id: string, data?: any) => void): ActionItem => ({
		id: 'view-history',
		label: 'View History',
		icon,
		action
	}),
	
	toggleStatus: (
		isActive: boolean,
		activeIcon: any,
		inactiveIcon: any,
		action: (id: string, data?: any) => void
	): ActionItem => ({
		id: 'toggle-status',
		label: isActive ? 'Deactivate' : 'Activate',
		icon: isActive ? activeIcon : inactiveIcon,
		variant: isActive ? 'destructive' : 'default',
		action,
		separator: true
	})
};

// Bulk Action Presets
export const CommonBulkActions = {
	delete: (icon: any, action: (rows: Row<any>[]) => void): TableAction => ({
		id: 'bulk-delete',
		label: 'Delete Selected',
		icon,
		variant: 'destructive',
		requiresSelection: true,
		action
	}),
	
	export: (icon: any, action: (rows: Row<any>[]) => void): TableAction => ({
		id: 'bulk-export',
		label: 'Export Selected',
		icon,
		variant: 'outline',
		requiresSelection: true,
		action
	}),
	
	archive: (icon: any, action: (rows: Row<any>[]) => void): TableAction => ({
		id: 'bulk-archive',
		label: 'Archive Selected',
		icon,
		variant: 'outline',
		requiresSelection: true,
		action
	}),
	
	updateStatus: (
		status: string,
		icon: any,
		action: (rows: Row<any>[]) => void
	): TableAction => ({
		id: `bulk-update-${status}`,
		label: `Mark as ${status}`,
		icon,
		variant: 'default',
		requiresSelection: true,
		action
	})
};

// Filter Presets
export const CommonFilters = {
	status: (options: Array<{ value: string; label: string }>): FilterOption => ({
		column: 'status',
		placeholder: 'Filter by status',
		type: 'select',
		options
	}),
	
	role: (options: Array<{ value: string; label: string }>): FilterOption => ({
		column: 'role',
		placeholder: 'Filter by role',
		type: 'select',
		options
	}),
	
	dateRange: (column: string): FilterOption => ({
		column,
		placeholder: 'Filter by date',
		type: 'date'
	}),
	
	category: (options: Array<{ value: string; label: string }>): FilterOption => ({
		column: 'category',
		placeholder: 'Filter by category',
		type: 'select',
		options
	})
};
