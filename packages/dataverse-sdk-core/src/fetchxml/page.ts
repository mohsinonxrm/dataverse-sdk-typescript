import type { RequestOptions } from "../abstractions/options.js";

/**
 * One page of a FetchXML, saved-query or user-query result.
 *
 * Records keep their annotations, e.g. `statecode@OData.Community.Display.V1.FormattedValue`.
 */
export interface FetchXmlPage<T> {
  value: T[];
  /**
   * `@Microsoft.Dynamics.CRM.fetchxmlpagingcookie` as Dataverse sent it, e.g.
   * `<cookie pagenumber="2" pagingcookie="%253ccookie…" istracking="False" />`. Absent on the last
   * page. Use {@link parsePagingCookie} and {@link buildPagedFetchXml} to ask for the next page.
   */
  pagingCookie?: string;
  /**
   * `@Microsoft.Dynamics.CRM.morerecords`: whether there is another page. `false` when the
   * annotation is absent, which is how Dataverse marks the last page.
   */
  moreRecords: boolean;
  /**
   * `@Microsoft.Dynamics.CRM.totalrecordcount`: the number of matching rows when the query has
   * `returntotalrecordcount="true"` (at most 5000), otherwise `-1`.
   */
  totalRecordCount?: number;
  /** `@Microsoft.Dynamics.CRM.totalrecordcountlimitexceeded`: more than 5000 rows match. */
  totalRecordCountLimitExceeded?: boolean;
  /** `@odata.nextLink`, which saved and user queries can return instead of a paging cookie. */
  nextLink?: string;
  /** `@odata.count`, when Dataverse sent it. */
  count?: number;
}

/** Options for `fetchXml()`, `savedQuery()` and `userQuery()`. */
export interface FetchXmlOptions extends RequestOptions {
  /**
   * The `odata.include-annotations` preference. Default `"*"`: formatted values, lookup logical
   * names, navigation property names and the paging annotations. With a list, such as
   * `["OData.Community.Display.V1.FormattedValue"]`, `Microsoft.Dynamics.CRM.*` is added when no
   * entry covers it, because `moreRecords` and `totalRecordCount` come from those annotations.
   */
  annotations?: "*" | string[];
  /**
   * Longest GET URL to send, in characters. A longer FetchXML query is sent as a `POST $batch`
   * carrying the GET, which Dataverse documents for queries over the URL limit. Default `32768`,
   * the Web API's URL limit. Only used by `fetchXml()`.
   */
  maxUrlLength?: number;
}

/** The `Prefer` value for {@link FetchXmlOptions.annotations}. */
export function annotationsPreference(annotations: FetchXmlOptions["annotations"] = "*"): string {
  const terms = annotations === "*" ? ["*"] : [...annotations];
  const covered = terms.some((t) => t === "*" || /^Microsoft\.Dynamics\.CRM\.\*$/i.test(t));
  if (!covered) terms.push("Microsoft.Dynamics.CRM.*");
  return `odata.include-annotations="${terms.join(",")}"`;
}

const COOKIE = "@Microsoft.Dynamics.CRM.fetchxmlpagingcookie";
const MORE = "@Microsoft.Dynamics.CRM.morerecords";
const TOTAL = "@Microsoft.Dynamics.CRM.totalrecordcount";
const TOTAL_EXCEEDED = "@Microsoft.Dynamics.CRM.totalrecordcountlimitexceeded";

/** Read a FetchXML response body into a {@link FetchXmlPage}. */
export function toFetchXmlPage<T>(body: unknown): FetchXmlPage<T> {
  const b = (typeof body === "object" && body !== null ? body : {}) as Record<string, unknown>;
  const page: FetchXmlPage<T> = {
    value: Array.isArray(b.value) ? (b.value as T[]) : [],
    moreRecords: b[MORE] === true || b[MORE] === "true",
  };
  if (typeof b[COOKIE] === "string") page.pagingCookie = b[COOKIE];
  const total = toNumber(b[TOTAL]);
  if (total !== undefined) page.totalRecordCount = total;
  if (b[TOTAL_EXCEEDED] !== undefined) {
    page.totalRecordCountLimitExceeded = b[TOTAL_EXCEEDED] === true || b[TOTAL_EXCEEDED] === "true";
  }
  if (typeof b["@odata.nextLink"] === "string") page.nextLink = b["@odata.nextLink"];
  const count = toNumber(b["@odata.count"]);
  if (count !== undefined) page.count = count;
  return page;
}

function toNumber(v: unknown): number | undefined {
  if (typeof v === "number") return v;
  if (typeof v === "string" && v.trim() !== "" && Number.isFinite(Number(v))) return Number(v);
  return undefined;
}
