<script lang="ts">

  import wrongAnwerGif from '$lib/assets/among-us-twerk.gif';

	import Component1 from '$lib/components/Component1.svelte';
	import Component2 from '$lib/components/Component2.svelte';
	import Component3 from '$lib/components/Component3.svelte';
	import Component4 from '$lib/components/Component4.svelte';

	let currentStage = 0;
	let wrongAnswerGif = '';

	const components = [
		Component1,
		Component2,
		Component3,
		Component4
	];

	function nextStage() {
		if (currentStage < 3) {
			currentStage++;
		}
	}

	function triggerWrongAnswer(gifPath: string = wrongAnwerGif) {
		wrongAnswerGif = gifPath;
		setTimeout(() => {
			wrongAnswerGif = '';
		}, 1000);
	}
</script>

<main>
	{#if wrongAnswerGif}
		<div class="explosion-overlay">
			<img src={wrongAnswerGif} alt="Wrong Answer" />
		</div>
	{/if}
	{#if components[currentStage]}
		<svelte:component this={components[currentStage]} {nextStage} {triggerWrongAnswer} />
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
		position: relative;
	}
	
	.explosion-overlay {
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		display: flex;
		justify-content: center;
		align-items: center;
		background: rgba(0, 0, 0, 0.8);
		z-index: 1000;
	}
	
	.explosion-overlay img {
		max-width: 80%;
		max-height: 80%;
		object-fit: contain;
	}
</style>
