import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_CleanUpActivityMappings action
 */
export interface msdyn_CleanUpActivityMappingsResponse {
  // No content returned
}

/**
 * Parameters of the msdyn_CleanUpActivityMappings action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_CleanUpActivityMappingsActionParameters {
  InputData?: string;
}

/**
 * msdyn_CleanUpActivityMappings action
 *
 * Unbound action
 */
export class msdyn_CleanUpActivityMappingsAction implements Executable<msdyn_CleanUpActivityMappingsResponse> {
  constructor(public readonly parameters: msdyn_CleanUpActivityMappingsActionParameters = {}) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CleanUpActivityMappings`;

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

  async parseResponse(response: Response): Promise<msdyn_CleanUpActivityMappingsResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_CleanUpActivityMappingsResponse;
    return (await response.json()) as msdyn_CleanUpActivityMappingsResponse;
  }
}
