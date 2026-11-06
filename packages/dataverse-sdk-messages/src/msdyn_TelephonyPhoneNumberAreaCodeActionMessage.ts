import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_TelephonyPhoneNumberAreaCodeActionResponse as msdyn_TelephonyPhoneNumberAreaCodeActionResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_TelephonyPhoneNumberAreaCodeAction message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_TelephonyPhoneNumberAreaCodeActionRequestParameters {
  ActionRequest: string;
}

/**
 * msdyn_TelephonyPhoneNumberAreaCodeAction request message
 *
 * Web API Action: msdyn_TelephonyPhoneNumberAreaCodeAction
 */
export class msdyn_TelephonyPhoneNumberAreaCodeActionRequest
  extends OrganizationRequest
  implements Executable<msdyn_TelephonyPhoneNumberAreaCodeActionResponse>
{
  declare readonly Parameters: Readonly<msdyn_TelephonyPhoneNumberAreaCodeActionRequestParameters>;

  constructor(parameters: msdyn_TelephonyPhoneNumberAreaCodeActionRequestParameters) {
    super("msdyn_TelephonyPhoneNumberAreaCodeAction", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_TelephonyPhoneNumberAreaCodeAction`;

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
  ): Promise<msdyn_TelephonyPhoneNumberAreaCodeActionResponse> {
    // 204 No Content is an empty result
    if (response.status === 204)
      return msdyn_TelephonyPhoneNumberAreaCodeActionResponse.fromResponse({});
    return msdyn_TelephonyPhoneNumberAreaCodeActionResponse.fromResponse(await response.json());
  }
}

/**
 * msdyn_TelephonyPhoneNumberAreaCodeAction response message
 */
export class msdyn_TelephonyPhoneNumberAreaCodeActionResponse extends OrganizationResponse {
  constructor(public result: msdyn_TelephonyPhoneNumberAreaCodeActionResponseData) {
    super("msdyn_TelephonyPhoneNumberAreaCodeAction");
  }

  static fromResponse(data: unknown): msdyn_TelephonyPhoneNumberAreaCodeActionResponse {
    return new msdyn_TelephonyPhoneNumberAreaCodeActionResponse(
      responseObject<msdyn_TelephonyPhoneNumberAreaCodeActionResponseData>(data)
    );
  }
}
