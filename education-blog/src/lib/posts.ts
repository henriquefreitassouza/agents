import type { Component } from 'svelte';
import type { AppLocale } from './i18n';
import { isSupportedLocale, SUPPORTED_LOCALES } from './i18n';

export type PostMetadata = {
	title: string;
	description: string;
	date: string | Date;
	tags?: string[];
	translationKey?: string;
};

export type PostSummary = PostMetadata & {
	slug: string;
};

export type Post = PostSummary & {
	component: Component;
};

type PostModule = {
	default: Component;
	metadata: PostMetadata;
};

const postImporters = import.meta.glob('/src/posts/*/*.svx');
const postMetadataModules = import.meta.glob('/src/posts/*/*.svx', { eager: true }) as Record<
	string,
	PostModule
>;

function parseLocaleAndSlug(path: string): { locale: string; slug: string } | null {
	const m = path.match(/^\/src\/posts\/([^/]+)\/([^/]+)\.svx$/);
	if (!m) return null;
	return { locale: m[1], slug: m[2] };
}

function sortNewestFirst(a: PostSummary, b: PostSummary): number {
	const toMs = (d: string | Date) => (d instanceof Date ? d : new Date(d)).getTime();
	return toMs(b.date) - toMs(a.date);
}

type IndexedPost = {
	locale: AppLocale;
	slug: string;
	translationKey: string;
};

function normalizeMetadata(module: Partial<PostModule>, path: string): PostMetadata | null {
	const meta = module.metadata;
	if (!meta || typeof meta.title !== 'string') {
		if (import.meta.env.DEV) {
			console.warn(`[posts] Missing or invalid frontmatter metadata for ${path}`);
		}
		return null;
	}
	return meta;
}

export function getAllPosts(locale: AppLocale): PostSummary[] {
	return Object.entries(postMetadataModules)
		.map(([path, module]) => {
			const ids = parseLocaleAndSlug(path);
			if (!ids || ids.locale !== locale) return null;
			const meta = normalizeMetadata(module, path);
			if (!meta) return null;
			return {
				slug: ids.slug,
				...meta
			};
		})
		.filter((p): p is PostSummary => p !== null)
		.sort(sortNewestFirst);
}

export function hasPost(locale: AppLocale, slug: string): boolean {
	return getAllPosts(locale).some((post) => post.slug === slug);
}

export function getPostSummary(locale: AppLocale, slug: string): PostSummary | null {
	return getAllPosts(locale).find((post) => post.slug === slug) ?? null;
}

export async function loadPost(locale: AppLocale, slug: string): Promise<Post | null> {
	const path = `/src/posts/${locale}/${slug}.svx`;
	const importer = postImporters[path];

	if (!importer) return null;

	const module = (await importer()) as PostModule;
	const meta = normalizeMetadata(module, path);
	if (!meta) return null;

	return {
		slug,
		...meta,
		component: module.default
	};
}

function getIndexedPosts(): IndexedPost[] {
	return Object.entries(postMetadataModules)
		.map(([path, module]) => {
			const ids = parseLocaleAndSlug(path);
			if (!ids || !isSupportedLocale(ids.locale)) return null;
			const meta = normalizeMetadata(module, path);
			if (!meta) return null;

			const translationKey =
				typeof meta.translationKey === 'string' && meta.translationKey.trim().length > 0
					? meta.translationKey.trim()
					: ids.slug;

			return {
				locale: ids.locale,
				slug: ids.slug,
				translationKey
			};
		})
		.filter((post): post is IndexedPost => post !== null);
}

/** Locales that actually have a post file for this slug (for hreflang / switcher). */
export function getLocalesForSlug(slug: string): AppLocale[] {
	const found = new Set<string>();
	for (const path of Object.keys(postMetadataModules)) {
		const ids = parseLocaleAndSlug(path);
		if (ids?.slug === slug) found.add(ids.locale);
	}
	return SUPPORTED_LOCALES.filter((l) => found.has(l));
}

export function getTranslatedSlug(
	sourceLocale: AppLocale,
	sourceSlug: string,
	targetLocale: AppLocale
): string | null {
	const indexedPosts = getIndexedPosts();
	const source = indexedPosts.find((post) => post.locale === sourceLocale && post.slug === sourceSlug);
	if (!source) {
		return hasPost(targetLocale, sourceSlug) ? sourceSlug : null;
	}

	const translation = indexedPosts.find(
		(post) => post.locale === targetLocale && post.translationKey === source.translationKey
	);

	if (!translation) {
		return hasPost(targetLocale, sourceSlug) ? sourceSlug : null;
	}

	return translation.slug;
}
