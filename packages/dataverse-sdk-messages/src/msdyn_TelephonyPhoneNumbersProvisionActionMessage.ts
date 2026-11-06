import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_TelephonyPhoneNumbersProvisionAction message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_TelephonyPhoneNumbersProvisionActionRequestParameters {
  ActionRequest: string;
}

/**
 * msdyn_TelephonyPhoneNumbersProvisionAction request message
 *
 * Web API Action: msdyn_TelephonyPhoneNumbersProvisionAction
 */
export class msdyn_TelephonyPhoneNumbersProvisionActionRequest
  extends OrganizationRequest
  implements Executable<msdyn_TelephonyPhoneNumbersProvisionActionResponse>
{
  declare readonly Parameters: Readonly<msdyn_TelephonyPhoneNumbersProvisionActionRequestParameters>;

  constructor(parameters: msdyn_TelephonyPhoneNumbersProvisionActionRequestParameters) {
    super("msdyn_TelephonyPhoneNumbersProvisionAction", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_TelephonyPhoneNumbersProvisionAction`;

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
  ): Promise<msdyn_TelephonyPhoneNumbersProvisionActionResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_TelephonyPhoneNumbersProvisionActionResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_TelephonyPhoneNumbersProvisionAction action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_TelephonyPhoneNumbersProvisionActionResult {
  "@odata.context"?: string;
  ActionResult: string;
}

/**
 * msdyn_TelephonyPhoneNumbersProvisionAction response message
 *
 * `result` is the value the msdyn_TelephonyPhoneNumbersProvisionAction action returns (see {@link msdyn_TelephonyPhoneNumbersProvisionActionResult}).
 */
export class msdyn_TelephonyPhoneNumbersProvisionActionResponse extends OrganizationResponse {
  constructor(public result: msdyn_TelephonyPhoneNumbersProvisionActionResult) {
    super("msdyn_TelephonyPhoneNumbersProvisionAction");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_TelephonyPhoneNumbersProvisionActionResponse {
    return new msdyn_TelephonyPhoneNumbersProvisionActionResponse(
      data as msdyn_TelephonyPhoneNumbersProvisionActionResult
    );
  }
}
