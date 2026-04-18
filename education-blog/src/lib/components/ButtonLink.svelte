<script lang="ts">
	let {
		href,
		text,
		tone = 'solid',
		ariaCurrent = false,
		ariaLabel
	} = $props<{
		href: string;
		text: string;
		tone?: 'solid' | 'ghost';
		ariaCurrent?: boolean;
		ariaLabel?: string;
	}>();
</script>

<a
	{href}
	class:tone-solid={tone === 'solid'}
	class:tone-ghost={tone === 'ghost'}
	aria-current={ariaCurrent ? 'page' : undefined}
	aria-label={ariaLabel}
>
	{text}
</a>

<style>
	a {
		text-decoration: none;
		padding: 0.55rem 1rem;
		min-height: 44px;
		min-width: 44px;
		display: inline-flex;
		align-items: center;
		justify-content: center;
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
