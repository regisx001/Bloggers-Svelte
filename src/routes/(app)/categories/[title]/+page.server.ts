import { CATEGORIES_URL } from '$lib/urls';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	//  DEPRECATED: WERE GOING TO TRY A DIFFRENT APPROCH WITH CATEGORIES

	try {
		const categoryResponse = await fetch(CATEGORIES_URL + '/' + params.title);
		const category: Category = (await categoryResponse.json()) || [];
		const articlesResponse = await fetch(CATEGORIES_URL + '/' + params.title + '/articles');
		const articles: Page<Article> = await articlesResponse.json();
		return { category, articles };
	} catch (error) {}
};
