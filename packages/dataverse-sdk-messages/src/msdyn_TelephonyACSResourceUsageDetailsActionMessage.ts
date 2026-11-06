import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_TelephonyACSResourceUsageDetailsActionResponse as msdyn_TelephonyACSResourceUsageDetailsActionResponseData } from "./types/index.js";

/**
 * msdyn_TelephonyACSResourceUsageDetailsAction request message
 *
 * Web API Action: msdyn_TelephonyACSResourceUsageDetailsAction
 */
export class msdyn_TelephonyACSResourceUsageDetailsActionRequest
  extends OrganizationRequest
  implements Executable<msdyn_TelephonyACSResourceUsageDetailsActionResponse>
{
  constructor(public actionRequest: string) {
    super("msdyn_TelephonyACSResourceUsageDetailsAction");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_TelephonyACSResourceUsageDetailsAction`;

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
  ): Promise<msdyn_TelephonyACSResourceUsageDetailsActionResponse> {
    const data = await response.json();
    return msdyn_TelephonyACSResourceUsageDetailsActionResponse.fromResponse(data);
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
