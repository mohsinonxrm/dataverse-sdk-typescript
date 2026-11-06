import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_TelephonyPhoneNumbersProvisionActionResponse as msdyn_TelephonyPhoneNumbersProvisionActionResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_TelephonyPhoneNumbersProvisionAction message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_TelephonyPhoneNumbersProvisionActionRequestParameters {
  ActionRequest: string;
}

/**
 * msdyn_TelephonyPhoneNumbersProvisionAction request message
 *
 * Web API Action: msdyn_TelephonyPhoneNumbersProvisionAction
 */
export class msdyn_TelephonyPhoneNumbersProvisionActionRequest
  extends OrganizationRequest
  implements Executable<msdyn_TelephonyPhoneNumbersProvisionActionResponse>
{
  declare readonly Parameters: Readonly<msdyn_TelephonyPhoneNumbersProvisionActionRequestParameters>;

  constructor(parameters: msdyn_TelephonyPhoneNumbersProvisionActionRequestParameters) {
    super("msdyn_TelephonyPhoneNumbersProvisionAction", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_TelephonyPhoneNumbersProvisionAction`;

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
  ): Promise<msdyn_TelephonyPhoneNumbersProvisionActionResponse> {
    // 204 No Content is an empty result
    if (response.status === 204)
      return msdyn_TelephonyPhoneNumbersProvisionActionResponse.fromResponse({});
    return msdyn_TelephonyPhoneNumbersProvisionActionResponse.fromResponse(await response.json());
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
