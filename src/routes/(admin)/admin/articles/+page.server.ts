import { ARTICLES_URL, CATEGORIES_URL } from '$lib/urls';
import type { PageServerLoad, Actions } from './$types';

export const load: PageServerLoad = async ({ fetch }) => {
	try {
		const categoriesResponse = await fetch(CATEGORIES_URL + '/titles');
		const categories: string[] = await categoriesResponse.json();
		const articlesResponse = await fetch(ARTICLES_URL + '/admin' + '?sort=createdAt,desc');
		const articles: Page<Article> = await articlesResponse.json();
		return { articles, categories };
	} catch (error) {}
};

export const actions: Actions = {
	createArticle: async ({ request, fetch }) => {
		const formData = await request.formData();

		// Form validation
		const title = formData.get('title');
		const content = formData.get('content');
		const category = formData.get('category');
		const image = formData.get('featuredImage') as File;

		if (!category || typeof category !== 'string' || category.trim().length === 0) {
			formData.delete('category');
		}

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

		const createArticleResponse = await fetch(ARTICLES_URL, {
			method: 'post',
			body: formData
		});

		const json = await createArticleResponse.json();

		if (createArticleResponse.status == 201) {
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

		const deleteArticleResponse = await fetch(ARTICLES_URL + '/' + id, {
			method: 'delete'
		});

		if (deleteArticleResponse.status == 204) {
			return {
				action: 'delete',
				success: true,
				message: 'Article Deleted successfully'
			};
		}
	},
	deleteArticlesBatch: async ({ request, fetch, locals }) => {
		const formData = await request.formData();

		// TODO: ADD VALIDATION LATER

		const batchDeleteResponse = await fetch(ARTICLES_URL + '/batch', {
			method: 'DELETE',
			body: formData
		});

		if (batchDeleteResponse.status === 204) {
			return {
				action: 'delete',
				success: true,
				message: 'Articles Deleted successfully'
			};
		} else {
			console.log(await batchDeleteResponse.json());
		}
	}
};
