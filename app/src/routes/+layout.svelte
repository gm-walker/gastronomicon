<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
</script>

<svelte:head>
	<title>Gastronomicon</title>
	<meta name="description" content="A flavor-pairing app that'll allow you to find pairings amongst your ingredients.">
	<link rel="icon" href={favicon} />
</svelte:head>
{@render children()}
