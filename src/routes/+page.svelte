<script lang="ts">
  import defaultWrongAnswerGif from "$lib/assets/among-us-twerk.gif";
  import defaultCorrectAnswerGif from "$lib/assets/amongus-dance.gif";

  import Component1 from "$lib/components/Component1.svelte";
  import Component2 from "$lib/components/Component2.svelte";
  import Component3 from "$lib/components/Component3.svelte";
  import Component4 from "$lib/components/Component4.svelte";
  import Component5 from "$lib/components/Component5.svelte";
  import Component6 from "$lib/components/Component6.svelte";

  // FIX: Use $state() for variables that will change
  let currentStage = $state(0);
  let wrongAnswerGif = $state("");
  let correctAnswerGif = $state("");

  const components = [
    Component1,
    Component2,
    Component3,
    Component4,
    Component5,
    Component6,
  ];

  // Svelte 5 Helper: Derive the current component so it updates automatically
  let CurrentComponent = $derived(components[currentStage]);

  // Set stage from URL parameter after component mounts
  $effect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const stageParam = urlParams.get("stage");
    if (stageParam) {
      currentStage = parseInt(stageParam);
    }
  });

  function nextStage() {
    if (currentStage < 6) {
      currentStage++;
    }
  }

  function triggerWrongAnswer(
    gifPath: string = defaultWrongAnswerGif,
    timeout: number = 2000,
  ) {
    wrongAnswerGif = gifPath;
    setTimeout(() => {
      wrongAnswerGif = "";
    }, timeout);
  }

  function triggerCorrectAnswer(gifPath: string = defaultCorrectAnswerGif) {
    correctAnswerGif = gifPath;
    setTimeout(() => {
      correctAnswerGif = "";
    }, 2000);
  }
</script>

<main>
  {#if wrongAnswerGif}
    <div class="explosion-overlay">
      <img src={wrongAnswerGif} alt="Wrong Answer" />
    </div>
  {/if}

  {#if correctAnswerGif}
    <div class="explosion-overlay">
      <img src={correctAnswerGif} alt="Correct Answer" />
    </div>
  {/if}

  {#if CurrentComponent}
    <CurrentComponent {nextStage} {triggerWrongAnswer} {triggerCorrectAnswer} />
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
