<script lang="ts">
    const { nextStage, triggerWrongAnswer, triggerCorrectAnswer } = $props();
    import amongUsTwerk from '$lib/assets/among-us-twerk.gif';
    import amongUsDance from '$lib/assets/amongus-dance.gif';

    const prefix = "remybob";
    const targetAnswer = "tato"; 

    let userInput = $state('');

    let displayedUnderscores = $derived(
        '_'.repeat(Math.max(0, targetAnswer.length - userInput.length))
    );

    // Auto-Check Logic (Runs automatically when userInput changes)
    $effect(() => {
        if (userInput.length >= targetAnswer.length) {
            if (userInput.toLowerCase() === targetAnswer) {
                triggerCorrectAnswer(amongUsDance);
                setTimeout(() => {
                  nextStage();
                }, 2000)
            } else {
                triggerWrongAnswer(amongUsTwerk);
                userInput = ''; 
            }
        }
    });
</script>

<div class="stage-container">
    <h2>Fill in the Blank</h2>

    <div class="puzzle-wrapper">
        
        <div class="puzzle-text">
            <span class="prefix">{prefix}</span>
            <span class="typed-text">{userInput}</span>
            <span class="underscores">{displayedUnderscores}</span>
        </div>

        <input 
            class="ghost-input"
            type="text"
            bind:value={userInput}
            maxlength={targetAnswer.length}
        />
    </div>

    <p class="instruction">Type to fill the letters...</p>
</div>

<style>
    /* ... keep your existing .stage-container styles ... */
    .stage-container {
        text-align: center;
        padding: 2rem;
        background: url('$lib/assets/amongus-bg.jpg');
        width: 100vw;
        height: 100vh;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        color: white;
    }

    /* THE MAGIC WRAPPER */
    .puzzle-wrapper {
        position: relative; /* Needed to stack the input on top */
        display: inline-block;
        margin-bottom: 2rem;
        cursor: text; /* Show text cursor so user knows to click */
    }

    /* The Visual Text Styling */
    .puzzle-text {
        font-size: 3rem;
        font-weight: bold;
        font-family: 'Courier New', monospace;
        letter-spacing: 0.2rem;
        background: rgba(255,255,255,0.1);
        padding: 1.5rem 3rem;
        border-radius: 15px;
        border: 3px solid rgba(255,255,255,0.3);
        backdrop-filter: blur(10px);
        
        /* Ensure the visual text doesn't block clicks to the input */
        pointer-events: none; 
    }

    .typed-text {
        color: #ffd700; /* Gold color for typed letters */
    }

    .underscores {
        color: rgba(255,255,255,0.5);
    }

    /* The Invisible Input */
    .ghost-input {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        opacity: 0; /* INVISIBLE! */
        cursor: text;
        
        /* Stop mobile browsers from zooming in */
        font-size: 3rem; 
    }

    .instruction {
        opacity: 0.7;
        margin-top: 1rem;
    }
</style>
