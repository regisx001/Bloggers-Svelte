import { CATEGORIES_URL } from '$lib/urls';
import type { PageServerLoad } from './$types';
//  DEPRECATED: WERE GOING TO TRY A DIFFRENT APPROCH WITH CATEGORIES

export const load: PageServerLoad = async ({ fetch }) => {
	try {
		const categoriesResponse = await fetch(CATEGORIES_URL);
		const categories: Page<Category> = (await categoriesResponse.json()) || [];
		return { categories };
	} catch (error) {}
};
