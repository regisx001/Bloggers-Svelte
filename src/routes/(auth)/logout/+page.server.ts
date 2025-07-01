import type { Actions } from '@sveltejs/kit';

export const actions: Actions = {
	default: async ({ request, fetch, cookies }) => {
		cookies.delete('refresh', { path: '/' });
		cookies.delete('access', { path: '/' });
	}
};
