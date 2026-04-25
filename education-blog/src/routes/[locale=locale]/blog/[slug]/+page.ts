import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import { loadPost } from '$lib/posts';
import { isSupportedLocale } from '$lib/i18n';

export const load: PageLoad = async ({ params }) => {
	const locale = isSupportedLocale(params.locale) ? params.locale : 'en';
	const post = await loadPost(locale, params.slug);

	if (!post) {
		throw error(404, 'Post not found');
	}

	return {
		locale,
		post
	};
};
