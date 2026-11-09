import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_SalesAgents_CreateSARBasedOnPreviousAgent action.
 *
 * Nothing: the Web API answers 204 No Content.
 */
export type msdyn_SalesAgents_CreateSARBasedOnPreviousAgentResponse = void;

/**
 * Parameters of the msdyn_SalesAgents_CreateSARBasedOnPreviousAgent action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_SalesAgents_CreateSARBasedOnPreviousAgentActionParameters {
  msdyn_PreviousSarRecordId: string;
  msdyn_TrackingId?: string;
  msdyn_SalesAgentType: number;
}

/**
 * msdyn_SalesAgents_CreateSARBasedOnPreviousAgent action
 *
 * Unbound action
 */
export class msdyn_SalesAgents_CreateSARBasedOnPreviousAgentAction implements Executable<msdyn_SalesAgents_CreateSARBasedOnPreviousAgentResponse> {
  constructor(
    public readonly parameters: msdyn_SalesAgents_CreateSARBasedOnPreviousAgentActionParameters
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SalesAgents_CreateSARBasedOnPreviousAgent`;

    const body = requestBody({
      msdyn_PreviousSarRecordId: this.parameters.msdyn_PreviousSarRecordId,
      msdyn_TrackingId: this.parameters.msdyn_TrackingId,
      msdyn_SalesAgentType: this.parameters.msdyn_SalesAgentType,
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
  ): Promise<msdyn_SalesAgents_CreateSARBasedOnPreviousAgentResponse> {
    // No return value: the Web API answers 204 No Content
    return Promise.resolve();
  }
}
