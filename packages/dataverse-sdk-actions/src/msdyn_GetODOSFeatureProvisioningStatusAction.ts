import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_GetODOSFeatureProvisioningStatus action
 */
export interface msdyn_GetODOSFeatureProvisioningStatusResponse {
  Status: string;
}

/**
 * Parameters of the msdyn_GetODOSFeatureProvisioningStatus action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetODOSFeatureProvisioningStatusActionParameters {
  FeatureName: string;
}

/**
 * msdyn_GetODOSFeatureProvisioningStatus action
 *
 * Unbound action
 */
export class msdyn_GetODOSFeatureProvisioningStatusAction implements Executable<msdyn_GetODOSFeatureProvisioningStatusResponse> {
  constructor(public readonly parameters: msdyn_GetODOSFeatureProvisioningStatusActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetODOSFeatureProvisioningStatus`;

    const body = requestBody({
      FeatureName: this.parameters.FeatureName,
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

  async parseResponse(response: Response): Promise<msdyn_GetODOSFeatureProvisioningStatusResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_GetODOSFeatureProvisioningStatusResponse;
    return (await response.json()) as msdyn_GetODOSFeatureProvisioningStatusResponse;
  }
}
