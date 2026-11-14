/**
 * #479: the actions, functions and messages packages declare each CSDL enum as a const object and
 * a type of the same name, not a TypeScript `enum`, so the files compile under
 * `erasableSyntaxOnly` and Node's type stripping. In 2.x the values stay numbers, so `X.Member`
 * compiles and is sent as before; only the reverse mapping (`X[14]`) is gone. A flags enum is
 * typed `number`, so members combine with `|`.
 */
import { mkdtemp, readdir, readFile, rm, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";
import { afterAll, describe, expect, it } from "vitest";
import { generateEnumTypeDefinition } from "../src/generators/complex-types-generator.js";

const OUT_ROOT = fileURLToPath(new URL(".", import.meta.url));
const PACKAGES = fileURLToPath(new URL("../../../packages", import.meta.url));

const ATTRIBUTE_TYPE_CODE = {
  name: "AttributeTypeCode",
  namespace: "Microsoft.Dynamics.CRM",
  members: [
    { name: "Boolean", value: 0 },
    { name: "String", value: 14 },
  ],
};
const ENTITY_FILTERS = {
  name: "EntityFilters",
  namespace: "Microsoft.Dynamics.CRM",
  isFlags: true,
  members: [
    { name: "Default", value: 1 },
    { name: "Entity", value: 1 },
    { name: "Attributes", value: 2 },
  ],
};

let dir = "";
afterAll(async () => {
  if (dir) await rm(dir, { recursive: true, force: true });
});

/** Type-check `files` (name -> source) under strict settings and `erasableSyntaxOnly`. */
async function compile(files: Record<string, string>): Promise<string[]> {
  dir = dir || (await mkdtemp(join(OUT_ROOT, ".gen-479-")));
  for (const [name, code] of Object.entries(files)) await writeFile(join(dir, name), code, "utf8");
  const program = ts.createProgram(
    Object.keys(files).map((name) => join(dir, name)),
    {
      strict: true,
      noEmit: true,
      erasableSyntaxOnly: true,
      verbatimModuleSyntax: true,
      target: ts.ScriptTarget.ES2022,
      module: ts.ModuleKind.ESNext,
      moduleResolution: ts.ModuleResolutionKind.Bundler,
      types: [],
    }
  );
  return ts.getPreEmitDiagnostics(program).map((d) => {
    const message = ts.flattenDiagnosticMessageText(d.messageText, "\n");
    if (!d.file || d.start === undefined) return message;
    const { line } = d.file.getLineAndCharacterOfPosition(d.start);
    return `${d.file.fileName.slice(dir.length + 1)}(${String(line + 1)}): ${message}`;
  });
}

describe("#479: CSDL enums in the actions, functions and messages packages", () => {
  it("are a const object with numeric values and a union type", () => {
    expect(generateEnumTypeDefinition(ATTRIBUTE_TYPE_CODE)).toBe(`/**
 * AttributeTypeCode enum
 */
export const AttributeTypeCode = {
  Boolean: 0,
  String: 14,
} as const;

export type AttributeTypeCode = (typeof AttributeTypeCode)[keyof typeof AttributeTypeCode];
`);
  });

  it("a flags enum is typed number", () => {
    const code = generateEnumTypeDefinition(ENTITY_FILTERS);
    expect(code).toContain("export const EntityFilters = {\n  Default: 1,\n  Entity: 1,");
    expect(code).toContain("export type EntityFilters = number;\n");
  });

  it("compile under erasableSyntaxOnly; X.Member, a combined flags value and x: X work", async () => {
    const diagnostics = await compile({
      "AttributeTypeCode.ts": generateEnumTypeDefinition(ATTRIBUTE_TYPE_CODE),
      "EntityFilters.ts": generateEnumTypeDefinition(ENTITY_FILTERS),
      "usage.ts": `import { AttributeTypeCode } from "./AttributeTypeCode.js";
import { EntityFilters } from "./EntityFilters.js";

export const code: AttributeTypeCode = AttributeTypeCode.String;
export const literal: AttributeTypeCode = 14;
export const filters: EntityFilters = EntityFilters.Entity | EntityFilters.Attributes;
export const names: Array<keyof typeof EntityFilters> = ["Entity", "Attributes"];
// @ts-expect-error a number that isn't a member
export const bogus: AttributeTypeCode = 99;
// @ts-expect-error no reverse mapping: the object is keyed by the member names only
export const reverse: string = AttributeTypeCode[14];
`,
    });
    expect(diagnostics).toEqual([]);
  });

  it("every committed enum of the three packages is a const object", async () => {
    for (const pkg of ["actions", "functions", "messages"]) {
      const types = join(PACKAGES, `dataverse-sdk-${pkg}`, "src", "types");
      const files = (await readdir(types)).filter((f) => f.endsWith(".ts"));
      for (const file of files) {
        const code = await readFile(join(types, file), "utf8");
        expect(code, `${pkg}/types/${file}`).not.toMatch(/^export (const )?enum /m);
      }
    }
  });
});
