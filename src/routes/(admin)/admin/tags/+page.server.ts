import { TAGS_URL } from '$lib/urls';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({}) => {
	try {
		const tagsResponse = await fetch(TAGS_URL);
		const tags: Page<Tag> = await tagsResponse.json();
		return { tags };
	} catch (error) {}
};
