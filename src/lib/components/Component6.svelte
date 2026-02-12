<script lang="ts">
  import { onMount } from "svelte";

  let { nextStage, triggerWrongAnswer, triggerCorrectAnswer } = $props<{
    nextStage: () => void;
    triggerWrongAnswer: () => void;
    triggerCorrectAnswer: () => void;
  }>();

  // State
  let btnX = $state(0);
  let btnY = $state(0);
  let isInitialized = $state(false);

  // Container refs
  let containerW = 0;
  let containerH = 0;
  let containerRef: HTMLDivElement;

  // Button dimensions (Approximation for bounds checking)
  const BTN_W = 150;
  const BTN_H = 60;
  const PADDING = 150;

  function handleCorrect() {
    triggerCorrectAnswer();
    nextStage();
  }

  function handleWrong() {
    triggerWrongAnswer();
  }

  function handleMouseMove(e: MouseEvent) {
    if (!containerRef || !isInitialized) return;

    const mouseX = e.clientX;
    const mouseY = e.clientY;
    const rect = containerRef.getBoundingClientRect();

    // Current button center
    const btnCenterX = rect.left + btnX + BTN_W / 2;
    const btnCenterY = rect.top + btnY + BTN_H / 2;

    const distX = mouseX - btnCenterX;
    const distY = mouseY - btnCenterY;
    const distance = Math.sqrt(distX * distX + distY * distY);

    // 1. TELEPORT if mouse gets too close (Speed check)
    if (distance < 80) {
      teleport();
      return;
    }

    // 2. REPULSION
    const threshold = 300;
    if (distance < threshold) {
      const angle = Math.atan2(distY, distX);
      const force = (threshold - distance) * 0.8;

      // Calculate target position (Away from mouse)
      let newX = btnX - Math.cos(angle) * force;
      let newY = btnY - Math.sin(angle) * force;

      // 3. BOUNDARY CHECK (The Fix)
      // Define the safe area
      const minX = PADDING;
      const maxX = containerW - BTN_W - PADDING;
      const minY = PADDING;
      const maxY = containerH - BTN_H - PADDING;

      // If the movement pushes it out of bounds, teleport it instead
      if (newX < minX || newX > maxX || newY < minY || newY > maxY) {
        teleport();
      } else {
        btnX = newX;
        btnY = newY;
      }
    }
  }

  function teleport() {
    if (!containerW || !containerH) return;

    // Random position strictly within the Safe Zone
    const minX = PADDING;
    const maxX = containerW - BTN_W - PADDING;
    const minY = PADDING;
    const maxY = containerH - BTN_H - PADDING;

    btnX = Math.random() * (maxX - minX) + minX;
    btnY = Math.random() * (maxY - minY) + minY;
  }

  onMount(() => {
    const observer = new ResizeObserver((entries) => {
      for (let entry of entries) {
        containerW = entry.contentRect.width;
        containerH = entry.contentRect.height;
        if (!isInitialized) {
          teleport(); // Start in a valid spot
          isInitialized = true;
        }
      }
    });

    if (containerRef) observer.observe(containerRef);

    return () => observer.disconnect();
  });
</script>

<div class="wrapper" bind:this={containerRef} onmousemove={handleMouseMove}>
  <header>
    <h1>Sammi Verified! Will you be my valentine?</h1>
  </header>

  <div class="game-area">
    <button class="btn yes-btn" onclick={handleCorrect}> Yes </button>

    {#if isInitialized}
      <button
        class="btn no-btn"
        style="
					left: {btnX}px; 
					top: {btnY}px;
					width: {BTN_W}px;
					height: {BTN_H}px;
				"
        onclick={handleWrong}
        tabindex="-1"
      >
        No
      </button>
    {/if}
  </div>
</div>

<style>
  .wrapper {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
    background: url("$lib/assets/cat-love.gif");
    font-family: sans-serif;
    display: flex;
    flex-direction: column;
  }

  header {
    text-align: center;
    padding-top: 3rem;
    pointer-events: none;
    user-select: none;
  }

  h1 {
    font-size: 2.5rem;
    color: #ff1493;
  }

  .game-area {
    flex: 1;
    position: relative;
  }

  .btn {
    font-size: 1.5rem;
    font-weight: bold;
    border: none;
    border-radius: 50px;
    cursor: pointer;
    position: absolute;
    /* No transition for instant reaction */
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .yes-btn {
    left: 50%;
    top: 50%;
    width: 150px;
    height: 60px;
    transform: translate(-50%, -50%);
    background-color: #4caf50;
    color: white;
    box-shadow: 0 4px 10px rgba(76, 175, 80, 0.3);
    z-index: 5;
  }

  .no-btn {
    background-color: #ef5350;
    color: white;
    box-shadow: 0 4px 10px rgba(239, 83, 80, 0.3);
    z-index: 10;
  }
</style>
