import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_GetSIPackageStatus action
 */
export interface msdyn_GetSIPackageStatusResponse {
  SIPackageStatus: string;
}

/**
 * Parameters of the msdyn_GetSIPackageStatus action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetSIPackageStatusActionParameters {
  ApiVersion?: string;
}

/**
 * msdyn_GetSIPackageStatus action
 *
 * Unbound action
 */
export class msdyn_GetSIPackageStatusAction implements Executable<msdyn_GetSIPackageStatusResponse> {
  constructor(public readonly parameters: msdyn_GetSIPackageStatusActionParameters = {}) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetSIPackageStatus`;

    const body = requestBody({
      ApiVersion: this.parameters.ApiVersion,
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

  async parseResponse(response: Response): Promise<msdyn_GetSIPackageStatusResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as msdyn_GetSIPackageStatusResponse;
  }
}
