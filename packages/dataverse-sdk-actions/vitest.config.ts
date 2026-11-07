import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    include: ["test/**/*.test.ts"],
    environment: "node",
    // Some tests type-check generated code with the TypeScript compiler inside the test, which
    // takes several seconds on a busy CI runner (the default 5 s timeout was hit: #330).
    testTimeout: 60_000,
  },
});
