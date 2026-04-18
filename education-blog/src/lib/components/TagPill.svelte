<script lang="ts">
	let { label } = $props<{ label: string }>();
</script>

<span>{label}</span>

<style>
	span {
		display: inline-flex;
		align-items: center;
		padding: 0.22rem 0.62rem;
		border-radius: 999px;
		font-size: 0.8rem;
		background: var(--primary-soft);
		color: var(--primary);
	}
</style>
