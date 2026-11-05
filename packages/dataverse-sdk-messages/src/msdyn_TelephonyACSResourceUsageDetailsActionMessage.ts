import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

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

  toRequestBody(): Record<string, unknown> {
    return {
      ActionRequest: this.actionRequest,
    };
  }
}

/**
 * msdyn_TelephonyACSResourceUsageDetailsAction response message
 */
export class msdyn_TelephonyACSResourceUsageDetailsActionResponse extends OrganizationResponse {
  constructor(public result: msdyn_TelephonyACSResourceUsageDetailsActionResponse) {
    super("msdyn_TelephonyACSResourceUsageDetailsAction");
  }

  static fromResponse(data: unknown): msdyn_TelephonyACSResourceUsageDetailsActionResponse {
    return new msdyn_TelephonyACSResourceUsageDetailsActionResponse((data as any).value);
  }
}
