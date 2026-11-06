import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_IoTHubRegisterDevice action.
 *
 * Nothing: the Web API answers 204 No Content.
 */
export type msdyn_IoTHubRegisterDeviceResponse = void;

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

  parseResponse(_response: Response): Promise<msdyn_IoTHubRegisterDeviceResponse> {
    // No return value: the Web API answers 204 No Content
    return Promise.resolve();
  }
}
