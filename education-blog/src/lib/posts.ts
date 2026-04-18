import type { Component } from 'svelte';

export type PostMetadata = {
	title: string;
	description: string;
	date: string;
	tags?: string[];
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

const postImporters = import.meta.glob('/src/posts/*.svx');
const postMetadataModules = import.meta.glob('/src/posts/*.svx', { eager: true }) as Record<
	string,
	PostModule
>;

function getSlugFromPath(path: string): string {
	return path.split('/').at(-1)?.replace('.svx', '') ?? '';
}

function sortNewestFirst(a: PostSummary, b: PostSummary): number {
	return new Date(b.date).getTime() - new Date(a.date).getTime();
}

export function getAllPosts(): PostSummary[] {
	return Object.entries(postMetadataModules)
		.map(([path, module]) => ({
			slug: getSlugFromPath(path),
			...module.metadata
		}))
		.sort(sortNewestFirst);
}

export function hasPost(slug: string): boolean {
	return getAllPosts().some((post) => post.slug === slug);
}

export function getPostSummary(slug: string): PostSummary | null {
	return getAllPosts().find((post) => post.slug === slug) ?? null;
}

export async function loadPost(slug: string): Promise<Post | null> {
	const path = `/src/posts/${slug}.svx`;
	const importer = postImporters[path];

	if (!importer) return null;

	const module = (await importer()) as PostModule;

	return {
		slug,
		...module.metadata,
		component: module.default
	};
}
