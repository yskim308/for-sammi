<script lang="ts">
  let { nextStage, triggerWrongAnswer, triggerCorrectAnswer } = $props<{
    nextStage: () => void;
    triggerWrongAnswer: () => void;
    triggerCorrectAnswer: () => void;
  }>();

  function handleContinue() {
    triggerCorrectAnswer();
    nextStage();
  }
</script>

<div class="wrapper">
  <header>
    <h1>Happy Valentines Day :)</h1>
  </header>

  <div class="model-window">
    <div class="crop-container">
      <iframe
        title="Heart in Love"
        frameborder="0"
        allow="autoplay; fullscreen; xr-spatial-tracking"
        src="https://sketchfab.com/models/f39ce19b92e246268f4c501b72ea7d0e/embed?autostart=1&transparent=1&ui_controls=0&ui_infos=0&ui_inspector=0&ui_stop=0&ui_watermark=0&ui_hint=0"
      >
      </iframe>
    </div>
  </div>
  <p class="tiny-credit">Model by Azamuki</p>
</div>

<style>
  .wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 100%;
    /* Create a soft gradient to make the 3D model pop */
    background: radial-gradient(circle at center, #fff0f3 0%, #ffebee 100%);
    font-family: sans-serif;
    overflow: hidden;
  }

  header {
    margin-bottom: 2rem;
    z-index: 10;
  }

  h1 {
    font-size: 3rem;
    color: #e91e63;
    margin: 0;
    text-shadow: 0 2px 4px rgba(233, 30, 99, 0.1);
  }

  .model-window {
    width: 100%;
    max-width: 500px;
    height: 400px;
    position: relative;
    /* This is crucial for the "Native" look */
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .crop-container {
    width: 100%;
    height: 100%;
    overflow: hidden;
    /* Hide the parts of iframe we push out */
    position: relative;
    border-radius: 20px;
    /* No border or background color here to ensure transparency works */
  }

  iframe {
    width: 120%;
    /* Make it wider to zoom in slightly */
    height: 130%;
    /* Make it taller to push bottom bar away */
    border: none;

    /* Center the zoomed iframe */
    margin-left: -10%;
    margin-top: -5%;
    /* Pull it up slightly */

    /* Ensure background is transparent */
    background: transparent;
  }

  .continue-btn {
    margin-top: 1rem;
    padding: 1rem 4rem;
    font-size: 1.8rem;
    background-color: #e91e63;
    color: white;
    border: none;
    border-radius: 50px;
    cursor: pointer;
    box-shadow: 0 4px 15px rgba(233, 30, 99, 0.4);
    transition:
      transform 0.2s,
      background-color 0.2s;
    z-index: 20;
  }

  .continue-btn:hover {
    background-color: #d81b60;
    transform: scale(1.05);
  }

  .tiny-credit {
    font-size: 10px;
    color: #ffcdd2;
    /* Very subtle text */
    margin-top: 20px;
  }
</style>
