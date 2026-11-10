/**
 * #347: `dataverse-gen eject [dir]` copies the built-in templates into a directory to customize.
 */
import { afterAll, afterEach, describe, expect, it, vi } from "vitest";
import * as fs from "node:fs/promises";
import * as path from "node:path";
import { TEMPLATE_NAMES } from "../src/templates.js";
import { scratchFolders } from "./fixtures/compile.js";

const scratch = scratchFolders("cli-eject");
afterAll(scratch.cleanup);

const argv = process.argv;

afterEach(() => {
  process.argv = argv;
  vi.restoreAllMocks();
  vi.resetModules();
});

describe("#347: dataverse-gen eject", () => {
  it("copies every template into the directory and says how to use them", async () => {
    const dir = path.join(await scratch.create(), "my-templates");
    const logged: string[] = [];
    vi.spyOn(console, "log").mockImplementation((...args: unknown[]) => {
      logged.push(args.map(String).join(" "));
    });
    process.argv = ["node", "dataverse-gen", "eject", dir];

    await import("../src/cli.js");

    expect((await fs.readdir(dir)).sort()).toEqual([...TEMPLATE_NAMES].sort());
    expect(logged.join("\n")).toContain(`"templates": ${JSON.stringify(dir)}`);
  });

  it("ignores extra command-arguments, as before Commander 13", async () => {
    const dir = path.join(await scratch.create(), "my-templates");
    vi.spyOn(console, "log").mockImplementation(() => undefined);
    vi.spyOn(process, "exit").mockImplementation((code) => {
      throw new Error(`process.exit(${String(code)})`);
    });
    process.argv = ["node", "dataverse-gen", "eject", dir, "extra"];

    await import("../src/cli.js");

    expect((await fs.readdir(dir)).sort()).toEqual([...TEMPLATE_NAMES].sort());
  });
});
