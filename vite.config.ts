import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { copyFileSync, mkdirSync } from "node:fs";

export default defineConfig({
  base: process.env.GITHUB_ACTIONS ? "/geoff-portfolio.github.io/" : "/",
  plugins: [
    react(),
    {
      name: "spa-404-fallback",
      closeBundle() {
        copyFileSync("dist/index.html", "dist/404.html");
        ["ai-ml", "xr"].forEach((route) => {
          mkdirSync(`dist/${route}`, { recursive: true });
          copyFileSync("dist/index.html", `dist/${route}/index.html`);
        });
      },
    },
  ],
  build: {
    chunkSizeWarningLimit: 1200,
  },
});
