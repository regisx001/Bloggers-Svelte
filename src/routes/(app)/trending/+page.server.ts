import { ARTICLES_URL } from '$lib/urls';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({}) => {
	try {
		const articlesResponse = await fetch(ARTICLES_URL + '?sort=createdAt,desc');
		const articles: Page<Article> = await articlesResponse.json();
		return { articles };
	} catch (error) {}
};
