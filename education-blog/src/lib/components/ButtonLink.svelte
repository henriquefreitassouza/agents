<script lang="ts">
	let { href, text, tone = 'solid' } = $props<{
		href: string;
		text: string;
		tone?: 'solid' | 'ghost';
	}>();
</script>

<a {href} class:tone-solid={tone === 'solid'} class:tone-ghost={tone === 'ghost'}>
	{text}
</a>

<style>
	a {
		text-decoration: none;
		padding: 0.5rem 0.85rem;
		border-radius: var(--radius-sm);
		border: 1px solid transparent;
		font-weight: 600;
	}

	.tone-solid {
		background: var(--primary);
		color: #fff;
		box-shadow: var(--shadow-sm);
	}

	.tone-ghost {
		border-color: var(--border);
		background: var(--surface);
		color: var(--text);
	}
</style>
