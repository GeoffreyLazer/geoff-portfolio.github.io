import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: process.env.GITHUB_ACTIONS ? "/geoff-portfolio.github.io/" : "/",
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 1200,
  },
});
