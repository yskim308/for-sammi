<script lang="ts">
	export let nextStage: () => void;
</script>

<div class="stage-container">
	<h2>Hello from Component1</h2>
	<p>This is stage 1 of the application</p>
	<button on:click={nextStage}>Continue to Component2</button>
</div>

<style>
	.stage-container {
		text-align: center;
		padding: 2rem;
		border: 2px solid #e0e0e0;
		border-radius: 8px;
		background: #f9f9f9;
		min-width: 300px;
	}

	h2 {
		color: #333;
		margin-bottom: 1rem;
	}

	p {
		margin-bottom: 2rem;
		color: #666;
	}

	button {
		background: #007bff;
		color: white;
		border: none;
		padding: 12px 24px;
		border-radius: 4px;
		cursor: pointer;
		font-size: 16px;
		transition: background-color 0.2s;
	}

	button:hover {
		background: #0056b3;
	}
</style>