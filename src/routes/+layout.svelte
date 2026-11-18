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
		//background: #833AB4;
		background-image: url("background.png");
		background-repeat: no-repeat;
		background-size: cover;
		margin: 0;
	}

	:global(#background) {
		background-color: rgb(255 255 255 / 0.6);
		backdrop-filter: blur(100px);
	}

</style>