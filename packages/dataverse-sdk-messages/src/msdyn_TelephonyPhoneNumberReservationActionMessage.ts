import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

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
    // The body is the complex value, with its @odata.context
    return msdyn_TelephonyPhoneNumberReservationActionResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_TelephonyPhoneNumberReservationAction action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_TelephonyPhoneNumberReservationActionResult {
  "@odata.context"?: string;
  ActionResult: string;
}

/**
 * msdyn_TelephonyPhoneNumberReservationAction response message
 *
 * `result` is the value the msdyn_TelephonyPhoneNumberReservationAction action returns (see {@link msdyn_TelephonyPhoneNumberReservationActionResult}).
 */
export class msdyn_TelephonyPhoneNumberReservationActionResponse extends OrganizationResponse {
  constructor(public result: msdyn_TelephonyPhoneNumberReservationActionResult) {
    super("msdyn_TelephonyPhoneNumberReservationAction");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_TelephonyPhoneNumberReservationActionResponse {
    return new msdyn_TelephonyPhoneNumberReservationActionResponse(
      data as msdyn_TelephonyPhoneNumberReservationActionResult
    );
  }
}
