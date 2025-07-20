import { ARTICLES_URL } from '$lib/urls';
import type { Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals, fetch }) => {
	try {
		const myArticlesResponse = await fetch(ARTICLES_URL + '/my-drafts?sort=createdAt,desc');
		const myArticles: Page<Article> = await myArticlesResponse.json();
		return { myArticles };
	} catch (error) {}
};

export const actions: Actions = {
	sendForApproval: async ({ request, fetch }) => {
		const id = (await request.formData()).get('articleId');
		if (!id) {
			return {
				message: 'Id Not provided'
			};
		}
	},
	publishArticle: async ({ request, fetch }) => {
		const id = (await request.formData()).get('articleId');
		if (!id) {
			return {
				message: 'Id Not provided'
			};
		}
	},
	deleteArticle: async ({ request, fetch }) => {
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
	}
};
