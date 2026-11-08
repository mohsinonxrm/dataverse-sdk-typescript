/**
 * #386: the generated imports are sorted by UTF-16 code unit, not `localeCompare`, so the
 * generated files are the same on every machine, whatever its locale.
 */
import { afterEach, describe, expect, it, vi } from "vitest";
import { ImportCollector } from "../src/typescript-generator.js";

function render(): string {
  const imports = new ImportCollector();
  imports.type("beta", "./types/beta.js");
  imports.type("Zed", "./types/beta.js");
  imports.value("alpha", "./types/beta.js");
  imports.type("IEntity", "@scope/runtime");
  imports.type("Zed", "./Zed.js");
  return imports.render();
}

describe("ImportCollector (#386)", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("sorts modules and names by code unit, packages before relative paths", () => {
    expect(render()).toBe(
      [
        'import type { IEntity } from "@scope/runtime";',
        'import type { Zed } from "./Zed.js";',
        'import { type Zed, alpha, type beta } from "./types/beta.js";',
      ].join("\n")
    );
  });

  it("renders the same when localeCompare orders differently", () => {
    const before = render();
    vi.spyOn(String.prototype, "localeCompare").mockImplementation(function (
      this: string,
      that: string
    ) {
      return this < that ? 1 : this > that ? -1 : 0;
    });
    expect(render()).toBe(before);
  });
});
