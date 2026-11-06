import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_TelephonyPlanLocationDetailsAction action
 */
export interface msdyn_TelephonyPlanLocationDetailsActionResponse {
  ActionResult: string;
}

/**
 * Parameters of the msdyn_TelephonyPlanLocationDetailsAction action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_TelephonyPlanLocationDetailsActionActionParameters {
  ActionRequest: string;
}

/**
 * msdyn_TelephonyPlanLocationDetailsAction action
 *
 * Unbound action
 */
export class msdyn_TelephonyPlanLocationDetailsActionAction implements Executable<msdyn_TelephonyPlanLocationDetailsActionResponse> {
  constructor(
    public readonly parameters: msdyn_TelephonyPlanLocationDetailsActionActionParameters
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_TelephonyPlanLocationDetailsAction`;

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
  ): Promise<msdyn_TelephonyPlanLocationDetailsActionResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_TelephonyPlanLocationDetailsActionResponse;
    return (await response.json()) as msdyn_TelephonyPlanLocationDetailsActionResponse;
  }
}
