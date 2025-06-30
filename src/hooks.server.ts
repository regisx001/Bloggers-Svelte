import { USER_INFO_URL } from '$lib/urls';
import type { Handle } from '@sveltejs/kit';

async function getUserInfo(accessToken: string): Promise<User> {
	const response = await (
		await fetch(USER_INFO_URL, {
			headers: {
				Authorization: `Bearer ${accessToken}`
			}
		})
	).json();
	return response;
}

export const handle: Handle = async ({ resolve, event }) => {
	const refresh = event.cookies.get('refresh');
	const access = event.cookies.get('access');

	if (!refresh) {
		return resolve(event);
	}

	if (!access) {
		// TODO: REFRESH TOKEN
		// RefreshToken Logic
		return resolve(event);
	}

	// TODO: VERIFY TOKEN
	// verify token validity

	const userInfo = await getUserInfo(access);
	event.locals.user = userInfo;

	return resolve(event);
};
