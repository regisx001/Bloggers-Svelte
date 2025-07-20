import { ARTICLES_URL } from '$lib/urls';
import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ params, fetch, locals }) => {
	try {
		const articleResponse = await fetch(`${ARTICLES_URL}/id-user/${params.id}`);

		// if (!articleResponse.ok) {
		// 	throw error(404, 'Article not found');
		// }

		const article: Article = await articleResponse.json();
		return { article };
	} catch (err) {
		throw error(404, 'Article not found');
	}
};
