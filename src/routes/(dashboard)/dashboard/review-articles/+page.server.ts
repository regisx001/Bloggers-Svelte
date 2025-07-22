import { ARTICLES_URL } from '$lib/urls';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ fetch }) => {
	const articleResponse = await fetch(ARTICLES_URL + '/for-review?createdAt,desc');
	const articles: Page<Article> = await articleResponse.json();

	return { articles };
};
