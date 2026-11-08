/**
 * Type-check generated code together with a usage snippet, with the real TypeScript compiler, so
 * tests can assert what compiles (and what doesn't) without casts.
 */
import { cp, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";
import { MESSAGES_HAND_WRITTEN_FILES } from "../src/generators/messages-generator.js";

const CORE_TYPES = fileURLToPath(
  new URL("../../../packages/dataverse-sdk-core/dist/index.d.ts", import.meta.url)
);
/** The hand-written messages build their `$batch` requests with the batch package (#344). */
const BATCH_TYPES = fileURLToPath(
  new URL("../../../packages/dataverse-sdk-batch/dist/index.d.ts", import.meta.url)
);
const MESSAGES_SRC = fileURLToPath(
  new URL("../../../packages/dataverse-sdk-messages/src", import.meta.url)
);

/**
 * Copy the messages package's hand-written files (`OrganizationRequest.ts`, `types.ts` and the
 * hand-written messages, #344) next to a generated messages package in `dir`, as `regen` keeps
 * them, so its index compiles.
 */
export async function copyMessagesHandWritten(dir: string): Promise<void> {
  for (const file of MESSAGES_HAND_WRITTEN_FILES) {
    await cp(join(MESSAGES_SRC, file), join(dir, file), { recursive: true });
  }
}
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
      "@mohsinonxrm/dataverse-sdk-batch": [BATCH_TYPES],
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
