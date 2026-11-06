import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "@mohsinonxrm/dataverse-sdk-entities-runtime";
import { requestBody } from "./internal/requestBody.js";
import type { EntityPayload } from "./types/EntityPayload.js";
import type { delegatedauthorization, team } from "./types/index.js";

/**
 * Parameters of the ProvisionDelegation message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface ProvisionDelegationRequestParameters {
  delegatedauthorization: EntityReference | EntityPayload<delegatedauthorization>;
}

/**
 * ProvisionDelegation request message
 *
 * Web API Action: ProvisionDelegation
 */
export class ProvisionDelegationRequest
  extends OrganizationRequest
  implements Executable<ProvisionDelegationResponse>
{
  declare readonly Parameters: Readonly<ProvisionDelegationRequestParameters>;

  constructor(parameters: ProvisionDelegationRequestParameters) {
    super("ProvisionDelegation", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/ProvisionDelegation`;

    const body = requestBody({
      delegatedauthorization: this.Parameters.delegatedauthorization,
    });

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<ProvisionDelegationResponse> {
    // An entity output that wasn't set answers 204 No Content
    if (response.status === 204) return ProvisionDelegationResponse.fromResponse(undefined);
    // The body is the record, with its annotations
    return ProvisionDelegationResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the ProvisionDelegation action.
 *
 * The record: the response body itself, with its annotations (not wrapped in `value`).
 * `null` when the Web API answers 204 No Content (an entity output that wasn't set).
 */
export type ProvisionDelegationResult =
  (team & { "@odata.context"?: string; "@odata.etag"?: string; "@odata.type"?: string }) | null;

/**
 * ProvisionDelegation response message
 *
 * `result` is the value the ProvisionDelegation action returns (see {@link ProvisionDelegationResult}).
 */
export class ProvisionDelegationResponse extends OrganizationResponse {
  constructor(public result: ProvisionDelegationResult) {
    super("ProvisionDelegation");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): ProvisionDelegationResponse {
    return new ProvisionDelegationResponse((data ?? null) as ProvisionDelegationResult);
  }
}
