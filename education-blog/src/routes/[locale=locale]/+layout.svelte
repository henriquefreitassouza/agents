<script lang="ts">
	import { page } from '$app/state';
	import { ButtonLink, Container, LanguageSwitcher } from '$lib';

	let { children } = $props();
	let locale = $derived(page.params.locale ?? 'en');
</script>

<a class="skip-link" href="#content">Skip to content</a>

<header class="site-header">
	<Container>
		<div class="bar">
			<a class="brand" href={`/${locale}`}>Education Blog</a>
			<nav class="nav" aria-label="Primary navigation">
				<ButtonLink href={`/${locale}`} text="Home" tone="ghost" />
				<ButtonLink href={`/${locale}/blog`} text="Blog" tone="ghost" />
			</nav>
			<LanguageSwitcher />
		</div>
	</Container>
</header>

<main id="content" class="site-main">
	<Container>
		{@render children()}
	</Container>
</main>

<style>
	.site-header {
		padding: 1rem 0;
	}

	.bar {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 0.75rem;
		justify-content: space-between;
	}

	.brand {
		text-decoration: none;
		color: var(--text);
		font-weight: 700;
		font-size: 1.1rem;
	}

	.nav {
		display: inline-flex;
		gap: 0.35rem;
	}

	.site-main {
		padding: 1rem 0 3rem;
	}
</style>
