import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_SalesAgents_FetchOutreachEmailForAgent action
 */
export interface msdyn_SalesAgents_FetchOutreachEmailForAgentResponse {
  msdyn_Response: string;
}

/**
 * Parameters of the msdyn_SalesAgents_FetchOutreachEmailForAgent action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_SalesAgents_FetchOutreachEmailForAgentActionParameters {
  msdyn_SalesAgentRunId?: string;
  msdyn_RegardingEntityName: string;
  msdyn_TrackingId?: string;
  msdyn_OutreachConfig?: string;
  msdyn_RegardingEntityId: string;
}

/**
 * msdyn_SalesAgents_FetchOutreachEmailForAgent action
 *
 * Unbound action
 */
export class msdyn_SalesAgents_FetchOutreachEmailForAgentAction implements Executable<msdyn_SalesAgents_FetchOutreachEmailForAgentResponse> {
  constructor(
    public readonly parameters: msdyn_SalesAgents_FetchOutreachEmailForAgentActionParameters
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SalesAgents_FetchOutreachEmailForAgent`;

    const body = requestBody({
      msdyn_SalesAgentRunId: this.parameters.msdyn_SalesAgentRunId,
      msdyn_RegardingEntityName: this.parameters.msdyn_RegardingEntityName,
      msdyn_TrackingId: this.parameters.msdyn_TrackingId,
      msdyn_OutreachConfig: this.parameters.msdyn_OutreachConfig,
      msdyn_RegardingEntityId: this.parameters.msdyn_RegardingEntityId,
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
  ): Promise<msdyn_SalesAgents_FetchOutreachEmailForAgentResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_SalesAgents_FetchOutreachEmailForAgentResponse;
    return (await response.json()) as msdyn_SalesAgents_FetchOutreachEmailForAgentResponse;
  }
}
