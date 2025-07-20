import { ARTICLES_URL } from '$lib/urls';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals, fetch }) => {
	try {
		const myArticlesResponse = await fetch(ARTICLES_URL + '/my-articles?sort=createdAt,desc');
		const myArticles: Page<Article> = await myArticlesResponse.json();
		return { myArticles };
	} catch (error) {}
};
