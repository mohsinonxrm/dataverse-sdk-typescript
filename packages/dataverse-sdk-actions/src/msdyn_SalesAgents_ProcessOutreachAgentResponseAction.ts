import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_SalesAgents_ProcessOutreachAgentResponse action
 */
export interface msdyn_SalesAgents_ProcessOutreachAgentResponseResponse {
  msdyn_Response: string;
}

/**
 * Parameters of the msdyn_SalesAgents_ProcessOutreachAgentResponse action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_SalesAgents_ProcessOutreachAgentResponseActionParameters {
  msdyn_TrackingId: string;
  msdyn_SalesAgentRunId: string;
  msdyn_Email: string;
}

/**
 * msdyn_SalesAgents_ProcessOutreachAgentResponse action
 *
 * Unbound action
 */
export class msdyn_SalesAgents_ProcessOutreachAgentResponseAction implements Executable<msdyn_SalesAgents_ProcessOutreachAgentResponseResponse> {
  constructor(
    public readonly parameters: msdyn_SalesAgents_ProcessOutreachAgentResponseActionParameters
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SalesAgents_ProcessOutreachAgentResponse`;

    const body = requestBody({
      msdyn_TrackingId: this.parameters.msdyn_TrackingId,
      msdyn_SalesAgentRunId: this.parameters.msdyn_SalesAgentRunId,
      msdyn_Email: this.parameters.msdyn_Email,
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
  ): Promise<msdyn_SalesAgents_ProcessOutreachAgentResponseResponse> {
    // 204 No Content is an empty result
    if (response.status === 204)
      return {} as msdyn_SalesAgents_ProcessOutreachAgentResponseResponse;
    return (await response.json()) as msdyn_SalesAgents_ProcessOutreachAgentResponseResponse;
  }
}
