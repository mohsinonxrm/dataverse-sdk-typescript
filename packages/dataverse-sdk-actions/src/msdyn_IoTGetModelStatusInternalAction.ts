import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_IoTGetModelStatusInternal action
 */
export interface msdyn_IoTGetModelStatusInternalResponse {
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
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as msdyn_IoTGetModelStatusInternalResponse;
  }
}
