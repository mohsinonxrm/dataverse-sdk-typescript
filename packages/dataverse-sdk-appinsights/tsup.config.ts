import { defineConfig } from "tsup";

export default defineConfig({
  // `browser` is the `./browser` export: it must never import `index`'s Node-only code (#158).
  entry: ["src/index.ts", "src/browser.ts"],
  format: ["esm"],
  dts: true,
  sourcemap: true,
  clean: true,
  treeshake: true,
});
