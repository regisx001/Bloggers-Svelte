import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ resolve, event }) => {
	const refresh = event.cookies.get('refresh');
	const access = event.cookies.get('access');

	return resolve(event);
};
