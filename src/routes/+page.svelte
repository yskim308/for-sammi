<script lang="ts">
	import Component1 from '$lib/components/Component1.svelte';
	import Component2 from '$lib/components/Component2.svelte';
	import Component3 from '$lib/components/Component3.svelte';
	import Component4 from '$lib/components/Component4.svelte';

	let currentStage = 1;

	const components: Record<number, typeof Component1> = {
		1: Component1,
		2: Component2,
		3: Component3,
		4: Component4
	};

	function nextStage() {
		if (currentStage < 4) {
			currentStage++;
		}
	}
</script>

<main>
	{#if components[currentStage]}
		<svelte:component this={components[currentStage]} {nextStage} />
	{/if}
</main>

<style>
	:global(body, html) {
		margin: 0;
		padding: 0;
		width: 100%;
		height: 100%;
		overflow: hidden;
	}
	
	main {
		margin: 0;
		padding: 0;
		font-family: Arial, sans-serif;
		width: 100vw;
		height: 100vh;
		display: block;
	}
</style>
