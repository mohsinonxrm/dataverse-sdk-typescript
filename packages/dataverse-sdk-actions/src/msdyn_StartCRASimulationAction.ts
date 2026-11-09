import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_StartCRASimulation action.
 *
 * Nothing: the Web API answers 204 No Content.
 */
export type msdyn_StartCRASimulationResponse = void;

/**
 * Parameters of the msdyn_StartCRASimulation action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_StartCRASimulationActionParameters {
  SimulationResultId: string;
}

/**
 * msdyn_StartCRASimulation action
 *
 * Unbound action
 */
export class msdyn_StartCRASimulationAction implements Executable<msdyn_StartCRASimulationResponse> {
  constructor(public readonly parameters: msdyn_StartCRASimulationActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_StartCRASimulation`;

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

  parseResponse(_response: Response): Promise<msdyn_StartCRASimulationResponse> {
    // No return value: the Web API answers 204 No Content
    return Promise.resolve();
  }
}
