import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_TelephonyPhoneNumbersDeprovisionAction request message
 *
 * Web API Action: msdyn_TelephonyPhoneNumbersDeprovisionAction
 */
export class msdyn_TelephonyPhoneNumbersDeprovisionActionRequest
  extends OrganizationRequest
  implements Executable<msdyn_TelephonyPhoneNumbersDeprovisionActionResponse>
{
  constructor(public actionRequest: string) {
    super("msdyn_TelephonyPhoneNumbersDeprovisionAction");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_TelephonyPhoneNumbersDeprovisionAction`;

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
  ): Promise<msdyn_TelephonyPhoneNumbersDeprovisionActionResponse> {
    const data = await response.json();
    return msdyn_TelephonyPhoneNumbersDeprovisionActionResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      ActionRequest: this.actionRequest,
    };
  }
}

/**
 * msdyn_TelephonyPhoneNumbersDeprovisionAction response message
 */
export class msdyn_TelephonyPhoneNumbersDeprovisionActionResponse extends OrganizationResponse {
  constructor(public result: msdyn_TelephonyPhoneNumbersDeprovisionActionResponse) {
    super("msdyn_TelephonyPhoneNumbersDeprovisionAction");
  }

  static fromResponse(data: unknown): msdyn_TelephonyPhoneNumbersDeprovisionActionResponse {
    return new msdyn_TelephonyPhoneNumbersDeprovisionActionResponse((data as any).value);
  }
}
