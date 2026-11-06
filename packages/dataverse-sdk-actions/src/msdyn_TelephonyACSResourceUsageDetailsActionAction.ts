import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_TelephonyACSResourceUsageDetailsAction action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_TelephonyACSResourceUsageDetailsActionResponse {
  "@odata.context"?: string;
  ActionResult: string;
}

/**
 * Parameters of the msdyn_TelephonyACSResourceUsageDetailsAction action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_TelephonyACSResourceUsageDetailsActionActionParameters {
  ActionRequest: string;
}

/**
 * msdyn_TelephonyACSResourceUsageDetailsAction action
 *
 * Unbound action
 */
export class msdyn_TelephonyACSResourceUsageDetailsActionAction implements Executable<msdyn_TelephonyACSResourceUsageDetailsActionResponse> {
  constructor(
    public readonly parameters: msdyn_TelephonyACSResourceUsageDetailsActionActionParameters
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_TelephonyACSResourceUsageDetailsAction`;

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
  ): Promise<msdyn_TelephonyACSResourceUsageDetailsActionResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_TelephonyACSResourceUsageDetailsActionResponse;
  }
}
