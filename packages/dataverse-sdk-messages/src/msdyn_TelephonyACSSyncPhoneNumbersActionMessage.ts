import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_TelephonyACSSyncPhoneNumbersAction message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_TelephonyACSSyncPhoneNumbersActionRequestParameters {
  ActionRequest: string;
}

/**
 * msdyn_TelephonyACSSyncPhoneNumbersAction request message
 *
 * Web API Action: msdyn_TelephonyACSSyncPhoneNumbersAction
 */
export class msdyn_TelephonyACSSyncPhoneNumbersActionRequest
  extends OrganizationRequest
  implements Executable<msdyn_TelephonyACSSyncPhoneNumbersActionResponse>
{
  declare readonly Parameters: Readonly<msdyn_TelephonyACSSyncPhoneNumbersActionRequestParameters>;

  constructor(parameters: msdyn_TelephonyACSSyncPhoneNumbersActionRequestParameters) {
    super("msdyn_TelephonyACSSyncPhoneNumbersAction", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_TelephonyACSSyncPhoneNumbersAction`;

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
  ): Promise<msdyn_TelephonyACSSyncPhoneNumbersActionResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_TelephonyACSSyncPhoneNumbersActionResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_TelephonyACSSyncPhoneNumbersAction action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_TelephonyACSSyncPhoneNumbersActionResult {
  "@odata.context"?: string;
  ActionResult: string;
}

/**
 * msdyn_TelephonyACSSyncPhoneNumbersAction response message
 *
 * `result` is the value the msdyn_TelephonyACSSyncPhoneNumbersAction action returns (see {@link msdyn_TelephonyACSSyncPhoneNumbersActionResult}).
 */
export class msdyn_TelephonyACSSyncPhoneNumbersActionResponse extends OrganizationResponse {
  constructor(public result: msdyn_TelephonyACSSyncPhoneNumbersActionResult) {
    super("msdyn_TelephonyACSSyncPhoneNumbersAction");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_TelephonyACSSyncPhoneNumbersActionResponse {
    return new msdyn_TelephonyACSSyncPhoneNumbersActionResponse(
      data as msdyn_TelephonyACSSyncPhoneNumbersActionResult
    );
  }
}
