/**
 * Helpers of the hand-written messages (#344). Not exported from the package.
 *
 * Hand-written: tools/generate-sdk-types keeps this folder and doesn't write it.
 */
import {
  buildUrl,
  DataverseError,
  DataverseInvalidRequestError,
  odataLiteral,
  parseODataError,
  type Executable,
  type RequestInformation,
} from "@mohsinonxrm/dataverse-sdk-core";
import {
  decodeBatchResponse,
  encodeBatchRequest,
  generateBoundary,
  type BatchItem,
  type BatchRequestStep,
  type BatchResponsePart,
} from "@mohsinonxrm/dataverse-sdk-batch";
import {
  createEntityReference,
  getEntitySetNameFromReference,
  type EntityReference,
} from "@mohsinonxrm/dataverse-sdk-entities-runtime";

/** Most requests one `$batch` can hold. */
export const MAX_BATCH_REQUESTS = 1000;

/**
 * The logical name of the table a payload's `@odata.type` names
 * (`Microsoft.Dynamics.CRM.account` → `account`).
 *
 * @throws DataverseInvalidRequestError when it names none.
 */
export function tableOf(target: object, parameter: string): string {
  const type = (target as Record<string, unknown>)["@odata.type"];
  const match =
    typeof type === "string" ? /^#?Microsoft\.Dynamics\.CRM\.(\w+)$/.exec(type) : undefined;
  if (!match) {
    throw DataverseInvalidRequestError.invalidParameter(
      parameter,
      '"@odata.type" must name the table, e.g. "Microsoft.Dynamics.CRM.account"'
    );
  }
  return match[1];
}

/**
 * The entity set of a table: `entitySetName` when given, else the one in the SDK's `$metadata`
 * snapshot (as `createEntityReference` finds it).
 *
 * @throws DataverseInvalidRequestError for a table the snapshot doesn't know (pass the entity set).
 */
export function entitySetOf(logicalName: string, entitySetName?: string): string {
  return getEntitySetNameFromReference(
    createEntityReference(logicalName, "", entitySetName ? { entitySetName } : {})
  );
}

/**
 * The primary key column of a table: `primaryIdAttribute` when given, else the one in the SDK's
 * `$metadata` snapshot (as `createEntityReference` finds it), else `<logicalName>id`.
 */
export function primaryKeyOf(logicalName: string, primaryIdAttribute?: string): string {
  if (primaryIdAttribute) return primaryIdAttribute;
  // A reference's enumerable properties are `@odata.type` and the primary key
  const reference = createEntityReference(logicalName, "");
  return Object.keys(reference).find((key) => key !== "@odata.type") ?? `${logicalName}id`;
}

/** `<entity set>(<id>)` of a record; the id must be a GUID (braces are removed). */
export function recordPath(reference: EntityReference): string {
  return `${getEntitySetNameFromReference(reference)}(${odataLiteral.guid(reference.id)})`;
}

/** The columns of a payload to send: without `@odata.type` (the URL names the table). */
export function columnsOf(target: object): Record<string, unknown> {
  const body: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(target)) {
    if (key !== "@odata.type") body[key] = value;
  }
  return body;
}

/** The headers of a request, with `If-Match` when a version is given. */
export function ifMatch(headers: Record<string, string>, etag?: string): Record<string, string> {
  return etag === undefined ? headers : { ...headers, "If-Match": etag };
}

/** The `$batch` request that sends `items`. */
export function batchRequestInformation(
  baseUrl: string,
  items: BatchItem[],
  continueOnError = false
): RequestInformation {
  const boundary = generateBoundary();
  const headers: Record<string, string> = {
    "content-type": `multipart/mixed; boundary=${boundary}`,
  };
  if (continueOnError) headers.prefer = "odata.continue-on-error";
  return {
    method: "POST",
    url: `${baseUrl}/$batch`,
    headers,
    body: encodeBatchRequest(items, boundary),
  };
}

/** Check that a list of requests fits in one `$batch`. */
export function checkRequestCount(count: number, message: string): void {
  if (count < 1 || count > MAX_BATCH_REQUESTS) {
    throw DataverseInvalidRequestError.invalidParameter(
      "Requests",
      `${message} takes 1 to ${String(MAX_BATCH_REQUESTS)} requests, not ${String(count)}`
    );
  }
}

/**
 * One request of a `$batch`, from a request's `toRequestInformation()`.
 *
 * @param id - The part's id (its `Content-ID` inside a change set).
 * @throws DataverseInvalidRequestError for a request that is a `$batch` itself, or whose body
 *   isn't JSON (a file upload).
 */
export function batchStep(
  request: Executable<unknown>,
  baseUrl: string,
  id: string
): BatchRequestStep {
  const info = request.toRequestInformation(baseUrl);
  if (request.parsesErrorResponses === true || /\/\$batch(?:\?|$)/.test(info.url)) {
    throw DataverseInvalidRequestError.invalidParameter(
      "Requests",
      `request ${id} is a $batch itself (ExecuteMultiple, ExecuteTransaction, or an Associate or ` +
        "Disassociate of several records), which can't run inside another $batch"
    );
  }
  return toBatchStep(info, id);
}

/**
 * One request of a `$batch`, from its `RequestInformation`.
 *
 * @throws DataverseInvalidRequestError for a body that isn't JSON (a file upload).
 */
export function toBatchStep(info: RequestInformation, id: string): BatchRequestStep {
  const url = info.query ? buildUrl(info) : info.url;
  const body = info.body;
  const json = body !== undefined && body !== null && typeof body !== "string";
  if (json && !isPlainJson(body)) {
    throw DataverseInvalidRequestError.invalidParameter(
      "Requests",
      `request ${id} sends binary content, which a $batch can't carry`
    );
  }
  // A JSON body gets the content type a batch part needs (`application/json; type=entry`).
  const headers: Record<string, string> = {};
  for (const [name, value] of Object.entries(info.headers)) {
    if (!(json && name.toLowerCase() === "content-type")) headers[name] = value;
  }
  return { id, method: info.method, url, headers, body };
}

function isPlainJson(value: unknown): boolean {
  if (Array.isArray(value)) return true;
  if (typeof value !== "object" || value === null) return true;
  const prototype: unknown = Object.getPrototypeOf(value);
  return prototype === Object.prototype || prototype === null;
}

/**
 * The parts of a `$batch` response.
 *
 * @throws the error read from the response when it isn't a multipart batch response.
 */
export async function readBatch(response: Response): Promise<BatchResponsePart[]> {
  const contentType = response.headers.get("content-type") ?? "";
  if (!/^\s*multipart\/mixed\s*;/i.test(contentType)) {
    if (!response.ok) throw await parseODataError(response);
    throw new DataverseError(
      `Unexpected $batch response: expected multipart/mixed, got "${contentType || "no content type"}"`,
      { status: response.status }
    );
  }
  return decodeBatchResponse(await response.text(), contentType);
}

/** A batch part as the `Response` the request it answers would have got on its own. */
export function partResponse(part: BatchResponsePart): Response {
  // A Response can't have a body for 204, 205 and 304.
  const noBody =
    part.bodyText === "" || part.status === 204 || part.status === 205 || part.status === 304;
  return new Response(noBody ? null : part.bodyText, {
    status: part.status,
    headers: part.headers,
  });
}

/** Whether a batch part answers a request that succeeded. */
export function succeeded(part: BatchResponsePart): boolean {
  return part.status >= 200 && part.status < 300;
}

/**
 * The parts answering the `count` requests of a change set, in request order (each request's id is
 * its position, from 1).
 *
 * @throws the error of the request that failed: the change set was rolled back.
 */
export async function changesetParts(
  response: Response,
  count: number
): Promise<BatchResponsePart[]> {
  const parts = await readBatch(response);
  const failed = parts.find((part) => !succeeded(part));
  if (failed) throw await parseODataError(partResponse(failed));
  const ordered: BatchResponsePart[] = [];
  parts.forEach((part, position) => {
    const index = part.contentId === undefined ? position : Number(part.contentId) - 1;
    if (Number.isInteger(index) && index >= 0 && index < count) ordered[index] = part;
  });
  for (let index = 0; index < count; index++) {
    if (!(index in ordered)) {
      throw new DataverseError(
        `The $batch response has no answer for request ${String(index + 1)} of the change set`,
        { status: response.status }
      );
    }
  }
  return ordered;
}
