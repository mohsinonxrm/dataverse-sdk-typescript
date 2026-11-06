import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_IoTRegisterActionHandler action
 */
export interface msdyn_IoTRegisterActionHandlerResponse {
  RegistrationResultsJSON: string;
}

/**
 * Parameters of the msdyn_IoTRegisterActionHandler action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_IoTRegisterActionHandlerActionParameters {
  EntityCollection?: Record<string, unknown>[];
}

/**
 * msdyn_IoTRegisterActionHandler action
 *
 * Unbound action
 */
export class msdyn_IoTRegisterActionHandlerAction implements Executable<msdyn_IoTRegisterActionHandlerResponse> {
  constructor(public readonly parameters: msdyn_IoTRegisterActionHandlerActionParameters = {}) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_IoTRegisterActionHandler`;

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

  async parseResponse(response: Response): Promise<msdyn_IoTRegisterActionHandlerResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as msdyn_IoTRegisterActionHandlerResponse;
  }
}
