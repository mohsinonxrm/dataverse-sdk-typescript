import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    environment: "node",
    include: ["packages/**/test/**/*.test.ts", "test/**/*.test.ts"],
    passWithNoTests: true,
    coverage: {
      reporter: ["text", "html"],
      include: ["packages/**/src/**/*.ts"],
      exclude: ["**/src/generated/**"],
    },
  },
});
