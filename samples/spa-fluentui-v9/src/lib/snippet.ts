/**
 * Code snippets come from the scenario modules' own source, imported with Vite's `?raw`: the
 * Code panel shows the text between `// #region <name>` and `// #endregion` in the very file
 * whose function the Run button calls, so what you read is what runs.
 */

const IMPORT = /^import\s+(type\s+)?\{([^}]*)\}\s+from\s+"([^"]+)";?$/gm;

/** The package imports of `source` that `code` uses, as import lines. */
function importsUsedBy(source: string, code: string): string[] {
  const lines: string[] = [];
  for (const match of source.matchAll(IMPORT)) {
    const [, typeOnly, names = "", from = ""] = match;
    if (from.startsWith(".")) continue; // The sample's own helpers.
    const used = names
      .split(",")
      .map((n) => n.trim())
      .filter(Boolean)
      .filter((n) => {
        const local =
          n
            .replace(/^type\s+/, "")
            .split(/\s+as\s+/)
            .pop() ?? n;
        return new RegExp(`\\b${local}\\b`).test(code);
      });
    if (used.length) lines.push(`import ${typeOnly ?? ""}{ ${used.join(", ")} } from "${from}";`);
  }
  return lines;
}

function dedent(lines: string[]): string[] {
  const indents = lines.filter((l) => l.trim()).map((l) => /^ */.exec(l)?.[0].length ?? 0);
  const min = indents.length ? Math.min(...indents) : 0;
  return lines.map((l) => l.slice(min));
}

/** Every region name in `source`, in order. */
export function regionNames(source: string): string[] {
  return [...source.matchAll(/^\s*\/\/ #region (\S+)\s*$/gm)].map((m) => m[1] ?? "");
}

/**
 * The code of region `name` in `source`, preceded by the package imports it uses.
 * @throws when the region doesn't exist, so a renamed region fails loudly.
 */
export function snippet(source: string, name: string): string {
  const lines = source.split(/\r?\n/);
  const start = lines.findIndex((l) => l.trim() === `// #region ${name}`);
  if (start < 0) throw new Error(`No snippet region "${name}"`);
  const end = lines.findIndex((l, i) => i > start && l.trim() === "// #endregion");
  if (end < 0) throw new Error(`Snippet region "${name}" has no #endregion`);
  const code = dedent(lines.slice(start + 1, end))
    .join("\n")
    .trim();
  const imports = importsUsedBy(source, code);
  return imports.length ? `${imports.join("\n")}\n\n${code}` : code;
}
