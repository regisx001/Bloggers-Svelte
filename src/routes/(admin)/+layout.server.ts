import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from '../$types';
import { base } from '$app/paths';

export const load: LayoutServerLoad = ({ locals }) => {
	if (!locals.user?.accessToken) {
		throw redirect(308, base + '/login');
	}
	return;
};
