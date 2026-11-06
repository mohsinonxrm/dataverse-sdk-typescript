import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_IoTHubPullDeviceData action
 */
export interface msdyn_IoTHubPullDeviceDataResponse {
  // No content returned
}

/**
 * Parameters of the msdyn_IoTHubPullDeviceData action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_IoTHubPullDeviceDataActionParameters {
  EntityCollection?: Record<string, unknown>[];
}

/**
 * msdyn_IoTHubPullDeviceData action
 *
 * Unbound action
 */
export class msdyn_IoTHubPullDeviceDataAction implements Executable<msdyn_IoTHubPullDeviceDataResponse> {
  constructor(public readonly parameters: msdyn_IoTHubPullDeviceDataActionParameters = {}) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_IoTHubPullDeviceData`;

    const body = requestBody({
      EntityCollection: this.parameters.EntityCollection,
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

  async parseResponse(response: Response): Promise<msdyn_IoTHubPullDeviceDataResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_IoTHubPullDeviceDataResponse;
    return (await response.json()) as msdyn_IoTHubPullDeviceDataResponse;
  }
}
