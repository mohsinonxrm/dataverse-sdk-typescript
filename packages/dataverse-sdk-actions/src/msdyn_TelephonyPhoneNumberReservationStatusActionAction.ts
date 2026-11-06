import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_TelephonyPhoneNumberReservationStatusAction action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_TelephonyPhoneNumberReservationStatusActionResponse {
  "@odata.context"?: string;
  ActionResult: string;
}

/**
 * Parameters of the msdyn_TelephonyPhoneNumberReservationStatusAction action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_TelephonyPhoneNumberReservationStatusActionActionParameters {
  ActionRequest: string;
}

/**
 * msdyn_TelephonyPhoneNumberReservationStatusAction action
 *
 * Unbound action
 */
export class msdyn_TelephonyPhoneNumberReservationStatusActionAction implements Executable<msdyn_TelephonyPhoneNumberReservationStatusActionResponse> {
  constructor(
    public readonly parameters: msdyn_TelephonyPhoneNumberReservationStatusActionActionParameters
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_TelephonyPhoneNumberReservationStatusAction`;

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
  ): Promise<msdyn_TelephonyPhoneNumberReservationStatusActionResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_TelephonyPhoneNumberReservationStatusActionResponse;
  }
}
