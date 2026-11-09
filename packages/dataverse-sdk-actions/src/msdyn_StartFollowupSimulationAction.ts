import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_StartFollowupSimulation action.
 *
 * Nothing: the Web API answers 204 No Content.
 */
export type msdyn_StartFollowupSimulationResponse = void;

/**
 * Parameters of the msdyn_StartFollowupSimulation action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_StartFollowupSimulationActionParameters {
  SimulationResultId: string;
}

/**
 * msdyn_StartFollowupSimulation action
 *
 * Unbound action
 */
export class msdyn_StartFollowupSimulationAction implements Executable<msdyn_StartFollowupSimulationResponse> {
  constructor(public readonly parameters: msdyn_StartFollowupSimulationActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_StartFollowupSimulation`;

    const body = requestBody({
      SimulationResultId: this.parameters.SimulationResultId,
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

  parseResponse(_response: Response): Promise<msdyn_StartFollowupSimulationResponse> {
    // No return value: the Web API answers 204 No Content
    return Promise.resolve();
  }
}
