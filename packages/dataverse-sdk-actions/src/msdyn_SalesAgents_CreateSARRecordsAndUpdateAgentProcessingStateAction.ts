import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_SalesAgents_CreateSARRecordsAndUpdateAgentProcessingState action.
 *
 * Nothing: the Web API answers 204 No Content.
 */
export type msdyn_SalesAgents_CreateSARRecordsAndUpdateAgentProcessingStateResponse = void;

/**
 * Parameters of the msdyn_SalesAgents_CreateSARRecordsAndUpdateAgentProcessingState action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_SalesAgents_CreateSARRecordsAndUpdateAgentProcessingStateActionParameters {
  msdyn_SARRecordsToCreate: string;
  msdyn_SalesAgentType: number;
  msdyn_TrackingId?: string;
}

/**
 * msdyn_SalesAgents_CreateSARRecordsAndUpdateAgentProcessingState action
 *
 * Unbound action
 */
export class msdyn_SalesAgents_CreateSARRecordsAndUpdateAgentProcessingStateAction implements Executable<msdyn_SalesAgents_CreateSARRecordsAndUpdateAgentProcessingStateResponse> {
  constructor(
    public readonly parameters: msdyn_SalesAgents_CreateSARRecordsAndUpdateAgentProcessingStateActionParameters
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SalesAgents_CreateSARRecordsAndUpdateAgentProcessingState`;

    const body = requestBody({
      msdyn_SARRecordsToCreate: this.parameters.msdyn_SARRecordsToCreate,
      msdyn_SalesAgentType: this.parameters.msdyn_SalesAgentType,
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

  parseResponse(
    _response: Response
  ): Promise<msdyn_SalesAgents_CreateSARRecordsAndUpdateAgentProcessingStateResponse> {
    // No return value: the Web API answers 204 No Content
    return Promise.resolve();
  }
}
