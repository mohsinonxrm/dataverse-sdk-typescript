/**
 * Enough of OData `$filter` and `$orderby` for the demo: comparisons, `and`/`or`/`not`,
 * parentheses, and `contains`/`startswith`/`endswith`. Anything else is a syntax error, which the
 * fake reports the way Dataverse does (400, code 0x80060888).
 */
import { str, type Row } from "./store";

type Value = string | number | boolean | null;
type Expr =
  | { op: "and" | "or"; left: Expr; right: Expr }
  | { op: "not"; expr: Expr }
  | { op: "cmp"; cmp: string; field: string; value: Value }
  | { op: "fn"; fn: string; field: string; value: string };

export class QuerySyntaxError extends Error {}

const TOKEN =
  /\s*(?:(\()|(\))|(,)|('(?:[^']|'')*')|(-?\d+(?:\.\d+)?(?![\w-]))|([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12})|([A-Za-z_][\w.]*))/y;

function tokenize(text: string): string[] {
  const tokens: string[] = [];
  TOKEN.lastIndex = 0;
  while (TOKEN.lastIndex < text.length) {
    const start = TOKEN.lastIndex;
    const m = TOKEN.exec(text);
    if (!m) {
      if (text.slice(start).trim() === "") break;
      throw new QuerySyntaxError(`Syntax error at position ${start} in '${text}'.`);
    }
    const token = m.slice(1).find((t) => t !== undefined);
    if (token !== undefined) tokens.push(token);
  }
  return tokens;
}

function literal(token: string | undefined, text: string): Value {
  if (token === undefined) throw new QuerySyntaxError(`Expression expected in '${text}'.`);
  if (token.startsWith("'")) return token.slice(1, -1).replace(/''/g, "'");
  if (token === "null") return null;
  if (token === "true" || token === "false") return token === "true";
  if (/^-?\d/.test(token) && !token.includes("-", 1)) return Number(token);
  if (/^[0-9a-f-]{36}$/i.test(token)) return token.toLowerCase();
  throw new QuerySyntaxError(`Unexpected '${token}' in '${text}'.`);
}

export function parseFilter(text: string): Expr {
  const tokens = tokenize(text);
  let i = 0;
  const peek = () => tokens[i];
  const next = () => tokens[i++];
  const expect = (t: string) => {
    if (next() !== t) throw new QuerySyntaxError(`'${t}' expected in '${text}'.`);
  };

  function primary(): Expr {
    const token = next();
    if (token === "(") {
      const e = or();
      expect(")");
      return e;
    }
    if (token === "not") return { op: "not", expr: primary() };
    if (token && ["contains", "startswith", "endswith"].includes(token.toLowerCase())) {
      expect("(");
      const field = next() ?? "";
      expect(",");
      const value = literal(next(), text);
      expect(")");
      return { op: "fn", fn: token.toLowerCase(), field, value: String(value) };
    }
    if (!token || !/^[A-Za-z_]/.test(token)) {
      throw new QuerySyntaxError(`Syntax error at position ${i} in '${text}'.`);
    }
    const cmp = next();
    if (!cmp || !["eq", "ne", "gt", "ge", "lt", "le"].includes(cmp)) {
      throw new QuerySyntaxError(`Syntax error: comparison operator expected after '${token}'.`);
    }
    return { op: "cmp", cmp, field: token, value: literal(next(), text) };
  }
  function and(): Expr {
    let left = primary();
    while (peek() === "and") {
      next();
      left = { op: "and", left, right: primary() };
    }
    return left;
  }
  function or(): Expr {
    let left = and();
    while (peek() === "or") {
      next();
      left = { op: "or", left, right: and() };
    }
    return left;
  }

  const expr = or();
  if (i < tokens.length) throw new QuerySyntaxError(`Syntax error at '${tokens[i]}' in '${text}'.`);
  return expr;
}

function compare(a: unknown, b: Value): number {
  if (a === null || a === undefined) return b === null ? 0 : -1;
  if (typeof a === "number" && typeof b === "number") return a - b;
  return str(a).localeCompare(str(b), undefined, { sensitivity: "base" });
}

export function matches(row: Row, expr: Expr, known: (field: string) => boolean): boolean {
  switch (expr.op) {
    case "and":
      return matches(row, expr.left, known) && matches(row, expr.right, known);
    case "or":
      return matches(row, expr.left, known) || matches(row, expr.right, known);
    case "not":
      return !matches(row, expr.expr, known);
    case "fn": {
      if (!known(expr.field))
        throw new QuerySyntaxError(`Could not find a property named '${expr.field}'.`);
      const v = str(row[expr.field]).toLowerCase();
      const s = expr.value.toLowerCase();
      return expr.fn === "contains"
        ? v.includes(s)
        : expr.fn === "startswith"
          ? v.startsWith(s)
          : v.endsWith(s);
    }
    case "cmp": {
      if (!known(expr.field))
        throw new QuerySyntaxError(`Could not find a property named '${expr.field}'.`);
      const raw = row[expr.field];
      const actual = typeof raw === "string" ? raw.toLowerCase() : raw;
      const c = compare(
        actual,
        typeof expr.value === "string" ? expr.value.toLowerCase() : expr.value
      );
      if (expr.cmp === "eq")
        return expr.value === null ? raw === null || raw === undefined : c === 0;
      if (expr.cmp === "ne")
        return expr.value === null ? raw !== null && raw !== undefined : c !== 0;
      if (raw === null || raw === undefined) return false;
      if (expr.cmp === "gt") return c > 0;
      if (expr.cmp === "ge") return c >= 0;
      if (expr.cmp === "lt") return c < 0;
      return c <= 0;
    }
  }
}

export function sortRows(rows: Row[], orderBy: string, known: (field: string) => boolean): Row[] {
  const keys = orderBy
    .split(",")
    .map((part) => part.trim().split(/\s+/))
    .map(([field = "", dir = "asc"]) => {
      if (!known(field)) throw new QuerySyntaxError(`Could not find a property named '${field}'.`);
      return { field, desc: dir.toLowerCase() === "desc" };
    });
  return [...rows].sort((a, b) => {
    for (const { field, desc } of keys) {
      const c = compare(a[field], (b[field] ?? null) as Value);
      if (c !== 0) return desc ? -c : c;
    }
    return 0;
  });
}
