import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_GeneratePlatformSummary action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_GeneratePlatformSummaryResponse {
  "@odata.context"?: string;
  Result: string;
}

/**
 * Parameters of the msdyn_GeneratePlatformSummary action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GeneratePlatformSummaryActionParameters {
  OtherData?: string;
  ClientContext?: string;
}

/**
 * msdyn_GeneratePlatformSummary action
 *
 * Unbound action
 */
export class msdyn_GeneratePlatformSummaryAction implements Executable<msdyn_GeneratePlatformSummaryResponse> {
  constructor(public readonly parameters: msdyn_GeneratePlatformSummaryActionParameters = {}) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GeneratePlatformSummary`;

    const body = requestBody({
      OtherData: this.parameters.OtherData,
      ClientContext: this.parameters.ClientContext,
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

  async parseResponse(response: Response): Promise<msdyn_GeneratePlatformSummaryResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_GeneratePlatformSummaryResponse;
  }
}
