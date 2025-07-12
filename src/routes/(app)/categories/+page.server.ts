import { CATEGORIES_URL } from '$lib/urls';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ fetch }) => {
	try {
		const categoriesResponse = await fetch(CATEGORIES_URL);
		const categories: Page<Category> = (await categoriesResponse.json()) || [];
		return { categories };
	} catch (error) {}
};
