import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_Updatefeatureconfig action
 */
export interface msdyn_UpdatefeatureconfigResponse {
  // No content returned
}

/**
 * Parameters of the msdyn_Updatefeatureconfig action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_UpdatefeatureconfigActionParameters {
  featureType?: number;
  configuration?: string;
}

/**
 * msdyn_Updatefeatureconfig action
 *
 * Unbound action
 */
export class msdyn_UpdatefeatureconfigAction implements Executable<msdyn_UpdatefeatureconfigResponse> {
  constructor(public readonly parameters: msdyn_UpdatefeatureconfigActionParameters = {}) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_Updatefeatureconfig`;

    const body = requestBody({
      featureType: this.parameters.featureType,
      configuration: this.parameters.configuration,
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

  async parseResponse(response: Response): Promise<msdyn_UpdatefeatureconfigResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_UpdatefeatureconfigResponse;
    return (await response.json()) as msdyn_UpdatefeatureconfigResponse;
  }
}
