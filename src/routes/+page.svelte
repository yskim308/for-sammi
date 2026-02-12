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
	main {
		display: flex;
		justify-content: center;
		align-items: center;
		min-height: 100vh;
		margin: 0;
		font-family: Arial, sans-serif;
	}
</style>