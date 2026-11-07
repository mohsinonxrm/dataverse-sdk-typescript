import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_SalesAgents_IsOrchestrationComplete action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_SalesAgents_IsOrchestrationCompleteResponse {
  "@odata.context"?: string;
  msdyn_IsOrchestrationComplete: boolean;
}

/**
 * Parameters of the msdyn_SalesAgents_IsOrchestrationComplete action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_SalesAgents_IsOrchestrationCompleteActionParameters {
  msdyn_TrackingId?: string;
  msdyn_AgentType: number;
  msdyn_SalesAgentType: number;
  msdyn_MacroAgentOrchestrationId?: string;
}

/**
 * msdyn_SalesAgents_IsOrchestrationComplete action
 *
 * Unbound action
 */
export class msdyn_SalesAgents_IsOrchestrationCompleteAction implements Executable<msdyn_SalesAgents_IsOrchestrationCompleteResponse> {
  constructor(
    public readonly parameters: msdyn_SalesAgents_IsOrchestrationCompleteActionParameters
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SalesAgents_IsOrchestrationComplete`;

    const body = requestBody({
      msdyn_TrackingId: this.parameters.msdyn_TrackingId,
      msdyn_AgentType: this.parameters.msdyn_AgentType,
      msdyn_SalesAgentType: this.parameters.msdyn_SalesAgentType,
      msdyn_MacroAgentOrchestrationId: this.parameters.msdyn_MacroAgentOrchestrationId,
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
  ): Promise<msdyn_SalesAgents_IsOrchestrationCompleteResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_SalesAgents_IsOrchestrationCompleteResponse;
  }
}
