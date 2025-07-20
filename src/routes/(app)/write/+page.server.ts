import { ARTICLES_URL, CATEGORIES_URL } from '$lib/urls';
import type { PageServerLoad, Actions } from './$types';

export const load: PageServerLoad = async ({ fetch }) => {
	const res = await fetch(CATEGORIES_URL + '/titles');
	let categories: string[] = [];
	if (res.ok) {
		categories = await res.json();
	}
	return { categories };
};

export const actions: Actions = {
	createArticle: async ({ request, fetch }) => {
		const formData = await request.formData();
		const title = formData.get('title');
		const content = formData.get('content');
		const category = formData.get('category');
		const image = formData.get('featuredImage') as File;

		if (!title || typeof title !== 'string' || !title.trim()) {
			return { success: false, message: 'Title is required' };
		}

		if (!content || typeof content !== 'string' || !content.trim()) {
			return { success: false, message: 'Content is required' };
		}

		if (!category || typeof category !== 'string' || !category.trim()) {
			formData.delete('category');
		}

		if (!image || image.size === 0 || image.name === '') {
			// Remove image field if no file is provided
			formData.delete('featuredImage');
		} else if (!image.type.startsWith('image/')) {
			return {
				success: false,
				message: 'Please upload a valid image file'
			};
		}

		const createRes = await fetch(ARTICLES_URL, {
			method: 'POST',
			body: formData
		});
		const json = await createRes.json();
		if (createRes.status === 201) {
			return {
				action: 'createArticle',
				success: true,
				message: 'Article created successfully'
			};
		}
		return { success: false, message: json.message || 'Failed to create article' };
	}
};
