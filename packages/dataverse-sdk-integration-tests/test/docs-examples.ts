/**
 * The machinery behind docs-examples.int.test.ts: find the TypeScript blocks of a Markdown file
 * that are marked `<!-- live -->`, compile each one as it is written, run it with the bindings the
 * docs assume (`client`, `tokenProvider`, a record id, …), and record the records it creates so
 * they can be deleted afterwards.
 *
 * Nothing here talks to Dataverse by itself; the test passes in the clients and fetch it uses.
 */
import * as path from "node:path";
import { format } from "node:util";
import * as vm from "node:vm";
import ts from "typescript";

/** The marker on the line before a code fence (blank lines and other comments may come between). */
const LIVE_MARKER = /^<!--\s*live\s*-->$/;
const NO_CHECK_MARKER = /^<!--\s*no-check\s*-->$/;
const FENCE = /^(\s*)(`{3,}|~{3,})\s*([\w-]*)/;
const TS_LANGS = new Set(["ts", "typescript"]);

/** A `<!-- live -->` code block of a Markdown file. */
export interface DocBlock {
  /** The Markdown file, relative to the repository root, e.g. `docs/getting-started.md`. */
  file: string;
  /** 1-based line of the opening fence. */
  line: number;
  /** The heading the block is under (`Quick Start › Node.js (client credentials)`). */
  heading: string;
  /** The code, exactly as written between the fences. */
  code: string;
}

/**
 * The blocks of `markdown` marked `<!-- live -->`. A marker that isn't followed by a TypeScript
 * fence, a marked block that is also `<!-- no-check -->`, or an unclosed fence throws: a marker
 * that silently matches nothing would leave an example unchecked.
 */
export function extractLiveBlocks(markdown: string, file: string): DocBlock[] {
  const lines = markdown.split(/\r?\n/);
  const blocks: DocBlock[] = [];
  const headings: string[] = [];
  let pendingLive: number | undefined;
  let pendingNoCheck = false;

  for (let i = 0; i < lines.length; i++) {
    const text = lines[i] ?? "";
    const trimmed = text.trim();

    const fence = FENCE.exec(text);
    if (fence) {
      const [, indent = "", marker = "", rawLang = ""] = fence;
      const close = new RegExp(
        `^${indent}${marker.startsWith("`") ? "`" : "~"}{${String(marker.length)},}\\s*$`
      );
      let end = i + 1;
      while (end < lines.length && !close.test(lines[end] ?? "")) end++;
      if (end >= lines.length) throw new Error(`${file}:${String(i + 1)}: unclosed code fence`);
      if (pendingLive !== undefined) {
        const lang = rawLang.toLowerCase();
        if (!TS_LANGS.has(lang)) {
          throw new Error(
            `${file}:${String(pendingLive)}: <!-- live --> marks a "${rawLang}" block; only typescript blocks run`
          );
        }
        if (pendingNoCheck) {
          throw new Error(
            `${file}:${String(pendingLive)}: a block can't be both live and no-check`
          );
        }
        blocks.push({
          file,
          line: i + 1,
          heading: headings.filter(Boolean).join(" › "),
          code: lines.slice(i + 1, end).join("\n"),
        });
      }
      pendingLive = undefined;
      pendingNoCheck = false;
      i = end;
      continue;
    }

    const heading = /^(#{1,6})\s+(.*)$/.exec(trimmed);
    if (heading) {
      const level = heading[1].length;
      headings.length = level;
      headings[level - 1] = heading[2].replace(/^[^\p{L}\p{N}`$.]+/u, "").trim();
    }

    if (LIVE_MARKER.test(trimmed)) {
      pendingLive = i + 1;
    } else if (NO_CHECK_MARKER.test(trimmed)) {
      pendingNoCheck = true;
    } else if (trimmed !== "" && !trimmed.startsWith("<!--")) {
      if (pendingLive !== undefined) {
        throw new Error(
          `${file}:${String(pendingLive)}: <!-- live --> isn't followed by a code block`
        );
      }
      pendingNoCheck = false;
    }
  }
  if (pendingLive !== undefined) {
    throw new Error(`${file}:${String(pendingLive)}: <!-- live --> isn't followed by a code block`);
  }
  return blocks;
}

/** A block compiled to a function body, with what it imports, declares and refers to. */
export interface CompiledBlock {
  block: DocBlock;
  /** CommonJS output of the (substituted) code: imports are `require()` calls. */
  js: string;
  /** Module specifiers the compiled code requires (type-only imports are gone). */
  requires: string[];
  /** Values the block declares at its top level (variables, functions, classes). */
  declared: string[];
  /** Identifiers the block refers to as values (not property names). */
  referenced: Set<string>;
}

/** Replace each placeholder with its value, everywhere in the code. */
export function substitute(
  code: string,
  substitutions: ReadonlyArray<readonly [string, string]>
): string {
  return substitutions.reduce((text, [from, to]) => text.split(from).join(to), code);
}

function declaredNames(name: ts.BindingName, into: string[]): void {
  if (ts.isIdentifier(name)) {
    into.push(name.text);
    return;
  }
  for (const element of name.elements) {
    if (!ts.isOmittedExpression(element)) declaredNames(element.name, into);
  }
}

/** True for an identifier that names a property rather than a value (`a.name`, `{ name: 1 }`). */
function isPropertyName(node: ts.Identifier): boolean {
  const parent = node.parent;
  if (ts.isPropertyAccessExpression(parent)) return parent.name === node;
  if (ts.isQualifiedName(parent)) return parent.right === node;
  if (
    ts.isPropertyAssignment(parent) ||
    ts.isPropertySignature(parent) ||
    ts.isPropertyDeclaration(parent) ||
    ts.isMethodDeclaration(parent) ||
    ts.isMethodSignature(parent) ||
    ts.isGetAccessorDeclaration(parent) ||
    ts.isSetAccessorDeclaration(parent) ||
    ts.isEnumMember(parent)
  ) {
    return parent.name === node;
  }
  if (ts.isBindingElement(parent)) return parent.propertyName === node;
  return ts.isImportSpecifier(parent) || ts.isExportSpecifier(parent);
}

/**
 * Compile a block (after `substitutions`) to CommonJS, so its imports become `require()` calls the
 * runner answers, and its top-level `await` sits in the async function it runs in. Syntax errors
 * throw; type errors are the type-check's job (see `typecheckBlocks`).
 */
export function compileBlock(
  block: DocBlock,
  substitutions: ReadonlyArray<readonly [string, string]> = []
): CompiledBlock {
  const code = substitute(block.code, substitutions);
  const where = `${block.file}:${String(block.line)}`;
  const source = ts.createSourceFile(
    `${where}.ts`,
    code,
    ts.ScriptTarget.ES2022,
    true,
    ts.ScriptKind.TS
  );

  const declared: string[] = [];
  for (const statement of source.statements) {
    if (ts.isVariableStatement(statement)) {
      for (const d of statement.declarationList.declarations) declaredNames(d.name, declared);
    } else if (
      (ts.isFunctionDeclaration(statement) || ts.isClassDeclaration(statement)) &&
      statement.name
    ) {
      declared.push(statement.name.text);
    }
  }

  const referenced = new Set<string>();
  const visit = (node: ts.Node): void => {
    if (ts.isIdentifier(node) && !isPropertyName(node)) referenced.add(node.text);
    ts.forEachChild(node, visit);
  };
  visit(source);

  const out = ts.transpileModule(code, {
    fileName: `${where}.ts`,
    reportDiagnostics: true,
    compilerOptions: {
      target: ts.ScriptTarget.ES2022,
      module: ts.ModuleKind.CommonJS,
      esModuleInterop: false,
      verbatimModuleSyntax: false,
      sourceMap: false,
    },
  });
  const errors = (out.diagnostics ?? []).filter((d) => d.category === ts.DiagnosticCategory.Error);
  if (errors.length > 0) {
    const messages = errors.map((d) => ts.flattenDiagnosticMessageText(d.messageText, "\n"));
    throw new Error(`${where}: doesn't compile: ${messages.join("; ")}`);
  }
  const requires = [...out.outputText.matchAll(/\brequire\("([^"]+)"\)/g)].map((m) => m[1]);
  return { block, js: out.outputText, requires: [...new Set(requires)], declared, referenced };
}

/**
 * Run a compiled block. `modules` answers its `require()` calls (load them first with the
 * runner's own `import()`); `bindings` are the free names the docs assume, passed only when the
 * block doesn't declare the name itself. Resolves to the values the block declared, by name.
 */
export async function runBlock(
  compiled: CompiledBlock,
  modules: ReadonlyMap<string, unknown>,
  bindings: Readonly<Record<string, unknown>>
): Promise<Record<string, unknown>> {
  const names = Object.keys(bindings).filter((n) => !compiled.declared.includes(n));
  const where = `${compiled.block.file}:${String(compiled.block.line)}`;
  const requireModule = (specifier: string): unknown => {
    if (!modules.has(specifier)) throw new Error(`${where}: module "${specifier}" wasn't loaded`);
    return modules.get(specifier);
  };
  const wrapper = [
    `(async function (require, exports, module, ${names.join(", ")}) {`,
    compiled.js,
    `return { ${compiled.declared.join(", ")} };`,
    "})",
  ].join("\n");
  const fn = vm.runInThisContext(wrapper, { filename: where }) as (
    ...args: unknown[]
  ) => Promise<Record<string, unknown>>;
  const exportsObject = {};
  return fn(
    requireModule,
    exportsObject,
    { exports: exportsObject },
    ...names.map((n) => bindings[n])
  );
}

/** What a block wrote to the console while it ran. */
export interface ConsoleCapture {
  lines: string[];
  errors: string[];
}

/**
 * Run `fn` with the console's methods captured instead of printed: the examples log the records
 * they read, and a ConsoleLogger would print the org's URLs. A `console.error` is how an example
 * reports a failure it caught (a failed record of a bulk create, a rolled-back change set).
 */
export async function withCapturedConsole<T>(
  fn: (capture: ConsoleCapture) => Promise<T>
): Promise<T> {
  const capture: ConsoleCapture = { lines: [], errors: [] };
  const methods = ["log", "info", "warn", "error", "debug", "trace"] as const;
  const saved = methods.map((m) => [m, console[m]] as const);
  for (const m of methods) {
    console[m] = (...args: unknown[]) => {
      const line = format(...args);
      capture.lines.push(line);
      if (m === "error") capture.errors.push(line);
    };
  }
  try {
    return await fn(capture);
  } finally {
    for (const [m, original] of saved) console[m] = original;
  }
}

/** A record a block created: by entity set, by logical name, or as a representation to resolve. */
export type CreatedRecord =
  | { set: string; id: string }
  | { logicalName: string; id: string }
  | { set: string; entity: Record<string, unknown> };

const GUID = "[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}";
const ENTITY_URL = new RegExp(`/api/data/v\\d+\\.\\d+/([A-Za-z0-9_]+)\\((${GUID})\\)$`, "i");
const CREATE_MULTIPLE = /\/([A-Za-z0-9_]+)\/(?:Microsoft\.Dynamics\.CRM\.)?CreateMultiple(?:\?|$)/;
// Actions that create records and return them in the response body.
const CREATING_ACTIONS = /\/(?:Microsoft\.Dynamics\.CRM\.)?QualifyLead(?:\?|$)/;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

/** The record an `OData-EntityId` (or `@odata.id`) URL names, when it's a top-level row. */
export function recordFromEntityUrl(url: string): CreatedRecord | undefined {
  const m = ENTITY_URL.exec(url.trim());
  return m?.[1] && m[2] ? { set: m[1], id: m[2].toLowerCase() } : undefined;
}

/** A `return=representation` body of a create: `@odata.context` is `…#accounts/$entity`. */
function recordFromRepresentation(body: unknown): CreatedRecord | undefined {
  if (!isRecord(body)) return undefined;
  const context = body["@odata.context"];
  const m = typeof context === "string" ? /#([A-Za-z0-9_]+)\/\$entity$/.exec(context) : null;
  return m?.[1] ? { set: m[1], entity: body } : undefined;
}

/**
 * The records a successful POST to the Web API created, from its response: `OData-EntityId`,
 * a `return=representation` body, `CreateMultiple`'s `Ids`, the parts of a `$batch` response, and
 * the entities `QualifyLead` returns. Reads a clone; the caller still gets the whole response.
 */
export async function recordsCreatedBy(url: string, response: Response): Promise<CreatedRecord[]> {
  const found: CreatedRecord[] = [];
  const header = response.headers.get("odata-entityid");
  const fromHeader = header ? recordFromEntityUrl(header) : undefined;
  if (fromHeader) found.push(fromHeader);

  const type = response.headers.get("content-type") ?? "";
  if (response.status === 204) return found;
  const text = await response.clone().text();

  if (type.includes("multipart/mixed")) {
    // Each part: its own headers, a blank line, and a JSON body on one line (or none).
    for (const part of text.split(/\r?\n--[^\r\n]+/)) {
      const partHeader = /^OData-EntityId:\s*(\S+)\s*$/im.exec(part)?.[1];
      const record = partHeader ? recordFromEntityUrl(partHeader) : undefined;
      if (record) {
        found.push(record);
        continue;
      }
      if (!/^HTTP\/1\.1 201/m.test(part)) continue;
      const json = /^\{.*\}\s*$/m.exec(part)?.[0];
      if (!json) continue;
      try {
        const fromBody = recordFromRepresentation(JSON.parse(json) as unknown);
        if (fromBody) found.push(fromBody);
      } catch {
        // Not JSON: nothing to record.
      }
    }
    return found;
  }

  if (!type.includes("json") || text === "") return found;
  let body: unknown;
  try {
    body = JSON.parse(text) as unknown;
  } catch {
    return found;
  }

  if (!fromHeader && response.status === 201) {
    const fromBody = recordFromRepresentation(body);
    if (fromBody) found.push(fromBody);
  }
  const path = new URL(url).pathname;
  const multiple = CREATE_MULTIPLE.exec(path);
  if (multiple?.[1] && isRecord(body) && Array.isArray(body.Ids)) {
    for (const id of body.Ids) if (typeof id === "string") found.push({ set: multiple[1], id });
  }
  if (CREATING_ACTIONS.test(path) && isRecord(body) && Array.isArray(body.value)) {
    for (const item of body.value) {
      if (!isRecord(item)) continue;
      const odataType = item["@odata.type"];
      const logical =
        typeof odataType === "string"
          ? /^#Microsoft\.Dynamics\.CRM\.(\w+)$/.exec(odataType)?.[1]
          : undefined;
      const id = logical ? item[`${logical}id`] : undefined;
      if (logical && typeof id === "string") found.push({ logicalName: logical, id });
    }
  }
  return found;
}

/**
 * Type-check the blocks the way the docs are checked: each block a module of its own, with the
 * bindings the live test passes declared as globals. `files` are written nowhere; they are served
 * to the compiler from memory, from a folder inside this package so the workspace packages resolve.
 */
export function typecheckBlocks(
  blocks: readonly DocBlock[],
  packageRoot: string,
  declarations: string
): string[] {
  const configPath = path.join(packageRoot, "tsconfig.typecheck.json");
  const parsed = ts.getParsedCommandLineOfConfigFile(
    configPath,
    {},
    {
      ...ts.sys,
      onUnRecoverableConfigFileDiagnostic: (d) => {
        throw new Error(ts.flattenDiagnosticMessageText(d.messageText, "\n"));
      },
    }
  );
  if (!parsed) throw new Error(`Can't read ${configPath}`);

  const folder = path.join(packageRoot, "docs-examples");
  const files = new Map<string, string>();
  files.set(path.join(folder, "bindings.d.ts"), declarations);
  const names = new Map<string, DocBlock>();
  for (const block of blocks) {
    const name = path.join(
      folder,
      `${block.file.replace(/[^\w]+/g, "_")}_${String(block.line)}.ts`
    );
    // `export {}` makes each block a module, so its own declarations shadow the bindings.
    files.set(name, `${block.code}\nexport {};\n`);
    names.set(path.normalize(name), block);
  }

  const options: ts.CompilerOptions = { ...parsed.options, noEmit: true, rootDir: packageRoot };
  const host = ts.createCompilerHost(options);
  const read = host.readFile.bind(host);
  const exists = host.fileExists.bind(host);
  const getSourceFile = host.getSourceFile.bind(host);
  host.readFile = (f) => files.get(path.normalize(f)) ?? read(f);
  host.fileExists = (f) => files.has(path.normalize(f)) || exists(f);
  host.getSourceFile = (f, languageVersion, onError, shouldCreate) => {
    const text = files.get(path.normalize(f));
    return text === undefined
      ? getSourceFile(f, languageVersion, onError, shouldCreate)
      : ts.createSourceFile(f, text, languageVersion, true);
  };

  const program = ts.createProgram([...files.keys()], options, host);
  return ts.getPreEmitDiagnostics(program).map((d) => {
    const message = ts.flattenDiagnosticMessageText(d.messageText, "\n");
    if (!d.file || d.start === undefined) return message;
    const block = names.get(path.normalize(d.file.fileName));
    const { line } = d.file.getLineAndCharacterOfPosition(d.start);
    return block
      ? `${block.file}:${String(block.line + 1 + line)} ${message}`
      : `${d.file.fileName}:${String(line + 1)} ${message}`;
  });
}
