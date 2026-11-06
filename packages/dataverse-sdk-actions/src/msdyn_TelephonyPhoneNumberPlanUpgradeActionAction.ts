import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_TelephonyPhoneNumberPlanUpgradeAction action
 */
export interface msdyn_TelephonyPhoneNumberPlanUpgradeActionResponse {
  ActionResult: string;
}

/**
 * Parameters of the msdyn_TelephonyPhoneNumberPlanUpgradeAction action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_TelephonyPhoneNumberPlanUpgradeActionActionParameters {
  ActionRequest: string;
}

/**
 * msdyn_TelephonyPhoneNumberPlanUpgradeAction action
 *
 * Bound action
 * Binding parameter: entity (mscrm.msdyn_ocphonenumber)
 *
 * The first argument is the id of the msdyn_ocphonenumber record to call it on.
 */
export class msdyn_TelephonyPhoneNumberPlanUpgradeActionAction implements Executable<msdyn_TelephonyPhoneNumberPlanUpgradeActionResponse> {
  constructor(
    public readonly msdyn_ocphonenumberId: string,
    public readonly parameters: msdyn_TelephonyPhoneNumberPlanUpgradeActionActionParameters
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/msdyn_ocphonenumbers(${this.msdyn_ocphonenumberId})/Microsoft.Dynamics.CRM.msdyn_TelephonyPhoneNumberPlanUpgradeAction`;

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
  ): Promise<msdyn_TelephonyPhoneNumberPlanUpgradeActionResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_TelephonyPhoneNumberPlanUpgradeActionResponse;
    return (await response.json()) as msdyn_TelephonyPhoneNumberPlanUpgradeActionResponse;
  }
}
