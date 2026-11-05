import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_TelephonyPlanLocationDetailsActionResponse as msdyn_TelephonyPlanLocationDetailsActionResponseData } from "./types/index.js";

/**
 * msdyn_TelephonyPlanLocationDetailsAction request message
 *
 * Web API Action: msdyn_TelephonyPlanLocationDetailsAction
 */
export class msdyn_TelephonyPlanLocationDetailsActionRequest
  extends OrganizationRequest
  implements Executable<msdyn_TelephonyPlanLocationDetailsActionResponse>
{
  constructor(public actionRequest: string) {
    super("msdyn_TelephonyPlanLocationDetailsAction");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_TelephonyPlanLocationDetailsAction`;

    const body: Record<string, unknown> = {
      ActionRequest: this.actionRequest,
    };

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
    const data = await response.json();
    return msdyn_TelephonyPlanLocationDetailsActionResponse.fromResponse(data);
  }
}

/**
 * msdyn_TelephonyPlanLocationDetailsAction response message
 */
export class msdyn_TelephonyPlanLocationDetailsActionResponse extends OrganizationResponse {
  constructor(public result: msdyn_TelephonyPlanLocationDetailsActionResponseData) {
    super("msdyn_TelephonyPlanLocationDetailsAction");
  }

  static fromResponse(data: unknown): msdyn_TelephonyPlanLocationDetailsActionResponse {
    return new msdyn_TelephonyPlanLocationDetailsActionResponse(
      responseObject<msdyn_TelephonyPlanLocationDetailsActionResponseData>(data)
    );
  }
}
