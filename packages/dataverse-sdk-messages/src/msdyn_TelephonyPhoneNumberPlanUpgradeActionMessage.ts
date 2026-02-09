import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_TelephonyPhoneNumberPlanUpgradeAction request message
 *
 * Web API Action: msdyn_TelephonyPhoneNumberPlanUpgradeAction
 */
export class msdyn_TelephonyPhoneNumberPlanUpgradeActionRequest
  extends OrganizationRequest
  implements Executable<msdyn_TelephonyPhoneNumberPlanUpgradeActionResponse>
{
  constructor(
    public msdyn_ocphonenumberId: string,
    public actionRequest: string
  ) {
    super("msdyn_TelephonyPhoneNumberPlanUpgradeAction");
  }

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
    return msdyn_TelephonyPhoneNumberPlanUpgradeActionResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      entity: this.msdyn_ocphonenumberId,
      ActionRequest: this.actionRequest,
    };
  }
}

/**
 * msdyn_TelephonyPhoneNumberPlanUpgradeAction response message
 */
export class msdyn_TelephonyPhoneNumberPlanUpgradeActionResponse extends OrganizationResponse {
  constructor(public result: msdyn_TelephonyPhoneNumberPlanUpgradeActionResponse) {
    super("msdyn_TelephonyPhoneNumberPlanUpgradeAction");
  }

  static fromResponse(data: unknown): msdyn_TelephonyPhoneNumberPlanUpgradeActionResponse {
    return new msdyn_TelephonyPhoneNumberPlanUpgradeActionResponse((data as any).value);
  }
}
