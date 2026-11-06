import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_GetSalesRowSummary action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_GetSalesRowSummaryResponse {
  "@odata.context"?: string;
  Result: string;
}

/**
 * Parameters of the msdyn_GetSalesRowSummary action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetSalesRowSummaryActionParameters {
  ClientContext?: string;
  OtherData?: string;
}

/**
 * msdyn_GetSalesRowSummary action
 *
 * Unbound action
 */
export class msdyn_GetSalesRowSummaryAction implements Executable<msdyn_GetSalesRowSummaryResponse> {
  constructor(public readonly parameters: msdyn_GetSalesRowSummaryActionParameters = {}) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetSalesRowSummary`;

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

  async parseResponse(response: Response): Promise<msdyn_GetSalesRowSummaryResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_GetSalesRowSummaryResponse;
  }
}
