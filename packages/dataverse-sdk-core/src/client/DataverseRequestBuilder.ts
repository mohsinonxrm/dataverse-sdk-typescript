import type { RequestInformation } from "../abstractions/http.js";
import type { BindManyExecutor, PreferOption, RequestOptions } from "../abstractions/options.js";
import { buildQuery } from "../odata/query.js";
import type { QueryState } from "../odata/query.js";
import type { PageResponse } from "../paging/types.js";
import { PageIterator } from "../paging/PageIterator.js";
import { buildUrl } from "../utils/url.js";
import { entityIdFromResponse, readJson } from "../utils/response.js";
import { parseODataError } from "../errors/parseODataError.js";
import { DataverseDuplicateError } from "../errors/DataverseDuplicateError.js";
import { validateUrl, type UrlValidationOptions } from "../utils/validateUrl.js";
import { PreferBuilder } from "./PreferBuilder.js";
import { DataverseInvalidRequestError } from "../errors/NamedErrors.js";
import type { DataverseClient } from "./DataverseClient.js";

export class DataverseRequestBuilder {
  private state: QueryState = {};
  private headers: Record<string, string> = {};
  private preferValues: PreferOption[] = [];
  private preferBuilder?: PreferBuilder;
  private ifMatchValue?: string;
  private ifNoneMatchValue?: string;
  private impersonation?: { id: string; by: "systemuserid" | "aadObjectId" };
  private bindings: Record<string, string> = {};
  private suppressDuplicateDetection = true; // Default per Microsoft
  private urlValidationOptions: UrlValidationOptions = {};

  constructor(
    private client: DataverseClient,
    private pathOrUrl: string
  ) {}

  select(...fields: string[]): this {
    this.state.$select = fields.join(",");
    return this;
  }

  filter(filter: string): this {
    this.state.$filter = filter;
    return this;
  }

  expand(...expands: string[]): this {
    this.state.$expand = expands.join(",");
    return this;
  }

  orderBy(...orderby: string[]): this {
    this.state.$orderby = orderby.join(",");
    return this;
  }

  top(n: number): this {
    this.state.$top = n;
    return this;
  }

  skip(n: number): this {
    this.state.$skip = n;
    return this;
  }

  count(enabled = true): this {
    this.state.$count = enabled;
    return this;
  }

  search(text: string): this {
    this.state.$search = text;
    return this;
  }

  apply(expr: string): this {
    this.state.$apply = expr;
    return this;
  }

  header(name: string, value: string): this {
    this.headers[name.toLowerCase()] = value;
    return this;
  }

  /**
   * Build Prefer header fluently
   */
  prefer(): PreferBuilder;
  /**
   * Set Prefer header from array of options
   */
  prefer(...values: PreferOption[]): this;
  prefer(values: PreferOption[]): this;
  prefer(...valuesOrArray: PreferOption[] | [PreferOption[]]): PreferBuilder | this {
    if (valuesOrArray.length === 0) {
      this.preferBuilder = new PreferBuilder();
      return this.preferBuilder;
    }

    const values: PreferOption[] = Array.isArray(valuesOrArray[0])
      ? valuesOrArray[0]
      : (valuesOrArray as PreferOption[]);
    this.preferValues.push(...values);
    return this;
  }

  preferRaw(value: string): this {
    this.preferValues.push(value as PreferOption);
    return this;
  }

  /**
   * Run the request as another user. By default `userId` is a `systemuserid`, sent as
   * `MSCRMCallerID`. With `{ by: "aadObjectId" }` it is the user's Microsoft Entra object id, sent
   * as `CallerObjectId`, which Microsoft recommends: it is the same in every environment. The
   * calling identity needs the "Act on behalf of another user" privilege. A later call replaces
   * an earlier one, so exactly one of the two headers is sent.
   */
  impersonate(userId: string, options?: { by?: "systemuserid" | "aadObjectId" }): this {
    this.impersonation = { id: userId, by: options?.by ?? "systemuserid" };
    return this;
  }

  /** `impersonate(objectId, { by: "aadObjectId" })`: sends `CallerObjectId`. */
  impersonateByObjectId(objectId: string): this {
    return this.impersonate(objectId, { by: "aadObjectId" });
  }

  /**
   * Set If-Match header for optimistic concurrency
   * @param etag - The ETag value from previous GET
   */
  ifMatch(etag: string): this {
    this.ifMatchValue = etag;
    return this;
  }

  /**
   * Set If-None-Match header (typically '*' for upsert create-only)
   * @param etag - Usually '*' to prevent overwriting existing records
   */
  ifNoneMatch(etag = "*"): this {
    this.ifNoneMatchValue = etag;
    return this;
  }

  /**
   * Update only if record hasn't been modified (optimistic concurrency)
   * @param etag - The ETag value from previous GET
   */
  updateOnly(etag: string): this {
    return this.ifMatch(etag);
  }

  /**
   * Create only if record doesn't exist (prevents overwrite during upsert)
   */
  createOnly(): this {
    return this.ifNoneMatch("*");
  }

  /**
   * Enable duplicate detection for this request
   * Throws DataverseDuplicateError (412) if duplicates found
   */
  detectDuplicates(): this {
    this.suppressDuplicateDetection = false;
    return this;
  }

  /**
   * Bind a single-valued navigation property (lookup)
   * @param navigationProperty - The navigation property name (e.g., 'parentcustomerid_account')
   * @param entitySetName - The target entity set (e.g., 'accounts')
   * @param id - The target record ID
   */
  bind(navigationProperty: string, entitySetName: string, id: string): this {
    this.bindings[`${navigationProperty}@odata.bind`] = `/${entitySetName}(${id})`;
    return this;
  }

  /**
   * Associate a record with a collection-valued navigation property
   * @param navigationProperty - The navigation property name
   * @param entitySetName - The target entity set
   * @param id - The target record ID
   */
  async associate(navigationProperty: string, entitySetName: string, id: string): Promise<void> {
    const refUrl = `${this.pathOrUrl}/${navigationProperty}/$ref`;
    // Dataverse rejects a relative @odata.id here ("the odata.context annotation is missing"),
    // so the reference is the absolute URL of the target record.
    await this.client.api(refUrl).post({
      "@odata.id": `${this.client.getBaseUrl()}/${entitySetName}(${id})`,
    });
  }

  /**
   * Disassociate a record from a collection-valued navigation property
   * @param navigationProperty - The navigation property name
   * @param id - The related record ID to remove
   */
  async disassociate(navigationProperty: string, id: string): Promise<void> {
    const refUrl = `${this.pathOrUrl}/${navigationProperty}(${id})/$ref`;
    await this.client.api(refUrl).delete();
  }

  /**
   * Associate several records with a collection-valued navigation property.
   *
   * Without an executor, this sends one `POST …/{navigationProperty}/$ref` per id, one after the
   * other, through the client (so auth, retry and the rest of the pipeline apply). It stops at the
   * first failure and rejects with that error; ids before it stay associated. Pass an executor,
   * such as `createBindManyExecutor()` from `@mohsinonxrm/dataverse-sdk-batch`, to send them as a
   * single `$batch` instead.
   *
   * @example
   * ```typescript
   * await client.api(`accounts(${id})`).bindMany("contact_customer_accounts", "contacts", ids);
   * ```
   *
   * @param navigationProperty - The navigation property name
   * @param entitySetName - The target entity set
   * @param ids - Target record ids
   * @param executor - Optional; how to send the associations (default: one request per id)
   */
  async bindMany(
    navigationProperty: string,
    entitySetName: string,
    ids: string[],
    executor?: BindManyExecutor
  ): Promise<void> {
    if (executor !== undefined) {
      // Guard for JavaScript callers passing something that isn't an executor.
      if (typeof executor !== "function") {
        throw new TypeError(
          "bindMany(): the executor must be a function, e.g. createBindManyExecutor() from @mohsinonxrm/dataverse-sdk-batch."
        );
      }
      await executor(this.client, this.pathOrUrl, navigationProperty, entitySetName, ids);
      return;
    }
    for (const id of ids) {
      await this.associate(navigationProperty, entitySetName, id);
    }
  }

  /**
   * Skip URL validation (for edge cases where limits might be exceeded intentionally)
   */
  skipUrlValidation(): this {
    this.urlValidationOptions.skip = true;
    return this;
  }

  /**
   * GET and parse the JSON body. Resolves `undefined` for `204 No Content` or an empty body.
   * Rejects with `DataverseInvalidRequestError` ("UnexpectedContentType") for a non-JSON body;
   * use {@link text}, {@link blob} or {@link arrayBuffer} for those.
   */
  async get<T = unknown>(options?: RequestOptions): Promise<T> {
    return readJson<T>(await this.send("GET", undefined, options));
  }

  async post<T = unknown>(body?: unknown, options?: RequestOptions): Promise<T> {
    // POST returns a body only with Prefer: return=representation (or for actions).
    return readJson<T>(await this.send("POST", this.withBindings(body), options));
  }

  async patch<T = unknown>(body?: unknown, options?: RequestOptions): Promise<T> {
    return readJson<T>(await this.send("PATCH", this.withBindings(body), options));
  }

  async put<T = unknown>(body?: unknown, options?: RequestOptions): Promise<T> {
    return readJson<T>(await this.send("PUT", body, options));
  }

  async delete<T = unknown>(options?: RequestOptions): Promise<T> {
    return readJson<T>(await this.send("DELETE", undefined, options));
  }

  /** GET the body as text, e.g. `$metadata` (XML) or a `$value` of a text column. */
  async text(options?: RequestOptions): Promise<string> {
    return (await this.send("GET", undefined, options)).text();
  }

  /** GET the body as a Blob, e.g. a file or image column's `$value`. */
  async blob(options?: RequestOptions): Promise<Blob> {
    return (await this.send("GET", undefined, options)).blob();
  }

  /** GET the body as an ArrayBuffer. */
  async arrayBuffer(options?: RequestOptions): Promise<ArrayBuffer> {
    return (await this.send("GET", undefined, options)).arrayBuffer();
  }

  /**
   * Send the request and return the raw `Response`: status, headers (`ETag`, `OData-EntityId`,
   * `Preference-Applied`, `x-ms-service-request-id`) and an unread body.
   * Unlike the other terminals, this does **not** reject on a non-2xx status.
   *
   * @example
   * ```typescript
   * const res = await client.api("accounts").response("POST", { name: "Contoso" });
   * const id = entityIdFromResponse(res); // from OData-EntityId
   * ```
   */
  async response(
    method: "GET" | "POST" | "PATCH" | "PUT" | "DELETE" = "GET",
    body?: unknown,
    options?: RequestOptions
  ): Promise<Response> {
    const merged = method === "POST" || method === "PATCH" ? this.withBindings(body) : body;
    return this.client.send(this.buildRequest(method, merged, options));
  }

  /**
   * Create a record and return its id, read from the `OData-EntityId` response header.
   * Works without `Prefer: return=representation`, which is Dataverse's default for creates.
   */
  async createAndGetId(body: unknown, options?: RequestOptions): Promise<string> {
    const res = await this.send("POST", this.withBindings(body), options);
    await res.body?.cancel();
    return entityIdFromResponse(res);
  }

  async getPage<T = unknown>(options?: RequestOptions): Promise<PageResponse<T>> {
    return this.get<PageResponse<T>>(options);
  }

  iterate<T = unknown>(options?: { signal?: AbortSignal }): AsyncIterable<T> {
    // `getPage` already knows how to follow nextLink via client.api(nextLink)
    const firstPromise = this.getPage<T>(options);
    const client = this.client;
    const signal = options?.signal;
    async function* generator(): AsyncIterator<T> {
      const first = await firstPromise;
      for await (const item of new PageIterator<T>(client, first, signal)) {
        yield item;
      }
    }
    return { [Symbol.asyncIterator]: generator };
  }

  async getAll<T = unknown>(opts: { maxItems?: number; maxPages?: number } = {}): Promise<T[]> {
    const out: T[] = [];
    let page = await this.getPage<T>();
    let pages = 0;

    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- intentional infinite loop with explicit break statements
    while (true) {
      pages++;
      for (const item of page.value) {
        out.push(item);
        if (opts.maxItems && out.length >= opts.maxItems) return out;
      }
      if (!page["@odata.nextLink"]) break;
      if (opts.maxPages && pages >= opts.maxPages) break;
      page = await this.client.api(page["@odata.nextLink"]).getPage<T>();
    }

    return out;
  }

  private withBindings(body: unknown): unknown {
    return Object.keys(this.bindings).length > 0 && body && typeof body === "object"
      ? { ...(body as Record<string, unknown>), ...this.bindings }
      : body;
  }

  private buildRequest(
    method: "GET" | "POST" | "PATCH" | "PUT" | "DELETE",
    body: unknown,
    options: RequestOptions | undefined
  ): RequestInformation {
    const url = this.resolveUrl();
    const query = buildQuery(this.state);

    // Validate URL before sending - build full URL with query string
    const hasQuery = Object.keys(query).length > 0;
    const fullUrl = hasQuery ? buildUrl({ url, query, method: "GET", headers: {} }) : url;
    validateUrl(fullUrl, this.urlValidationOptions);

    const headers: Record<string, string> = {
      ...this.headers,
    };

    // Build Prefer header from builder or array
    const preferOptions = [...this.preferValues];
    if (this.preferBuilder) {
      const builderValue = this.preferBuilder.build();
      if (builderValue) {
        preferOptions.push(builderValue as PreferOption);
      }
    }

    if (preferOptions.length > 0) {
      headers.prefer = preferOptions.join(", ");
    }

    if (this.ifMatchValue) {
      headers["if-match"] = this.ifMatchValue;
    }

    if (this.ifNoneMatchValue) {
      headers["if-none-match"] = this.ifNoneMatchValue;
    }

    if (this.impersonation) {
      const name = this.impersonation.by === "aadObjectId" ? "callerobjectid" : "mscrmcallerid";
      headers[name] = this.impersonation.id;
    }

    // Only set header if NOT default value (avoid extra header)
    if (!this.suppressDuplicateDetection) {
      headers["mscrm.suppressduplicatedetection"] = "false";
    }

    const req: RequestInformation = {
      method,
      url,
      headers,
      query,
      body,
      timeoutMs: options?.timeoutMs,
      signal: options?.signal,
      correlationId: options?.correlationId,
      middlewareOptions: options?.middlewareOptions,
    };

    // merge option headers/prefer
    if (options?.headers) {
      for (const [k, v] of Object.entries(options.headers)) headers[k.toLowerCase()] = v;
    }
    if (options?.prefer?.length) {
      headers.prefer = headers.prefer
        ? `${headers.prefer}, ${options.prefer.join(", ")}`
        : options.prefer.join(", ");
    }
    if (headers.mscrmcallerid && headers.callerobjectid) {
      // Dataverse would have to pick one; refuse instead of running as the wrong user (#48).
      throw DataverseInvalidRequestError.invalidParameter(
        "impersonation",
        "MSCRMCallerID and CallerObjectId can't both be set; impersonate by one id"
      );
    }
    return req;
  }

  private async send(
    method: "GET" | "POST" | "PATCH" | "PUT" | "DELETE",
    body?: unknown,
    options?: RequestOptions
  ): Promise<Response> {
    const req = this.buildRequest(method, body, options);
    const res = await this.client.send(req);
    if (!res.ok) {
      // Check for 412 duplicate detection
      if (res.status === 412 && !this.suppressDuplicateDetection) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const errorData = await res.json();

        // Parse duplicate details from error response
        const duplicates = [];
        // Microsoft returns duplicate details in error.innererror
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        if (errorData.error?.innererror?.duplicaterecords) {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
          duplicates.push(...errorData.error.innererror.duplicaterecords);
        }

        throw new DataverseDuplicateError(
          // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
          errorData.error?.message ?? "Duplicate records detected",
          // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
          duplicates,
          // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
          errorData.error?.innererror?.duplicateruleid,
          412
        );
      }

      const err = await parseODataError(res);
      throw err;
    }
    return res;
  }

  private resolveUrl(): string {
    // absolute nextLink or relative path
    return this.client.resolveUrl(this.pathOrUrl);
  }
}
