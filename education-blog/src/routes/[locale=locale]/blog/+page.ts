import type { PageLoad } from './$types';
import { getAllPosts } from '$lib/posts';
import { isSupportedLocale } from '$lib/i18n';

export const load: PageLoad = ({ params }) => {
	const locale = isSupportedLocale(params.locale) ? params.locale : 'en';

	return {
		locale,
		posts: getAllPosts(locale)
	};
};
