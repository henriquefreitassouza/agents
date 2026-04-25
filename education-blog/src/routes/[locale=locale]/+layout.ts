import type { LayoutLoad } from './$types';
import { error } from '@sveltejs/kit';
import { isSupportedLocale } from '$lib/i18n';

export const load: LayoutLoad = ({ params }) => {
	if (!isSupportedLocale(params.locale)) {
		throw error(404, 'Locale not found');
	}

	return {
		locale: params.locale
	};
};
