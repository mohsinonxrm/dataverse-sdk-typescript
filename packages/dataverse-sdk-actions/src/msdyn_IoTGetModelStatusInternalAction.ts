import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_IoTGetModelStatusInternal action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_IoTGetModelStatusInternalResponse {
  "@odata.context"?: string;
  MLModelStatusJSON: string;
}

/**
 * Parameters of the msdyn_IoTGetModelStatusInternal action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_IoTGetModelStatusInternalActionParameters {
  ScenarioId: string;
}

/**
 * msdyn_IoTGetModelStatusInternal action
 *
 * Unbound action
 */
export class msdyn_IoTGetModelStatusInternalAction implements Executable<msdyn_IoTGetModelStatusInternalResponse> {
  constructor(public readonly parameters: msdyn_IoTGetModelStatusInternalActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_IoTGetModelStatusInternal`;

    const body = requestBody({
      ScenarioId: this.parameters.ScenarioId,
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

  async parseResponse(response: Response): Promise<msdyn_IoTGetModelStatusInternalResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_IoTGetModelStatusInternalResponse;
  }
}
