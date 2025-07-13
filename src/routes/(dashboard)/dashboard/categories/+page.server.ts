import { CATEGORIES_URL } from '$lib/urls';
import { success } from 'zod/v4';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({}) => {
	try {
		const categoriesResponse = await fetch(CATEGORIES_URL + '?sort=createdAt,desc');
		const categories: Page<Category> = await categoriesResponse.json();
		return { categories };
	} catch (error) {}
};

export const actions: Actions = {
	createCategory: async ({ request, fetch }) => {
		const formData = await request.formData();

		// Form validation
		const title = formData.get('title');
		const description = formData.get('description');
		const image = formData.get('image') as File;

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

		// Check if image is provided and valid
		if (!image || image.size === 0 || image.name === '') {
			// Remove image field if no file is provided
			formData.delete('image');
		} else if (!image.type.startsWith('image/')) {
			return {
				success: false,
				message: 'Please upload a valid image file'
			};
		}

		// const categoryFormData = new FormData();
		// categoryFormData.append('title', title.trim());
		// categoryFormData.append('description', description.trim());
		// categoryFormData.append('image', description.trim());

		const createCategoryResponse = await fetch(CATEGORIES_URL, {
			method: 'post',
			body: formData
		});

		const j = await createCategoryResponse.json();

		if (createCategoryResponse.status == 201) {
			return {
				action: 'create',
				success: true,
				message: 'Category Created successfully'
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
			return {
				action: 'delete',
				success: true,
				message: 'Category Deleted successfully'
			};
		}
	},
	deleteCategoriesBatch: async ({ request, fetch, locals }) => {
		// TODO : Implement Later
		return {
			action: 'delete',
			success: true,
			message: 'Category Deleted successfully'
		};
	}
};
