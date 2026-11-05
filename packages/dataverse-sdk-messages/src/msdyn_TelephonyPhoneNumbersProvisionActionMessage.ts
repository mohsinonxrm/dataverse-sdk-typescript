import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_TelephonyPhoneNumbersProvisionAction request message
 *
 * Web API Action: msdyn_TelephonyPhoneNumbersProvisionAction
 */
export class msdyn_TelephonyPhoneNumbersProvisionActionRequest
  extends OrganizationRequest
  implements Executable<msdyn_TelephonyPhoneNumbersProvisionActionResponse>
{
  constructor(public actionRequest: string) {
    super("msdyn_TelephonyPhoneNumbersProvisionAction");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_TelephonyPhoneNumbersProvisionAction`;

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
  ): Promise<msdyn_TelephonyPhoneNumbersProvisionActionResponse> {
    const data = await response.json();
    return msdyn_TelephonyPhoneNumbersProvisionActionResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      ActionRequest: this.actionRequest,
    };
  }
}

/**
 * msdyn_TelephonyPhoneNumbersProvisionAction response message
 */
export class msdyn_TelephonyPhoneNumbersProvisionActionResponse extends OrganizationResponse {
  constructor(public result: msdyn_TelephonyPhoneNumbersProvisionActionResponse) {
    super("msdyn_TelephonyPhoneNumbersProvisionAction");
  }

  static fromResponse(data: unknown): msdyn_TelephonyPhoneNumbersProvisionActionResponse {
    return new msdyn_TelephonyPhoneNumbersProvisionActionResponse((data as any).value);
  }
}
