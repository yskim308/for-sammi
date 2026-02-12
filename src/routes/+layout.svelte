<script lang="ts">
  export const prerender = true;
  export const ssr = false; // Optional, but usually safer for pure static sites
  export const trailingSlash = "always"; // Optional, helps with some hosting quirks
  import favicon from "$lib/assets/favicon.svg";

  let { children } = $props();
</script>

<svelte:head>
  <link rel="icon" href={favicon} />
</svelte:head>

{@render children()}
