import type { AppLocale } from '$lib/i18n';
import en from './locales/en/en.json';
import pt from './locales/pt/pt.json';

type LocaleDictionary = Record<string, string>;

const dictionaries: Record<AppLocale, LocaleDictionary> = {
	en,
	pt
};

export function t(locale: AppLocale, key: string): string {
	return dictionaries[locale][key] ?? key;
}
