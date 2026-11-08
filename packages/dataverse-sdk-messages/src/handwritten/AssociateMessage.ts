/**
 * Associate message (#344). Hand-written: Associate isn't a Web API action but
 * `POST /<entity set>(<id>)/<relationship>/$ref`, once per related record.
 */
import {
  DataverseInvalidRequestError,
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

/** Parameters of the Associate message. */
export interface AssociateRequestParameters {
  /** The record to associate the others with, made with `createEntityReference`. */
  Target: EntityReference;
  /**
   * The relationship: the collection-valued navigation property of `Target`'s table, for example
   * `"contact_customer_accounts"` (for most relationships, its schema name, as in .NET).
   */
  Relationship: string;
  /** The records to associate with `Target`, made with `createEntityReference`. */
  RelatedEntities: readonly EntityReference[];
}

/** The `$ref` request that associates one record. */
function associateOne(
  baseUrl: string,
  target: string,
  relationship: string,
  related: EntityReference
): RequestInformation {
  return {
    method: "POST",
    url: `${baseUrl}/${target}/${relationship}/$ref`,
    headers: { "content-type": "application/json" },
    // Dataverse rejects a relative @odata.id here, so the reference is the absolute URL.
    body: { "@odata.id": `${baseUrl}/${recordPath(related)}` },
  };
}

/**
 * Associate request message: links records through a relationship.
 *
 * One related record is one `POST …/<relationship>/$ref`. Several are sent as one `$batch` change
 * set, so they are linked together or not at all, as the .NET `AssociateRequest` does; that
 * request can't go inside `ExecuteMultipleRequest` or `ExecuteTransactionRequest`.
 *
 * @example
 * ```typescript
 * await client.execute(
 *   new AssociateRequest({
 *     Target: createEntityReference("account", accountId),
 *     Relationship: "contact_customer_accounts",
 *     RelatedEntities: [createEntityReference("contact", contactId)],
 *   })
 * );
 * ```
 */
export class AssociateRequest extends OrganizationRequest implements Executable<AssociateResponse> {
  declare readonly Parameters: Readonly<AssociateRequestParameters>;

  constructor(parameters: AssociateRequestParameters) {
    super("Associate", { ...parameters });
  }

  /** Several related records are a `$batch`, whose error status `parseResponse` reads. */
  get parsesErrorResponses(): boolean {
    return this.Parameters.RelatedEntities.length > 1;
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const { Target, Relationship, RelatedEntities } = this.Parameters;
    checkRequestCount(RelatedEntities.length, "Associate (RelatedEntities)");
    if (!Relationship) throw DataverseInvalidRequestError.missingParameter("Relationship");
    const target = recordPath(Target);
    const requests = RelatedEntities.map((related) =>
      associateOne(baseUrl, target, Relationship, related)
    );
    if (requests.length === 1) return requests[0];
    return batchRequestInformation(baseUrl, [
      { changeset: requests.map((request, index) => toBatchStep(request, String(index + 1))) },
    ]);
  }

  async parseResponse(response: Response): Promise<AssociateResponse> {
    // One record: 204 No Content. Several: the change set, which throws the error of a failure.
    if (this.parsesErrorResponses) {
      await changesetParts(response, this.Parameters.RelatedEntities.length);
    }
    return new AssociateResponse();
  }
}

/** Associate response message. */
export class AssociateResponse extends OrganizationResponse {
  constructor() {
    super("Associate");
  }
}
