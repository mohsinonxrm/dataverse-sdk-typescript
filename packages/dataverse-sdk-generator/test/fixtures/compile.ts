/**
 * Helpers for tests that generate code from a fixture and compile it: generate into a scratch
 * folder below this package's node_modules (where the generated imports of
 * `@mohsinonxrm/dataverse-sdk-entities-runtime` and `-core` resolve), type-check it the way a
 * strict app would, or transpile it to JavaScript and import it.
 */
import * as fs from "node:fs/promises";
import * as path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import ts from "typescript";
import type {
  MetadataService,
  RetrieveMetadataChangesResponse,
  SystemFormRecord,
} from "../../src/metadata-service.js";
import { SchemaModel } from "../../src/schema-model.js";
import { TypescriptGenerator } from "../../src/typescript-generator.js";
import type { DataverseGenConfig } from "../../src/types.js";

const packageRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");

/**
 * A MetadataService stand-in that serves a fixture instead of calling Dataverse: the `$metadata`
 * document, each table's RetrieveMetadataChanges response, and each table's forms (`formLayouts`).
 */
export function fixtureMetadataService(
  edmx: string,
  entities: Record<string, RetrieveMetadataChangesResponse>,
  forms: Record<string, SystemFormRecord[]> = {}
): MetadataService {
  const service: Pick<MetadataService, "getEdmxMetadata" | "getEntityMetadata" | "getSystemForms"> =
    {
      getEdmxMetadata: () => Promise.resolve(edmx),
      getEntityMetadata: (logicalName: string) =>
        Promise.resolve(entities[logicalName] ?? { EntityMetadata: [] }),
      getSystemForms: (logicalName: string) => Promise.resolve(forms[logicalName] ?? []),
    };
  return service as MetadataService;
}

/**
 * A scratch folder factory for one test file: `create()` makes a new folder, `cleanup()` (for
 * `afterAll`) removes every folder it made.
 */
export function scratchFolders(name: string): {
  create: () => Promise<string>;
  cleanup: () => Promise<void>;
} {
  const root = path.join(packageRoot, "node_modules", ".cache", name);
  const made: string[] = [];
  return {
    create: async () => {
      await fs.mkdir(root, { recursive: true });
      const dir = await fs.mkdtemp(path.join(root, "out-"));
      made.push(dir);
      return dir;
    },
    cleanup: async () => {
      for (const dir of made.splice(0)) await fs.rm(dir, { recursive: true, force: true });
    },
  };
}

/** Generate `config` from the fixture into `outputRoot` and return the model. */
export async function generateFixture(
  service: MetadataService,
  outputRoot: string,
  config: Omit<DataverseGenConfig, "environmentUrl" | "output"> & {
    output?: DataverseGenConfig["output"];
  }
): Promise<SchemaModel> {
  const fullConfig: DataverseGenConfig = {
    environmentUrl: "https://contoso.crm.dynamics.com",
    ...config,
    output: { ...config.output, outputRoot },
  };
  const model = new SchemaModel(service, fullConfig);
  await model.generate();
  await new TypescriptGenerator(model, fullConfig).generate();
  return model;
}

/** Every `.ts` file below `dir`. */
export async function listTsFiles(dir: string): Promise<string[]> {
  const entries = await fs.readdir(dir, { withFileTypes: true, recursive: true });
  return entries
    .filter((e) => e.isFile() && e.name.endsWith(".ts"))
    .map((e) => path.join(e.parentPath, e.name));
}

/**
 * Type-check a folder the way a strict app would, and return the diagnostics as text.
 * `types` names the `@types` packages to include (none by default).
 */
export async function typecheck(dir: string, types: string[] = []): Promise<string[]> {
  const program = ts.createProgram(await listTsFiles(dir), {
    strict: true,
    noEmit: true,
    target: ts.ScriptTarget.ES2022,
    lib: ["lib.es2022.d.ts", "lib.dom.d.ts"],
    module: ts.ModuleKind.NodeNext,
    moduleResolution: ts.ModuleResolutionKind.NodeNext,
    verbatimModuleSyntax: true,
    isolatedModules: true,
    noUnusedLocals: true,
    noUnusedParameters: true,
    noImplicitOverride: true,
    // No `enum`, `namespace` or parameter properties: the code runs under Node's type stripping (#479)
    erasableSyntaxOnly: true,
    skipLibCheck: true,
    types,
    typeRoots: [path.join(packageRoot, "node_modules", "@types")],
  });
  return ts.getPreEmitDiagnostics(program).map((d) => {
    const message = ts.flattenDiagnosticMessageText(d.messageText, "\n");
    if (!d.file || d.start === undefined) return message;
    const { line } = d.file.getLineAndCharacterOfPosition(d.start);
    return `${path.relative(dir, d.file.fileName)}:${String(line + 1)} ${message}`;
  });
}

/** Transpile the generated `.ts` files to ESM `.js` beside them, so tests can import them. */
export async function compileToJs(dir: string): Promise<void> {
  await fs.writeFile(path.join(dir, "package.json"), '{"type":"module"}\n', "utf-8");
  for (const file of await listTsFiles(dir)) {
    const out = ts.transpileModule(await fs.readFile(file, "utf-8"), {
      compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.ESNext },
    });
    await fs.writeFile(file.replace(/\.ts$/, ".js"), out.outputText, "utf-8");
  }
}

/** Import a module compiled by {@link compileToJs}, e.g. `importGenerated(dir, "index.js")`. */
export function importGenerated<T = Record<string, unknown>>(
  dir: string,
  relative: string
): Promise<T> {
  return import(/* @vite-ignore */ pathToFileURL(path.join(dir, relative)).href) as Promise<T>;
}
