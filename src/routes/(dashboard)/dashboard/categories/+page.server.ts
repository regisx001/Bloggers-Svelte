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

		// Form validation
		const { title, description } = formData;

		if (!title || typeof title !== 'string' || title.trim().length === 0) {
			return {
				success: false,
				message: 'Title is required'
			};
		}

		if (!description || typeof description !== 'string' || description.trim().length === 0) {
			return {
				success: false,
				message: 'Description is required'
			};
		}

		const createCategoryResponse = await fetch(CATEGORIES_URL, {
			method: 'post',
			body: JSON.stringify({ title: title.trim(), description: description.trim() }),
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
