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
  Primitives: string;
  Roles: string;
  FeatureName: string;
  Entities: string;
  FeatureDisplayName: string;
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
      Primitives: this.parameters.Primitives,
      Roles: this.parameters.Roles,
      FeatureName: this.parameters.FeatureName,
      Entities: this.parameters.Entities,
      FeatureDisplayName: this.parameters.FeatureDisplayName,
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
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_ProvisionODOSResponse;
    return (await response.json()) as msdyn_ProvisionODOSResponse;
  }
}
