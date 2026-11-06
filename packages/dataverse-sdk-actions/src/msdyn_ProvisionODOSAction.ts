import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_ProvisionODOS action
 */
export interface msdyn_ProvisionODOSResponse {
  // No content returned
}

/**
 * Parameters of the msdyn_ProvisionODOS action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_ProvisionODOSActionParameters {
  Entities: string;
  FeatureName: string;
  FeatureDisplayName: string;
  Roles: string;
  Primitives: string;
}

/**
 * msdyn_ProvisionODOS action
 *
 * Unbound action
 */
export class msdyn_ProvisionODOSAction implements Executable<msdyn_ProvisionODOSResponse> {
  constructor(public readonly parameters: msdyn_ProvisionODOSActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_ProvisionODOS`;

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

  async parseResponse(response: Response): Promise<msdyn_ProvisionODOSResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as msdyn_ProvisionODOSResponse;
  }
}
