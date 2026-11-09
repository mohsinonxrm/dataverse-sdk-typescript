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
  test: {
    // Coverage gate (#41): `pnpm test` fails when core's coverage drops below these. They sit a
    // little under the current numbers (about 88% lines, 85% branches); raise them as tests grow.
    coverage: {
      enabled: true,
      provider: "v8",
      include: ["src/**/*.ts"],
      exclude: ["src/index.ts", "src/**/index.ts"],
      reporter: ["text-summary"],
      thresholds: { statements: 85, branches: 80, functions: 85, lines: 85 },
    },
  },
});
