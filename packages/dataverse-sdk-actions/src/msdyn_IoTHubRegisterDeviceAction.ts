import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_IoTHubRegisterDevice action
 */
export interface msdyn_IoTHubRegisterDeviceResponse {
  // No content returned
}

/**
 * Parameters of the msdyn_IoTHubRegisterDevice action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_IoTHubRegisterDeviceActionParameters {
  EntityCollection?: Record<string, unknown>[];
}

/**
 * msdyn_IoTHubRegisterDevice action
 *
 * Unbound action
 */
export class msdyn_IoTHubRegisterDeviceAction implements Executable<msdyn_IoTHubRegisterDeviceResponse> {
  constructor(public readonly parameters: msdyn_IoTHubRegisterDeviceActionParameters = {}) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_IoTHubRegisterDevice`;

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

  async parseResponse(response: Response): Promise<msdyn_IoTHubRegisterDeviceResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as msdyn_IoTHubRegisterDeviceResponse;
  }
}
