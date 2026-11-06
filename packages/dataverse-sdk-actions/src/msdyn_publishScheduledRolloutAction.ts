import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_publishScheduledRollout action.
 *
 * Nothing: the Web API answers 204 No Content.
 */
export type msdyn_publishScheduledRolloutResponse = void;

/**
 * Parameters of the msdyn_publishScheduledRollout action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_publishScheduledRolloutActionParameters {
  RolloutPlanId: string;
}

/**
 * msdyn_publishScheduledRollout action
 *
 * Unbound action
 */
export class msdyn_publishScheduledRolloutAction implements Executable<msdyn_publishScheduledRolloutResponse> {
  constructor(public readonly parameters: msdyn_publishScheduledRolloutActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_publishScheduledRollout`;

    const body = requestBody({
      RolloutPlanId: this.parameters.RolloutPlanId,
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

  parseResponse(_response: Response): Promise<msdyn_publishScheduledRolloutResponse> {
    // No return value: the Web API answers 204 No Content
    return Promise.resolve();
  }
}
