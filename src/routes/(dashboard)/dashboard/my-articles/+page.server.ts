import { ARTICLES_URL } from '$lib/urls';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals, fetch }) => {
	try {
		const myArticlesResponse = await fetch(ARTICLES_URL + '/my-articles?sort=createdAt,desc');
		const myArticles: Page<Article> = await myArticlesResponse.json();
		return { myArticles };
	} catch (error) {}
};

export const actions: Actions = {
	sendForReview: async ({ request, fetch }) => {
		const id = (await request.formData()).get('articleId');
		if (!id) {
			return {
				message: 'Id Not provided'
			};
		}

		const reviewResponse = await fetch(ARTICLES_URL + '/send-review/' + id, {
			method: 'post'
		});

		if (reviewResponse.ok) {
			return {
				action: 'sendForReview',
				success: true,
				message: 'Article awaiting review'
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

		const publishArticleResponse = await fetch(ARTICLES_URL + '/publish/' + id, {
			method: 'post'
		});

		if (publishArticleResponse.ok) {
			return {
				action: 'publish',
				success: true,
				message: 'Article Published successfully'
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
