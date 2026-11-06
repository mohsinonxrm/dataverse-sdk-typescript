import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_IoTSetConfiguration action.
 *
 * Nothing: the Web API answers 204 No Content.
 */
export type msdyn_IoTSetConfigurationResponse = void;

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

  parseResponse(_response: Response): Promise<msdyn_IoTSetConfigurationResponse> {
    // No return value: the Web API answers 204 No Content
    return Promise.resolve();
  }
}
