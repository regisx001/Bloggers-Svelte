import { CATEGORIES_URL } from '$lib/urls';
import { success } from 'zod/v4';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({}) => {
	try {
		const categoriesResponse = await fetch(CATEGORIES_URL);
		const categories: Page<Category> = await categoriesResponse.json();
		return { categories };
	} catch (error) {}
};

export const actions: Actions = {
	createCategory: async ({ request, fetch }) => {
		const formData = Object.fromEntries(await request.formData());

		console.log(formData);

		// TODO: FORM VALIDATION

		const createCategoryResponse = await fetch(CATEGORIES_URL, {
			method: 'post',
			body: JSON.stringify(formData),
			headers: {
				'Content-Type': 'application/json'
			}
		});

		if (createCategoryResponse.status == 201) {
			return {
				success: true
			};
		}
	},

	deleteCategory: async ({ request, fetch, locals }) => {
		const id = (await request.formData()).get('categoryId');
		if (!id) {
			return {
				message: 'Id Not provided'
			};
		}

		const deleteCategoryResponse = await fetch(CATEGORIES_URL + '/' + id, {
			method: 'delete'
		});

		if (deleteCategoryResponse.status == 204) {
			return;
		}
	}
};
