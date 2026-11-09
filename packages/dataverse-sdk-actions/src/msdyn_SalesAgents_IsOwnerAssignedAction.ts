import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_SalesAgents_IsOwnerAssigned action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_SalesAgents_IsOwnerAssignedResponse {
  "@odata.context"?: string;
  IsOwnerAssignedResponse: boolean;
}

/**
 * Parameters of the msdyn_SalesAgents_IsOwnerAssigned action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_SalesAgents_IsOwnerAssignedActionParameters {
  msdyn_TrackingId?: string;
  msdyn_HandoverContext?: string;
  msdyn_SalesAgentRun: string;
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
      msdyn_TrackingId: this.parameters.msdyn_TrackingId,
      msdyn_HandoverContext: this.parameters.msdyn_HandoverContext,
      msdyn_SalesAgentRun: this.parameters.msdyn_SalesAgentRun,
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
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_SalesAgents_IsOwnerAssignedResponse;
  }
}
