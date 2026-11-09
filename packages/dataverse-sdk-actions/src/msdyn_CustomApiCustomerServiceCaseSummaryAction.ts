import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_CustomApiCustomerServiceCaseSummary action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_CustomApiCustomerServiceCaseSummaryResponse {
  "@odata.context"?: string;
  msdyn_CaseSummary: string;
}

/**
 * Parameters of the msdyn_CustomApiCustomerServiceCaseSummary action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_CustomApiCustomerServiceCaseSummaryActionParameters {
  msdyn_CaseNumber: string;
}

/**
 * msdyn_CustomApiCustomerServiceCaseSummary action
 *
 * Unbound action
 */
export class msdyn_CustomApiCustomerServiceCaseSummaryAction implements Executable<msdyn_CustomApiCustomerServiceCaseSummaryResponse> {
  constructor(
    public readonly parameters: msdyn_CustomApiCustomerServiceCaseSummaryActionParameters
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CustomApiCustomerServiceCaseSummary`;

    const body = requestBody({
      msdyn_CaseNumber: this.parameters.msdyn_CaseNumber,
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
  ): Promise<msdyn_CustomApiCustomerServiceCaseSummaryResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_CustomApiCustomerServiceCaseSummaryResponse;
  }
}
