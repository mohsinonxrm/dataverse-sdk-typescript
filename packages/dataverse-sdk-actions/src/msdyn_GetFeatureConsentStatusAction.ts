import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_GetFeatureConsentStatus action
 */
export interface msdyn_GetFeatureConsentStatusResponse {
  // No content returned
}

/**
 * Parameters of the msdyn_GetFeatureConsentStatus action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetFeatureConsentStatusActionParameters {
  payload: string;
}

/**
 * msdyn_GetFeatureConsentStatus action
 *
 * Unbound action
 */
export class msdyn_GetFeatureConsentStatusAction implements Executable<msdyn_GetFeatureConsentStatusResponse> {
  constructor(public readonly parameters: msdyn_GetFeatureConsentStatusActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetFeatureConsentStatus`;

    const body = requestBody({
      payload: this.parameters.payload,
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

  async parseResponse(response: Response): Promise<msdyn_GetFeatureConsentStatusResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_GetFeatureConsentStatusResponse;
    return (await response.json()) as msdyn_GetFeatureConsentStatusResponse;
  }
}
