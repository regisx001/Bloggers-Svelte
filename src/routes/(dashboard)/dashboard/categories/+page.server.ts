import { CATEGORIES_URL } from '$lib/urls';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({}) => {
	try {
		const categoriesResponse = await fetch(CATEGORIES_URL);
		const categories: Page<Category> = await categoriesResponse.json();
		return { categories };
	} catch (error) {}
};

export const actions: Actions = {
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
