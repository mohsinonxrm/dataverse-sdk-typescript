/**
 * The operation catalog, read from the source of the generated actions, functions and messages
 * packages. The Vite plugin in `vite.config.ts` runs this at build time and serves one JSON chunk
 * per package, which the explorer loads only when the visitor opens that package's list: the
 * ~2,400 operations never weigh on the first page load.
 *
 * It reads the same things as the docs generator (`tools/generate-sdk-types/src/docs`): the class,
 * its constructor arguments, the properties of its parameters interface and its route.
 */
import type { CatalogOperation, CatalogParameter, OperationKind } from "../types";

/** The file and class suffixes of each package: `WinOpportunityAction.ts` exports `WinOpportunityAction`. */
export const SUFFIX: Record<OperationKind, { file: string; cls: string }> = {
  actions: { file: "Action", cls: "Action" },
  functions: { file: "Function", cls: "Function" },
  messages: { file: "Message", cls: "Request" },
};

/** The operation stems a package's `index.ts` re-exports, e.g. `WinOpportunity` for `./WinOpportunityAction.js`. */
export function operationStems(kind: OperationKind, indexSource: string): string[] {
  const { file } = SUFFIX[kind];
  const stems = [...indexSource.matchAll(new RegExp(`from "\\./(\\w+)${file}\\.js";`, "g"))].map(
    (m) => m[1] ?? ""
  );
  return [...new Set(stems)].filter(Boolean).sort((a, b) => a.localeCompare(b));
}

/** Split a list on top-level separators: `,` in a parameter list, `;` between interface members. */
function splitTopLevel(text: string, separator: string): string[] {
  const out: string[] = [];
  let depth = 0;
  let current = "";
  for (const ch of text) {
    if ("(<[{".includes(ch)) depth++;
    if (")>]}".includes(ch)) depth--;
    if (ch === separator && depth === 0) {
      out.push(current);
      current = "";
    } else current += ch;
  }
  out.push(current);
  return out.map((p) => p.replace(/\s+/g, " ").trim()).filter(Boolean);
}

/** The text between the bracket `open` at or after `from` and its matching `close`. */
function enclosed(source: string, from: number, open: string, close: string): string {
  const start = source.indexOf(open, from) + 1;
  let depth = 1;
  let end = start;
  for (; end < source.length && depth > 0; end++) {
    if (source[end] === open) depth++;
    if (source[end] === close) depth--;
  }
  return source.slice(start, end - 1);
}

function readParameters(source: string, interfaceName: string): CatalogParameter[] {
  const at = source.indexOf(`export interface ${interfaceName} {`);
  if (at < 0) return [];
  return splitTopLevel(enclosed(source, at, "{", "}"), ";").flatMap((member) => {
    // Drop JSDoc comments in front of a member.
    const text = member.replace(/\/\*[\s\S]*?\*\//g, "").trim();
    const m = /^"?([\w@.]+)"?(\??): (.+)$/.exec(text);
    return m ? [{ name: m[1] ?? "", type: m[3] ?? "", optional: m[2] === "?" }] : [];
  });
}

/**
 * Operation `stem` of package `kind`, read from its source file, or `undefined` when the file
 * doesn't declare the class (a hand-written helper).
 */
export function parseOperation(
  kind: OperationKind,
  stem: string,
  source: string
): CatalogOperation | undefined {
  const className = `${stem}${SUFFIX[kind].cls}`;
  const classAt = source.search(new RegExp(`export class ${className}\\b`));
  if (classAt < 0) return undefined;
  const bodyAt = source.indexOf("toRequestInformation", classAt);
  if (bodyAt < 0) return undefined;
  const args: CatalogOperation["args"] = [];
  let parameters: CatalogParameter[] | undefined;
  const ctorAt = source.indexOf("constructor(", classAt);
  if (ctorAt >= 0 && ctorAt < bodyAt) {
    for (const p of splitTopLevel(enclosed(source, ctorAt + "constructor".length, "(", ")"), ",")) {
      const m = /^(?:public (?:readonly )?)?(\w+): (.+?)(?: = \{\})?$/.exec(p);
      if (!m) continue;
      const [, name = "", type = ""] = m;
      if (name === "parameters") parameters = readParameters(source, type);
      else args.push({ name, type });
    }
  }
  const url = /(?:const|let) url = `\$\{baseUrl\}\/([^`]*)`/.exec(source.slice(bodyAt));
  const route = `/${(url?.[1] ?? stem).replace(/\$\{(?:odataLiteral\.guid\()?this\.(\w+)\)?\}/g, "{$1}")}`;
  const method = /method: "GET"/.test(source.slice(bodyAt, bodyAt + 4000)) ? "GET" : "POST";
  return { kind, name: stem, className, method, route, args, parameters };
}
