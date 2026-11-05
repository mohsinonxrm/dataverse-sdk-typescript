import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

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

  toRequestBody(): Record<string, unknown> {
    return {
      ActionRequest: this.actionRequest,
    };
  }
}

/**
 * msdyn_TelephonyPhoneNumberReservationStatusAction response message
 */
export class msdyn_TelephonyPhoneNumberReservationStatusActionResponse extends OrganizationResponse {
  constructor(public result: msdyn_TelephonyPhoneNumberReservationStatusActionResponse) {
    super("msdyn_TelephonyPhoneNumberReservationStatusAction");
  }

  static fromResponse(data: unknown): msdyn_TelephonyPhoneNumberReservationStatusActionResponse {
    return new msdyn_TelephonyPhoneNumberReservationStatusActionResponse((data as any).value);
  }
}
