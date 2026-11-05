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
  },
});
