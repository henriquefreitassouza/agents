<script lang="ts">
	let { children, padded = true } = $props<{
		children: any;
		padded?: boolean;
	}>();
</script>

<article class:padded>
	{@render children?.()}
</article>

<style>
	article {
		background: var(--surface);
		border: 1px solid var(--border);
		border-radius: var(--radius-md);
		box-shadow: var(--shadow-sm);
	}

	.padded {
		padding: 1.25rem;
	}
</style>
