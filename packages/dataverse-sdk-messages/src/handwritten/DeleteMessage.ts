/**
 * Delete message (#344). Hand-written: Delete isn't a Web API action but
 * `DELETE /<entity set>(<id>)`.
 */
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "@mohsinonxrm/dataverse-sdk-entities-runtime";
import { OrganizationRequest, OrganizationResponse } from "../OrganizationRequest.js";
import { ifMatch, recordPath } from "./internal.js";

/** Parameters of the Delete message. */
export interface DeleteRequestParameters {
  /** The record, made with `createEntityReference`. */
  Target: EntityReference;
  /**
   * Delete only this version of the record (its `@odata.etag`), sent as `If-Match`: a newer
   * version fails with 412.
   */
  ETag?: string;
}

/**
 * Delete request message: deletes a record (`DELETE /<entity set>(<id>)`).
 *
 * @example
 * ```typescript
 * await client.execute(new DeleteRequest({ Target: createEntityReference("account", id) }));
 * ```
 */
export class DeleteRequest extends OrganizationRequest implements Executable<DeleteResponse> {
  declare readonly Parameters: Readonly<DeleteRequestParameters>;

  constructor(parameters: DeleteRequestParameters) {
    super("Delete", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const { Target, ETag } = this.Parameters;
    return {
      method: "DELETE",
      url: `${baseUrl}/${recordPath(Target)}`,
      headers: ifMatch({}, ETag),
    };
  }

  parseResponse(_response: Response): Promise<DeleteResponse> {
    // No return value (204 No Content)
    return Promise.resolve(new DeleteResponse());
  }
}

/** Delete response message. */
export class DeleteResponse extends OrganizationResponse {
  constructor() {
    super("Delete");
  }
}
