<script lang="ts">
  import { onMount } from "svelte";

  import angryStitch from "$lib/assets/frustrated-stitch.gif";
  import alohaStitch from "$lib/assets/lilo-and-stitch-lets-do-it.gif";

  // Props definition
  let { nextStage, triggerWrongAnswer, triggerCorrectAnswer } = $props<{
    nextStage: () => void;
    triggerWrongAnswer: () => void;
    triggerCorrectAnswer: () => void;
  }>();

  // Types
  type Category = "month" | "day" | "year";

  interface Bubble {
    id: string;
    text: string;
    category: Category;
    x: number;
    y: number;
    vx: number;
    vy: number;
    radius: number;
    selected: boolean;
  }

  // Constants
  const TARGET_DATE = { month: "Jan", day: "14", year: "2003" };
  const MONTHS = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const YEARS = Array.from({ length: 21 }, (_, i) => (1990 + i).toString());
  const DAYS = Array.from({ length: 31 }, (_, i) => (1 + i).toString());

  // State
  let containerW = $state(0);
  let containerH = $state(0);
  let bubbles = $state<Bubble[]>([]);
  let containerRef: HTMLDivElement;

  // Initialize Bubbles
  function initBubbles() {
    const tempBubbles: Bubble[] = [];
    const createBubble = (text: string, category: Category): Bubble => ({
      id: `${category}-${text}`,
      text,
      category,
      x: Math.random() * (containerW - 100) + 50,
      y: Math.random() * (containerH - 100) + 50,
      vx: (Math.random() - 0.5) * 10, // Random velocity
      vy: (Math.random() - 0.5) * 10,
      radius: category === "year" ? 35 : category === "month" ? 32 : 28, // Vary size slightly
      selected: false,
    });

    MONTHS.forEach((m) => tempBubbles.push(createBubble(m, "month")));
    DAYS.forEach((d) => tempBubbles.push(createBubble(d, "day")));
    YEARS.forEach((y) => tempBubbles.push(createBubble(y, "year")));

    bubbles = tempBubbles;
  }

  // Interaction Logic
  function toggleBubble(id: string) {
    const index = bubbles.findIndex((b) => b.id === id);
    if (index === -1) return;

    const targetBubble = bubbles[index];

    // If we are selecting a bubble (not deselecting)
    if (!targetBubble.selected) {
      // Deselect any other bubble of the same category
      bubbles.forEach((b) => {
        if (b.category === targetBubble.category && b.selected) {
          b.selected = false;
        }
      });
      targetBubble.selected = true;
    } else {
      targetBubble.selected = false;
    }

    checkWinCondition();
  }

  function checkWinCondition() {
    const selected = bubbles.filter((b) => b.selected);

    // Wait until 3 items are selected
    if (selected.length === 3) {
      const sMonth = selected.find((b) => b.category === "month")?.text;
      const sDay = selected.find((b) => b.category === "day")?.text;
      const sYear = selected.find((b) => b.category === "year")?.text;

      if (
        sMonth === TARGET_DATE.month &&
        sDay === TARGET_DATE.day &&
        sYear === TARGET_DATE.year
      ) {
        triggerCorrectAnswer(alohaStitch);
        setTimeout(() => {
          nextStage();
        }, 2000);
      } else {
        triggerWrongAnswer(angryStitch);

        // ADDED: Wait 500ms, then deselect everything
        setTimeout(() => {
          bubbles.forEach((b) => {
            b.selected = false;
          });
        }, 500);
      }
    }
  }

  // Physics Engine
  $effect(() => {
    if (!containerW || !containerH || bubbles.length === 0) return;

    let animationFrame: number;

    const update = () => {
      // 1. Move and Wall Bounce
      for (let i = 0; i < bubbles.length; i++) {
        const b = bubbles[i];

        b.x += b.vx;
        b.y += b.vy;

        // Bounce X
        if (b.x - b.radius < 0) {
          b.x = b.radius;
          b.vx *= -1;
        } else if (b.x + b.radius > containerW) {
          b.x = containerW - b.radius;
          b.vx *= -1;
        }

        // Bounce Y
        if (b.y - b.radius < 0) {
          b.y = b.radius;
          b.vy *= -1;
        } else if (b.y + b.radius > containerH) {
          b.y = containerH - b.radius;
          b.vy *= -1;
        }
      }

      // 2. Resolve Collisions (Circle to Circle)
      // Simple elastic collision response
      for (let i = 0; i < bubbles.length; i++) {
        for (let j = i + 1; j < bubbles.length; j++) {
          const b1 = bubbles[i];
          const b2 = bubbles[j];

          const dx = b2.x - b1.x;
          const dy = b2.y - b1.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const minDist = b1.radius + b2.radius;

          if (distance < minDist) {
            // Overlap detected
            const angle = Math.atan2(dy, dx);
            const sin = Math.sin(angle);
            const cos = Math.cos(angle);

            // Resolve overlap (prevent sticking)
            const overlap = minDist - distance;
            const moveX = (overlap / 2) * cos;
            const moveY = (overlap / 2) * sin;

            b1.x -= moveX;
            b1.y -= moveY;
            b2.x += moveX;
            b2.y += moveY;

            // Swap velocities (approximate elastic collision)
            // Rotate velocity
            const vx1 = b1.vx * cos + b1.vy * sin;
            const vy1 = b1.vy * cos - b1.vx * sin;
            const vx2 = b2.vx * cos + b2.vy * sin;
            const vy2 = b2.vy * cos - b2.vx * sin;

            // Swap normal velocities
            const vx1Final = vx2;
            const vx2Final = vx1;

            // Rotate back
            b1.vx = vx1Final * cos - vy1 * sin;
            b1.vy = vy1 * cos + vx1Final * sin;
            b2.vx = vx2Final * cos - vy2 * sin;
            b2.vy = vy2 * cos + vx2Final * sin;
          }
        }
      }

      animationFrame = requestAnimationFrame(update);
    };

    animationFrame = requestAnimationFrame(update);

    return () => cancelAnimationFrame(animationFrame);
  });

  // Initialize on mount (once container dimensions are known)
  onMount(() => {
    const observer = new ResizeObserver((entries) => {
      for (let entry of entries) {
        containerW = entry.contentRect.width;
        containerH = entry.contentRect.height;
        if (bubbles.length === 0) initBubbles();
      }
    });

    if (containerRef) observer.observe(containerRef);

    return () => observer.disconnect();
  });
</script>

<div class="wrapper">
  <header>
    <h1>Select your birthday</h1>
    <p class="hint">good luck lol</p>
  </header>

  <div class="game-area" bind:this={containerRef}>
    {#each bubbles as bubble (bubble.id)}
      <div
        class="bubble {bubble.category} {bubble.selected ? 'selected' : ''}"
        style="
                    left: {bubble.x}px; 
                    top: {bubble.y}px; 
                    width: {bubble.radius * 2}px; 
                    height: {bubble.radius * 2}px;
                "
        onmousedown={() => toggleBubble(bubble.id)}
        ontouchstart={() => toggleBubble(bubble.id)}
      >
        <span>{bubble.text}</span>
      </div>
    {/each}
  </div>
</div>

<style>
  .wrapper {
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
    overflow: hidden;
    background: #f0f4f8;
    font-family: sans-serif;
  }

  header {
    text-align: center;
    padding: 1rem;
    background: #fff;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
    z-index: 10;
  }

  h1 {
    margin: 0;
    font-size: 1.5rem;
    color: #333;
  }

  .hint {
    margin: 0;
    font-size: 0.8rem;
    color: #666;
  }

  .game-area {
    flex: 1;
    position: relative;
    overflow: hidden;
    cursor: crosshair;
  }

  .bubble {
    position: absolute;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    font-size: 0.9rem;
    user-select: none;
    cursor: pointer;
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1);
    transition:
      transform 0.1s,
      background-color 0.2s,
      border 0.2s;
    transform: translate(-50%, -50%);
    /* Center anchor */
    border: 2px solid transparent;
  }

  .bubble:hover {
    z-index: 5;
    transform: translate(-50%, -50%) scale(1.1);
  }

  /* Category Colors */
  .month {
    background-color: #e3f2fd;
    color: #1565c0;
  }

  .day {
    background-color: #e8f5e9;
    color: #2e7d32;
  }

  .year {
    background-color: #fff3e0;
    color: #ef6c00;
  }

  /* Selected State */
  .bubble.selected {
    border-color: #333;
    z-index: 10;
    transform: translate(-50%, -50%) scale(1.15);
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  }

  .month.selected {
    background-color: #2196f3;
    color: white;
  }

  .day.selected {
    background-color: #4caf50;
    color: white;
  }

  .year.selected {
    background-color: #ff9800;
    color: white;
  }
</style>
