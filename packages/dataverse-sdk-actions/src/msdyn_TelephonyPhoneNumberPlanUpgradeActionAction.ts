import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_TelephonyPhoneNumberPlanUpgradeAction action
 */
export interface msdyn_TelephonyPhoneNumberPlanUpgradeActionResponse {
  ActionResult: string;
}

/**
 * msdyn_TelephonyPhoneNumberPlanUpgradeAction action
 *
 * Bound action
 * Binding parameter: entity (mscrm.msdyn_ocphonenumber)
 */
export class msdyn_TelephonyPhoneNumberPlanUpgradeActionAction implements Executable<msdyn_TelephonyPhoneNumberPlanUpgradeActionResponse> {
  constructor(
    public readonly msdyn_ocphonenumberId: string,
    public readonly actionRequest: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/msdyn_ocphonenumbers(${this.msdyn_ocphonenumberId})/Microsoft.Dynamics.CRM.msdyn_TelephonyPhoneNumberPlanUpgradeAction`;

    const body: Record<string, unknown> = {
      ActionRequest: this.actionRequest,
    };

    return {
      method: "POST",
      url,
      headers: {
        "Content-Type": "application/json",
      },
      body,
    };
  }

  async parseResponse(
    response: Response
  ): Promise<msdyn_TelephonyPhoneNumberPlanUpgradeActionResponse> {
    const data = await response.json();
    return data as msdyn_TelephonyPhoneNumberPlanUpgradeActionResponse;
  }
}
