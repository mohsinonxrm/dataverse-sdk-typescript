import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { EntityPayload } from "./types/EntityPayload.js";
import type { delegatedauthorization, team } from "./types/index.js";

/**
 * Response from ProvisionDelegation action
 *
 * The response is the entity itself, not wrapped in `value`.
 */
export interface ProvisionDelegationResponse extends team {
  "@odata.context"?: string;
  "@odata.etag"?: string;
}

/**
 * Parameters of the ProvisionDelegation action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface ProvisionDelegationActionParameters {
  delegatedauthorization: EntityReference | EntityPayload<delegatedauthorization>;
}

/**
 * ProvisionDelegation action
 *
 * Unbound action
 */
export class ProvisionDelegationAction implements Executable<ProvisionDelegationResponse> {
  constructor(public readonly parameters: ProvisionDelegationActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/ProvisionDelegation`;

    const body = requestBody({
      delegatedauthorization: this.parameters.delegatedauthorization,
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
    // 204 No Content is an empty result
    if (response.status === 204) return {} as ProvisionDelegationResponse;
    return (await response.json()) as ProvisionDelegationResponse;
  }
}
