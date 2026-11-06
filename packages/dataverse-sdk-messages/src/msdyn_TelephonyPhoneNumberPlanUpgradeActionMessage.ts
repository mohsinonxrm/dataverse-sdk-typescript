import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_TelephonyPhoneNumberPlanUpgradeAction message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_TelephonyPhoneNumberPlanUpgradeActionRequestParameters {
  ActionRequest: string;
}

/**
 * msdyn_TelephonyPhoneNumberPlanUpgradeAction request message
 *
 * Web API Action: msdyn_TelephonyPhoneNumberPlanUpgradeAction
 *
 * The first argument is the id of the msdyn_ocphonenumber record to call it on.
 */
export class msdyn_TelephonyPhoneNumberPlanUpgradeActionRequest
  extends OrganizationRequest
  implements Executable<msdyn_TelephonyPhoneNumberPlanUpgradeActionResponse>
{
  declare readonly Parameters: Readonly<msdyn_TelephonyPhoneNumberPlanUpgradeActionRequestParameters>;

  constructor(
    public msdyn_ocphonenumberId: string,
    parameters: msdyn_TelephonyPhoneNumberPlanUpgradeActionRequestParameters
  ) {
    super("msdyn_TelephonyPhoneNumberPlanUpgradeAction", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/msdyn_ocphonenumbers(${this.msdyn_ocphonenumberId})/Microsoft.Dynamics.CRM.msdyn_TelephonyPhoneNumberPlanUpgradeAction`;

    const body = requestBody({
      ActionRequest: this.Parameters.ActionRequest,
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
    // The body is the complex value, with its @odata.context
    return msdyn_TelephonyPhoneNumberPlanUpgradeActionResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_TelephonyPhoneNumberPlanUpgradeAction action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_TelephonyPhoneNumberPlanUpgradeActionResult {
  "@odata.context"?: string;
  ActionResult: string;
}

/**
 * msdyn_TelephonyPhoneNumberPlanUpgradeAction response message
 *
 * `result` is the value the msdyn_TelephonyPhoneNumberPlanUpgradeAction action returns (see {@link msdyn_TelephonyPhoneNumberPlanUpgradeActionResult}).
 */
export class msdyn_TelephonyPhoneNumberPlanUpgradeActionResponse extends OrganizationResponse {
  constructor(public result: msdyn_TelephonyPhoneNumberPlanUpgradeActionResult) {
    super("msdyn_TelephonyPhoneNumberPlanUpgradeAction");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_TelephonyPhoneNumberPlanUpgradeActionResponse {
    return new msdyn_TelephonyPhoneNumberPlanUpgradeActionResponse(
      data as msdyn_TelephonyPhoneNumberPlanUpgradeActionResult
    );
  }
}
