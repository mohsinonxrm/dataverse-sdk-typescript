import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_SalesInsightsTpsPackage action
 */
export interface msdyn_SalesInsightsTpsPackageResponse {
  // No content returned
}

/**
 * Parameters of the msdyn_SalesInsightsTpsPackage action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_SalesInsightsTpsPackageActionParameters {
  skipInstall: string;
}

/**
 * msdyn_SalesInsightsTpsPackage action
 *
 * Unbound action
 */
export class msdyn_SalesInsightsTpsPackageAction implements Executable<msdyn_SalesInsightsTpsPackageResponse> {
  constructor(public readonly parameters: msdyn_SalesInsightsTpsPackageActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SalesInsightsTpsPackage`;

    const body = requestBody({
      skipInstall: this.parameters.skipInstall,
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

  async parseResponse(response: Response): Promise<msdyn_SalesInsightsTpsPackageResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as msdyn_SalesInsightsTpsPackageResponse;
  }
}
