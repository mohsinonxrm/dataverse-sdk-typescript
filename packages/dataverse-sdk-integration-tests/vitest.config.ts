import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    include: ["test/**/*.int.test.ts"],
    environment: "node",
    // Live calls: allow for Dataverse latency and service-protection waits.
    testTimeout: 60_000,
    hookTimeout: 60_000,
    // One org, shared state: run files one at a time.
    fileParallelism: false,
    // A failed test runs once more before it fails the suite: a slow or busy moment of the dev
    // org (a 60 s timeout, a cached metadata read) shouldn't fail a release. A test that passes
    // only on the retry is listed by the flaky reporter and annotated on GitHub Actions.
    retry: 1,
    reporters: ["default", "./test/flaky-reporter.ts"],
  },
});
