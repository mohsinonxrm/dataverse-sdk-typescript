import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
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
 * ProvisionDelegation action
 *
 * Unbound action
 */
export class ProvisionDelegationAction implements Executable<ProvisionDelegationResponse> {
  constructor(
    public readonly delegatedauthorization: EntityReference | EntityPayload<delegatedauthorization>
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/ProvisionDelegation`;

    const body: Record<string, unknown> = {
      delegatedauthorization: this.delegatedauthorization,
    };

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
    const data = await response.json();
    return data as ProvisionDelegationResponse;
  }
}
