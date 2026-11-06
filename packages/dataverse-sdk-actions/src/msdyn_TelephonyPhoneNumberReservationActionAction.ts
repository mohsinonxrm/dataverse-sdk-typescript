import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_TelephonyPhoneNumberReservationAction action
 */
export interface msdyn_TelephonyPhoneNumberReservationActionResponse {
  ActionResult: string;
}

/**
 * Parameters of the msdyn_TelephonyPhoneNumberReservationAction action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_TelephonyPhoneNumberReservationActionActionParameters {
  ActionRequest: string;
}

/**
 * msdyn_TelephonyPhoneNumberReservationAction action
 *
 * Unbound action
 */
export class msdyn_TelephonyPhoneNumberReservationActionAction implements Executable<msdyn_TelephonyPhoneNumberReservationActionResponse> {
  constructor(
    public readonly parameters: msdyn_TelephonyPhoneNumberReservationActionActionParameters
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_TelephonyPhoneNumberReservationAction`;

    const body = requestBody({
      ActionRequest: this.parameters.ActionRequest,
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
    return (text ? JSON.parse(text) : {}) as msdyn_TelephonyPhoneNumberReservationActionResponse;
  }
}
