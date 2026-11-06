import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_RegisterIoTDevice action.
 *
 * Nothing: the Web API answers 204 No Content.
 */
export type msdyn_RegisterIoTDeviceResponse = void;

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

  parseResponse(_response: Response): Promise<msdyn_RegisterIoTDeviceResponse> {
    // No return value: the Web API answers 204 No Content
    return Promise.resolve();
  }
}
