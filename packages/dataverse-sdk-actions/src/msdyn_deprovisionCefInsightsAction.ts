import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_deprovisionCefInsights action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_deprovisionCefInsightsResponse {
  "@odata.context"?: string;
  msdyn_responseStatus: string;
}

/**
 * Parameters of the msdyn_deprovisionCefInsights action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_deprovisionCefInsightsActionParameters {
  msdyn_deprovisioningMode?: string;
  msdyn_requestOptions?: string;
  msdyn_insightIdsJson?: string;
  msdyn_requestId: string;
}

/**
 * msdyn_deprovisionCefInsights action
 *
 * Unbound action
 */
export class msdyn_deprovisionCefInsightsAction implements Executable<msdyn_deprovisionCefInsightsResponse> {
  constructor(public readonly parameters: msdyn_deprovisionCefInsightsActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_deprovisionCefInsights`;

    const body = requestBody({
      msdyn_deprovisioningMode: this.parameters.msdyn_deprovisioningMode,
      msdyn_requestOptions: this.parameters.msdyn_requestOptions,
      msdyn_insightIdsJson: this.parameters.msdyn_insightIdsJson,
      msdyn_requestId: this.parameters.msdyn_requestId,
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

  async parseResponse(response: Response): Promise<msdyn_deprovisionCefInsightsResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_deprovisionCefInsightsResponse;
  }
}
