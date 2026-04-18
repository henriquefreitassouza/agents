<script lang="ts">
	let { children } = $props();
</script>

<div class="container">
	{@render children?.()}
</div>

<style>
	.container {
		width: min(var(--content-max), calc(100% - 2.5rem));
		margin: 0 auto;
	}
</style>
