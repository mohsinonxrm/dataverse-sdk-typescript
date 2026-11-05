import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    environment: "node",
    include: ["packages/**/test/**/*.test.ts", "test/**/*.test.ts"],
    passWithNoTests: true,
    coverage: {
      reporter: ["text", "html", "lcov"],
      include: ["packages/**/src/**/*.ts"],
      exclude: ["**/src/generated/**", "**/src/index.ts"],
      thresholds: {
        lines: 80,
        functions: 80,
        branches: 75,
        statements: 80,
      },
    },
  },
});
