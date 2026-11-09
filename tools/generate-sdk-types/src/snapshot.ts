/**
 * The committed `$metadata` snapshot (#293).
 *
 * The actions, functions and messages packages are generated from
 * `metadata/dataverse-metadata.xml`, so anyone can regenerate them without an org. Dataverse
 * returns `$metadata` on one 20 MB line, in an order that changes between fetches (the properties
 * of an entity type come back shuffled), so the fetched XML is rewritten before it's saved:
 *
 * - one element per line, indented, so a refresh shows as a readable diff;
 * - the children of `Schema`, `EntityContainer`, entity and complex types and entity sets sorted
 *   by element and `Name`, and enum members by value, so two fetches of the same schema save the
 *   same file. Everything else keeps its order: operation parameters (the binding parameter comes
 *   first), entity keys and annotations;
 * - elements that mention an org-specific publisher prefix ({@link ORG_SPECIFIC_PREFIXES})
 *   removed, with their children: a table someone made in the dev org isn't part of a product
 *   and doesn't belong in the packages.
 *
 * Nothing else changes: attribute values and text are kept byte for byte, and the CSDL means the
 * same thing (XML whitespace between CSDL elements is insignificant).
 */

/**
 * Publisher prefixes of tables made in the dev org itself (unmanaged, in no Microsoft solution).
 * An element whose start tag contains `<prefix>_` is left out of the snapshot.
 */
export const ORG_SPECIFIC_PREFIXES: readonly string[] = ["cbstest"];

interface XmlNode {
  /** The start tag, or the whole element when it has no child elements. */
  open: string;
  tag: string;
  children: XmlNode[];
  /** The end tag, for an element with child elements. */
  close?: string;
}

const START = /^<([A-Za-z_][\w:.-]*)/;

/** Split the XML into tags (text stays with its element: `<String>contains</String>`). */
function tokens(xml: string): string[] {
  return xml
    .replace(/>\s*</g, ">\n<")
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

function parse(xml: string): XmlNode[] {
  const root: XmlNode = { open: "", tag: "", children: [] };
  const stack: XmlNode[] = [root];
  for (const token of tokens(xml)) {
    const parent = stack[stack.length - 1];
    if (token.startsWith("</")) {
      parent.close = token;
      stack.pop();
      if (stack.length === 0) throw new Error("snapshot: unbalanced end tag " + token);
      continue;
    }
    const tag = START.exec(token)?.[1] ?? "";
    const node: XmlNode = { open: token, tag, children: [] };
    parent.children.push(node);
    const leaf =
      token.startsWith("<?") ||
      token.startsWith("<!") ||
      token.endsWith("/>") ||
      (tag !== "" && token.endsWith(`</${tag}>`));
    if (!leaf) stack.push(node);
  }
  if (stack.length !== 1)
    throw new Error("snapshot: unclosed element " + stack[stack.length - 1].tag);
  return root.children;
}

function attribute(node: XmlNode, name: string): string {
  return new RegExp(`\\s${name}="([^"]*)"`).exec(node.open)?.[1] ?? "";
}

function serialize(nodes: readonly XmlNode[], depth = 0, out: string[] = []): string[] {
  const indent = "  ".repeat(depth);
  for (const node of nodes) {
    out.push(indent + node.open);
    if (node.close !== undefined) {
      serialize(node.children, depth + 1, out);
      out.push(indent + node.close);
    }
  }
  return out;
}

const compare = (a: string, b: string): number => (a < b ? -1 : a > b ? 1 : 0);

/** Children of these elements are sorted; the rank orders element kinds within the parent. */
const SORTED: Partial<Record<string, Record<string, number>>> = {
  Schema: {},
  EntityContainer: {},
  EntityType: { Key: 0, Property: 1, NavigationProperty: 2 },
  ComplexType: { Property: 1, NavigationProperty: 2 },
  EntitySet: {},
};

function canonical(nodes: XmlNode[], parentTag: string, exclude: RegExp | undefined): XmlNode[] {
  const kept = exclude ? nodes.filter((n) => !exclude.test(n.open)) : nodes;
  for (const node of kept) node.children = canonical(node.children, node.tag, exclude);
  if (parentTag === "EnumType") {
    const value = (n: XmlNode): number => Number(attribute(n, "Value"));
    return kept
      .map((n, i) => ({ n, i }))
      .sort((a, b) => value(a.n) - value(b.n) || a.i - b.i)
      .map(({ n }) => n);
  }
  const ranks = SORTED[parentTag];
  if (!ranks) return kept;
  // Annotations (rank 9) stay last, in their order; everything else by kind, then name, then text
  const rank = (n: XmlNode): number => ranks[n.tag] ?? (n.tag === "Annotation" ? 9 : 5);
  const key = (n: XmlNode): string => attribute(n, "Name") || attribute(n, "Path");
  const text = new Map(kept.map((n) => [n, serialize([n]).join("\n")]));
  return kept
    .map((n, i) => ({ n, i }))
    .sort((a, b) => {
      const ra = rank(a.n);
      const rb = rank(b.n);
      if (ra !== rb) return ra - rb;
      if (ra === 9) return a.i - b.i;
      return (
        compare(a.n.tag, b.n.tag) ||
        compare(key(a.n), key(b.n)) ||
        compare(text.get(a.n) ?? "", text.get(b.n) ?? "")
      );
    })
    .map(({ n }) => n);
}

/**
 * `xml` (a `$metadata` document) as it's committed: one element per line, in canonical order,
 * without the org-specific elements. Applying it twice gives the same text.
 */
export function snapshotCsdl(
  xml: string,
  excludePrefixes: readonly string[] = ORG_SPECIFIC_PREFIXES
): string {
  const exclude =
    excludePrefixes.length > 0
      ? new RegExp(`(?:${excludePrefixes.map((p) => p.replace(/\W/g, "\\$&")).join("|")})_`)
      : undefined;
  return serialize(canonical(parse(xml), "", exclude)).join("\n") + "\n";
}
