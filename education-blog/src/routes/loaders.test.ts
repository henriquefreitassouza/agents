import { describe, expect, it, vi } from 'vitest';

const getAllPostsMock = vi.fn();
const loadPostMock = vi.fn();

vi.mock('$lib/posts', () => ({
	getAllPosts: getAllPostsMock,
	loadPost: loadPostMock
}));

describe('route loaders', () => {
	it('falls back to en locale for blog listing loader', async () => {
		getAllPostsMock.mockReturnValueOnce([{ slug: 'post-a' }]);
		const module = await import('./[locale=locale]/blog/+page');
		const result = module.load({
			params: { locale: 'es' }
		} as Parameters<typeof module.load>[0]);

		expect(getAllPostsMock).toHaveBeenCalledWith('en');
		expect(result).toEqual({
			locale: 'en',
			posts: [{ slug: 'post-a' }]
		});
	});

	it('throws 404 when post loader cannot find post', async () => {
		loadPostMock.mockResolvedValueOnce(null);
		const module = await import('./[locale=locale]/blog/[slug]/+page');

		await expect(
			module.load({
				params: { locale: 'pt', slug: 'missing-post' }
			} as Parameters<typeof module.load>[0])
		).rejects.toMatchObject({
			status: 404
		});
	});

	it('returns locale and post data when a post exists', async () => {
		loadPostMock.mockResolvedValueOnce({ slug: 'ok-post', title: 'Ok' });
		const module = await import('./[locale=locale]/blog/[slug]/+page');

		const result = await module.load({
			params: { locale: 'pt', slug: 'ok-post' }
		} as Parameters<typeof module.load>[0]);

		expect(loadPostMock).toHaveBeenCalledWith('pt', 'ok-post');
		expect(result).toEqual({
			locale: 'pt',
			post: { slug: 'ok-post', title: 'Ok' }
		});
	});
});
