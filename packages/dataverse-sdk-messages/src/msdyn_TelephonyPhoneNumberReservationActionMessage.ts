import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_TelephonyPhoneNumberReservationActionResponse as msdyn_TelephonyPhoneNumberReservationActionResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_TelephonyPhoneNumberReservationAction message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_TelephonyPhoneNumberReservationActionRequestParameters {
  ActionRequest: string;
}

/**
 * msdyn_TelephonyPhoneNumberReservationAction request message
 *
 * Web API Action: msdyn_TelephonyPhoneNumberReservationAction
 */
export class msdyn_TelephonyPhoneNumberReservationActionRequest
  extends OrganizationRequest
  implements Executable<msdyn_TelephonyPhoneNumberReservationActionResponse>
{
  declare readonly Parameters: Readonly<msdyn_TelephonyPhoneNumberReservationActionRequestParameters>;

  constructor(parameters: msdyn_TelephonyPhoneNumberReservationActionRequestParameters) {
    super("msdyn_TelephonyPhoneNumberReservationAction", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_TelephonyPhoneNumberReservationAction`;

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
  ): Promise<msdyn_TelephonyPhoneNumberReservationActionResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return msdyn_TelephonyPhoneNumberReservationActionResponse.fromResponse(
      text ? JSON.parse(text) : {}
    );
  }
}

/**
 * msdyn_TelephonyPhoneNumberReservationAction response message
 */
export class msdyn_TelephonyPhoneNumberReservationActionResponse extends OrganizationResponse {
  constructor(public result: msdyn_TelephonyPhoneNumberReservationActionResponseData) {
    super("msdyn_TelephonyPhoneNumberReservationAction");
  }

  static fromResponse(data: unknown): msdyn_TelephonyPhoneNumberReservationActionResponse {
    return new msdyn_TelephonyPhoneNumberReservationActionResponse(
      responseObject<msdyn_TelephonyPhoneNumberReservationActionResponseData>(data)
    );
  }
}
