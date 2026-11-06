import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_StartODOSDeprovisioning action
 */
export interface msdyn_StartODOSDeprovisioningResponse {
  // No content returned
}

/**
 * Parameters of the msdyn_StartODOSDeprovisioning action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_StartODOSDeprovisioningActionParameters {
  FeatureName: string;
  IsDeprecationDeprovisioning?: boolean;
}

/**
 * msdyn_StartODOSDeprovisioning action
 *
 * Unbound action
 */
export class msdyn_StartODOSDeprovisioningAction implements Executable<msdyn_StartODOSDeprovisioningResponse> {
  constructor(public readonly parameters: msdyn_StartODOSDeprovisioningActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_StartODOSDeprovisioning`;

    const body = requestBody({
      FeatureName: this.parameters.FeatureName,
      IsDeprecationDeprovisioning: this.parameters.IsDeprecationDeprovisioning,
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

  async parseResponse(response: Response): Promise<msdyn_StartODOSDeprovisioningResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as msdyn_StartODOSDeprovisioningResponse;
  }
}
