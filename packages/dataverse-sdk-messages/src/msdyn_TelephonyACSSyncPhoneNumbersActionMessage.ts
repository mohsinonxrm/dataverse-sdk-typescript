import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_TelephonyACSSyncPhoneNumbersActionResponse as msdyn_TelephonyACSSyncPhoneNumbersActionResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_TelephonyACSSyncPhoneNumbersAction message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_TelephonyACSSyncPhoneNumbersActionRequestParameters {
  ActionRequest: string;
}

/**
 * msdyn_TelephonyACSSyncPhoneNumbersAction request message
 *
 * Web API Action: msdyn_TelephonyACSSyncPhoneNumbersAction
 */
export class msdyn_TelephonyACSSyncPhoneNumbersActionRequest
  extends OrganizationRequest
  implements Executable<msdyn_TelephonyACSSyncPhoneNumbersActionResponse>
{
  declare readonly Parameters: Readonly<msdyn_TelephonyACSSyncPhoneNumbersActionRequestParameters>;

  constructor(parameters: msdyn_TelephonyACSSyncPhoneNumbersActionRequestParameters) {
    super("msdyn_TelephonyACSSyncPhoneNumbersAction", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_TelephonyACSSyncPhoneNumbersAction`;

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
  ): Promise<msdyn_TelephonyACSSyncPhoneNumbersActionResponse> {
    // 204 No Content is an empty result
    if (response.status === 204)
      return msdyn_TelephonyACSSyncPhoneNumbersActionResponse.fromResponse({});
    return msdyn_TelephonyACSSyncPhoneNumbersActionResponse.fromResponse(await response.json());
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
