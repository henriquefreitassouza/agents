import { error } from '@sveltejs/kit';
import { getPostSummary } from '$lib/posts';

export function load({ params }) {
	const post = getPostSummary(params.slug);

	if (!post) {
		error(404, 'Post not found');
	}

	return {
		slug: params.slug,
		title: post.title,
		description: post.description
	};
}
