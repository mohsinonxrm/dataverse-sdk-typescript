import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_TelephonyPhoneNumberReservationStatusActionResponse as msdyn_TelephonyPhoneNumberReservationStatusActionResponseData } from "./types/index.js";

/**
 * msdyn_TelephonyPhoneNumberReservationStatusAction request message
 *
 * Web API Action: msdyn_TelephonyPhoneNumberReservationStatusAction
 */
export class msdyn_TelephonyPhoneNumberReservationStatusActionRequest
  extends OrganizationRequest
  implements Executable<msdyn_TelephonyPhoneNumberReservationStatusActionResponse>
{
  constructor(public actionRequest: string) {
    super("msdyn_TelephonyPhoneNumberReservationStatusAction");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_TelephonyPhoneNumberReservationStatusAction`;

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
  ): Promise<msdyn_TelephonyPhoneNumberReservationStatusActionResponse> {
    const data = await response.json();
    return msdyn_TelephonyPhoneNumberReservationStatusActionResponse.fromResponse(data);
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
