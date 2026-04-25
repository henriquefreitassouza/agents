export const SUPPORTED_LOCALES = ['en', 'pt'] as const;

export type AppLocale = (typeof SUPPORTED_LOCALES)[number];

export const DEFAULT_LOCALE: AppLocale = 'en';

export const LOCALE_LABELS: Record<AppLocale, string> = {
	en: 'English',
	pt: 'Português'
};

export function isSupportedLocale(value: string): value is AppLocale {
	return SUPPORTED_LOCALES.includes(value as AppLocale);
}
