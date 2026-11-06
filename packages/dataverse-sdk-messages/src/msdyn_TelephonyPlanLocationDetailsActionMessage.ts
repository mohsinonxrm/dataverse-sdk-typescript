import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_TelephonyPlanLocationDetailsActionResponse as msdyn_TelephonyPlanLocationDetailsActionResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_TelephonyPlanLocationDetailsAction message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_TelephonyPlanLocationDetailsActionRequestParameters {
  ActionRequest: string;
}

/**
 * msdyn_TelephonyPlanLocationDetailsAction request message
 *
 * Web API Action: msdyn_TelephonyPlanLocationDetailsAction
 */
export class msdyn_TelephonyPlanLocationDetailsActionRequest
  extends OrganizationRequest
  implements Executable<msdyn_TelephonyPlanLocationDetailsActionResponse>
{
  declare readonly Parameters: Readonly<msdyn_TelephonyPlanLocationDetailsActionRequestParameters>;

  constructor(parameters: msdyn_TelephonyPlanLocationDetailsActionRequestParameters) {
    super("msdyn_TelephonyPlanLocationDetailsAction", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_TelephonyPlanLocationDetailsAction`;

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
  ): Promise<msdyn_TelephonyPlanLocationDetailsActionResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return msdyn_TelephonyPlanLocationDetailsActionResponse.fromResponse(
      text ? JSON.parse(text) : {}
    );
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
