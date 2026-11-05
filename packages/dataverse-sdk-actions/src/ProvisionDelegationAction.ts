import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { delegatedauthorization, team } from "./types/index.js";

/**
 * Response from ProvisionDelegation action
 */
export interface ProvisionDelegationResponse {
  value: team;
}

/**
 * ProvisionDelegation action
 *
 * Unbound action
 */
export class ProvisionDelegationAction implements Executable<ProvisionDelegationResponse> {
  constructor(public readonly delegatedauthorization: delegatedauthorization) {}

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
