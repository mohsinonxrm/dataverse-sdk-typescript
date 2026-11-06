import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_setCefInsightsEnabled action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_setCefInsightsEnabledResponse {
  "@odata.context"?: string;
  msdyn_responseStatus: string;
}

/**
 * Parameters of the msdyn_setCefInsightsEnabled action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_setCefInsightsEnabledActionParameters {
  msdyn_isEnabled: boolean;
  msdyn_requestId: string;
  msdyn_insightIdsJson: string;
  msdyn_requestOptions?: string;
}

/**
 * msdyn_setCefInsightsEnabled action
 *
 * Unbound action
 */
export class msdyn_setCefInsightsEnabledAction implements Executable<msdyn_setCefInsightsEnabledResponse> {
  constructor(public readonly parameters: msdyn_setCefInsightsEnabledActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_setCefInsightsEnabled`;

    const body = requestBody({
      msdyn_isEnabled: this.parameters.msdyn_isEnabled,
      msdyn_requestId: this.parameters.msdyn_requestId,
      msdyn_insightIdsJson: this.parameters.msdyn_insightIdsJson,
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

  async parseResponse(response: Response): Promise<msdyn_setCefInsightsEnabledResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_setCefInsightsEnabledResponse;
  }
}
