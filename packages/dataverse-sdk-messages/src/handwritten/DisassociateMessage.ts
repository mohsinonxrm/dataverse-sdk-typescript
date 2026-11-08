/**
 * Disassociate message (#344). Hand-written: Disassociate isn't a Web API action but
 * `DELETE /<entity set>(<id>)/<relationship>(<related id>)/$ref`, once per related record.
 */
import {
  DataverseInvalidRequestError,
  odataLiteral,
  type Executable,
  type RequestInformation,
} from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "@mohsinonxrm/dataverse-sdk-entities-runtime";
import { OrganizationRequest, OrganizationResponse } from "../OrganizationRequest.js";
import {
  batchRequestInformation,
  changesetParts,
  checkRequestCount,
  recordPath,
  toBatchStep,
} from "./internal.js";

/** Parameters of the Disassociate message. */
export interface DisassociateRequestParameters {
  /** The record to remove the links from, made with `createEntityReference`. */
  Target: EntityReference;
  /**
   * The relationship: the collection-valued navigation property of `Target`'s table, for example
   * `"contact_customer_accounts"` (for most relationships, its schema name, as in .NET).
   */
  Relationship: string;
  /** The records to unlink from `Target`, made with `createEntityReference`. */
  RelatedEntities: readonly EntityReference[];
}

/**
 * Disassociate request message: removes links between records through a relationship.
 *
 * One related record is one `DELETE …/<relationship>(<id>)/$ref`. Several are sent as one `$batch`
 * change set, so they are unlinked together or not at all, as the .NET `DisassociateRequest`
 * does; that request can't go inside `ExecuteMultipleRequest` or `ExecuteTransactionRequest`.
 *
 * @example
 * ```typescript
 * await client.execute(
 *   new DisassociateRequest({
 *     Target: createEntityReference("account", accountId),
 *     Relationship: "contact_customer_accounts",
 *     RelatedEntities: [createEntityReference("contact", contactId)],
 *   })
 * );
 * ```
 */
export class DisassociateRequest
  extends OrganizationRequest
  implements Executable<DisassociateResponse>
{
  declare readonly Parameters: Readonly<DisassociateRequestParameters>;

  constructor(parameters: DisassociateRequestParameters) {
    super("Disassociate", { ...parameters });
  }

  /** Several related records are a `$batch`, whose error status `parseResponse` reads. */
  get parsesErrorResponses(): boolean {
    return this.Parameters.RelatedEntities.length > 1;
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const { Target, Relationship, RelatedEntities } = this.Parameters;
    checkRequestCount(RelatedEntities.length, "Disassociate (RelatedEntities)");
    if (!Relationship) throw DataverseInvalidRequestError.missingParameter("Relationship");
    const target = recordPath(Target);
    const requests = RelatedEntities.map((related): RequestInformation => ({
      method: "DELETE",
      url: `${baseUrl}/${target}/${Relationship}(${odataLiteral.guid(related.id)})/$ref`,
      headers: {},
    }));
    if (requests.length === 1) return requests[0];
    return batchRequestInformation(baseUrl, [
      { changeset: requests.map((request, index) => toBatchStep(request, String(index + 1))) },
    ]);
  }

  async parseResponse(response: Response): Promise<DisassociateResponse> {
    // One record: 204 No Content. Several: the change set, which throws the error of a failure.
    if (this.parsesErrorResponses) {
      await changesetParts(response, this.Parameters.RelatedEntities.length);
    }
    return new DisassociateResponse();
  }
}

/** Disassociate response message. */
export class DisassociateResponse extends OrganizationResponse {
  constructor() {
    super("Disassociate");
  }
}
