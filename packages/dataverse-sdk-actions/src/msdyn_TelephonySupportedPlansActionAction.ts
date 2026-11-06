import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_TelephonySupportedPlansAction action
 */
export interface msdyn_TelephonySupportedPlansActionResponse {
  ActionResult: string;
}

/**
 * Parameters of the msdyn_TelephonySupportedPlansAction action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_TelephonySupportedPlansActionActionParameters {
  ActionRequest: string;
}

/**
 * msdyn_TelephonySupportedPlansAction action
 *
 * Unbound action
 */
export class msdyn_TelephonySupportedPlansActionAction implements Executable<msdyn_TelephonySupportedPlansActionResponse> {
  constructor(public readonly parameters: msdyn_TelephonySupportedPlansActionActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_TelephonySupportedPlansAction`;

    const body = requestBody({
      ActionRequest: this.parameters.ActionRequest,
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

  async parseResponse(response: Response): Promise<msdyn_TelephonySupportedPlansActionResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as msdyn_TelephonySupportedPlansActionResponse;
  }
}
