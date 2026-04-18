<script lang="ts">
	import { ButtonLink, Container, SectionHeading, SurfaceCard } from '$lib';
</script>

<Container>
	<div class="home-grid">
		<SectionHeading
			title="Build meaningful learning experiences"
			subtitle="A simple editorial space for educational articles, guides, and classroom insights."
		/>

		<SurfaceCard>
			<div class="card-content">
				<p>
					Your content system is ready. The next step is authoring markdown posts and shaping your brand voice.
				</p>
				<div class="actions">
					<ButtonLink href="/blog" text="Read the blog" />
					<ButtonLink href="/blog/welcome-to-education-blog" text="View sample post" tone="ghost" />
				</div>
			</div>
		</SurfaceCard>
	</div>
</Container>

<style>
	.home-grid {
		display: grid;
		gap: 1.25rem;
	}

	.card-content {
		display: grid;
		gap: 1rem;
	}

	.card-content p {
		color: var(--text-muted);
	}

	.actions {
		display: flex;
		gap: 0.65rem;
		flex-wrap: wrap;
	}
</style>
