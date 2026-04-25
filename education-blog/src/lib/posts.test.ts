import { describe, expect, it } from 'vitest';
import {
	getAllPosts,
	getLocalesForSlug,
	getPostSummary,
	getTranslatedSlug,
	hasPost,
	loadPost
} from './posts';

describe('posts content helpers', () => {
	it('returns locale-specific post summaries sorted by date desc', () => {
		const enPosts = getAllPosts('en');
		expect(enPosts.length).toBeGreaterThan(0);

		for (let i = 1; i < enPosts.length; i += 1) {
			const previous = new Date(enPosts[i - 1].date).getTime();
			const current = new Date(enPosts[i].date).getTime();
			expect(previous).toBeGreaterThanOrEqual(current);
		}
	});

	it('supports existence and summary lookup by slug', () => {
		const enPosts = getAllPosts('en');
		const knownSlug = enPosts[0]?.slug;
		expect(knownSlug).toBeTruthy();

		if (!knownSlug) return;

		expect(hasPost('en', knownSlug)).toBe(true);
		expect(getPostSummary('en', knownSlug)?.slug).toBe(knownSlug);
		expect(getPostSummary('en', '__missing-post__')).toBeNull();
	});

	it('loads full post modules and locale availability for slugs', async () => {
		const enSlug = getAllPosts('en')[0]?.slug;
		expect(enSlug).toBeTruthy();

		if (!enSlug) return;

		const post = await loadPost('en', enSlug);
		expect(post).not.toBeNull();
		expect(post?.slug).toBe(enSlug);
		expect(post?.title).toBeTypeOf('string');
		expect(post?.component).toBeTypeOf('function');

		const locales = getLocalesForSlug(enSlug);
		expect(locales).toContain('en');
		expect(getLocalesForSlug('__missing-post__')).toEqual([]);
	});

	it('maps localized slugs through translation keys', () => {
		expect(getTranslatedSlug('en', 'getting-started', 'pt')).toBe('primeiro-post');
		expect(getTranslatedSlug('pt', 'primeiro-post', 'en')).toBe('getting-started');
		expect(getTranslatedSlug('en', '__missing-post__', 'pt')).toBeNull();
	});
});
