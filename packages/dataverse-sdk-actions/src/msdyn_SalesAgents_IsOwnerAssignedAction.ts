import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_SalesAgents_IsOwnerAssigned action
 */
export interface msdyn_SalesAgents_IsOwnerAssignedResponse {
  IsOwnerAssignedResponse: boolean;
}

/**
 * Parameters of the msdyn_SalesAgents_IsOwnerAssigned action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_SalesAgents_IsOwnerAssignedActionParameters {
  msdyn_HandoverContext?: string;
  msdyn_SalesAgentRun: string;
  msdyn_TrackingId?: string;
}

/**
 * msdyn_SalesAgents_IsOwnerAssigned action
 *
 * Unbound action
 */
export class msdyn_SalesAgents_IsOwnerAssignedAction implements Executable<msdyn_SalesAgents_IsOwnerAssignedResponse> {
  constructor(public readonly parameters: msdyn_SalesAgents_IsOwnerAssignedActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SalesAgents_IsOwnerAssigned`;

    const body = requestBody({
      msdyn_HandoverContext: this.parameters.msdyn_HandoverContext,
      msdyn_SalesAgentRun: this.parameters.msdyn_SalesAgentRun,
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

  async parseResponse(response: Response): Promise<msdyn_SalesAgents_IsOwnerAssignedResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_SalesAgents_IsOwnerAssignedResponse;
    return (await response.json()) as msdyn_SalesAgents_IsOwnerAssignedResponse;
  }
}
