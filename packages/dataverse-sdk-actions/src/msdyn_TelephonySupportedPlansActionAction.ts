import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_TelephonySupportedPlansAction action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_TelephonySupportedPlansActionResponse {
  "@odata.context"?: string;
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
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_TelephonySupportedPlansActionResponse;
  }
}
