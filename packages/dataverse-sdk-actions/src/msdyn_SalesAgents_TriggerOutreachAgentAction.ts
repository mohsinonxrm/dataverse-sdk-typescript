import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_SalesAgents_TriggerOutreachAgent action
 */
export interface msdyn_SalesAgents_TriggerOutreachAgentResponse {
  msdyn_Response: string;
}

/**
 * Parameters of the msdyn_SalesAgents_TriggerOutreachAgent action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_SalesAgents_TriggerOutreachAgentActionParameters {
  msdyn_TrackingId: string;
  msdyn_SalesAgentRun: string;
  msdyn_OutreachConfig?: string;
}

/**
 * msdyn_SalesAgents_TriggerOutreachAgent action
 *
 * Unbound action
 */
export class msdyn_SalesAgents_TriggerOutreachAgentAction implements Executable<msdyn_SalesAgents_TriggerOutreachAgentResponse> {
  constructor(public readonly parameters: msdyn_SalesAgents_TriggerOutreachAgentActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SalesAgents_TriggerOutreachAgent`;

    const body = requestBody({
      msdyn_TrackingId: this.parameters.msdyn_TrackingId,
      msdyn_SalesAgentRun: this.parameters.msdyn_SalesAgentRun,
      msdyn_OutreachConfig: this.parameters.msdyn_OutreachConfig,
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

  async parseResponse(response: Response): Promise<msdyn_SalesAgents_TriggerOutreachAgentResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_SalesAgents_TriggerOutreachAgentResponse;
    return (await response.json()) as msdyn_SalesAgents_TriggerOutreachAgentResponse;
  }
}
