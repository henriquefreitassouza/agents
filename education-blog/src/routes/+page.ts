import { redirect } from '@sveltejs/kit';
import { DEFAULT_LOCALE } from '$lib/i18n';

export function load() {
	redirect(307, `/${DEFAULT_LOCALE}`);
}
