import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_ActivateRoutingRule action.
 *
 * Nothing: the Web API answers 204 No Content.
 */
export type msdyn_ActivateRoutingRuleResponse = void;

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

  parseResponse(_response: Response): Promise<msdyn_ActivateRoutingRuleResponse> {
    // No return value: the Web API answers 204 No Content
    return Promise.resolve();
  }
}
