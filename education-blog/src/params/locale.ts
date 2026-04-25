import { isSupportedLocale } from '$lib/i18n';

export function match(param: string): boolean {
	return isSupportedLocale(param);
}
