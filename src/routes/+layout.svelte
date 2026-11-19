<script lang="ts">
	import favicon from '#lib/assets/favicon.svg';
	import type { LayoutProps } from './$types';

	let { children }: LayoutProps = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>


<div id="background">
	{@render children()}
</div>



<style lang="scss">

	:global(body) {
		background-image: url("/background.png");
		background-repeat: no-repeat;
		background-size: cover;
		background-attachment: fixed;
		margin: 0;
		font-family: Tahoma, Geneva, sans-serif;
		font-weight: 400;

	}

	:global(#background) {
		background-color: rgb(255 255 255 / 0.5);
		backdrop-filter: blur(100px);

	}

</style>