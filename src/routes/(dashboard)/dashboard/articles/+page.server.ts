import { ARTICLES_URL } from '$lib/urls';
import type { PageServerLoad, Actions } from './$types';

export const load: PageServerLoad = async ({}) => {
	try {
		const articlesResponse = await fetch(ARTICLES_URL + '?sort=createdAt,desc');
		const articles: Page<Article> = await articlesResponse.json();
		return { articles };
	} catch (error) {}
};

export const actions: Actions = {
	createArticle: async ({ request, fetch }) => {
		const formData = await request.formData();

		// Form validation
		const title = formData.get('title');
		const description = formData.get('description');

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

		// const categoryFormData = new FormData();
		// categoryFormData.append('title', title.trim());
		// categoryFormData.append('description', description.trim());
		// categoryFormData.append('image', description.trim());

		const createCategoryResponse = await fetch(ARTICLES_URL, {
			method: 'post',
			body: formData
		});

		if (createCategoryResponse.status == 201) {
			return {
				action: 'create',
				success: true,
				message: 'Category Created successfully'
			};
		}
	},

	deleteArticle: async ({ request, fetch, locals }) => {
		const id = (await request.formData()).get('articleId');
		if (!id) {
			return {
				message: 'Id Not provided'
			};
		}

		const deleteCategoryResponse = await fetch(ARTICLES_URL + '/' + id, {
			method: 'delete'
		});

		if (deleteCategoryResponse.status == 204) {
			return {
				action: 'delete',
				success: true,
				message: 'Category Deleted successfully'
			};
		}
	}
};
