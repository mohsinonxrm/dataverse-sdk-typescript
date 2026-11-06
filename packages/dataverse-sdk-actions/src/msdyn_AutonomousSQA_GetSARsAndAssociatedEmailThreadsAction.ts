import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_AutonomousSQA_GetSARsAndAssociatedEmailThreads action
 */
export interface msdyn_AutonomousSQA_GetSARsAndAssociatedEmailThreadsResponse {
  msdyn_OrgUrl: string;
  msdyn_response: string;
}

/**
 * Parameters of the msdyn_AutonomousSQA_GetSARsAndAssociatedEmailThreads action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_AutonomousSQA_GetSARsAndAssociatedEmailThreadsActionParameters {
  msdyn_SalesMacroAgentType: number;
  msdyn_TrackingId: string;
}

/**
 * msdyn_AutonomousSQA_GetSARsAndAssociatedEmailThreads action
 *
 * Unbound action
 */
export class msdyn_AutonomousSQA_GetSARsAndAssociatedEmailThreadsAction implements Executable<msdyn_AutonomousSQA_GetSARsAndAssociatedEmailThreadsResponse> {
  constructor(
    public readonly parameters: msdyn_AutonomousSQA_GetSARsAndAssociatedEmailThreadsActionParameters
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_AutonomousSQA_GetSARsAndAssociatedEmailThreads`;

    const body = requestBody({
      msdyn_SalesMacroAgentType: this.parameters.msdyn_SalesMacroAgentType,
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

  async parseResponse(
    response: Response
  ): Promise<msdyn_AutonomousSQA_GetSARsAndAssociatedEmailThreadsResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (
      text ? JSON.parse(text) : {}
    ) as msdyn_AutonomousSQA_GetSARsAndAssociatedEmailThreadsResponse;
  }
}
