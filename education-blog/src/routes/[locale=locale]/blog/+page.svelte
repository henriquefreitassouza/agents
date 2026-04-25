<script lang="ts">
	import { SectionHeading, SurfaceCard, TagPill } from '$lib';
	import type { PageData } from './$types';

	let { data } = $props<{ data: PageData }>();

	function formatDate(value: string | Date): string {
		const date = value instanceof Date ? value : new Date(value);
		return new Intl.DateTimeFormat(data.locale, { dateStyle: 'medium' }).format(date);
	}
</script>

<section class="stack">
	<SectionHeading
		title="Blog"
		subtitle="Latest educational notes, tutorials, and practical development write-ups."
	/>

	{#if data.posts.length === 0}
		<SurfaceCard>
			<p>No posts yet for this language.</p>
		</SurfaceCard>
	{:else}
		<div class="list">
			{#each data.posts as post}
				<SurfaceCard>
					<article class="post-card">
						<p class="date">{formatDate(post.date)}</p>
						<h2>
							<a href={`/${data.locale}/blog/${post.slug}`}>{post.title}</a>
						</h2>
						<p>{post.description}</p>
						{#if post.tags?.length}
							<div class="tags" aria-label="Post tags">
								{#each post.tags as tag}
									<TagPill label={tag} />
								{/each}
							</div>
						{/if}
					</article>
				</SurfaceCard>
			{/each}
		</div>
	{/if}
</section>

<style>
	.stack {
		display: grid;
		gap: 1rem;
	}

	.list {
		display: grid;
		gap: 0.8rem;
	}

	.post-card {
		display: grid;
		gap: 0.6rem;
	}

	.date {
		font-size: 0.9rem;
		color: var(--text-muted);
	}

	h2 {
		font-size: 1.35rem;
	}

	h2 a {
		text-decoration: none;
		color: var(--text);
	}

	h2 a:hover {
		color: var(--primary);
	}

	.tags {
		display: inline-flex;
		flex-wrap: wrap;
		gap: 0.45rem;
	}
</style>
