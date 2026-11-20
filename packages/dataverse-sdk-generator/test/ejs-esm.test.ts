/**
 * EJS loads under plain Node, as the published CLI runs (#572). ejs 7's ES-module build has only a
 * default export, so `import * as ejs from "ejs"` leaves `ejs.render` undefined in Node; Vitest
 * bridges default exports, so a test run in-process passes either way. This test starts a separate
 * Node process that imports src/ejs.ts with Node's own module resolution and renders a template
 * with the tags the built-in templates use (`<%_ _%>`, `<%-`, `<%#`).
 */
import { spawnSync } from "node:child_process";
import { fileURLToPath, pathToFileURL } from "node:url";
import { describe, expect, it } from "vitest";

const MODULE = pathToFileURL(fileURLToPath(new URL("../src/ejs.ts", import.meta.url))).href;

const SCRIPT = `
const { ejs } = await import(${JSON.stringify(MODULE)});
const template = "<%_ if (show) { _%>\\n  value <%- value %>\\n<%_ } _%>\\n<%# a comment %>end";
console.log(JSON.stringify({
  render: typeof ejs.render,
  output: ejs.render(template, { show: true, value: "<b>" }),
}));
`;

describe("ejs under plain Node (#572)", () => {
  it("exposes render and renders the built-in templates' tags", () => {
    // Node strips TypeScript types by default from 22.18 / 23.6; turn it on where it isn't.
    const typescript = (process.features as { typescript?: string | false }).typescript;
    const flags = typescript ? [] : ["--experimental-strip-types"];
    const result = spawnSync(
      process.execPath,
      [...flags, "--no-warnings", "--input-type=module", "-e", SCRIPT],
      { encoding: "utf-8" }
    );
    expect(result.stderr).toBe("");
    expect(result.status).toBe(0);
    expect(JSON.parse(result.stdout.trim())).toEqual({
      render: "function",
      output: "  value <b>\nend",
    });
  });
});
