import { defineConfig } from "vite";

// Builds app/ the way a consumer SPA would: production mode, no polyfills for Node built-ins.
export default defineConfig({
  root: "app",
  base: "./",
  logLevel: "warn",
  build: {
    outDir: "../dist",
    emptyOutDir: true,
    // Keep the bundle readable so the static checks can report what they find.
    minify: false,
    sourcemap: false,
  },
});
