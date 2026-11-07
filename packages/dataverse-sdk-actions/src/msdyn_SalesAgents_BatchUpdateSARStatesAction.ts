import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_SalesAgents_BatchUpdateSARStates action.
 *
 * Nothing: the Web API answers 204 No Content.
 */
export type msdyn_SalesAgents_BatchUpdateSARStatesResponse = void;

/**
 * Parameters of the msdyn_SalesAgents_BatchUpdateSARStates action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_SalesAgents_BatchUpdateSARStatesActionParameters {
  msdyn_StateCode: number;
  msdyn_SalesAgentRunIds: string[];
  msdyn_StatusCode: number;
  msdyn_TrackingId?: string;
}

/**
 * msdyn_SalesAgents_BatchUpdateSARStates action
 *
 * Unbound action
 */
export class msdyn_SalesAgents_BatchUpdateSARStatesAction implements Executable<msdyn_SalesAgents_BatchUpdateSARStatesResponse> {
  constructor(public readonly parameters: msdyn_SalesAgents_BatchUpdateSARStatesActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SalesAgents_BatchUpdateSARStates`;

    const body = requestBody({
      msdyn_StateCode: this.parameters.msdyn_StateCode,
      msdyn_SalesAgentRunIds: this.parameters.msdyn_SalesAgentRunIds,
      msdyn_StatusCode: this.parameters.msdyn_StatusCode,
      msdyn_TrackingId: this.parameters.msdyn_TrackingId,
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

  parseResponse(_response: Response): Promise<msdyn_SalesAgents_BatchUpdateSARStatesResponse> {
    // No return value: the Web API answers 204 No Content
    return Promise.resolve();
  }
}
