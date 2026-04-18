<script lang="ts">
	import { ButtonLink, Container, SurfaceCard, TagPill } from '$lib';
	import { loadPost } from '$lib/posts';

	let { data } = $props();
</script>

<svelte:head>
	<title>{data.title} | Education Blog</title>
	<meta name="description" content={data.description} />
</svelte:head>

{#await loadPost(data.slug) then post}
	{#if post}
		<Container>
			<div class="post-layout">
				<ButtonLink href="/blog" text="Back to all posts" tone="ghost" />
				<SurfaceCard>
					<article class="prose">
						<header class="post-header">
							<small>{post.date}</small>
							<h1>{post.title}</h1>
							<p>{post.description}</p>
							{#if post.tags?.length}
								<div class="tags">
									{#each post.tags as tag}
										<TagPill label={tag} />
									{/each}
								</div>
							{/if}
						</header>

						<post.component />
					</article>
				</SurfaceCard>
			</div>
		</Container>
	{/if}
{/await}

<style>
	.post-layout {
		display: grid;
		gap: 0.9rem;
	}

	.post-header {
		display: grid;
		gap: 0.6rem;
		padding-bottom: 0.8rem;
		border-bottom: 1px solid var(--border);
	}

	.post-header small,
	.post-header p {
		color: var(--text-muted);
	}

	.tags {
		display: inline-flex;
		flex-wrap: wrap;
		gap: 0.35rem;
	}
</style>
