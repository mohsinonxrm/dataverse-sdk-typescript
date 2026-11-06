import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_provisionCefInsights action
 */
export interface msdyn_provisionCefInsightsResponse {
  msdyn_jobId: string;
  msdyn_responseStatus: string;
}

/**
 * Parameters of the msdyn_provisionCefInsights action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_provisionCefInsightsActionParameters {
  msdyn_provisioningMode?: string;
  msdyn_insightIdsJson?: string;
  msdyn_requestId: string;
  msdyn_requestOptions?: string;
}

/**
 * msdyn_provisionCefInsights action
 *
 * Unbound action
 */
export class msdyn_provisionCefInsightsAction implements Executable<msdyn_provisionCefInsightsResponse> {
  constructor(public readonly parameters: msdyn_provisionCefInsightsActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_provisionCefInsights`;

    const body = requestBody({
      msdyn_provisioningMode: this.parameters.msdyn_provisioningMode,
      msdyn_insightIdsJson: this.parameters.msdyn_insightIdsJson,
      msdyn_requestId: this.parameters.msdyn_requestId,
      msdyn_requestOptions: this.parameters.msdyn_requestOptions,
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

  async parseResponse(response: Response): Promise<msdyn_provisionCefInsightsResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_provisionCefInsightsResponse;
    return (await response.json()) as msdyn_provisionCefInsightsResponse;
  }
}
