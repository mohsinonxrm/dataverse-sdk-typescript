import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_TelephonyConginitiveServiceDetailsAction action
 */
export interface msdyn_TelephonyConginitiveServiceDetailsActionResponse {
  ActionResult: string;
}

/**
 * Parameters of the msdyn_TelephonyConginitiveServiceDetailsAction action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_TelephonyConginitiveServiceDetailsActionActionParameters {
  ActionRequest: string;
}

/**
 * msdyn_TelephonyConginitiveServiceDetailsAction action
 *
 * Unbound action
 */
export class msdyn_TelephonyConginitiveServiceDetailsActionAction implements Executable<msdyn_TelephonyConginitiveServiceDetailsActionResponse> {
  constructor(
    public readonly parameters: msdyn_TelephonyConginitiveServiceDetailsActionActionParameters
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_TelephonyConginitiveServiceDetailsAction`;

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

  async parseResponse(
    response: Response
  ): Promise<msdyn_TelephonyConginitiveServiceDetailsActionResponse> {
    // 204 No Content is an empty result
    if (response.status === 204)
      return {} as msdyn_TelephonyConginitiveServiceDetailsActionResponse;
    return (await response.json()) as msdyn_TelephonyConginitiveServiceDetailsActionResponse;
  }
}
