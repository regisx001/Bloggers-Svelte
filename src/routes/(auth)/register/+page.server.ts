import { redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { LOGIN_URL, REGISTER_URL } from '$lib/urls';

export const load: PageServerLoad = ({ locals }) => {
	if (locals.user?.accessToken) {
		throw redirect(308, '/');
	}
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
				password: 'password is less than 6 character',
				username: {
					data: formData['username']
				}
			};
		}

		try {
			const responseRegistration = await fetch(REGISTER_URL, {
				method: 'POST',
				body: JSON.stringify(formData),
				headers: { 'content-type': 'application/json' }
			});

			if (!responseRegistration.ok) {
				const registrationJson = await responseRegistration.json();

				return {
					username: { data: formData['username'], detail: registrationJson?.username },
					email: { data: formData['email'], detail: registrationJson?.email },
					password: registrationJson?.password
				};
			}

			const loginInfo = JSON.stringify({
				username: formData['username'],
				password: formData['password']
			});

			const responseLogin = await fetch(LOGIN_URL, {
				method: 'POST',
				body: loginInfo,
				headers: { 'content-type': 'application/json' }
			});

			const loginJson: LoginResponse = await responseLogin.json();

			if (!responseLogin.ok) {
				return {
					error: loginJson
				};
			}

			if (responseLogin.status === 200) {
				cookies.set('refresh', loginJson.refreshToken, {
					path: '/',
					httpOnly: true,
					maxAge: 90 * 60 * 24
				});

				cookies.set('access', loginJson.accessToken, {
					path: '/',
					httpOnly: true,
					maxAge: 60 * 60
				});
				throw redirect(300, '/');
			}
		} catch (error) {
			// Handle network errors, JSON parsing errors, etc.
			console.error('Register API error:', error);
			return {
				username: { data: formData['username'] },
				error: 'Network error. Please try again.'
			};
		}
	}
};
