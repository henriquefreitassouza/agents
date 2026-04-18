<script lang="ts">
	let { title, subtitle = '', headingId = 'page-heading' } = $props<{
		title: string;
		subtitle?: string;
		headingId?: string;
	}>();
</script>

<header class="heading" aria-labelledby={headingId}>
	<h1 id={headingId}>{title}</h1>
	{#if subtitle}
		<p>{subtitle}</p>
	{/if}
</header>

<style>
	.heading {
		display: grid;
		gap: 0.65rem;
	}

	h1 {
		font-size: clamp(2rem, 4vw, 2.8rem);
		letter-spacing: -0.02em;
	}

	p {
		color: var(--text-muted);
		font-size: 1.05rem;
		max-width: 62ch;
	}
</style>
