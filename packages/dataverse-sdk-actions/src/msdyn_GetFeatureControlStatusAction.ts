import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_GetFeatureControlStatus action
 */
export interface msdyn_GetFeatureControlStatusResponse {
  msdyn_isFeatureEnabled: boolean;
}

/**
 * Parameters of the msdyn_GetFeatureControlStatus action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetFeatureControlStatusActionParameters {
  msdyn_featureName: string;
}

/**
 * msdyn_GetFeatureControlStatus action
 *
 * Unbound action
 */
export class msdyn_GetFeatureControlStatusAction implements Executable<msdyn_GetFeatureControlStatusResponse> {
  constructor(public readonly parameters: msdyn_GetFeatureControlStatusActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetFeatureControlStatus`;

    const body = requestBody({
      msdyn_featureName: this.parameters.msdyn_featureName,
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

  async parseResponse(response: Response): Promise<msdyn_GetFeatureControlStatusResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_GetFeatureControlStatusResponse;
    return (await response.json()) as msdyn_GetFeatureControlStatusResponse;
  }
}
