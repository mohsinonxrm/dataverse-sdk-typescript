import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_DeprecateODOS action
 */
export interface msdyn_DeprecateODOSResponse {
  // No content returned
}

/**
 * Parameters of the msdyn_DeprecateODOS action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_DeprecateODOSActionParameters {
  InputData: string;
}

/**
 * msdyn_DeprecateODOS action
 *
 * Unbound action
 */
export class msdyn_DeprecateODOSAction implements Executable<msdyn_DeprecateODOSResponse> {
  constructor(public readonly parameters: msdyn_DeprecateODOSActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_DeprecateODOS`;

    const body = requestBody({
      InputData: this.parameters.InputData,
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

  async parseResponse(response: Response): Promise<msdyn_DeprecateODOSResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as msdyn_DeprecateODOSResponse;
  }
}
