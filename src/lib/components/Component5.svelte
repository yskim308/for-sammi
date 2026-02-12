<script lang="ts">
  import dogBarking from "$lib/assets/reari-dog-barking.gif";
  import pom from "$lib/assets/pom.gif";

  // Props
  let { nextStage, triggerWrongAnswer, triggerCorrectAnswer } = $props<{
    nextStage: () => void;
    triggerWrongAnswer: () => void;
    triggerCorrectAnswer: () => void;
  }>();

  // State
  let noCount = $state(0);

  // Constants for scaling
  const GROWTH_FACTOR = 1.3; // How much Yes grows
  const SHRINK_FACTOR = 0.85; // How much No shrinks

  function handleNo() {
    triggerWrongAnswer(dogBarking, 500);
    noCount++;
  }

  function handleYes() {
    triggerCorrectAnswer(pom);
    setTimeout(() => {
      nextStage();
    }, 2000);
  }

  // Derive styles based on count
  // Yes grows exponentially: 1, 1.3, 1.69...
  let yesScale = $derived(Math.pow(GROWTH_FACTOR, noCount));

  // No shrinks: 1, 0.85, 0.72...
  let noScale = $derived(Math.pow(SHRINK_FACTOR, noCount));

  // Hide No entirely if it's too small to interact with
  let isNoVisible = $derived(noScale > 0.1);
</script>

<div class="wrapper">
  <header>
    <h1>Who Does Barker Like More?</h1>
  </header>

  <div class="button-container">
    <button
      class="btn yes-btn"
      onclick={handleYes}
      style="transform: scale({yesScale});"
    >
      Young Seo
    </button>

    {#if isNoVisible}
      <button
        class="btn no-btn"
        onclick={handleNo}
        style="transform: scale({noScale});"
      >
        Sammi
      </button>
    {/if}
  </div>
</div>

<style>
  .wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 100%;
    background-color: #ffebee;
    /* Light red/pink background */
    font-family: sans-serif;
    overflow: hidden;
    padding: 2rem;
    box-sizing: border-box;
  }

  header {
    margin-bottom: 3rem;
    text-align: center;
    z-index: 10;
  }

  h1 {
    font-size: 2.5rem;
    color: #d32f2f;
    margin: 0;
  }

  .button-container {
    display: flex;
    gap: 2rem;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    /* Ensure buttons don't overlap wildly immediately */
    min-height: 200px;
  }

  .btn {
    padding: 1rem 2.5rem;
    font-size: 1.5rem;
    font-weight: bold;
    border: none;
    border-radius: 50px;
    cursor: pointer;
    transition: all 0.2s ease;
    /* Smooth transition for color, not transform */
    /* transform transition handled by state update */
    white-space: nowrap;
  }

  .yes-btn {
    background-color: #4caf50;
    color: white;
    box-shadow: 0 4px 15px rgba(76, 175, 80, 0.3);
  }

  .yes-btn:hover {
    background-color: #43a047;
  }

  .no-btn {
    background-color: #f44336;
    color: white;
    box-shadow: 0 4px 15px rgba(244, 67, 54, 0.3);
  }

  .no-btn:hover {
    background-color: #e53935;
  }
</style>
