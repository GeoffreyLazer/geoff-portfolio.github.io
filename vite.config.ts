import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { copyFileSync } from "node:fs";

export default defineConfig({
  base: process.env.GITHUB_ACTIONS ? "/geoff-portfolio.github.io/" : "/",
  plugins: [
    react(),
    {
      name: "spa-404-fallback",
      closeBundle() {
        copyFileSync("dist/index.html", "dist/404.html");
      },
    },
  ],
  build: {
    chunkSizeWarningLimit: 1200,
  },
});
