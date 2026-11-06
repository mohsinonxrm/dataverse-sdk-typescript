/**
 * Operation lists in the docs, generated from the committed packages (#88).
 *
 * The docs named classes that don't exist (`AssignAction`, `DisqualifyLeadAction`, …) and showed
 * constructors with the wrong arguments. Now a doc lists operations in a marker block:
 *
 *     <!-- operations:actions
 *     CreateMultiple: Create records in one request
 *     WinOpportunity: Close an opportunity as won
 *     -->
 *     …generated lines…
 *     <!-- /operations -->
 *
 * and `generate-sdk-types docs` writes, for each name, the class, its constructor arguments (the
 * record or entity set of a bound operation, then the properties of its parameters object, #96)
 * and its route, read from the package source. A name the package doesn't export is an error, and
 * `test/operation-docs.test.ts` fails when a block is stale.
 */
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

export type OperationKind = "actions" | "functions" | "messages";

/** One generated operation class, as the package source declares it. */
export interface OperationDoc {
  /** The exported class, e.g. `WinOpportunityAction` or `WinOpportunityRequest`. */
  className: string;
  method: "GET" | "POST";
  /** The route after the base URL, with `${this.x}` written as `{x}`. */
  route: string;
  /** The arguments before the parameters object: the record id or entity set of a bound operation. */
  args: Array<{ name: string; type: string }>;
  /**
   * The properties of the parameters object, by CSDL name (`optional`: it can be left out), or
   * `undefined` when the operation takes no parameters.
   */
  parameters?: Array<{ name: string; type: string; optional: boolean }>;
}

const SUFFIX: Record<OperationKind, { file: string; cls: string }> = {
  actions: { file: "Action", cls: "Action" },
  functions: { file: "Function", cls: "Function" },
  messages: { file: "Message", cls: "Request" },
};

/** Split a parameter list on top-level commas (or interface members on `;`). */
function splitParams(text: string, separator = ","): string[] {
  const out: string[] = [];
  let depth = 0;
  let cur = "";
  for (const ch of text) {
    if ("(<[{".includes(ch)) depth++;
    if (")>]}".includes(ch)) depth--;
    if (ch === separator && depth === 0) {
      out.push(cur);
      cur = "";
    } else cur += ch;
  }
  out.push(cur);
  return out.map((p) => p.replace(/\s+/g, " ").trim()).filter(Boolean);
}

/**
 * Read operation `name` (the CSDL name, or an overload stem such as `RetrievePrincipalAccess_team`)
 * from a package's source, or `undefined` when the package has no such file.
 */
export function readOperation(
  srcDir: string,
  kind: OperationKind,
  name: string
): OperationDoc | undefined {
  const { file, cls } = SUFFIX[kind];
  const path = join(srcDir, `${name}${file}.ts`);
  if (!existsSync(path)) return undefined;
  const src = readFileSync(path, "utf8");
  const className = `${name}${cls}`;
  const classAt = src.indexOf(`export class ${className}`);
  if (classAt < 0) return undefined;
  const args: OperationDoc["args"] = [];
  let parameters: OperationDoc["parameters"];
  const ctorAt = src.indexOf("constructor(", classAt);
  const bodyAt = src.indexOf("toRequestInformation", classAt);
  if (ctorAt >= 0 && ctorAt < bodyAt) {
    for (const p of splitParams(enclosed(src, ctorAt + "constructor".length, "(", ")"))) {
      const m = /^(?:public (?:readonly )?)?(\w+): (.+?)(?: = \{\})?$/.exec(p);
      if (!m) continue;
      if (m[1] === "parameters") parameters = readParameters(src, m[2]);
      else args.push({ name: m[1], type: m[2] });
    }
  }
  const url = /(?:const|let) url = `\$\{baseUrl\}\/([^`]*)`/.exec(src);
  const route = `/${(url?.[1] ?? "").replace(/\$\{this\.(\w+)\}/g, "{$1}")}`;
  return { className, method: kind === "functions" ? "GET" : "POST", route, args, parameters };
}

/** The text between the bracket `open` at or after `from` and its matching `close`. */
function enclosed(src: string, from: number, open: string, close: string): string {
  const start = src.indexOf(open, from) + 1;
  let depth = 1;
  let end = start;
  for (; end < src.length && depth > 0; end++) {
    if (src[end] === open) depth++;
    if (src[end] === close) depth--;
  }
  return src.slice(start, end - 1);
}

/** The properties of the parameters interface `name` declared in `src` (#96). */
function readParameters(src: string, name: string): NonNullable<OperationDoc["parameters"]> {
  const at = src.indexOf(`export interface ${name} {`);
  if (at < 0) throw new Error(`docs: no interface ${name}`);
  const members = splitParams(enclosed(src, at, "{", "}"), ";");
  return members.flatMap((member) => {
    const m = /^(\w+)(\??): (.+)$/.exec(member);
    return m ? [{ name: m[1], type: m[3], optional: m[2] === "?" }] : [];
  });
}

/** The markdown line for one listed operation: its constructor, route and description. */
export function renderOperation(op: OperationDoc, description: string): string {
  const properties = op.parameters?.map((p) => `${p.name}${p.optional ? "?" : ""}`).join(", ");
  const args = [...op.args.map((a) => a.name), ...(properties ? [`{ ${properties} }`] : [])].join(
    ", "
  );
  const desc = description ? ` ${description}` : "";
  return `- \`new ${op.className}(${args})\` (\`${op.method} ${op.route}\`):${desc}`;
}

const BLOCK =
  /<!-- operations:(actions|functions|messages)\n([\s\S]*?)-->\n[\s\S]*?<!-- \/operations -->/g;

/**
 * `markdown` with every operations block regenerated from the package sources under `root`.
 * Throws when a block names an operation its package doesn't have.
 */
export function renderOperationBlocks(markdown: string, root: string): string {
  return markdown
    .replace(BLOCK, (_block, kind: OperationKind, spec: string) => {
      const srcDir = join(root, "packages", `dataverse-sdk-${kind}`, "src");
      const lines: string[] = [];
      for (const raw of spec.split("\n")) {
        const line = raw.trim();
        if (!line) continue;
        const colon = line.indexOf(":");
        const name = (colon < 0 ? line : line.slice(0, colon)).trim();
        const description = colon < 0 ? "" : line.slice(colon + 1).trim();
        const op = readOperation(srcDir, kind, name);
        if (!op)
          throw new Error(`docs: @mohsinonxrm/dataverse-sdk-${kind} has no operation ${name}`);
        lines.push(renderOperation(op, description));
      }
      // Blank lines around the list, as prettier formats it
      return `<!-- operations:${kind}\n${spec}-->\n\n${lines.join("\n")}\n\n<!-- /operations -->`;
    })
    .replace(COUNT, (_count, kind: OperationKind) => {
      return `<!-- count:${kind} -->${operationCount(root, kind).toLocaleString("en-US")}<!-- /count -->`;
    });
}

const COUNT = /<!-- count:(actions|functions|messages) -->[^<]*<!-- \/count -->/g;

/** How many operation classes a package exports: one per operation file its index re-exports. */
export function operationCount(root: string, kind: OperationKind): number {
  const srcDir = join(root, "packages", `dataverse-sdk-${kind}`, "src");
  const { file } = SUFFIX[kind];
  const index = readFileSync(join(srcDir, "index.ts"), "utf8");
  return [...index.matchAll(new RegExp(`from "\\./(\\w+)${file}\\.js";`, "g"))].length;
}

/** The docs about the operation packages, relative to the repository root. */
export const OPERATION_DOCS = [
  "docs/mapping/bulk-vs-batch.md",
  "docs/mapping/message-to-webapi.md",
  "docs/mapping/supported-actions.md",
  "docs/mapping/supported-functions.md",
  "docs/mapping/supported-messages.md",
  "docs/mapping/supported-operations.md",
  "packages/dataverse-sdk-actions/README.md",
  "packages/dataverse-sdk-functions/README.md",
  "packages/dataverse-sdk-messages/README.md",
];

/** Every name the actions, functions and messages packages export, read from their index.ts. */
export function exportedOperationNames(root: string): Set<string> {
  const names = new Set<string>();
  for (const kind of ["actions", "functions", "messages"] as const) {
    const index = readFileSync(
      join(root, "packages", `dataverse-sdk-${kind}`, "src", "index.ts"),
      "utf8"
    );
    for (const m of index.matchAll(/export (?:type )?\{([^}]*)\}/g)) {
      for (const part of m[1].split(",")) {
        const name = part.replace(/^\s*type\s+/, "").trim();
        if (name) names.add(name);
      }
    }
  }
  return names;
}

/**
 * Names that aren't SDK classes: a variable or method (`addRequest`), or a placeholder for the
 * reader's own custom API (`new_BoundAction`, `my_CustomAction`, `CustomFunction`).
 */
const PLACEHOLDER = /^(?:[a-z][A-Za-z0-9]*|(?:new|my|contoso)_\w+|Custom\w*)$/;

/**
 * Class-like names in a doc's code (inline code and fenced blocks) that end in `Action`,
 * `Function` or `Request` and that none of the three packages exports (placeholders aside). A line that names a .NET
 * SDK class says so (it contains ".NET") and is skipped.
 */
export function unknownOperationNames(markdown: string, exported: ReadonlySet<string>): string[] {
  const code: string[] = [];
  for (const m of markdown.matchAll(/```[\s\S]*?```/g)) {
    code.push(...m[0].split("\n").filter((line) => !line.includes(".NET")));
  }
  for (const line of markdown.replace(/```[\s\S]*?```/g, "").split("\n")) {
    if (line.includes(".NET")) continue;
    for (const m of line.matchAll(/`[^`\n]+`/g)) code.push(m[0]);
  }
  const unknown = new Set<string>();
  for (const text of code) {
    for (const m of text.matchAll(/\b([A-Za-z_][A-Za-z0-9_]*(?:Action|Function|Request))\b/g)) {
      const name = m[1];
      if (!exported.has(name) && !PLACEHOLDER.test(name)) unknown.add(name);
    }
  }
  return [...unknown].sort();
}
