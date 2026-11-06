import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_TelephonyACSResourceUsageDetailsAction action
 */
export interface msdyn_TelephonyACSResourceUsageDetailsActionResponse {
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
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_TelephonyACSResourceUsageDetailsActionResponse;
    return (await response.json()) as msdyn_TelephonyACSResourceUsageDetailsActionResponse;
  }
}
