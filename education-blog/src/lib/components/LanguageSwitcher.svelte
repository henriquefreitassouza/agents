<script lang="ts">
	import { page } from '$app/state';
	import { LOCALE_LABELS, SUPPORTED_LOCALES, type AppLocale } from '$lib/i18n';
	import { getTranslatedSlug } from '$lib/posts';

	let currentLocale = $derived((page.params.locale as AppLocale | undefined) ?? 'en');
	let currentPathname = $derived(page.url.pathname);
	let currentRouteId = $derived(page.route.id ?? '');

	function localizedPath(targetLocale: AppLocale): string {
		const segments = currentPathname.split('/').filter(Boolean);
		if (segments.length === 0) return `/${targetLocale}`;

		if (currentRouteId === '/[locale=locale]/blog/[slug]') {
			const slug = segments.at(-1);
			if (slug) {
				const translatedSlug = getTranslatedSlug(currentLocale, slug, targetLocale);
				if (translatedSlug) {
					return `/${targetLocale}/blog/${translatedSlug}`;
				}
				return `/${targetLocale}/blog`;
			}
		}

		segments[0] = targetLocale;
		return `/${segments.join('/')}`;
	}
</script>

<nav class="switcher" aria-label="Language switcher">
	{#each SUPPORTED_LOCALES as locale}
		<a href={localizedPath(locale)} aria-current={locale === currentLocale ? 'page' : undefined}>
			{LOCALE_LABELS[locale]}
		</a>
	{/each}
</nav>

<style>
	.switcher {
		display: inline-flex;
		gap: 0.35rem;
		padding: 0.25rem;
		border: 1px solid var(--border);
		border-radius: 999px;
		background: var(--surface);
	}

	a {
		text-decoration: none;
		color: var(--text-muted);
		padding: 0.25rem 0.6rem;
		border-radius: 999px;
		font-size: 0.85rem;
		font-weight: 600;
	}

	a[aria-current='page'] {
		background: var(--primary-soft);
		color: var(--primary);
	}
</style>
