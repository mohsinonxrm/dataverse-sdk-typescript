import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_GetSalesSuggestedActions action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_GetSalesSuggestedActionsResponse {
  "@odata.context"?: string;
  Result: string;
}

/**
 * Parameters of the msdyn_GetSalesSuggestedActions action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetSalesSuggestedActionsActionParameters {
  ClientContext?: string;
  OtherData?: string;
}

/**
 * msdyn_GetSalesSuggestedActions action
 *
 * Unbound action
 */
export class msdyn_GetSalesSuggestedActionsAction implements Executable<msdyn_GetSalesSuggestedActionsResponse> {
  constructor(public readonly parameters: msdyn_GetSalesSuggestedActionsActionParameters = {}) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetSalesSuggestedActions`;

    const body = requestBody({
      ClientContext: this.parameters.ClientContext,
      OtherData: this.parameters.OtherData,
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

  async parseResponse(response: Response): Promise<msdyn_GetSalesSuggestedActionsResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_GetSalesSuggestedActionsResponse;
  }
}
