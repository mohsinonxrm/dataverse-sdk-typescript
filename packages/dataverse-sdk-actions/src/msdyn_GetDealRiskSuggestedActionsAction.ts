import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_GetDealRiskSuggestedActions action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_GetDealRiskSuggestedActionsResponse {
  "@odata.context"?: string;
  msdyn_Response: string;
}

/**
 * Parameters of the msdyn_GetDealRiskSuggestedActions action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetDealRiskSuggestedActionsActionParameters {
  msdyn_Context?: string;
  msdyn_TrackingId: string;
  msdyn_TopCount: number;
}

/**
 * msdyn_GetDealRiskSuggestedActions action
 *
 * Unbound action
 */
export class msdyn_GetDealRiskSuggestedActionsAction implements Executable<msdyn_GetDealRiskSuggestedActionsResponse> {
  constructor(public readonly parameters: msdyn_GetDealRiskSuggestedActionsActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetDealRiskSuggestedActions`;

    const body = requestBody({
      msdyn_Context: this.parameters.msdyn_Context,
      msdyn_TrackingId: this.parameters.msdyn_TrackingId,
      msdyn_TopCount: this.parameters.msdyn_TopCount,
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

  async parseResponse(response: Response): Promise<msdyn_GetDealRiskSuggestedActionsResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_GetDealRiskSuggestedActionsResponse;
  }
}
