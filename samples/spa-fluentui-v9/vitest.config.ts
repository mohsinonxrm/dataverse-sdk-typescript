import { defineConfig } from "vitest/config";

// Unit tests: the scenario functions, the request inspector and the snippets, run in Node
// against the SDK's recording fake fetch. The browser smoke tests are in vitest.e2e.config.ts.
export default defineConfig({
  test: {
    include: ["test/unit/**/*.test.ts"],
    environment: "node",
  },
});
