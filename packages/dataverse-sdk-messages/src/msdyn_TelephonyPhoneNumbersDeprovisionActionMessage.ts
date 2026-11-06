import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_TelephonyPhoneNumbersDeprovisionActionResponse as msdyn_TelephonyPhoneNumbersDeprovisionActionResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_TelephonyPhoneNumbersDeprovisionAction message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_TelephonyPhoneNumbersDeprovisionActionRequestParameters {
  ActionRequest: string;
}

/**
 * msdyn_TelephonyPhoneNumbersDeprovisionAction request message
 *
 * Web API Action: msdyn_TelephonyPhoneNumbersDeprovisionAction
 */
export class msdyn_TelephonyPhoneNumbersDeprovisionActionRequest
  extends OrganizationRequest
  implements Executable<msdyn_TelephonyPhoneNumbersDeprovisionActionResponse>
{
  declare readonly Parameters: Readonly<msdyn_TelephonyPhoneNumbersDeprovisionActionRequestParameters>;

  constructor(parameters: msdyn_TelephonyPhoneNumbersDeprovisionActionRequestParameters) {
    super("msdyn_TelephonyPhoneNumbersDeprovisionAction", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_TelephonyPhoneNumbersDeprovisionAction`;

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
  ): Promise<msdyn_TelephonyPhoneNumbersDeprovisionActionResponse> {
    // 204 No Content is an empty result
    if (response.status === 204)
      return msdyn_TelephonyPhoneNumbersDeprovisionActionResponse.fromResponse({});
    return msdyn_TelephonyPhoneNumbersDeprovisionActionResponse.fromResponse(await response.json());
  }
}

/**
 * msdyn_TelephonyPhoneNumbersDeprovisionAction response message
 */
export class msdyn_TelephonyPhoneNumbersDeprovisionActionResponse extends OrganizationResponse {
  constructor(public result: msdyn_TelephonyPhoneNumbersDeprovisionActionResponseData) {
    super("msdyn_TelephonyPhoneNumbersDeprovisionAction");
  }

  static fromResponse(data: unknown): msdyn_TelephonyPhoneNumbersDeprovisionActionResponse {
    return new msdyn_TelephonyPhoneNumbersDeprovisionActionResponse(
      responseObject<msdyn_TelephonyPhoneNumbersDeprovisionActionResponseData>(data)
    );
  }
}
