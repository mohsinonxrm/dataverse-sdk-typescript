import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_GetSIPackageStatus action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_GetSIPackageStatusResponse {
  "@odata.context"?: string;
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
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_GetSIPackageStatusResponse;
  }
}
