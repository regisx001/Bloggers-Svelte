import { redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { LOGIN_URL } from '$lib/urls';

export const load: PageServerLoad = () => {
	return;
};

export const actions: Actions = {
	default: async ({ request, cookies, fetch }) => {
		const formData = Object.fromEntries(await request.formData());

		if (!formData['username']) {
			return {
				username: {
					data: formData['username'],
					detail: "you didn't provide a username"
				}
			};
		}

		if (formData['password'].toString().length < 6) {
			return {
				username: {
					data: formData['username']
				},
				password: 'password is less than 6 character'
			};
		}

		const response = await fetch(LOGIN_URL, {
			method: 'POST',
			body: JSON.stringify(formData),
			headers: { 'content-type': 'application/json' }
		});
		const jsonData: LoginResponse = await response.json();

		if (!response.ok) {
			return {
				username: { data: formData['username'] }
				// error: jsonData?.detail
			};
		}

		if (response.status === 200) {
			cookies.set('refresh', jsonData.refreshToken, {
				path: '/',
				httpOnly: true,
				maxAge: 60 * 60 * 24 * 90
			});

			cookies.set('access', jsonData.accessToken, {
				path: '/',
				httpOnly: true,
				maxAge: jsonData.expireIn / 1000
			});
			throw redirect(300, '/');
		}
	}
};
