import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_IoTPullDeviceDataActionHandler action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_IoTPullDeviceDataActionHandlerResponse {
  "@odata.context"?: string;
  PullDeviceDataResultsJSON: string;
}

/**
 * Parameters of the msdyn_IoTPullDeviceDataActionHandler action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_IoTPullDeviceDataActionHandlerActionParameters {
  EntityCollection?: Record<string, unknown>[];
}

/**
 * msdyn_IoTPullDeviceDataActionHandler action
 *
 * Unbound action
 */
export class msdyn_IoTPullDeviceDataActionHandlerAction implements Executable<msdyn_IoTPullDeviceDataActionHandlerResponse> {
  constructor(
    public readonly parameters: msdyn_IoTPullDeviceDataActionHandlerActionParameters = {}
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_IoTPullDeviceDataActionHandler`;

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

  async parseResponse(response: Response): Promise<msdyn_IoTPullDeviceDataActionHandlerResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_IoTPullDeviceDataActionHandlerResponse;
  }
}
