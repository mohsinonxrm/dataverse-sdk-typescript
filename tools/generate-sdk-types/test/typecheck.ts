/**
 * Type-check generated code together with a usage snippet, with the real TypeScript compiler, so
 * tests can assert what compiles (and what doesn't) without casts.
 */
import { writeFile } from "node:fs/promises";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";

const CORE_TYPES = fileURLToPath(
  new URL("../../../packages/dataverse-sdk-core/dist/index.d.ts", import.meta.url)
);
/** Where the generated packages import `EntityReference` from (#295). */
const ENTITIES_RUNTIME_TYPES = fileURLToPath(
  new URL("../../../packages/dataverse-sdk-entities-runtime/dist/index.d.ts", import.meta.url)
);

/**
 * Write `snippet` to `<dir>/<name>` and type-check it (and everything it imports) under strict
 * settings. Returns the diagnostics as `file(line): message` strings; empty means it compiles.
 */
export async function typecheck(dir: string, name: string, snippet: string): Promise<string[]> {
  const file = join(dir, name);
  await writeFile(file, snippet, "utf8");
  const program = ts.createProgram([file], {
    strict: true,
    noEmit: true,
    target: ts.ScriptTarget.ES2022,
    module: ts.ModuleKind.ESNext,
    moduleResolution: ts.ModuleResolutionKind.Bundler,
    lib: ["lib.es2022.d.ts", "lib.dom.d.ts"],
    skipLibCheck: true,
    types: [],
    paths: {
      "@mohsinonxrm/dataverse-sdk-core": [CORE_TYPES],
      "@mohsinonxrm/dataverse-sdk-entities-runtime": [ENTITIES_RUNTIME_TYPES],
    },
  });
  return ts.getPreEmitDiagnostics(program).map((d) => {
    const message = ts.flattenDiagnosticMessageText(d.messageText, "\n");
    if (!d.file || d.start === undefined) return message;
    const { line } = d.file.getLineAndCharacterOfPosition(d.start);
    return `${d.file.fileName.slice(dir.length + 1)}(${String(line + 1)}): ${message}`;
  });
}
