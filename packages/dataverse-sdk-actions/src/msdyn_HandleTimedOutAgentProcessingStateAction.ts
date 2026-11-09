import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_HandleTimedOutAgentProcessingState action.
 *
 * Nothing: the Web API answers 204 No Content.
 */
export type msdyn_HandleTimedOutAgentProcessingStateResponse = void;

/**
 * Parameters of the msdyn_HandleTimedOutAgentProcessingState action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_HandleTimedOutAgentProcessingStateActionParameters {
  msdyn_agentprofileid: string;
}

/**
 * msdyn_HandleTimedOutAgentProcessingState action
 *
 * Unbound action
 */
export class msdyn_HandleTimedOutAgentProcessingStateAction implements Executable<msdyn_HandleTimedOutAgentProcessingStateResponse> {
  constructor(
    public readonly parameters: msdyn_HandleTimedOutAgentProcessingStateActionParameters
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_HandleTimedOutAgentProcessingState`;

    const body = requestBody({
      msdyn_agentprofileid: this.parameters.msdyn_agentprofileid,
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

  parseResponse(_response: Response): Promise<msdyn_HandleTimedOutAgentProcessingStateResponse> {
    // No return value: the Web API answers 204 No Content
    return Promise.resolve();
  }
}
