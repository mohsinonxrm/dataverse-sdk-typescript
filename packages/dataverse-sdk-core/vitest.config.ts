import { readFileSync } from "node:fs";
import { defineConfig } from "vitest/config";

const { version } = JSON.parse(
  readFileSync(new URL("./package.json", import.meta.url), "utf8")
) as {
  version: string;
};

// Same define as tsup.config.ts, so tests run against the real version.
export default defineConfig({
  define: { __SDK_VERSION__: JSON.stringify(version) },
});
