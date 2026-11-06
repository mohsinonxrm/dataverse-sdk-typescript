/**
 * Enough FetchXML for the demo: `<attribute>`, `<order>`, one `<filter>` of `<condition>`s
 * (eq, ne, gt, ge, lt, le, like, not-like, null, not-null), and `count`/`page`/`paging-cookie`/
 * `returntotalrecordcount` paging, with the annotations Dataverse returns.
 */
import { QuerySyntaxError } from "./odataQuery";
import { str, type Row, type TableDef } from "./store";

function attr(tag: string, name: string): string | undefined {
  const m = new RegExp(`\\b${name}\\s*=\\s*(["'])(.*?)\\1`, "i").exec(tag);
  return m?.[2]
    ?.replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&");
}

function like(value: string, pattern: string): boolean {
  const escaped = pattern
    .replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
    .replace(/%/g, ".*")
    .replace(/_/g, ".");
  return new RegExp(`^${escaped}$`, "i").test(value);
}

function test(row: Row, condition: string): boolean {
  const column = attr(condition, "attribute") ?? "";
  const operator = attr(condition, "operator") ?? "eq";
  const expected = attr(condition, "value");
  const raw = row[column] ?? row[`_${column}_value`];
  const actual = raw === null || raw === undefined ? null : str(raw).toLowerCase();
  const value = expected?.toLowerCase() ?? "";
  const n = (s: string | null) => (s === null ? NaN : Number(s));
  switch (operator) {
    case "eq":
      return actual === value;
    case "ne":
    case "neq":
      return actual !== value;
    case "gt":
      return n(actual) > Number(value);
    case "ge":
      return n(actual) >= Number(value);
    case "lt":
      return n(actual) < Number(value);
    case "le":
      return n(actual) <= Number(value);
    case "like":
      return actual !== null && like(actual, value);
    case "not-like":
      return actual === null || !like(actual, value);
    case "null":
      return actual === null;
    case "not-null":
      return actual !== null;
    default:
      throw new QuerySyntaxError(
        `The FetchXML condition operator '${operator}' is not supported in demo mode.`
      );
  }
}

export function runFetchXml(
  table: TableDef,
  xml: string,
  project: (row: Row, select: string[] | undefined) => Row
): Row {
  const fetch = /<fetch\b[^>]*>/i.exec(xml)?.[0];
  const entity = /<entity\b[^>]*>/i.exec(xml)?.[0];
  if (!fetch || !entity)
    throw new QuerySyntaxError("The FetchXML must have a <fetch> and an <entity> element.");
  const name = attr(entity, "name");
  if (name !== table.logicalName) {
    throw new QuerySyntaxError(
      `The FetchXML entity '${name ?? ""}' doesn't match the entity set '${table.entitySetName}'.`
    );
  }
  if (/<link-entity\b/i.test(xml))
    throw new QuerySyntaxError("<link-entity> is not supported in demo mode.");

  const known = new Set(table.attributes.map((a) => a.logicalName));
  const select = [...xml.matchAll(/<attribute\b[^>]*>/gi)].map((m) => attr(m[0], "name") ?? "");
  for (const column of select) {
    if (!known.has(column))
      throw new QuerySyntaxError(
        `'${table.logicalName}' entity doesn't contain attribute with Name = '${column}'.`
      );
  }
  const lookups = new Set(
    table.attributes
      .filter((a) => a.type === "Lookup" || a.type === "Owner")
      .map((a) => a.logicalName)
  );
  const columns = select.map((c) => (lookups.has(c) ? `_${c}_value` : c));

  let rows = [...table.rows.values()];
  const conditions = [...xml.matchAll(/<condition\b[^>]*>/gi)].map((m) => m[0]);
  const isOr = /<filter\b[^>]*type\s*=\s*["']or["']/i.test(xml);
  if (conditions.length) {
    rows = rows.filter((r) =>
      isOr ? conditions.some((c) => test(r, c)) : conditions.every((c) => test(r, c))
    );
  }
  const orders = [...xml.matchAll(/<order\b[^>]*>/gi)].map((m) => ({
    column: attr(m[0], "attribute") ?? "",
    desc: attr(m[0], "descending") === "true",
  }));
  rows.sort((a, b) => {
    for (const o of orders) {
      const x = a[o.column];
      const y = b[o.column];
      const c =
        typeof x === "number" && typeof y === "number" ? x - y : str(x).localeCompare(str(y));
      if (c !== 0) return o.desc ? -c : c;
    }
    return 0;
  });

  const count = Number(attr(fetch, "count") ?? 5000);
  const page = Number(attr(fetch, "page") ?? 1);
  const slice = rows.slice((page - 1) * count, page * count);
  const more = page * count < rows.length;
  const body: Row = { value: slice.map((r) => project(r, columns.length ? columns : undefined)) };
  if (attr(fetch, "returntotalrecordcount") === "true") {
    body["@Microsoft.Dynamics.CRM.totalrecordcount"] = Math.min(rows.length, 5000);
    body["@Microsoft.Dynamics.CRM.totalrecordcountlimitexceeded"] = rows.length > 5000;
  }
  body["@Microsoft.Dynamics.CRM.morerecords"] = more;
  if (more) {
    const last = slice[slice.length - 1];
    const id = str(last?.[table.primaryIdAttribute]);
    const inner = encodeURIComponent(
      encodeURIComponent(
        `<cookie page="${page}"><${table.primaryIdAttribute} last="{${id.toUpperCase()}}" /></cookie>`
      )
    );
    body["@Microsoft.Dynamics.CRM.fetchxmlpagingcookie"] =
      `<cookie pagenumber="${page + 1}" pagingcookie="${inner}" istracking="False" />`;
  }
  return body;
}
