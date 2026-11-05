import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_TelephonyPhoneNumberReservationAction request message
 *
 * Web API Action: msdyn_TelephonyPhoneNumberReservationAction
 */
export class msdyn_TelephonyPhoneNumberReservationActionRequest
  extends OrganizationRequest
  implements Executable<msdyn_TelephonyPhoneNumberReservationActionResponse>
{
  constructor(public actionRequest: string) {
    super("msdyn_TelephonyPhoneNumberReservationAction");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_TelephonyPhoneNumberReservationAction`;

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
  ): Promise<msdyn_TelephonyPhoneNumberReservationActionResponse> {
    const data = await response.json();
    return msdyn_TelephonyPhoneNumberReservationActionResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      ActionRequest: this.actionRequest,
    };
  }
}

/**
 * msdyn_TelephonyPhoneNumberReservationAction response message
 */
export class msdyn_TelephonyPhoneNumberReservationActionResponse extends OrganizationResponse {
  constructor(public result: msdyn_TelephonyPhoneNumberReservationActionResponse) {
    super("msdyn_TelephonyPhoneNumberReservationAction");
  }

  static fromResponse(data: unknown): msdyn_TelephonyPhoneNumberReservationActionResponse {
    return new msdyn_TelephonyPhoneNumberReservationActionResponse((data as any).value);
  }
}
