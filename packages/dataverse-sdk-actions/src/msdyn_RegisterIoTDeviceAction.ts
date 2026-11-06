import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_RegisterIoTDevice action
 */
export interface msdyn_RegisterIoTDeviceResponse {
  // No content returned
}

/**
 * Parameters of the msdyn_RegisterIoTDevice action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_RegisterIoTDeviceActionParameters {
  IoTDeviceIds: string;
}

/**
 * msdyn_RegisterIoTDevice action
 *
 * Unbound action
 */
export class msdyn_RegisterIoTDeviceAction implements Executable<msdyn_RegisterIoTDeviceResponse> {
  constructor(public readonly parameters: msdyn_RegisterIoTDeviceActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_RegisterIoTDevice`;

    const body = requestBody({
      IoTDeviceIds: this.parameters.IoTDeviceIds,
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

  async parseResponse(response: Response): Promise<msdyn_RegisterIoTDeviceResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as msdyn_RegisterIoTDeviceResponse;
  }
}
