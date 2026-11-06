import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_AddSuggestedCards action.
 *
 * Nothing: the Web API answers 204 No Content.
 */
export type msdyn_AddSuggestedCardsResponse = void;

/**
 * Parameters of the msdyn_AddSuggestedCards action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_AddSuggestedCardsActionParameters {
  scope: string;
  BusinessProcessFlowId?: string;
  BusinessProcessFlowInstanceId?: string;
  ActionStepId?: string;
}

/**
 * msdyn_AddSuggestedCards action
 *
 * Unbound action
 */
export class msdyn_AddSuggestedCardsAction implements Executable<msdyn_AddSuggestedCardsResponse> {
  constructor(public readonly parameters: msdyn_AddSuggestedCardsActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_AddSuggestedCards`;

    const body = requestBody({
      scope: this.parameters.scope,
      BusinessProcessFlowId: this.parameters.BusinessProcessFlowId,
      BusinessProcessFlowInstanceId: this.parameters.BusinessProcessFlowInstanceId,
      ActionStepId: this.parameters.ActionStepId,
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

  parseResponse(_response: Response): Promise<msdyn_AddSuggestedCardsResponse> {
    // No return value: the Web API answers 204 No Content
    return Promise.resolve();
  }
}
