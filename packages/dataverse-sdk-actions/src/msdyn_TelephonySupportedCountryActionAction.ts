import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_TelephonySupportedCountryAction action
 */
export interface msdyn_TelephonySupportedCountryActionResponse {
  ActionResult: string;
}

/**
 * Parameters of the msdyn_TelephonySupportedCountryAction action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_TelephonySupportedCountryActionActionParameters {
  ActionRequest: string;
}

/**
 * msdyn_TelephonySupportedCountryAction action
 *
 * Unbound action
 */
export class msdyn_TelephonySupportedCountryActionAction implements Executable<msdyn_TelephonySupportedCountryActionResponse> {
  constructor(public readonly parameters: msdyn_TelephonySupportedCountryActionActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_TelephonySupportedCountryAction`;

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

  async parseResponse(response: Response): Promise<msdyn_TelephonySupportedCountryActionResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_TelephonySupportedCountryActionResponse;
    return (await response.json()) as msdyn_TelephonySupportedCountryActionResponse;
  }
}
