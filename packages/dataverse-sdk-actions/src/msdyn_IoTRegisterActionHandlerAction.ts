import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_IoTRegisterActionHandler action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_IoTRegisterActionHandlerResponse {
  "@odata.context"?: string;
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
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_IoTRegisterActionHandlerResponse;
  }
}
