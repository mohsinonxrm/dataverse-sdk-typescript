/**
 * Helpers for the live generator tests: run `generateCode` against the org into a scratch folder
 * below this package's (git-ignored) node_modules, so generated code resolves the workspace
 * packages it imports. Nothing is written into the repository tree.
 */
import * as fs from "node:fs/promises";
import * as path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import ts from "typescript";
import { type DataverseGenConfig, generateCode } from "@mohsinonxrm/dataverse-sdk-generator";
import { liveClient, orgUrl } from "./env.js";

const packageRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const scratchRoot = path.join(packageRoot, "node_modules", ".cache", "live-generated");

/** What to generate: the tables, actions and functions, and options such as `formContext`. */
export type GenerateSelection = Omit<DataverseGenConfig, "environmentUrl" | "output" | "auth">;

const outputDirs: string[] = [];

/** Generate the selection from the live org and return the output folder. */
export async function generateLive(selection: GenerateSelection): Promise<string> {
  await fs.mkdir(scratchRoot, { recursive: true });
  const outputRoot = await fs.mkdtemp(path.join(scratchRoot, "out-"));
  outputDirs.push(outputRoot);
  await generateLiveInto(outputRoot, selection);
  return outputRoot;
}

/**
 * Generate the selection from the live org into an existing folder (`generateLive` made it), with
 * `output` options such as `incremental`, and return what `generateCode` returns.
 */
export async function generateLiveInto(
  outputRoot: string,
  selection: GenerateSelection,
  output: Omit<NonNullable<DataverseGenConfig["output"]>, "outputRoot"> = {}
): ReturnType<typeof generateCode> {
  const { tokenProvider } = liveClient();
  const token = await tokenProvider.getToken();
  return generateCode(
    {
      entities: [],
      actions: [],
      functions: [],
      ...selection,
      environmentUrl: orgUrl,
      output: { ...output, outputRoot },
    },
    token
  );
}

/** Remove every folder `generateLive` created. */
export async function removeGenerated(): Promise<void> {
  for (const dir of outputDirs.splice(0)) await fs.rm(dir, { recursive: true, force: true });
}

async function listTsFiles(dir: string): Promise<string[]> {
  const entries = await fs.readdir(dir, { withFileTypes: true, recursive: true });
  return entries
    .filter((e) => e.isFile() && e.name.endsWith(".ts"))
    .map((e) => path.join(e.parentPath, e.name));
}

/** Type-check a folder the way a strict app would (same settings as the generator's own test). */
export async function typecheck(dir: string): Promise<string[]> {
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
    skipLibCheck: true,
    types: [],
  });
  return ts.getPreEmitDiagnostics(program).map((d) => {
    const message = ts.flattenDiagnosticMessageText(d.messageText, "\n");
    if (!d.file || d.start === undefined) return message;
    const { line } = d.file.getLineAndCharacterOfPosition(d.start);
    return `${path.relative(dir, d.file.fileName)}:${String(line + 1)} ${message}`;
  });
}

/** Compile the generated `.ts` files to ESM `.js` beside them so they can be imported. */
export async function compileToJs(dir: string): Promise<void> {
  await fs.writeFile(path.join(dir, "package.json"), '{"type":"module"}\n', "utf-8");
  for (const file of await listTsFiles(dir)) {
    const out = ts.transpileModule(await fs.readFile(file, "utf-8"), {
      compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.ESNext },
    });
    await fs.writeFile(file.replace(/\.ts$/, ".js"), out.outputText, "utf-8");
  }
}

/** Import a compiled generated module, e.g. `importGenerated(dir, "functions/index.js")`. */
export function importGenerated<T = Record<string, unknown>>(
  dir: string,
  relative: string
): Promise<T> {
  return import(/* @vite-ignore */ pathToFileURL(path.join(dir, relative)).href) as Promise<T>;
}
