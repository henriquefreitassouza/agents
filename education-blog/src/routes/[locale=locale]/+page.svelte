<script lang="ts">
	import { page } from '$app/state';
	import { isSupportedLocale } from '$lib/i18n';
	import { t } from '$lib/locales';
	import { ButtonLink, SectionHeading, SurfaceCard } from '$lib';

	let locale = $derived.by(() => {
		const candidate = page.params.locale;
		return candidate && isSupportedLocale(candidate) ? candidate : 'en';
	});
</script>

<section class="hero">
	<SectionHeading
		title={t(locale, 'home.hero.title')}
		subtitle={t(locale, 'home.hero.subtitle')}
	/>
	<div class="actions">
		<ButtonLink href={`/${locale}/blog`} text={t(locale, 'home.hero.cta')} />
	</div>
</section>

<SurfaceCard>
	<div class="prose">
		<h2>{t(locale, 'home.ready.title')}</h2>
		<p>{t(locale, 'home.ready.text1')}</p>
		<p>{t(locale, 'home.ready.text2')}</p>
	</div>
</SurfaceCard>

<style>
	.hero {
		display: grid;
		gap: 1rem;
		margin-bottom: 1rem;
	}

	.actions {
		display: flex;
		gap: 0.5rem;
	}
</style>
