<script lang="ts">
	import { Container, SectionHeading, SurfaceCard, TagPill } from '$lib';

	let { data } = $props();
</script>

<svelte:head>
	<title>Blog | Education Blog</title>
</svelte:head>

<Container>
	<div class="blog-list">
		<SectionHeading
			title="Latest posts"
			subtitle="Every article is written in markdown and styled with reusable theme components."
		/>

		<ul>
			{#each data.posts as post}
				<li>
					<SurfaceCard>
						<div class="post-card">
							<div class="meta">
								<small>{post.date}</small>
								{#if post.tags?.length}
									<div class="tags">
										{#each post.tags as tag}
											<TagPill label={tag} />
										{/each}
									</div>
								{/if}
							</div>
							<h2><a href={`/blog/${post.slug}`}>{post.title}</a></h2>
							<p>{post.description}</p>
						</div>
					</SurfaceCard>
				</li>
			{/each}
		</ul>
	</div>
</Container>

<style>
	.blog-list {
		display: grid;
		gap: 1.2rem;
	}

	ul {
		list-style: none;
		padding: 0;
		margin: 0;
		display: grid;
		gap: 0.9rem;
	}

	.post-card {
		display: grid;
		gap: 0.8rem;
	}

	.meta {
		display: flex;
		gap: 0.75rem;
		justify-content: space-between;
		align-items: center;
		color: var(--text-muted);
	}

	.tags {
		display: inline-flex;
		gap: 0.35rem;
		flex-wrap: wrap;
	}

	h2 a {
		text-decoration: none;
		color: var(--text);
	}

	p {
		color: var(--text-muted);
	}
</style>
