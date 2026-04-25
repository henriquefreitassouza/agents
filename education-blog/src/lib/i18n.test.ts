import { describe, expect, it } from 'vitest';
import { DEFAULT_LOCALE, LOCALE_LABELS, SUPPORTED_LOCALES, isSupportedLocale } from './i18n';

describe('i18n locale helpers', () => {
	it('exposes expected locale constants', () => {
		expect(SUPPORTED_LOCALES).toEqual(['en', 'pt']);
		expect(DEFAULT_LOCALE).toBe('en');
		expect(LOCALE_LABELS.en).toBeTypeOf('string');
		expect(LOCALE_LABELS.pt).toBeTypeOf('string');
	});

	it('validates supported locales correctly', () => {
		expect(isSupportedLocale('en')).toBe(true);
		expect(isSupportedLocale('pt')).toBe(true);
		expect(isSupportedLocale('es')).toBe(false);
		expect(isSupportedLocale('')).toBe(false);
	});
});
