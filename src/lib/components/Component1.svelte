<script lang="ts">
	export let nextStage: () => void;
</script>

<div class="stage-container">
	<h2>For Sammi Only</h2>
	<p>Verify that you are sammi</p>
	<button on:click={nextStage}>verify</button>
</div>

<style>
	.stage-container {
		text-align: center;
		padding: 2rem;
		background:	#4ebcff url('$lib/assets/stichie Background Removed.png') center/cover;
		width: 100vw;
		height: 100vh;
		position: relative;
		color: white;
		text-shadow: 2px 2px 4px rgba(0,0,0,0.8);
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	h2 {
		color: white;
		margin-bottom: 1rem;
		font-size: 2.5rem;
	}

	p {
		margin-bottom: 2rem;
		color: white;
		font-size: 1.2rem;
	}

	button {
		background: #2972b6;
		color: white;
		border: 2px solid white;
		padding: 12px 24px;
		border-radius: 25px;
		cursor: pointer;
		font-size: 16px;
		font-weight: bold;
		transition: all 0.2s;
		box-shadow: 0 4px 8px rgba(0,0,0,0.3);
	}

	button:hover {
		background: #4ebcff;
		transform: scale(1.05);
	}
</style>
