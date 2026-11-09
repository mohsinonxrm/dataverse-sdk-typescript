import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_SalesAgents_FetchSARRecordsForAgentProcessing action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_SalesAgents_FetchSARRecordsForAgentProcessingResponse {
  "@odata.context"?: string;
  msdyn_Records: string;
}

/**
 * Parameters of the msdyn_SalesAgents_FetchSARRecordsForAgentProcessing action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_SalesAgents_FetchSARRecordsForAgentProcessingActionParameters {
  msdyn_TrackingId?: string;
  msdyn_AgentType: number;
  msdyn_SalesAgentType: number;
  msdyn_Top?: number;
}

/**
 * msdyn_SalesAgents_FetchSARRecordsForAgentProcessing action
 *
 * Unbound action
 */
export class msdyn_SalesAgents_FetchSARRecordsForAgentProcessingAction implements Executable<msdyn_SalesAgents_FetchSARRecordsForAgentProcessingResponse> {
  constructor(
    public readonly parameters: msdyn_SalesAgents_FetchSARRecordsForAgentProcessingActionParameters
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SalesAgents_FetchSARRecordsForAgentProcessing`;

    const body = requestBody({
      msdyn_TrackingId: this.parameters.msdyn_TrackingId,
      msdyn_AgentType: this.parameters.msdyn_AgentType,
      msdyn_SalesAgentType: this.parameters.msdyn_SalesAgentType,
      msdyn_Top: this.parameters.msdyn_Top,
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

  async parseResponse(
    response: Response
  ): Promise<msdyn_SalesAgents_FetchSARRecordsForAgentProcessingResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_SalesAgents_FetchSARRecordsForAgentProcessingResponse;
  }
}
