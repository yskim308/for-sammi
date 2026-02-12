<script lang="ts">
    const { nextStage, triggerWrongAnswer, triggerCorrectAnswer } = $props();

    import owIsCalling from '$lib/assets/overwatch-calling.gif';
    import owRankUP from '$lib/assets/ow-rankup.gif';

    import moira from '$lib/assets/moira.webp';
    import genji from '$lib/assets/genji.webp';
    import mauga from '$lib/assets/OW2_Mauga.webp';

    const options = [
        { 
            id: 1, 
            alt: "Correct Answer", 
            image: moira,
            isCorrect: true 
        },
        { 
            id: 2, 
            alt: "Wrong Answer 1", 
            image: genji,
            isCorrect: false 
        },
        { 
            id: 3, 
            alt: "Wrong Answer 2", 
            image: mauga,
            isCorrect: false 
        }
    ];

    function handleOptionClick(isCorrect: boolean) {
        if (isCorrect) {
            triggerCorrectAnswer(owRankUP);
            setTimeout(() => {
              nextStage();
            }, 2000)
        } else {
            triggerWrongAnswer(owIsCalling);
        }
    }
</script>

<div class="stage-container">
    <h2>Which Hero is Sammi's Most Played?</h2>
    <p class="instruction">oviewatch :3</p>
    
    <div class="cards-container">
        {#each options as option (option.id)}
            <div 
                class="card" 
                onclick={() => handleOptionClick(option.isCorrect)}
            >
                <div class="card-image">
                    <img src={option.image} alt={option.alt} />
                </div>
            </div>
        {/each}
    </div>
</div>

<style>
    .stage-container {
        text-align: center;
        padding: 2rem;
        background: url('$lib/assets/ow-loading.webp');
        width: 100vw;
        height: 100vh;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        color: white;
    }

    h2 {
        color: white;
        margin-bottom: 1rem;
        font-size: 2.5rem;
        text-shadow: 2px 2px 4px rgba(0,0,0,0.8);
    }

    .instruction {
        color: rgba(255,255,255,0.8);
        margin-bottom: 3rem;
        font-size: 1.2rem;
    }

    .cards-container {
        display: flex;
        gap: 2rem;
        justify-content: center;
        align-items: center;
        flex-wrap: wrap;
        max-width: 1200px;
    }

    .card {
        background: rgba(255,255,255,0.1);
        border: 3px solid rgba(255,255,255,0.3);
        border-radius: 15px;
        padding: 1.5rem;
        cursor: pointer;
        transition: all 0.3s ease;
        backdrop-filter: blur(10px);
        min-width: 250px;
        max-width: 300px;
    }

    .card:hover {
        transform: translateY(-5px);
        background: rgba(255,255,255,0.2);
        border-color: rgba(255,255,255,0.5);
        box-shadow: 0 10px 30px rgba(0,0,0,0.3);
    }

    .card:active {
        transform: translateY(-2px);
    }

    .card-image {
        width: 200px;
        height: 200px;
        margin: 0 auto 1rem;
        border-radius: 10px;
        overflow: hidden;
        background: rgba(0,0,0,0.2);
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .card-image img {
        max-width: 100%;
        max-height: 100%;
        object-fit: cover;
    }

    .card-title {
        font-size: 1.2rem;
        font-weight: bold;
        color: white;
        text-shadow: 1px 1px 2px rgba(0,0,0,0.8);
    }
</style>
