import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_TelephonyACSResourceUsageDetailsActionResponse as msdyn_TelephonyACSResourceUsageDetailsActionResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_TelephonyACSResourceUsageDetailsAction message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_TelephonyACSResourceUsageDetailsActionRequestParameters {
  ActionRequest: string;
}

/**
 * msdyn_TelephonyACSResourceUsageDetailsAction request message
 *
 * Web API Action: msdyn_TelephonyACSResourceUsageDetailsAction
 */
export class msdyn_TelephonyACSResourceUsageDetailsActionRequest
  extends OrganizationRequest
  implements Executable<msdyn_TelephonyACSResourceUsageDetailsActionResponse>
{
  declare readonly Parameters: Readonly<msdyn_TelephonyACSResourceUsageDetailsActionRequestParameters>;

  constructor(parameters: msdyn_TelephonyACSResourceUsageDetailsActionRequestParameters) {
    super("msdyn_TelephonyACSResourceUsageDetailsAction", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_TelephonyACSResourceUsageDetailsAction`;

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
  ): Promise<msdyn_TelephonyACSResourceUsageDetailsActionResponse> {
    // 204 No Content is an empty result
    if (response.status === 204)
      return msdyn_TelephonyACSResourceUsageDetailsActionResponse.fromResponse({});
    return msdyn_TelephonyACSResourceUsageDetailsActionResponse.fromResponse(await response.json());
  }
}

/**
 * msdyn_TelephonyACSResourceUsageDetailsAction response message
 */
export class msdyn_TelephonyACSResourceUsageDetailsActionResponse extends OrganizationResponse {
  constructor(public result: msdyn_TelephonyACSResourceUsageDetailsActionResponseData) {
    super("msdyn_TelephonyACSResourceUsageDetailsAction");
  }

  static fromResponse(data: unknown): msdyn_TelephonyACSResourceUsageDetailsActionResponse {
    return new msdyn_TelephonyACSResourceUsageDetailsActionResponse(
      responseObject<msdyn_TelephonyACSResourceUsageDetailsActionResponseData>(data)
    );
  }
}
