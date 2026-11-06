/**
 * Pure helpers for FetchXML paging. They don't send anything, so apps with their own paging state
 * (such as a query editor) can use them as they are.
 */

/** The parts of a `@Microsoft.Dynamics.CRM.fetchxmlpagingcookie` annotation. */
export interface ParsedPagingCookie {
  /** The page to ask for next (`pagenumber`). */
  pageNumber: number;
  /**
   * The cookie to send back as the `paging-cookie` attribute of `<fetch>`, decoded: for example
   * `<cookie page="1"><accountid last="{…}" first="{…}" /></cookie>`.
   */
  pagingCookie: string;
}

/**
 * Parse a `@Microsoft.Dynamics.CRM.fetchxmlpagingcookie` annotation, such as
 * `<cookie pagenumber="2" pagingcookie="%253ccookie%2520page…" istracking="False" />`.
 * The `pagingcookie` attribute is URL-encoded twice by Dataverse; the result holds it decoded.
 * Returns `undefined` for a missing or unrecognised value.
 *
 * @example
 * ```typescript
 * const next = parsePagingCookie(page.pagingCookie);
 * if (page.moreRecords && next) {
 *   xml = buildPagedFetchXml(xml, { page: next.pageNumber, pagingCookie: next.pagingCookie });
 * }
 * ```
 */
export function parsePagingCookie(annotation: string | undefined): ParsedPagingCookie | undefined {
  if (!annotation) return undefined;
  const start = /<cookie\b/i.exec(annotation);
  if (!start) return undefined;
  const tag = readStartTag(annotation, start.index);
  if (!tag) return undefined;
  const attrs = new Map(tag.attributes.map((a) => [a.name.toLowerCase(), unescapeXml(a.value)]));
  const pageNumber = Number(attrs.get("pagenumber"));
  const encoded = attrs.get("pagingcookie");
  if (!Number.isInteger(pageNumber) || pageNumber < 1 || encoded === undefined) return undefined;
  return { pageNumber, pagingCookie: urlDecode(urlDecode(encoded)) };
}

/** What {@link buildPagedFetchXml} sets on the `<fetch>` element. */
export interface FetchXmlPaging {
  /** `page`: 1 for the first page. */
  page: number;
  /** `paging-cookie`: the decoded cookie from {@link parsePagingCookie}. Omit to page by number only. */
  pagingCookie?: string;
  /** `count`: rows per page. Omit to keep the query's own `count`. */
  count?: number;
}

/**
 * Return `fetchXml` with `page`, `paging-cookie` and (optionally) `count` set on its root `<fetch>`
 * element. Other attributes and the rest of the document are kept as written. Without
 * `pagingCookie`, an existing `paging-cookie` attribute is removed (so page 1 starts clean).
 *
 * @throws {TypeError} when the document has no `<fetch>` element.
 */
export function buildPagedFetchXml(fetchXml: string, paging: FetchXmlPaging): string {
  const start = /<fetch(?=[\s/>])/i.exec(fetchXml);
  const tag = start ? readStartTag(fetchXml, start.index) : undefined;
  if (!start || !tag) {
    throw new TypeError("buildPagedFetchXml(): the FetchXML has no <fetch> element.");
  }
  const set = new Map<string, string | undefined>([
    ["page", String(paging.page)],
    ["paging-cookie", paging.pagingCookie],
  ]);
  if (paging.count !== undefined) set.set("count", String(paging.count));

  const parts: string[] = [];
  for (const attr of tag.attributes) {
    const key = attr.name.toLowerCase();
    if (set.has(key)) continue; // replaced below
    parts.push(attr.raw);
  }
  for (const [name, value] of set) {
    if (value !== undefined) parts.push(`${name}="${escapeXmlAttribute(value)}"`);
  }
  const close = tag.selfClosing ? "/>" : ">";
  const rebuilt = `<${tag.name}${parts.map((p) => ` ${p}`).join("")}${close}`;
  return fetchXml.slice(0, start.index) + rebuilt + fetchXml.slice(tag.end);
}

interface Attribute {
  name: string;
  /** The value as written (entities not decoded). */
  value: string;
  /** `name="value"` exactly as written. */
  raw: string;
}

interface StartTag {
  name: string;
  attributes: Attribute[];
  selfClosing: boolean;
  /** Index just past the closing `>`. */
  end: number;
}

/** Read the start tag at `index` (which points at `<`). Quoted values may contain `>`. */
function readStartTag(text: string, index: number): StartTag | undefined {
  let i = index + 1;
  const nameMatch = /^[A-Za-z_][\w.-]*/.exec(text.slice(i));
  if (!nameMatch) return undefined;
  const name = nameMatch[0];
  i += name.length;
  const attributes: Attribute[] = [];
  while (i < text.length) {
    while (i < text.length && /\s/.test(text.charAt(i))) i++;
    const ch = text.charAt(i);
    if (ch === ">") return { name, attributes, selfClosing: false, end: i + 1 };
    if (ch === "/" && text.charAt(i + 1) === ">") {
      return { name, attributes, selfClosing: true, end: i + 2 };
    }
    const attr = /^([^\s=/>]+)\s*=\s*(["'])/.exec(text.slice(i));
    if (!attr?.[1] || !attr[2]) return undefined;
    const quote = attr[2];
    const valueStart = i + attr[0].length;
    const valueEnd = text.indexOf(quote, valueStart);
    if (valueEnd === -1) return undefined;
    attributes.push({
      name: attr[1],
      value: text.slice(valueStart, valueEnd),
      raw: text.slice(i, valueEnd + 1),
    });
    i = valueEnd + 1;
  }
  return undefined;
}

function escapeXmlAttribute(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function unescapeXml(value: string): string {
  return value.replace(/&(lt|gt|quot|apos|amp|#\d+|#x[0-9a-f]+);/gi, (entity, name: string) => {
    const n = name.toLowerCase();
    if (n === "lt") return "<";
    if (n === "gt") return ">";
    if (n === "quot") return '"';
    if (n === "apos") return "'";
    if (n === "amp") return "&";
    const code = n.startsWith("#x") ? parseInt(n.slice(2), 16) : parseInt(n.slice(1), 10);
    return code <= 0x10ffff ? String.fromCodePoint(code) : entity;
  });
}

/** Decode like .NET `HttpUtility.UrlDecode`, which Microsoft's samples use: `+` is a space. */
function urlDecode(value: string): string {
  const spaced = value.replace(/\+/g, " ");
  try {
    return decodeURIComponent(spaced);
  } catch {
    return spaced;
  }
}
