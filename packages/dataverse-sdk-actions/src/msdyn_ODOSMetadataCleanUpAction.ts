import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_ODOSMetadataCleanUp action
 */
export interface msdyn_ODOSMetadataCleanUpResponse {
  // No content returned
}

/**
 * Parameters of the msdyn_ODOSMetadataCleanUp action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_ODOSMetadataCleanUpActionParameters {
  InputData: string;
}

/**
 * msdyn_ODOSMetadataCleanUp action
 *
 * Unbound action
 */
export class msdyn_ODOSMetadataCleanUpAction implements Executable<msdyn_ODOSMetadataCleanUpResponse> {
  constructor(public readonly parameters: msdyn_ODOSMetadataCleanUpActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_ODOSMetadataCleanUp`;

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

  async parseResponse(response: Response): Promise<msdyn_ODOSMetadataCleanUpResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as msdyn_ODOSMetadataCleanUpResponse;
  }
}
