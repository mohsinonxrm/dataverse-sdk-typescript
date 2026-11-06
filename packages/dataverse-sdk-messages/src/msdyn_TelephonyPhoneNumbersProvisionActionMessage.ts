import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_TelephonyPhoneNumbersProvisionActionResponse as msdyn_TelephonyPhoneNumbersProvisionActionResponseData } from "./types/index.js";

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
}

/**
 * msdyn_TelephonyPhoneNumbersProvisionAction response message
 */
export class msdyn_TelephonyPhoneNumbersProvisionActionResponse extends OrganizationResponse {
  constructor(public result: msdyn_TelephonyPhoneNumbersProvisionActionResponseData) {
    super("msdyn_TelephonyPhoneNumbersProvisionAction");
  }

  static fromResponse(data: unknown): msdyn_TelephonyPhoneNumbersProvisionActionResponse {
    return new msdyn_TelephonyPhoneNumbersProvisionActionResponse(
      responseObject<msdyn_TelephonyPhoneNumbersProvisionActionResponseData>(data)
    );
  }
}
