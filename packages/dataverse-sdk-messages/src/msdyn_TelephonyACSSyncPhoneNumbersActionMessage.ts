import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_TelephonyACSSyncPhoneNumbersActionResponse as msdyn_TelephonyACSSyncPhoneNumbersActionResponseData } from "./types/index.js";

/**
 * msdyn_TelephonyACSSyncPhoneNumbersAction request message
 *
 * Web API Action: msdyn_TelephonyACSSyncPhoneNumbersAction
 */
export class msdyn_TelephonyACSSyncPhoneNumbersActionRequest
  extends OrganizationRequest
  implements Executable<msdyn_TelephonyACSSyncPhoneNumbersActionResponse>
{
  constructor(public actionRequest: string) {
    super("msdyn_TelephonyACSSyncPhoneNumbersAction");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_TelephonyACSSyncPhoneNumbersAction`;

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
  ): Promise<msdyn_TelephonyACSSyncPhoneNumbersActionResponse> {
    const data = await response.json();
    return msdyn_TelephonyACSSyncPhoneNumbersActionResponse.fromResponse(data);
  }
}

/**
 * msdyn_TelephonyACSSyncPhoneNumbersAction response message
 */
export class msdyn_TelephonyACSSyncPhoneNumbersActionResponse extends OrganizationResponse {
  constructor(public result: msdyn_TelephonyACSSyncPhoneNumbersActionResponseData) {
    super("msdyn_TelephonyACSSyncPhoneNumbersAction");
  }

  static fromResponse(data: unknown): msdyn_TelephonyACSSyncPhoneNumbersActionResponse {
    return new msdyn_TelephonyACSSyncPhoneNumbersActionResponse(
      responseObject<msdyn_TelephonyACSSyncPhoneNumbersActionResponseData>(data)
    );
  }
}
