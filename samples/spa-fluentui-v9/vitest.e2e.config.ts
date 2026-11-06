import { defineConfig } from "vitest/config";

// Browser smoke tests: build the app, serve it with `vite preview` and drive it in Chromium
// with Playwright, in demo mode (no org, no secrets).
export default defineConfig({
  test: {
    include: ["test/e2e/**/*.e2e.test.ts"],
    environment: "node",
    testTimeout: 60_000,
    hookTimeout: 180_000,
    fileParallelism: false,
  },
});
