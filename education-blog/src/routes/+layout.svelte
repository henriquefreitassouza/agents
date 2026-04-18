<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import { ButtonLink, Container } from '$lib';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>Education Blog</title>
</svelte:head>

<div class="shell">
	<header class="site-header">
		<Container>
			<div class="header-content">
				<a href="/" class="brand">Education Blog</a>
				<nav>
					<ButtonLink href="/blog" text="Blog" tone="ghost" />
				</nav>
			</div>
		</Container>
	</header>

	<main class="main">
		{@render children()}
	</main>
</div>

<style>
	.shell {
		min-height: 100dvh;
		padding: 1.4rem 0 3rem;
	}

	.site-header {
		margin-bottom: 2rem;
	}

	.header-content {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0.75rem;
		background: color-mix(in oklab, var(--surface) 94%, white);
		border-radius: var(--radius-lg);
		border: 1px solid var(--border);
		box-shadow: var(--shadow-sm);
	}

	.brand {
		text-decoration: none;
		color: var(--text);
		font-weight: 800;
		letter-spacing: -0.02em;
		padding-left: 0.4rem;
	}

	.main {
		padding: 0.4rem 0;
	}
</style>
