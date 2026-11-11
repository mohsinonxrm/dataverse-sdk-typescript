import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    include: ["test/**/*.int.test.ts"],
    environment: "node",
    // Live calls: allow for Dataverse latency, service-protection waits and the slow moments of
    // the shared dev org (a whole run has taken 1,670 s instead of ~900 s).
    testTimeout: 120_000,
    hookTimeout: 120_000,
    // One org, shared state: run files one at a time.
    fileParallelism: false,
    // No global `retry`: a test that creates records would create them again on the retry (#496).
    // A read-only or idempotent test may opt in with `it(name, { retry: 1 }, fn)`; the flaky
    // reporter lists any test that passed only on its retry.
    reporters: ["default", "./test/flaky-reporter.ts"],
  },
});
