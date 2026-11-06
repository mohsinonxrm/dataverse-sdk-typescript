import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_SalesAgents_ProcessEngageAgentResponse action
 */
export interface msdyn_SalesAgents_ProcessEngageAgentResponseResponse {
  msdyn_AreAllFollowUpsCompleted: boolean;
  msdyn_EmailBody: string;
  msdyn_Explanation: string;
  msdyn_IsAwaitingResponse: boolean;
  msdyn_IsStuck: boolean;
  msdyn_IsUnsubscribe: boolean;
}

/**
 * Parameters of the msdyn_SalesAgents_ProcessEngageAgentResponse action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_SalesAgents_ProcessEngageAgentResponseActionParameters {
  msdyn_SalesAgentRun?: string;
  msdyn_Thread?: string;
  msdyn_SalesMacroAgentType: number;
  msdyn_TrackingId?: string;
  msdyn_EngageAgentActivities: string;
}

/**
 * msdyn_SalesAgents_ProcessEngageAgentResponse action
 *
 * Unbound action
 */
export class msdyn_SalesAgents_ProcessEngageAgentResponseAction implements Executable<msdyn_SalesAgents_ProcessEngageAgentResponseResponse> {
  constructor(
    public readonly parameters: msdyn_SalesAgents_ProcessEngageAgentResponseActionParameters
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SalesAgents_ProcessEngageAgentResponse`;

    const body = requestBody({
      msdyn_SalesAgentRun: this.parameters.msdyn_SalesAgentRun,
      msdyn_Thread: this.parameters.msdyn_Thread,
      msdyn_SalesMacroAgentType: this.parameters.msdyn_SalesMacroAgentType,
      msdyn_TrackingId: this.parameters.msdyn_TrackingId,
      msdyn_EngageAgentActivities: this.parameters.msdyn_EngageAgentActivities,
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
  ): Promise<msdyn_SalesAgents_ProcessEngageAgentResponseResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_SalesAgents_ProcessEngageAgentResponseResponse;
    return (await response.json()) as msdyn_SalesAgents_ProcessEngageAgentResponseResponse;
  }
}
