/**
 * #361: `dataverse-gen --version` prints the version in the package's package.json, not a
 * hard-coded one. package.json is served with another version here, so the test fails if the CLI
 * doesn't read it.
 */
import { afterEach, describe, expect, it, vi } from "vitest";

const VERSION = "9.8.7-test.1";

vi.mock("node:fs", async (importOriginal) => {
  const actual = await importOriginal<typeof import("node:fs")>();
  const readFileSync = ((file: unknown, ...rest: unknown[]) => {
    const name = file instanceof URL ? file.pathname : String(file);
    if (/dataverse-sdk-generator[\\/]package\.json$/.test(name)) {
      return JSON.stringify({ name: "@mohsinonxrm/dataverse-sdk-generator", version: VERSION });
    }
    return (actual.readFileSync as (...args: unknown[]) => unknown)(file, ...rest);
  }) as typeof actual.readFileSync;
  return { ...actual, readFileSync, default: { ...actual, readFileSync } };
});

const argv = process.argv;

afterEach(() => {
  process.argv = argv;
  vi.restoreAllMocks();
  vi.resetModules();
});

describe("#361: dataverse-gen --version", () => {
  it("prints the version from package.json", async () => {
    const written: string[] = [];
    vi.spyOn(process.stdout, "write").mockImplementation((chunk) => {
      written.push(String(chunk));
      return true;
    });
    vi.spyOn(process, "exit").mockImplementation((code) => {
      throw new Error(`process.exit(${String(code)})`);
    });
    process.argv = ["node", "dataverse-gen", "--version"];

    await expect(import("../src/cli.js")).rejects.toThrow("process.exit(0)");
    expect(written.join("").trim()).toBe(VERSION);
  });
});
