import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_checkGovernanceAgentPolicies action
 */
export interface msdyn_checkGovernanceAgentPoliciesResponse {
  msdyn_hasActivePolicy: boolean;
  msdyn_hasBlockingPolicy: boolean;
  msdyn_status: string;
}

/**
 * Parameters of the msdyn_checkGovernanceAgentPolicies action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_checkGovernanceAgentPoliciesActionParameters {
  msdyn_scenarioname: string;
  msdyn_channel: number;
}

/**
 * msdyn_checkGovernanceAgentPolicies action
 *
 * Unbound action
 */
export class msdyn_checkGovernanceAgentPoliciesAction implements Executable<msdyn_checkGovernanceAgentPoliciesResponse> {
  constructor(public readonly parameters: msdyn_checkGovernanceAgentPoliciesActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_checkGovernanceAgentPolicies`;

    const body = requestBody({
      msdyn_scenarioname: this.parameters.msdyn_scenarioname,
      msdyn_channel: this.parameters.msdyn_channel,
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

  async parseResponse(response: Response): Promise<msdyn_checkGovernanceAgentPoliciesResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_checkGovernanceAgentPoliciesResponse;
    return (await response.json()) as msdyn_checkGovernanceAgentPoliciesResponse;
  }
}
