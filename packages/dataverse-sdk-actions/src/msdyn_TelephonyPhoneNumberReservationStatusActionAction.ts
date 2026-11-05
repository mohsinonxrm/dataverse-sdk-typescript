import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_TelephonyPhoneNumberReservationStatusAction action
 */
export interface msdyn_TelephonyPhoneNumberReservationStatusActionResponse {
  ActionResult: string;
}

/**
 * msdyn_TelephonyPhoneNumberReservationStatusAction action
 *
 * Unbound action
 */
export class msdyn_TelephonyPhoneNumberReservationStatusActionAction implements Executable<msdyn_TelephonyPhoneNumberReservationStatusActionResponse> {
  constructor(public readonly actionRequest: string) {}

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
    return data as msdyn_TelephonyPhoneNumberReservationStatusActionResponse;
  }
}
