import { ADMIN_USERS_URL } from '$lib/urls';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ fetch }) => {
	const usersResponse = await fetch(ADMIN_USERS_URL + '?sort=createdAt,desc');
	const users: Page<User> = await usersResponse.json();

	return { users };
};
