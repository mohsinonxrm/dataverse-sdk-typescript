import type { PreferOption, RequestOptions } from "../abstractions/options.js";
import type { DataverseClient } from "../client/DataverseClient.js";
import { DataverseError } from "../errors/DataverseError.js";
import { DataverseInvalidRequestError } from "../errors/NamedErrors.js";

/**
 * A row that left the tracked set since the delta link was issued: in the Web API response, an
 * entry whose `@odata.context` ends in `$deletedEntity`.
 */
export interface DeletedRecord {
  /** The row's primary key, e.g. the `accountid` of a deleted account. */
  id: string;
  /**
   * `"deleted"`: the row was deleted (what Dataverse sends). `"changed"`: the row no longer
   * belongs to the tracked set (the other reason OData defines).
   */
  reason: "deleted" | "changed";
}

/** One page of a change-tracking response. */
export interface TrackedChangesPage<T> {
  /** Rows created or updated since the delta link was issued (on a first sync: every row). */
  changed: T[];
  /** Rows deleted since the delta link was issued. Always empty on a first sync. */
  deleted: DeletedRecord[];
  /**
   * `@odata.deltaLink`, on the last page only. Save it and pass it to
   * `client.changesSince()` to get the changes made after this sync.
   */
  deltaLink?: string;
}

/** Every page of a change-tracking response, collected. */
export interface TrackedChanges<T> {
  /** Rows created or updated since the delta link was issued (on a first sync: every row). */
  changed: T[];
  /** Rows deleted since the delta link was issued. Always empty on a first sync. */
  deleted: DeletedRecord[];
  /**
   * `@odata.deltaLink`: the link that returns the changes made after this sync. Save it (it is an
   * absolute URL with a `$deltatoken`) and pass it to `client.changesSince()` next time.
   */
  deltaLink: string;
}

/** Options for `trackChanges()`, `iterateChanges()`, `changesSince()` and `iterateChangesSince()`. */
export interface TrackChangesOptions extends RequestOptions {
  /**
   * Rows per page (`Prefer: odata.maxpagesize`). Dataverse's default, 5000, applies when unset.
   * Every page is requested, whatever the size.
   */
  maxPageSize?: number;
}

/** Dataverse's `ExpiredVersionStamp` error: the delta link is older than the org keeps changes. */
const EXPIRED_VERSION_STAMP = "0x80044352";

/**
 * Whether `error` says a delta link has expired. Dataverse keeps changes for
 * `ExpireChangeTrackingInDays` (an organization setting, 7 days by default); a delta link older
 * than that is refused with `ExpiredVersionStamp` (`0x80044352`, "Version stamp associated with
 * the client has expired. Please perform a full sync."). Start over with `trackChanges()`.
 */
export function isDeltaLinkExpired(error: unknown): boolean {
  return (
    error instanceof DataverseError &&
    (error.code?.toLowerCase() === EXPIRED_VERSION_STAMP || error.code === "-2147204270")
  );
}

/** The `Prefer` values a change-tracking request adds. */
export function changePreferences(
  options: TrackChangesOptions | undefined,
  trackChanges: boolean
): RequestOptions {
  const { maxPageSize, ...rest } = options ?? {};
  const prefer: PreferOption[] = [...(rest.prefer ?? [])];
  if (trackChanges) prefer.push("odata.track-changes" as PreferOption);
  if (maxPageSize !== undefined)
    prefer.push(`odata.maxpagesize=${String(maxPageSize)}` as PreferOption);
  return prefer.length > 0 ? { ...rest, prefer } : rest;
}

/** A `$deltatoken` in a URL's query, also when the `$` is percent-encoded. */
const DELTA_TOKEN = /[?&](?:\$|%24)deltatoken=/i;

/** @throws {DataverseInvalidRequestError} When `deltaLink` isn't a delta link. */
export function checkDeltaLink(deltaLink: string): void {
  if (typeof deltaLink !== "string" || !deltaLink.trim()) {
    throw DataverseInvalidRequestError.missingParameter("deltaLink");
  }
  if (!DELTA_TOKEN.test(deltaLink)) {
    throw DataverseInvalidRequestError.invalidParameter(
      "deltaLink",
      "has no $deltatoken; pass the @odata.deltaLink of an earlier sync (TrackedChanges.deltaLink)"
    );
  }
}

/**
 * The pages of a change-tracking response, following `@odata.nextLink`. `first` sends the first
 * request; later pages are sent with `later()`. `resumedFrom` is the delta link a resumed sync
 * started from: when its last page carries no new delta link, that one stays valid.
 */
export async function* changePages<T>(
  client: DataverseClient,
  first: () => Promise<unknown>,
  later: () => RequestOptions,
  resumedFrom?: string
): AsyncGenerator<TrackedChangesPage<T>> {
  let body = await first();
  const laterOptions = later();
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- ends with return
  while (true) {
    const { page, nextLink } = toChangesPage<T>(body);
    if (nextLink === undefined) {
      page.deltaLink ??= resumedFrom;
      if (page.deltaLink === undefined) throw noDeltaLink();
      yield page;
      return;
    }
    yield page;
    body = await client.api(nextLink).get(laterOptions);
  }
}

/** Collect the pages of {@link changePages}. */
export async function collectChanges<T>(
  pages: AsyncIterable<TrackedChangesPage<T>>
): Promise<TrackedChanges<T>> {
  const changed: T[] = [];
  const deleted: DeletedRecord[] = [];
  let deltaLink = "";
  for await (const page of pages) {
    changed.push(...page.changed);
    deleted.push(...page.deleted);
    deltaLink = page.deltaLink ?? deltaLink;
  }
  return { changed, deleted, deltaLink };
}

/** Split a response body into changed rows, deleted rows and its links. */
function toChangesPage<T>(body: unknown): { page: TrackedChangesPage<T>; nextLink?: string } {
  const b = (typeof body === "object" && body !== null ? body : {}) as Record<string, unknown>;
  const page: TrackedChangesPage<T> = { changed: [], deleted: [] };
  for (const item of Array.isArray(b.value) ? (b.value as unknown[]) : []) {
    const deleted = deletedRecord(item);
    if (deleted) page.deleted.push(deleted);
    else page.changed.push(item as T);
  }
  if (typeof b["@odata.deltaLink"] === "string") page.deltaLink = b["@odata.deltaLink"];
  const next = b["@odata.nextLink"];
  return typeof next === "string" ? { page, nextLink: next } : { page };
}

function deletedRecord(item: unknown): DeletedRecord | undefined {
  if (typeof item !== "object" || item === null) return undefined;
  const entry = item as Record<string, unknown>;
  const context = entry["@odata.context"];
  if (typeof context !== "string" || !context.endsWith("$deletedEntity")) return undefined;
  return {
    id: typeof entry.id === "string" ? entry.id : String(entry.id),
    reason: entry.reason === "changed" ? "changed" : "deleted",
  };
}

function noDeltaLink(): DataverseInvalidRequestError {
  const error = new DataverseInvalidRequestError(
    "Dataverse returned no @odata.deltaLink. Is change tracking enabled for this table? " +
      "(EntityDefinitions(LogicalName='…')?$select=ChangeTrackingEnabled)"
  );
  error.name = "NoDeltaLink";
  return error;
}
