<script lang="ts">
	import { ButtonLink, SurfaceCard, TagPill } from '$lib';
	import type { PageData } from './$types';

	let { data } = $props<{ data: PageData }>();

	function formatDate(value: string | Date): string {
		const date = value instanceof Date ? value : new Date(value);
		return new Intl.DateTimeFormat(data.locale, { dateStyle: 'long' }).format(date);
	}
</script>

<article class="stack">
	<ButtonLink href={`/${data.locale}/blog`} text="Back to blog" tone="ghost" />

	<SurfaceCard>
		<header class="post-header">
			<p class="date">{formatDate(data.post.date)}</p>
			<h1>{data.post.title}</h1>
			<p>{data.post.description}</p>
			{#if data.post.tags?.length}
				<div class="tags">
					{#each data.post.tags as tag}
						<TagPill label={tag} />
					{/each}
				</div>
			{/if}
		</header>
	</SurfaceCard>

	<SurfaceCard>
		<div class="prose">
			<data.post.component />
		</div>
	</SurfaceCard>
</article>

<style>
	.stack {
		display: grid;
		gap: 1rem;
	}

	.post-header {
		display: grid;
		gap: 0.7rem;
	}

	.date {
		font-size: 0.9rem;
		color: var(--text-muted);
	}

	h1 {
		font-size: clamp(2rem, 4vw, 2.6rem);
		letter-spacing: -0.02em;
	}

	.tags {
		display: inline-flex;
		flex-wrap: wrap;
		gap: 0.45rem;
	}
</style>
