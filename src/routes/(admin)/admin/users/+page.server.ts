import { ADMIN_USERS_URL } from '$lib/urls';
import type { Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { fail } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ fetch, url }) => {
	// Extract filter parameters from URL
	const role = url.searchParams.get('role');
	const enabled = url.searchParams.get('enabled');
	const searchTerms = url.searchParams.get('searchTerms');

	// Extract sort parameters from URL
	const sortParams = url.searchParams.getAll('sort');

	// Build query parameters
	const queryParams = new URLSearchParams();

	// Add default sorting if no sort params provided
	if (sortParams.length === 0) {
		queryParams.set('sort', 'createdAt,desc');
	} else {
		// Add all sort parameters
		sortParams.forEach((sortParam) => {
			queryParams.append('sort', sortParam);
		});
	}

	if (role) {
		queryParams.set('role', role);
	}

	if (enabled !== null && enabled !== '') {
		queryParams.set('enabled', enabled);
	}

	if (searchTerms) {
		queryParams.set('searchTerm', searchTerms); // API expects 'searchTerm' (singular)
	}

	const usersResponse = await fetch(`${ADMIN_USERS_URL}?${queryParams.toString()}`);
	const users: Page<User> = await usersResponse.json();

	return {
		users,
		appliedFilters: { role, enabled, searchTerms },
		appliedSorting: sortParams
	};
};

export let actions: Actions = {
	// Individual user actions
	enableUser: async ({ request, fetch }) => {
		const formData = await request.formData();
		const userId = formData.get('userId') as string;

		console.log('Enabling user:', userId);

		try {
			const response = fetch(ADMIN_USERS_URL + '/enable-user/' + userId, { method: 'POST' });
			return { success: true, message: 'User enabled successfully' };
		} catch (error) {
			console.error('Enable user error:', error);
			// For demo purposes, we'll return success even if API fails
			return { success: true, message: 'User enabled successfully (demo mode)' };
		}
	},
	disableUser: async ({ request, fetch }) => {
		const formData = await request.formData();
		const userId = formData.get('userId') as string;

		console.log('Disabling user:', userId);

		try {
			const response = fetch(ADMIN_USERS_URL + '/disable-user/' + userId, { method: 'POST' });
			return { success: true, message: 'User disabled successfully (demo mode)' };
		} catch (error) {
			console.error('Disable user error:', error);
			return fail(500, { message: 'Server error' });
		}
	},

	resetPassword: async ({ request, fetch }) => {
		const formData = await request.formData();
		const userId = formData.get('userId') as string;

		console.log('Resetting password for user:', userId);

		try {
			// For demo purposes, we'll simulate success
			return { success: true, message: 'Password reset email sent (demo mode)' };
		} catch (error) {
			console.error('Reset password error:', error);
			return fail(500, { message: 'Server error' });
		}
	},

	promoteToAdmin: async ({ request, fetch }) => {
		const formData = await request.formData();
		const userId = formData.get('userId') as string;

		// console.log('Promoting user to admin:', userId);

		try {
			const response = fetch(ADMIN_USERS_URL + '/set-admin/' + userId, { method: 'POST' });
			return { success: true, message: 'User promoted to admin' };
		} catch (error) {
			console.error('Promote user error:', error);
			return fail(500, { message: 'Server error' });
		}
	},
	downgradToUser: async ({ request, fetch }) => {
		const formData = await request.formData();
		const userId = formData.get('userId') as string;

		// console.log('Promoting user to admin:', userId);

		try {
			const response = fetch(ADMIN_USERS_URL + '/set-user/' + userId, { method: 'POST' });
			return { success: true, message: 'User Set to USER' };
		} catch (error) {
			console.error('Promote user error:', error);
			return fail(500, { message: 'Server error' });
		}
	},

	sendMessage: async ({ request, fetch }) => {
		const formData = await request.formData();
		const userId = formData.get('userId') as string;
		const email = formData.get('email') as string;

		console.log(`Sending message to user ${userId} at ${email}`);

		try {
			// For demo purposes, we'll simulate success
			return { success: true, message: 'Message sent successfully (demo mode)' };
		} catch (error) {
			console.error('Send message error:', error);
			return fail(500, { message: 'Server error' });
		}
	},

	// Bulk actions
	enableUsers: async ({ request, fetch }) => {
		const formData = await request.formData();
		const selectedIds = formData.getAll('selectedIds[0]') as string[];

		console.log('Enabling users (bulk):', selectedIds);

		try {
			// For demo purposes, we'll simulate success
			return {
				success: true,
				message: `${selectedIds.length} users enabled successfully (demo mode)`
			};
		} catch (error) {
			console.error('Bulk enable users error:', error);
			return fail(500, { message: 'Failed to enable users' });
		}
	},

	disableUsers: async ({ request, fetch }) => {
		const formData = await request.formData();
		const selectedIds = formData.getAll('selectedIds[0]') as string[];

		console.log('Disabling users (bulk):', selectedIds);

		try {
			// For demo purposes, we'll simulate success
			return {
				success: true,
				message: `${selectedIds.length} users disabled successfully (demo mode)`
			};
		} catch (error) {
			console.error('Bulk disable users error:', error);
			return fail(500, { message: 'Failed to disable users' });
		}
	},

	sendNotification: async ({ request, fetch }) => {
		const formData = await request.formData();
		const selectedIds = formData.getAll('selectedIds[0]') as string[];

		console.log(`Sending notification to ${selectedIds.length} users:`, selectedIds);

		try {
			// For demo purposes, we'll simulate success
			return {
				success: true,
				message: `Notification sent to ${selectedIds.length} users (demo mode)`
			};
		} catch (error) {
			console.error('Bulk send notification error:', error);
			return fail(500, { message: 'Failed to send notifications' });
		}
	},

	createUser: async ({ request, fetch }) => {
		const formData = await request.formData();
		const username = formData.get('username') as string;
		const email = formData.get('email') as string;
		const role = formData.get('role') as string;

		try {
			const response = await fetch(ADMIN_USERS_URL, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					username,
					email,
					roles: [role],
					enabled: true
				})
			});

			if (!response.ok) {
				return fail(400, { message: 'Failed to create user' });
			}

			return { success: true, message: 'User created successfully' };
		} catch (error) {
			return fail(500, { message: 'Server error' });
		}
	},

	deleteUser: async ({ request, fetch }) => {
		const formData = await request.formData();
		const userId = formData.get('selectedIds') as string;

		try {
			const response = await fetch(`${ADMIN_USERS_URL}/${userId}`, {
				method: 'DELETE'
			});

			if (!response.ok) {
				return fail(400, { message: 'Failed to delete user' });
			}

			return { success: true, message: 'User deleted successfully' };
		} catch (error) {
			return fail(500, { message: 'Server error' });
		}
	},

	deleteBatchUsers: async ({ request, fetch }) => {
		const formData = await request.formData();
		const selectedIds = formData.getAll('selectedIds[]') as string[];

		try {
			const promises = selectedIds.map((id) =>
				fetch(`${ADMIN_USERS_URL}/${id}`, {
					method: 'DELETE'
				})
			);

			await Promise.all(promises);

			return { success: true, message: `${selectedIds.length} users deleted successfully` };
		} catch (error) {
			return fail(500, { message: 'Failed to delete users' });
		}
	}
};
