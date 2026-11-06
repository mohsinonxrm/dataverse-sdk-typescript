import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_ActivateRoutingRule action
 */
export interface msdyn_ActivateRoutingRuleResponse {
  // No content returned
}

/**
 * Parameters of the msdyn_ActivateRoutingRule action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_ActivateRoutingRuleActionParameters {
  msdyn_routingRuleId: string;
  msdyn_ownerId: string;
}

/**
 * msdyn_ActivateRoutingRule action
 *
 * Unbound action
 */
export class msdyn_ActivateRoutingRuleAction implements Executable<msdyn_ActivateRoutingRuleResponse> {
  constructor(public readonly parameters: msdyn_ActivateRoutingRuleActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_ActivateRoutingRule`;

    const body = requestBody({
      msdyn_routingRuleId: this.parameters.msdyn_routingRuleId,
      msdyn_ownerId: this.parameters.msdyn_ownerId,
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

  async parseResponse(response: Response): Promise<msdyn_ActivateRoutingRuleResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_ActivateRoutingRuleResponse;
    return (await response.json()) as msdyn_ActivateRoutingRuleResponse;
  }
}
