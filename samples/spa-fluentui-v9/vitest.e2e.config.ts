import { defineConfig } from "vitest/config";

// Browser smoke tests: build the app once (test/e2e/globalSetup.ts), serve it with `vite preview`
// and the response headers of public/staticwebapp.config.json, and drive it in Chromium
// with Playwright, in demo mode (no org, no secrets).
export default defineConfig({
  test: {
    include: ["test/e2e/**/*.e2e.test.ts"],
    environment: "node",
    testTimeout: 60_000,
    hookTimeout: 180_000,
    fileParallelism: false,
    globalSetup: ["test/e2e/globalSetup.ts"],
  },
});
