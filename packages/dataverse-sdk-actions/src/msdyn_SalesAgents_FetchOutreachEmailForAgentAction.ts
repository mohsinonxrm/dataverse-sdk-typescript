import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_SalesAgents_FetchOutreachEmailForAgent action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_SalesAgents_FetchOutreachEmailForAgentResponse {
  "@odata.context"?: string;
  msdyn_Response: string;
}

/**
 * Parameters of the msdyn_SalesAgents_FetchOutreachEmailForAgent action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_SalesAgents_FetchOutreachEmailForAgentActionParameters {
  msdyn_OutreachConfig?: string;
  msdyn_RegardingEntityId: string;
  msdyn_RegardingEntityName: string;
  msdyn_SalesAgentRunId?: string;
  msdyn_TrackingId?: string;
  msdyn_AgentProfileId?: string;
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
      msdyn_OutreachConfig: this.parameters.msdyn_OutreachConfig,
      msdyn_RegardingEntityId: this.parameters.msdyn_RegardingEntityId,
      msdyn_RegardingEntityName: this.parameters.msdyn_RegardingEntityName,
      msdyn_SalesAgentRunId: this.parameters.msdyn_SalesAgentRunId,
      msdyn_TrackingId: this.parameters.msdyn_TrackingId,
      msdyn_AgentProfileId: this.parameters.msdyn_AgentProfileId,
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
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_SalesAgents_FetchOutreachEmailForAgentResponse;
  }
}
