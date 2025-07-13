import { VERIFY_ACCOUNT_URL } from '$lib/urls';
import { success } from 'zod/v4';
import type { Actions } from './$types';

export const actions: Actions = {
	verifyUser: async ({ request, fetch }) => {
		const formData = Object.fromEntries(await request.formData());
		if (!formData['email']) {
			return {
				email: {
					data: formData['email'],
					detail: "you didn't provide a email"
				}
			};
		}
		try {
			const verificationResponse = await fetch(VERIFY_ACCOUNT_URL, {
				method: 'POST',
				body: JSON.stringify(formData),
				headers: {
					'Content-Type': 'application/json'
				}
			});

			if (verificationResponse.ok) {
				return {
					success: 'Account verified Successfuly'
				};
			}
		} catch (error) {
			console.log(error);
		}
	}
};
