import adapter from "@sveltejs/adapter-static"; // Change this import
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";

const config = {
  preprocess: vitePreprocess(),

  kit: {
    adapter: adapter({
      pages: "build",
      assets: "build",
      fallback: "404.html", // Important for SPA behavior on GitHub Pages
      precompress: false,
      strict: true,
    }),

    paths: {
      base: process.env.NODE_ENV === "production" ? "/for-sammi" : "",
    },
  },
};

export default config;
