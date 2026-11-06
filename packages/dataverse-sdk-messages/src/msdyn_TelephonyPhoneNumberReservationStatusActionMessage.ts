import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_TelephonyPhoneNumberReservationStatusActionResponse as msdyn_TelephonyPhoneNumberReservationStatusActionResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_TelephonyPhoneNumberReservationStatusAction message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_TelephonyPhoneNumberReservationStatusActionRequestParameters {
  ActionRequest: string;
}

/**
 * msdyn_TelephonyPhoneNumberReservationStatusAction request message
 *
 * Web API Action: msdyn_TelephonyPhoneNumberReservationStatusAction
 */
export class msdyn_TelephonyPhoneNumberReservationStatusActionRequest
  extends OrganizationRequest
  implements Executable<msdyn_TelephonyPhoneNumberReservationStatusActionResponse>
{
  declare readonly Parameters: Readonly<msdyn_TelephonyPhoneNumberReservationStatusActionRequestParameters>;

  constructor(parameters: msdyn_TelephonyPhoneNumberReservationStatusActionRequestParameters) {
    super("msdyn_TelephonyPhoneNumberReservationStatusAction", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_TelephonyPhoneNumberReservationStatusAction`;

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
  ): Promise<msdyn_TelephonyPhoneNumberReservationStatusActionResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return msdyn_TelephonyPhoneNumberReservationStatusActionResponse.fromResponse(
      text ? JSON.parse(text) : {}
    );
  }
}

/**
 * msdyn_TelephonyPhoneNumberReservationStatusAction response message
 */
export class msdyn_TelephonyPhoneNumberReservationStatusActionResponse extends OrganizationResponse {
  constructor(public result: msdyn_TelephonyPhoneNumberReservationStatusActionResponseData) {
    super("msdyn_TelephonyPhoneNumberReservationStatusAction");
  }

  static fromResponse(data: unknown): msdyn_TelephonyPhoneNumberReservationStatusActionResponse {
    return new msdyn_TelephonyPhoneNumberReservationStatusActionResponse(
      responseObject<msdyn_TelephonyPhoneNumberReservationStatusActionResponseData>(data)
    );
  }
}
