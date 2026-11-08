/**
 * Update message (#344). Hand-written: Update isn't a Web API action but
 * `PATCH /<entity set>(<id>)`.
 */
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "@mohsinonxrm/dataverse-sdk-entities-runtime";
import { OrganizationRequest, OrganizationResponse } from "../OrganizationRequest.js";
import { columnsOf, ifMatch, recordPath } from "./internal.js";

/** Parameters of the Update message. */
export interface UpdateRequestParameters {
  /** The record to change, made with `createEntityReference` (the .NET `Entity`'s table and id). */
  Target: EntityReference;
  /**
   * The columns to set, by logical name, and lookups as `<navigation property>@odata.bind`
   * values, as the Web API takes them (the .NET `Entity.Attributes`).
   */
  Attributes: Readonly<Record<string, unknown>>;
  /**
   * Update only this version of the record (its `@odata.etag`), sent as `If-Match`: a newer
   * version fails with 412. Without it, `If-Match: *` is sent, so a missing record fails with 404
   * instead of being created.
   */
  ETag?: string;
}

/**
 * Update request message: changes columns of a record (`PATCH /<entity set>(<id>)`). Like the
 * .NET `UpdateRequest`, it never creates a record.
 *
 * @example
 * ```typescript
 * await client.execute(
 *   new UpdateRequest({ Target: createEntityReference("account", id), Attributes: { name: "New" } })
 * );
 * ```
 */
export class UpdateRequest extends OrganizationRequest implements Executable<UpdateResponse> {
  declare readonly Parameters: Readonly<UpdateRequestParameters>;

  constructor(parameters: UpdateRequestParameters) {
    super("Update", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const { Target, Attributes, ETag } = this.Parameters;
    return {
      method: "PATCH",
      url: `${baseUrl}/${recordPath(Target)}`,
      headers: ifMatch({ "content-type": "application/json" }, ETag ?? "*"),
      body: columnsOf(Attributes),
    };
  }

  parseResponse(_response: Response): Promise<UpdateResponse> {
    // No return value (204 No Content)
    return Promise.resolve(new UpdateResponse());
  }
}

/** Update response message. */
export class UpdateResponse extends OrganizationResponse {
  constructor() {
    super("Update");
  }
}
