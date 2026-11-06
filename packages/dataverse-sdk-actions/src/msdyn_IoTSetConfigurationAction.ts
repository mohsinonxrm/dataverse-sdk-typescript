import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_IoTSetConfiguration action
 */
export interface msdyn_IoTSetConfigurationResponse {
  // No content returned
}

/**
 * Parameters of the msdyn_IoTSetConfiguration action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_IoTSetConfigurationActionParameters {
  Key: string;
  Value: string;
}

/**
 * msdyn_IoTSetConfiguration action
 *
 * Unbound action
 */
export class msdyn_IoTSetConfigurationAction implements Executable<msdyn_IoTSetConfigurationResponse> {
  constructor(public readonly parameters: msdyn_IoTSetConfigurationActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_IoTSetConfiguration`;

    const body = requestBody({
      Key: this.parameters.Key,
      Value: this.parameters.Value,
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

  async parseResponse(response: Response): Promise<msdyn_IoTSetConfigurationResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_IoTSetConfigurationResponse;
    return (await response.json()) as msdyn_IoTSetConfigurationResponse;
  }
}
