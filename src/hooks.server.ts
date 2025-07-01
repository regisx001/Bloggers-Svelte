import { REFRESH_TOKEN_URL, USER_INFO_URL, VERIFY_TOKEN_URL } from '$lib/urls';
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
		const refreshResponse = await fetch(REFRESH_TOKEN_URL, {
			method: 'POST',
			body: JSON.stringify({ refreshToken: refresh }),
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			}
		});

		if (refreshResponse.ok) {
			const accessToken = (await refreshResponse.json()).accessToken;
			event.cookies.set('access', accessToken, {
				httpOnly: true,
				path: '/',
				maxAge: 60 * 60
			});

			const userInfo = await getUserInfo(accessToken);
			event.locals.user = { ...userInfo, accessToken };
		}
		return resolve(event);
	}

	const verifyResponse = await fetch(VERIFY_TOKEN_URL, {
		method: 'POST',
		body: JSON.stringify({ token: access }),
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json'
		}
	});

	if (verifyResponse.ok) {
		const userInfo = await getUserInfo(access);
		event.locals.user = { ...userInfo, accessToken: access };
		return resolve(event);
	}

	return resolve(event);
};
