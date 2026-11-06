import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

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
    // The body is the complex value, with its @odata.context
    return msdyn_TelephonyPhoneNumberReservationStatusActionResponse.fromResponse(
      await response.json()
    );
  }
}

/**
 * Response from the msdyn_TelephonyPhoneNumberReservationStatusAction action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_TelephonyPhoneNumberReservationStatusActionResult {
  "@odata.context"?: string;
  ActionResult: string;
}

/**
 * msdyn_TelephonyPhoneNumberReservationStatusAction response message
 *
 * `result` is the value the msdyn_TelephonyPhoneNumberReservationStatusAction action returns (see {@link msdyn_TelephonyPhoneNumberReservationStatusActionResult}).
 */
export class msdyn_TelephonyPhoneNumberReservationStatusActionResponse extends OrganizationResponse {
  constructor(public result: msdyn_TelephonyPhoneNumberReservationStatusActionResult) {
    super("msdyn_TelephonyPhoneNumberReservationStatusAction");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_TelephonyPhoneNumberReservationStatusActionResponse {
    return new msdyn_TelephonyPhoneNumberReservationStatusActionResponse(
      data as msdyn_TelephonyPhoneNumberReservationStatusActionResult
    );
  }
}
