import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_AutonomousSQA_GetSARsAndAssociatedEmailThreads action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_AutonomousSQA_GetSARsAndAssociatedEmailThreadsResponse {
  "@odata.context"?: string;
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
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_AutonomousSQA_GetSARsAndAssociatedEmailThreadsResponse;
  }
}
