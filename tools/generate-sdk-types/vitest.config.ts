import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    include: ["test/**/*.test.ts"],
    environment: "node",
    // Some tests type-check generated code with the TypeScript compiler, which takes several
    // seconds on a slow CI runner.
    testTimeout: 60_000,
  },
});
