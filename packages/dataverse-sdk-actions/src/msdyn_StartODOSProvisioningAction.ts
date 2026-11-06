import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_StartODOSProvisioning action
 */
export interface msdyn_StartODOSProvisioningResponse {
  // No content returned
}

/**
 * Parameters of the msdyn_StartODOSProvisioning action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_StartODOSProvisioningActionParameters {
  Entities: string;
  FeatureName: string;
  FeatureDisplayName: string;
  Roles: string;
  Primitives: string;
}

/**
 * msdyn_StartODOSProvisioning action
 *
 * Unbound action
 */
export class msdyn_StartODOSProvisioningAction implements Executable<msdyn_StartODOSProvisioningResponse> {
  constructor(public readonly parameters: msdyn_StartODOSProvisioningActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_StartODOSProvisioning`;

    const body = requestBody({
      Entities: this.parameters.Entities,
      FeatureName: this.parameters.FeatureName,
      FeatureDisplayName: this.parameters.FeatureDisplayName,
      Roles: this.parameters.Roles,
      Primitives: this.parameters.Primitives,
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

  async parseResponse(response: Response): Promise<msdyn_StartODOSProvisioningResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_StartODOSProvisioningResponse;
    return (await response.json()) as msdyn_StartODOSProvisioningResponse;
  }
}
