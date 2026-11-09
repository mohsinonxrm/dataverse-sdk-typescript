import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/cli.ts", "src/docs-cli.ts", "src/regen-cli.ts", "src/index.ts"],
  // A devDependency, used by regen-cli to format the output: load it, don't bundle it
  external: ["prettier"],
  format: ["esm"],
  target: "es2022",
  dts: true,
  sourcemap: true,
  clean: true,
  splitting: true,
});
