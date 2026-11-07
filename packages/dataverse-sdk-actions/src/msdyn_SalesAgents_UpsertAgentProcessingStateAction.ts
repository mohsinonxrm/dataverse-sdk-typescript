import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_SalesAgents_UpsertAgentProcessingState action.
 *
 * Nothing: the Web API answers 204 No Content.
 */
export type msdyn_SalesAgents_UpsertAgentProcessingStateResponse = void;

/**
 * Parameters of the msdyn_SalesAgents_UpsertAgentProcessingState action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_SalesAgents_UpsertAgentProcessingStateActionParameters {
  msdyn_AgentProfileId?: string;
  msdyn_Priority?: string;
  msdyn_Records: Record<string, unknown>[];
  msdyn_SalesAgentType: number;
  msdyn_TargetProcessingState?: number;
  msdyn_TrackingId?: string;
  msdyn_SkipVersionNumberUpdate?: boolean;
}

/**
 * msdyn_SalesAgents_UpsertAgentProcessingState action
 *
 * Unbound action
 */
export class msdyn_SalesAgents_UpsertAgentProcessingStateAction implements Executable<msdyn_SalesAgents_UpsertAgentProcessingStateResponse> {
  constructor(
    public readonly parameters: msdyn_SalesAgents_UpsertAgentProcessingStateActionParameters
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SalesAgents_UpsertAgentProcessingState`;

    const body = requestBody({
      msdyn_AgentProfileId: this.parameters.msdyn_AgentProfileId,
      msdyn_Priority: this.parameters.msdyn_Priority,
      msdyn_Records: this.parameters.msdyn_Records,
      msdyn_SalesAgentType: this.parameters.msdyn_SalesAgentType,
      msdyn_TargetProcessingState: this.parameters.msdyn_TargetProcessingState,
      msdyn_TrackingId: this.parameters.msdyn_TrackingId,
      msdyn_SkipVersionNumberUpdate: this.parameters.msdyn_SkipVersionNumberUpdate,
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
  ): Promise<msdyn_SalesAgents_UpsertAgentProcessingStateResponse> {
    // No return value: the Web API answers 204 No Content
    return Promise.resolve();
  }
}
