import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_TelephonyPhoneNumberAreaCodeAction request message
 *
 * Web API Action: msdyn_TelephonyPhoneNumberAreaCodeAction
 */
export class msdyn_TelephonyPhoneNumberAreaCodeActionRequest
  extends OrganizationRequest
  implements Executable<msdyn_TelephonyPhoneNumberAreaCodeActionResponse>
{
  constructor(public actionRequest: string) {
    super("msdyn_TelephonyPhoneNumberAreaCodeAction");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_TelephonyPhoneNumberAreaCodeAction`;

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
  ): Promise<msdyn_TelephonyPhoneNumberAreaCodeActionResponse> {
    const data = await response.json();
    return msdyn_TelephonyPhoneNumberAreaCodeActionResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      ActionRequest: this.actionRequest,
    };
  }
}

/**
 * msdyn_TelephonyPhoneNumberAreaCodeAction response message
 */
export class msdyn_TelephonyPhoneNumberAreaCodeActionResponse extends OrganizationResponse {
  constructor(public result: msdyn_TelephonyPhoneNumberAreaCodeActionResponse) {
    super("msdyn_TelephonyPhoneNumberAreaCodeAction");
  }

  static fromResponse(data: unknown): msdyn_TelephonyPhoneNumberAreaCodeActionResponse {
    return new msdyn_TelephonyPhoneNumberAreaCodeActionResponse((data as any).value);
  }
}
