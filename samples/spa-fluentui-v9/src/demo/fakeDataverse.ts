/**
 * Demo mode's environment: a `fetch` that answers like the Dataverse Web API and the Global
 * Discovery Service, from the in-memory tables in `store.ts`. The SDK runs unchanged on top of it
 * (it is passed as `fetchProvider`), so every scenario can be tried without an org.
 *
 * It covers what the scenarios use, not the whole Web API. It is not a test double for the SDK:
 * the SDK's own tests use `@mohsinonxrm/dataverse-sdk-testing`.
 */
import type { FetchProvider } from "@mohsinonxrm/dataverse-sdk-core";
import { DEMO_ENVIRONMENT_URL } from "../config";
import { handleBatch } from "./batch";
import { discoveryResponse } from "./discovery";
import { runFetchXml } from "./fetchXml";
import { entityDefinitionsResponse } from "./metadata";
import { matches, parseFilter, QuerySyntaxError, sortRows } from "./odataQuery";
import {
  BUSINESS_UNIT_ID,
  createSchema,
  DEMO_USER,
  newGuid,
  ORGANIZATION_ID,
  str,
  type Row,
  type Schema,
  type TableDef,
} from "./store";

export const DEMO_API_URL = `${DEMO_ENVIRONMENT_URL}/api/data/v9.2`;
const API_PATH = "/api/data/v9.2/";

export interface FakeRequest {
  method: string;
  url: URL;
  /** Lower-cased names. */
  headers: Record<string, string>;
  body: string;
}

export interface FakeResponse {
  status: number;
  headers: Record<string, string>;
  body?: string | Uint8Array<ArrayBuffer>;
}

export interface StoredFile {
  name: string;
  mimeType: string;
  bytes: Uint8Array<ArrayBuffer>;
}

interface Upload {
  table: TableDef;
  id: string;
  column: string;
  fileName: string;
  blocks: Map<string, Uint8Array<ArrayBuffer>>;
}

export interface DemoState {
  schema: Schema;
  uploads: Map<string, Upload>;
  version: number;
}

// ───────────────────────────── responses ─────────────────────────────

export function json(
  status: number,
  body: unknown,
  headers: Record<string, string> = {}
): FakeResponse {
  return {
    status,
    headers: { "content-type": "application/json; odata.metadata=minimal", ...headers },
    body: JSON.stringify(body),
  };
}

export function odataError(status: number, code: string, message: string): FakeResponse {
  return json(status, { error: { code, message } });
}

function noContent(headers: Record<string, string> = {}): FakeResponse {
  return { status: 204, headers };
}

const badRequest = (message: string) => odataError(400, "0x80060888", message);

// ───────────────────────────── helpers ─────────────────────────────

function preferences(req: FakeRequest): Map<string, string> {
  const out = new Map<string, string>();
  for (const part of (req.headers.prefer ?? "").split(",")) {
    const [name = "", value = ""] = part.trim().split("=");
    if (name) out.set(name.toLowerCase(), value.replace(/^"|"$/g, ""));
  }
  return out;
}

function decodeBase64(text: string): Uint8Array<ArrayBuffer> {
  const binary = atob(text);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return bytes;
}

function parseBody(req: FakeRequest): Record<string, unknown> {
  if (!req.body) return {};
  const parsed: unknown = JSON.parse(req.body);
  if (typeof parsed !== "object" || parsed === null || Array.isArray(parsed)) {
    throw new QuerySyntaxError("The request body must be a JSON object.");
  }
  return parsed as Record<string, unknown>;
}

function etag(row: Row): string {
  return `W/"${String(row.versionnumber)}"`;
}

/** Split `a,b(c,d),e` at top-level commas. */
function splitTopLevel(text: string, separator = ","): string[] {
  const parts: string[] = [];
  let depth = 0;
  let current = "";
  for (const ch of text) {
    if (ch === "(") depth++;
    if (ch === ")") depth--;
    if (ch === separator && depth === 0) {
      parts.push(current);
      current = "";
    } else current += ch;
  }
  if (current.trim()) parts.push(current);
  return parts.map((p) => p.trim()).filter(Boolean);
}

function caller(state: DemoState, req: FakeRequest): Row | FakeResponse {
  const users = state.schema.bySetName("systemusers");
  const objectId = req.headers.callerobjectid?.toLowerCase();
  const userId = req.headers.mscrmcallerid?.replace(/[{}]/g, "").toLowerCase();
  const all = [...(users?.rows.values() ?? [])];
  if (objectId) {
    const user = all.find((u) => u.azureactivedirectoryobjectid === objectId);
    return (
      user ??
      odataError(
        400,
        "0x80040217",
        `No user with Microsoft Entra object id ${objectId} exists in this environment.`
      )
    );
  }
  if (userId) {
    const user = all.find((u) => u.systemuserid === userId);
    return user ?? odataError(400, "0x80040217", `systemuser With Id = ${userId} Does Not Exist`);
  }
  return all.find((u) => u.systemuserid === DEMO_USER.systemuserid) ?? {};
}

function isResponse(value: Row | FakeResponse): value is FakeResponse {
  return typeof value.status === "number" && typeof value.headers === "object";
}

// ───────────────────────────── reading rows ─────────────────────────────

function knownField(table: TableDef) {
  const names = new Set<string>();
  for (const a of table.attributes) {
    if (a.type === "Lookup" || a.type === "Owner") names.add(`_${a.logicalName}_value`);
    else names.add(a.logicalName);
  }
  return (field: string) => names.has(field);
}

function formatValue(table: TableDef, column: string, value: unknown): string | undefined {
  if (value === null || value === undefined) return undefined;
  const attr = table.attributes.find((a) => a.logicalName === column);
  if (!attr) return undefined;
  if (attr.options) return attr.options.find((o) => o.value === value)?.label;
  if (attr.type === "Money" && typeof value === "number") {
    return value.toLocaleString("en-US", { style: "currency", currency: "USD" });
  }
  if ((attr.type === "Integer" || attr.type === "BigInt") && typeof value === "number") {
    return value.toLocaleString("en-US");
  }
  if (attr.type === "DateTime" && typeof value === "string") {
    return new Date(value).toLocaleString("en-US", {
      dateStyle: "short",
      timeStyle: "short",
      timeZone: "UTC",
    });
  }
  if (attr.type === "Boolean") return value ? "Yes" : "No";
  return undefined;
}

interface ReadOptions {
  select?: string[];
  expand?: string;
  annotations: boolean;
}

function selectableColumns(table: TableDef): string[] {
  return table.attributes
    .filter((a) => a.type !== "Image" && a.type !== "File")
    .map((a) =>
      a.type === "Lookup" || a.type === "Owner" ? `_${a.logicalName}_value` : a.logicalName
    );
}

function project(state: DemoState, table: TableDef, row: Row, options: ReadOptions): Row {
  const columns = options.select?.length ? options.select : selectableColumns(table);
  const out: Row = { "@odata.etag": etag(row) };
  for (const column of columns) {
    const value = row[column] ?? null;
    out[column] = value;
    if (!options.annotations) continue;
    const lookup = /^_(.+)_value$/.exec(column)?.[1];
    if (lookup && typeof value === "string") {
      const attr = table.attributes.find((a) => a.logicalName === lookup);
      const target = state.schema.byLogicalName(attr?.targets?.[0] ?? "");
      const related = target?.rows.get(value);
      if (target && related) {
        out[`${column}@OData.Community.Display.V1.FormattedValue`] = str(
          related[target.primaryNameAttribute]
        );
        out[`${column}@Microsoft.Dynamics.CRM.lookuplogicalname`] = target.logicalName;
      }
    } else {
      const formatted = formatValue(table, column, value);
      if (formatted !== undefined)
        out[`${column}@OData.Community.Display.V1.FormattedValue`] = formatted;
    }
  }
  out[table.primaryIdAttribute] = row[table.primaryIdAttribute];
  if (options.expand)
    Object.assign(out, expand(state, table, row, options.expand, options.annotations));
  return out;
}

interface QueryOptions {
  select?: string[];
  filter?: string;
  orderBy?: string;
  top?: number;
  expand?: string;
}

/** `$select=a,b;$filter=…` inside `nav(...)`, or the top-level query string. */
function parseNestedOptions(text: string): QueryOptions {
  const options: QueryOptions = {};
  for (const part of splitTopLevel(text, ";")) {
    const eq = part.indexOf("=");
    const name = part.slice(0, eq).trim().toLowerCase();
    const value = part.slice(eq + 1).trim();
    if (name === "$select") options.select = value.split(",").map((s) => s.trim());
    else if (name === "$filter") options.filter = value;
    else if (name === "$orderby") options.orderBy = value;
    else if (name === "$top") options.top = Number(value);
    else if (name === "$expand") options.expand = value;
    else throw new QuerySyntaxError(`The query option '${name}' is not supported inside $expand.`);
  }
  return options;
}

function checkSelect(table: TableDef, select: string[] | undefined): void {
  const known = knownField(table);
  for (const column of select ?? []) {
    if (!known(column)) {
      throw new QuerySyntaxError(
        `Could not find a property named '${column}' on type 'Microsoft.Dynamics.CRM.${table.logicalName}'.`
      );
    }
  }
}

function query(table: TableDef, options: QueryOptions): Row[] {
  const known = knownField(table);
  checkSelect(table, options.select);
  let rows = [...table.rows.values()];
  if (options.filter) {
    const expr = parseFilter(options.filter);
    rows = rows.filter((r) => matches(r, expr, known));
  }
  if (options.orderBy) rows = sortRows(rows, options.orderBy, known);
  if (options.top !== undefined) rows = rows.slice(0, options.top);
  return rows;
}

function expand(
  state: DemoState,
  table: TableDef,
  row: Row,
  text: string,
  annotations: boolean
): Row {
  const out: Row = {};
  for (const item of splitTopLevel(text)) {
    const paren = item.indexOf("(");
    const name = paren < 0 ? item : item.slice(0, paren);
    const nested = paren < 0 ? {} : parseNestedOptions(item.slice(paren + 1, -1));
    const single = table.navigations.find((n) => n.name === name);
    const collection = table.collections.find((n) => n.name === name);
    if (single) {
      const target = state.schema.bySetName(single.target);
      const id = row[`_${single.attribute}_value`];
      const related = typeof id === "string" ? target?.rows.get(id) : undefined;
      if (target) checkSelect(target, nested.select);
      out[name] =
        target && related
          ? project(state, target, related, {
              select: nested.select,
              expand: nested.expand,
              annotations,
            })
          : null;
    } else if (collection) {
      const target = state.schema.bySetName(collection.target);
      if (!target) continue;
      const own = str(row[table.primaryIdAttribute]);
      const related = query(target, nested).filter(
        (r) => r[`_${collection.referencingAttribute}_value`] === own
      );
      out[name] = related.map((r) =>
        project(state, target, r, { select: nested.select, expand: nested.expand, annotations })
      );
    } else {
      throw new QuerySyntaxError(
        `Could not find a property named '${name}' on type 'Microsoft.Dynamics.CRM.${table.logicalName}'.`
      );
    }
  }
  return out;
}

function getCollection(state: DemoState, table: TableDef, req: FakeRequest): FakeResponse {
  const q = req.url.searchParams;
  const prefs = preferences(req);
  const annotations = prefs.has("odata.include-annotations");
  const applied: string[] = [];
  if (annotations)
    applied.push(`odata.include-annotations="${prefs.get("odata.include-annotations") ?? "*"}"`);

  const fetchXml = q.get("fetchXml");
  const savedQuery = q.get("savedQuery");
  if (fetchXml !== null || savedQuery !== null) {
    let xml = fetchXml ?? "";
    if (savedQuery !== null) {
      const view = state.schema.bySetName("savedqueries")?.rows.get(savedQuery.toLowerCase());
      if (!view)
        return odataError(404, "0x80040217", `savedquery With Id = ${savedQuery} Does Not Exist`);
      if (view.returnedtypecode !== table.logicalName) {
        return badRequest(
          `The view ${savedQuery} is for '${str(view.returnedtypecode)}', not '${table.logicalName}'.`
        );
      }
      xml = str(view.fetchxml);
    }
    const page = runFetchXml(table, xml, (r, select) =>
      project(state, table, r, { select, annotations })
    );
    return json(
      200,
      { "@odata.context": `${DEMO_API_URL}/$metadata#${table.entitySetName}`, ...page },
      {
        ...(applied.length ? { "preference-applied": applied.join(",") } : {}),
      }
    );
  }

  const select = q
    .get("$select")
    ?.split(",")
    .map((s) => s.trim());
  const rows = query(table, {
    select,
    filter: q.get("$filter") ?? undefined,
    orderBy: q.get("$orderby") ?? undefined,
    top: q.has("$top") ? Number(q.get("$top")) : undefined,
  });
  const pageSize = Number(prefs.get("odata.maxpagesize") ?? 0) || 5000;
  if (prefs.has("odata.maxpagesize")) applied.push(`odata.maxpagesize=${pageSize}`);
  const skip = Number(q.get("$skiptoken") ?? 0);
  const page = rows.slice(skip, skip + pageSize);
  const body: Row = {
    "@odata.context": `${DEMO_API_URL}/$metadata#${table.entitySetName}`,
    value: page.map((r) =>
      project(state, table, r, { select, expand: q.get("$expand") ?? undefined, annotations })
    ),
  };
  if (q.get("$count") === "true") body["@odata.count"] = Math.min(rows.length, 5000);
  if (skip + pageSize < rows.length) {
    const next = new URL(req.url.href);
    next.searchParams.set("$skiptoken", String(skip + pageSize));
    body["@odata.nextLink"] = next.href;
  }
  return json(200, body, applied.length ? { "preference-applied": applied.join(",") } : {});
}

// ───────────────────────────── writing rows ─────────────────────────────

function applyBody(
  state: DemoState,
  table: TableDef,
  row: Row,
  body: Record<string, unknown>
): FakeResponse | undefined {
  for (const [key, value] of Object.entries(body)) {
    if (key.startsWith("@odata")) continue;
    const bind = /^(.+)@odata\.bind$/.exec(key)?.[1];
    if (bind) {
      const nav = table.navigations.find((n) => n.name === bind);
      if (!nav)
        return badRequest(
          `An undeclared property '${bind}' which only has property annotations in the payload but no property value was found in the payload.`
        );
      const id = /\(([0-9a-f-]{36})\)/i.exec(str(value))?.[1]?.toLowerCase();
      const target = state.schema.bySetName(nav.target);
      if (!id || !target?.rows.has(id)) {
        return odataError(
          404,
          "0x80040217",
          `${target?.logicalName ?? nav.target} With Id = ${id ?? str(value)} Does Not Exist`
        );
      }
      row[`_${nav.attribute}_value`] = id;
      continue;
    }
    const attr = table.attributes.find((a) => a.logicalName === key);
    if (!attr || attr.type === "Lookup" || attr.type === "Owner") {
      return badRequest(
        `Invalid property '${key}' was found in entity 'Microsoft.Dynamics.CRM.${table.logicalName}'.`
      );
    }
    if (attr.readOnly && attr.logicalName !== table.primaryIdAttribute) continue;
    if (attr.maxLength && typeof value === "string" && value.length > attr.maxLength) {
      return badRequest(
        `A validation error occurred. The length of the '${key}' attribute exceeded the maximum allowed length of '${attr.maxLength}'.`
      );
    }
    row[key] = value;
  }
  if (table.logicalName === "contact") {
    row.fullname = [row.firstname, row.lastname].filter(Boolean).join(" ");
  }
  return undefined;
}

function nextVersion(state: DemoState): number {
  state.version += 1;
  return state.version;
}

function representation(
  state: DemoState,
  table: TableDef,
  row: Row,
  req: FakeRequest,
  status: number,
  headers: Record<string, string>
): FakeResponse {
  const prefs = preferences(req);
  if (prefs.get("return") !== "representation") return noContent(headers);
  const select = req.url.searchParams
    .get("$select")
    ?.split(",")
    .map((s) => s.trim());
  checkSelect(table, select);
  const body = project(state, table, row, {
    select,
    annotations: prefs.has("odata.include-annotations"),
  });
  return json(
    status,
    { "@odata.context": `${DEMO_API_URL}/$metadata#${table.entitySetName}/$entity`, ...body },
    {
      ...headers,
      "preference-applied": "return=representation",
    }
  );
}

function create(
  state: DemoState,
  table: TableDef,
  req: FakeRequest,
  presetId?: string
): FakeResponse {
  const user = caller(state, req);
  if (isResponse(user)) return user;
  const body = parseBody(req);
  const id = (
    presetId ??
    (typeof body[table.primaryIdAttribute] === "string"
      ? str(body[table.primaryIdAttribute])
      : newGuid())
  ).toLowerCase();
  if (table.rows.has(id))
    return odataError(412, "0x80040237", "A record with matching key values already exists.");
  const now = new Date().toISOString().replace(/\.\d+Z$/, "Z");
  const row: Row = {
    [table.primaryIdAttribute]: id,
    statecode: 0,
    statuscode: 1,
    createdon: now,
    modifiedon: now,
    versionnumber: nextVersion(state),
    _ownerid_value: user.systemuserid,
    _createdby_value: user.systemuserid,
    _modifiedby_value: user.systemuserid,
  };
  const required = table.attributes.find((a) => a.required && body[a.logicalName] === undefined);
  if (required && !presetId) {
    return badRequest(
      `A required field '${required.logicalName}' is missing for entity '${table.logicalName}'.`
    );
  }
  const failed = applyBody(state, table, row, body);
  if (failed) return failed;
  table.rows.set(id, row);
  const location = `${DEMO_API_URL}/${table.entitySetName}(${id})`;
  return representation(state, table, row, req, 201, { "odata-entityid": location, location });
}

function precondition(row: Row | undefined, req: FakeRequest): FakeResponse | undefined {
  const ifMatch = req.headers["if-match"];
  if (ifMatch !== undefined) {
    if (!row)
      return odataError(
        404,
        "0x80040217",
        "The record you tried to update or delete does not exist."
      );
    if (ifMatch !== "*" && ifMatch !== etag(row)) {
      return odataError(
        412,
        "0x80060882",
        "The version of the existing record doesn't match the RowVersion property provided."
      );
    }
  }
  if (req.headers["if-none-match"] === "*" && row) {
    return odataError(412, "0x80040237", "A record with matching key values already exists.");
  }
  return undefined;
}

function update(state: DemoState, table: TableDef, id: string, req: FakeRequest): FakeResponse {
  const row = table.rows.get(id);
  const failed = precondition(row, req);
  if (failed) return failed;
  if (!row) return create(state, table, req, id); // PATCH without If-Match is an upsert.
  const user = caller(state, req);
  if (isResponse(user)) return user;
  const draft: Row = { ...row };
  const invalid = applyBody(state, table, draft, parseBody(req));
  if (invalid) return invalid;
  draft.versionnumber = nextVersion(state);
  draft.modifiedon = new Date().toISOString().replace(/\.\d+Z$/, "Z");
  draft._modifiedby_value = user.systemuserid;
  table.rows.set(id, draft);
  return representation(state, table, draft, req, 200, {
    "odata-entityid": `${DEMO_API_URL}/${table.entitySetName}(${id})`,
  });
}

// ───────────────────────────── files ─────────────────────────────

function fileColumn(table: TableDef, column: string) {
  return table.attributes.find(
    (a) => a.logicalName === column && (a.type === "File" || a.type === "Image")
  );
}

function initializeUpload(state: DemoState, req: FakeRequest): FakeResponse {
  const body = parseBody(req);
  const target = (body.Target ?? {}) as Record<string, unknown>;
  const logicalName = str(target["@odata.type"]).replace(/^#?Microsoft\.Dynamics\.CRM\./, "");
  const table = state.schema.byLogicalName(logicalName);
  if (!table)
    return badRequest(`Target must be an entity reference; '${logicalName}' is not a table.`);
  const id = str(target[table.primaryIdAttribute]).toLowerCase();
  if (!table.rows.has(id))
    return odataError(404, "0x80040217", `${table.logicalName} With Id = ${id} Does Not Exist`);
  const column = str(body.FileAttributeName);
  if (!fileColumn(table, column)) {
    return badRequest(`'${column}' is not a file or image column of '${table.logicalName}'.`);
  }
  const token = `demo-${newGuid()}`;
  state.uploads.set(token, {
    table,
    id,
    column,
    fileName: str(body.FileName) || "file",
    blocks: new Map(),
  });
  return json(200, { FileContinuationToken: token });
}

function uploadBlock(state: DemoState, req: FakeRequest): FakeResponse {
  const body = parseBody(req);
  const upload = state.uploads.get(str(body.FileContinuationToken));
  if (!upload) return badRequest("The file continuation token is not valid or has expired.");
  upload.blocks.set(str(body.BlockId), decodeBase64(str(body.BlockData)));
  return noContent();
}

function commitUpload(state: DemoState, req: FakeRequest): FakeResponse {
  const body = parseBody(req);
  const upload = state.uploads.get(str(body.FileContinuationToken));
  if (!upload) return badRequest("The file continuation token is not valid or has expired.");
  const ids = Array.isArray(body.BlockList) ? body.BlockList.map(String) : [];
  const blocks = ids.map((id) => upload.blocks.get(id));
  if (blocks.some((b) => !b))
    return badRequest("The block list names a block that was not uploaded.");
  const size = blocks.reduce((n, b) => n + (b?.byteLength ?? 0), 0);
  const bytes = new Uint8Array(size);
  let offset = 0;
  for (const b of blocks) {
    if (!b) continue;
    bytes.set(b, offset);
    offset += b.byteLength;
  }
  const row = upload.table.rows.get(upload.id);
  if (row) {
    const file: StoredFile = {
      name: str(body.FileName) || upload.fileName,
      mimeType: str(body.MimeType) || "application/octet-stream",
      bytes,
    };
    row[upload.column] = file;
    row.versionnumber = nextVersion(state);
  }
  state.uploads.delete(str(body.FileContinuationToken));
  return json(200, { FileId: newGuid(), FileSizeInBytes: size });
}

function isStoredFile(value: unknown): value is StoredFile {
  return (
    typeof value === "object" && value !== null && (value as StoredFile).bytes instanceof Uint8Array
  );
}

// ───────────────────────────── functions ─────────────────────────────

function functionParameters(url: URL): Map<string, string> {
  const params = new Map<string, string>();
  const inner = /\(([^)]*)\)$/.exec(decodeURIComponent(url.pathname))?.[1] ?? "";
  for (const pair of inner.split(",")) {
    const [name = "", alias = ""] = pair.split("=");
    if (!name) continue;
    params.set(name.trim(), alias.startsWith("@") ? (url.searchParams.get(alias) ?? "") : alias);
  }
  return params;
}

function initializeFrom(state: DemoState, req: FakeRequest): FakeResponse {
  const params = functionParameters(req.url);
  const id = /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/i
    .exec(params.get("EntityMoniker") ?? "")?.[0]
    ?.toLowerCase();
  const sourceType =
    /Microsoft\.Dynamics\.CRM\.(\w+)/.exec(params.get("EntityMoniker") ?? "")?.[1] ?? "account";
  const source = state.schema.byLogicalName(sourceType);
  const row = id ? source?.rows.get(id) : undefined;
  if (!source || !row)
    return odataError(404, "0x80040217", `${sourceType} With Id = ${id ?? "?"} Does Not Exist`);
  const targetName = (params.get("TargetEntityName") ?? "").replace(/^'|'$/g, "");
  const target = state.schema.byLogicalName(targetName);
  if (!target) return badRequest(`The entity '${targetName}' does not exist.`);
  if (source.logicalName !== "account" || target.logicalName !== "contact") {
    return badRequest(
      `No mapping exists between '${source.logicalName}' and '${target.logicalName}'.`
    );
  }
  return json(200, {
    "@odata.context": `${DEMO_API_URL}/$metadata#contacts/$entity`,
    "parentcustomerid_account@odata.bind": `accounts(${id})`,
    address1_city: row.address1_city ?? null,
    telephone1: row.telephone1 ?? null,
  });
}

function retrieveTotalRecordCount(state: DemoState, req: FakeRequest): FakeResponse {
  const raw = functionParameters(req.url).get("EntityNames") ?? "[]";
  let names: unknown;
  try {
    names = JSON.parse(raw);
  } catch {
    return badRequest("EntityNames must be a JSON array of logical names.");
  }
  if (!Array.isArray(names))
    return badRequest("EntityNames must be a JSON array of logical names.");
  const keys: string[] = [];
  const values: number[] = [];
  for (const name of names.map(String)) {
    const table = state.schema.byLogicalName(name);
    if (!table) return badRequest(`The entity '${name}' does not exist.`);
    keys.push(name);
    values.push(table.rows.size);
  }
  return json(200, {
    "@odata.context": `${DEMO_API_URL}/$metadata#Microsoft.Dynamics.CRM.RetrieveTotalRecordCountResponse`,
    EntityRecordCountCollection: {
      Count: keys.length,
      IsReadOnly: false,
      Keys: keys,
      Values: values,
    },
  });
}

// ───────────────────────────── router ─────────────────────────────

export async function handle(state: DemoState, req: FakeRequest): Promise<FakeResponse> {
  try {
    return await route(state, req);
  } catch (error) {
    if (error instanceof QuerySyntaxError || error instanceof SyntaxError)
      return badRequest(error.message);
    throw error;
  }
}

async function route(state: DemoState, req: FakeRequest): Promise<FakeResponse> {
  if (req.url.hostname.startsWith("globaldisco.")) return discoveryResponse(req);
  const path = decodeURIComponent(req.url.pathname);
  if (!path.startsWith(API_PATH))
    return odataError(404, "0x80060888", `Resource not found: ${path}`);
  const rest = path.slice(API_PATH.length);
  const { method } = req;

  if (rest === "$batch" && method === "POST") return handleBatch(state, req);
  if (rest === "WhoAmI" && method === "GET") {
    const user = caller(state, req);
    if (isResponse(user)) return user;
    return json(200, {
      "@odata.context": `${DEMO_API_URL}/$metadata#Microsoft.Dynamics.CRM.WhoAmIResponse`,
      BusinessUnitId: BUSINESS_UNIT_ID,
      UserId: user.systemuserid,
      OrganizationId: ORGANIZATION_ID,
    });
  }
  if (rest === "RetrieveVersion" && method === "GET") {
    return json(200, {
      "@odata.context": `${DEMO_API_URL}/$metadata#Microsoft.Dynamics.CRM.RetrieveVersionResponse`,
      Version: "9.2.26101.161",
    });
  }
  if (rest.startsWith("RetrieveTotalRecordCount") && method === "GET")
    return retrieveTotalRecordCount(state, req);
  if (rest.startsWith("InitializeFrom(") && method === "GET") return initializeFrom(state, req);
  if (rest === "InitializeFileBlocksUpload" && method === "POST")
    return initializeUpload(state, req);
  if (rest === "UploadBlock" && method === "POST") return uploadBlock(state, req);
  if (rest === "CommitFileBlocksUpload" && method === "POST") return commitUpload(state, req);
  if (rest.startsWith("EntityDefinitions"))
    return entityDefinitionsResponse(state.schema, req, rest);

  const m = /^([A-Za-z_]+)(?:\(([^)]*)\))?(?:\/([A-Za-z_]+))?(?:\/(\$value|\$ref))?$/.exec(rest);
  const table = m ? state.schema.bySetName(m[1] ?? "") : undefined;
  if (!m || !table) {
    return odataError(
      404,
      "0x80060888",
      `Resource not found for the segment '${rest.split("/")[0] ?? rest}'.`
    );
  }
  const [, , key, property, suffix] = m;
  if (key === undefined) {
    if (method === "GET") return getCollection(state, table, req);
    if (method === "POST") return create(state, table, req);
    return odataError(405, "0x80060888", `${method} is not allowed on an entity set.`);
  }
  const id = key.replace(/^'|'$/g, "").toLowerCase();
  if (!/^[0-9a-f-]{36}$/.test(id))
    return badRequest(`Bad Request - Error in query syntax: '${key}' is not a valid key.`);
  const row = table.rows.get(id);

  if (property) {
    if (!row)
      return odataError(404, "0x80040217", `${table.logicalName} With Id = ${id} Does Not Exist`);
    const collection = table.collections.find((c) => c.name === property);
    if (collection && suffix === "$ref" && method === "POST") {
      const target = state.schema.bySetName(collection.target);
      const ref = str(parseBody(req)["@odata.id"]);
      const relatedId = /\(([0-9a-f-]{36})\)/i.exec(ref)?.[1]?.toLowerCase();
      const related = relatedId ? target?.rows.get(relatedId) : undefined;
      if (!related) return odataError(404, "0x80040217", `The record ${ref} does not exist.`);
      related[`_${collection.referencingAttribute}_value`] = id;
      return noContent();
    }
    if (collection && method === "GET") {
      const target = state.schema.bySetName(collection.target);
      if (!target) return odataError(404, "0x80060888", "Not found");
      const select = req.url.searchParams.get("$select")?.split(",");
      const rows = query(target, {
        select,
        filter: req.url.searchParams.get("$filter") ?? undefined,
      }).filter((r) => r[`_${collection.referencingAttribute}_value`] === id);
      return json(200, {
        value: rows.map((r) => project(state, target, r, { select, annotations: false })),
      });
    }
    const column = fileColumn(table, property);
    if (column) {
      const file = row[property];
      if (method === "DELETE") {
        row[property] = null;
        return noContent();
      }
      if (method === "GET" && suffix === "$value") {
        if (!isStoredFile(file))
          return odataError(
            404,
            "0x80060891",
            `No file attachment found for attribute: ${property} EntityId: ${id}.`
          );
        return {
          status: 200,
          headers: {
            "content-type": file.mimeType,
            "x-ms-file-name": file.name,
            "x-ms-file-size": String(file.bytes.byteLength),
          },
          body: file.bytes,
        };
      }
    }
    if (method === "GET" && knownField(table)(property)) {
      return json(200, {
        "@odata.context": `${DEMO_API_URL}/$metadata#${table.entitySetName}(${id})/${property}`,
        value: row[property] ?? null,
      });
    }
    return odataError(404, "0x80060888", `Resource not found for the segment '${property}'.`);
  }

  if (method === "GET") {
    if (!row)
      return odataError(404, "0x80040217", `${table.logicalName} With Id = ${id} Does Not Exist`);
    if (req.headers["if-none-match"] && req.headers["if-none-match"] === etag(row)) {
      return { status: 304, headers: { etag: etag(row) } };
    }
    const q = req.url.searchParams;
    const select = q
      .get("$select")
      ?.split(",")
      .map((s) => s.trim());
    checkSelect(table, select);
    const annotations = preferences(req).has("odata.include-annotations");
    return json(
      200,
      {
        "@odata.context": `${DEMO_API_URL}/$metadata#${table.entitySetName}/$entity`,
        ...project(state, table, row, {
          select,
          expand: q.get("$expand") ?? undefined,
          annotations,
        }),
      },
      { etag: etag(row) }
    );
  }
  if (method === "PATCH") return update(state, table, id, req);
  if (method === "DELETE") {
    const failed = precondition(row, req);
    if (failed) return failed;
    if (!row)
      return odataError(404, "0x80040217", `${table.logicalName} With Id = ${id} Does Not Exist`);
    table.rows.delete(id);
    return noContent();
  }
  return odataError(405, "0x80060888", `${method} is not allowed on a record.`);
}

// ───────────────────────────── fetch ─────────────────────────────

async function bodyText(body: BodyInit | null | undefined): Promise<string> {
  if (body === undefined || body === null) return "";
  if (typeof body === "string") return body;
  return new Response(body).text();
}

function delay(ms: number, signal: AbortSignal | null | undefined): Promise<void> {
  return new Promise((resolve, reject) => {
    const abort = () => {
      clearTimeout(timer);
      reject(new DOMException("The operation was aborted.", "AbortError"));
    };
    const timer = setTimeout(() => {
      signal?.removeEventListener("abort", abort);
      resolve();
    }, ms);
    if (signal?.aborted) abort();
    else signal?.addEventListener("abort", abort, { once: true });
  });
}

export function createDemoState(): DemoState {
  return { schema: createSchema(), uploads: new Map(), version: 90_000 };
}

/** A `FetchProvider` backed by a fresh demo environment. */
export function createFakeDataverse(
  state: DemoState = createDemoState(),
  latencyMs: readonly [number, number] = [60, 220]
): FetchProvider {
  return {
    async fetch(input, init) {
      const request = typeof input === "string" || input instanceof URL ? undefined : input;
      const url = typeof input === "string" ? input : input instanceof URL ? input.href : input.url;
      const signal = init?.signal ?? request?.signal;
      await delay(latencyMs[0] + Math.random() * (latencyMs[1] - latencyMs[0]), signal);
      const headers: Record<string, string> = {};
      new Headers(init?.headers ?? request?.headers).forEach((value, name) => {
        headers[name.toLowerCase()] = value;
      });
      const res = await handle(state, {
        method: (init?.method ?? request?.method ?? "GET").toUpperCase(),
        url: new URL(url),
        headers,
        body: await bodyText(init?.body),
      });
      const requestId = newGuid();
      return new Response(res.status === 204 || res.status === 304 ? null : (res.body ?? null), {
        status: res.status,
        headers: {
          "odata-version": "4.0",
          "x-ms-service-request-id": requestId,
          req_id: requestId,
          "x-ms-ratelimit-burst-remaining-xrm-requests": "7999",
          ...res.headers,
        },
      });
    },
  };
}
