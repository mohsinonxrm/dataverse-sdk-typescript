import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_TelephonyPhoneNumberPlanUpgradeActionResponse as msdyn_TelephonyPhoneNumberPlanUpgradeActionResponseData } from "./types/index.js";

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
    // 204 No Content is an empty result
    if (response.status === 204)
      return msdyn_TelephonyPhoneNumberPlanUpgradeActionResponse.fromResponse({});
    return msdyn_TelephonyPhoneNumberPlanUpgradeActionResponse.fromResponse(await response.json());
  }
}

/**
 * msdyn_TelephonyPhoneNumberPlanUpgradeAction response message
 */
export class msdyn_TelephonyPhoneNumberPlanUpgradeActionResponse extends OrganizationResponse {
  constructor(public result: msdyn_TelephonyPhoneNumberPlanUpgradeActionResponseData) {
    super("msdyn_TelephonyPhoneNumberPlanUpgradeAction");
  }

  static fromResponse(data: unknown): msdyn_TelephonyPhoneNumberPlanUpgradeActionResponse {
    return new msdyn_TelephonyPhoneNumberPlanUpgradeActionResponse(
      responseObject<msdyn_TelephonyPhoneNumberPlanUpgradeActionResponseData>(data)
    );
  }
}
