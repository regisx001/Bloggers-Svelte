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
		const content = formData.get('content');
		const image = formData.get('featuredImage') as File;

		if (!title || typeof title !== 'string' || title.trim().length === 0) {
			return {
				success: false,
				message: 'Title is required'
			};
		}

		if (!content || typeof content !== 'string' || content.trim().length === 0) {
			return {
				success: false,
				message: 'content is required'
			};
		}

		// Check if image is provided and valid
		if (!image || image.size === 0 || image.name === '') {
			// Remove image field if no file is provided
			formData.delete('featuredImage');
		} else if (!image.type.startsWith('image/')) {
			return {
				success: false,
				message: 'Please upload a valid image file'
			};
		}

		const createCategoryResponse = await fetch(ARTICLES_URL, {
			method: 'post',
			body: formData
		});

		if (createCategoryResponse.status == 201) {
			return {
				action: 'create',
				success: true,
				message: 'Article Created successfully'
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
				message: 'Article Deleted successfully'
			};
		}
	}
};
