import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_TelephonyPhoneNumberReservationAction action
 */
export interface msdyn_TelephonyPhoneNumberReservationActionResponse {
  ActionResult: string;
}

/**
 * msdyn_TelephonyPhoneNumberReservationAction action
 *
 * Unbound action
 */
export class msdyn_TelephonyPhoneNumberReservationActionAction implements Executable<msdyn_TelephonyPhoneNumberReservationActionResponse> {
  constructor(public readonly actionRequest: string) {}

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
    return data as msdyn_TelephonyPhoneNumberReservationActionResponse;
  }
}
