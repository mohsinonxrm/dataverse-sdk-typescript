import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_TelephonyPhoneNumberAreaCodeAction message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_TelephonyPhoneNumberAreaCodeActionRequestParameters {
  ActionRequest: string;
}

/**
 * msdyn_TelephonyPhoneNumberAreaCodeAction request message
 *
 * Web API Action: msdyn_TelephonyPhoneNumberAreaCodeAction
 */
export class msdyn_TelephonyPhoneNumberAreaCodeActionRequest
  extends OrganizationRequest
  implements Executable<msdyn_TelephonyPhoneNumberAreaCodeActionResponse>
{
  declare readonly Parameters: Readonly<msdyn_TelephonyPhoneNumberAreaCodeActionRequestParameters>;

  constructor(parameters: msdyn_TelephonyPhoneNumberAreaCodeActionRequestParameters) {
    super("msdyn_TelephonyPhoneNumberAreaCodeAction", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_TelephonyPhoneNumberAreaCodeAction`;

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
  ): Promise<msdyn_TelephonyPhoneNumberAreaCodeActionResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_TelephonyPhoneNumberAreaCodeActionResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_TelephonyPhoneNumberAreaCodeAction action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_TelephonyPhoneNumberAreaCodeActionResult {
  "@odata.context"?: string;
  ActionResult: string;
}

/**
 * msdyn_TelephonyPhoneNumberAreaCodeAction response message
 *
 * `result` is the value the msdyn_TelephonyPhoneNumberAreaCodeAction action returns (see {@link msdyn_TelephonyPhoneNumberAreaCodeActionResult}).
 */
export class msdyn_TelephonyPhoneNumberAreaCodeActionResponse extends OrganizationResponse {
  constructor(public result: msdyn_TelephonyPhoneNumberAreaCodeActionResult) {
    super("msdyn_TelephonyPhoneNumberAreaCodeAction");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_TelephonyPhoneNumberAreaCodeActionResponse {
    return new msdyn_TelephonyPhoneNumberAreaCodeActionResponse(
      data as msdyn_TelephonyPhoneNumberAreaCodeActionResult
    );
  }
}
