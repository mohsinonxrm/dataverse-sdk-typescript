import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_TelephonyPhoneNumbersDeprovisionAction message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_TelephonyPhoneNumbersDeprovisionActionRequestParameters {
  ActionRequest: string;
}

/**
 * msdyn_TelephonyPhoneNumbersDeprovisionAction request message
 *
 * Web API Action: msdyn_TelephonyPhoneNumbersDeprovisionAction
 */
export class msdyn_TelephonyPhoneNumbersDeprovisionActionRequest
  extends OrganizationRequest
  implements Executable<msdyn_TelephonyPhoneNumbersDeprovisionActionResponse>
{
  declare readonly Parameters: Readonly<msdyn_TelephonyPhoneNumbersDeprovisionActionRequestParameters>;

  constructor(parameters: msdyn_TelephonyPhoneNumbersDeprovisionActionRequestParameters) {
    super("msdyn_TelephonyPhoneNumbersDeprovisionAction", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_TelephonyPhoneNumbersDeprovisionAction`;

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
  ): Promise<msdyn_TelephonyPhoneNumbersDeprovisionActionResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_TelephonyPhoneNumbersDeprovisionActionResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_TelephonyPhoneNumbersDeprovisionAction action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_TelephonyPhoneNumbersDeprovisionActionResult {
  "@odata.context"?: string;
  ActionResult: string;
}

/**
 * msdyn_TelephonyPhoneNumbersDeprovisionAction response message
 *
 * `result` is the value the msdyn_TelephonyPhoneNumbersDeprovisionAction action returns (see {@link msdyn_TelephonyPhoneNumbersDeprovisionActionResult}).
 */
export class msdyn_TelephonyPhoneNumbersDeprovisionActionResponse extends OrganizationResponse {
  constructor(public result: msdyn_TelephonyPhoneNumbersDeprovisionActionResult) {
    super("msdyn_TelephonyPhoneNumbersDeprovisionAction");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_TelephonyPhoneNumbersDeprovisionActionResponse {
    return new msdyn_TelephonyPhoneNumbersDeprovisionActionResponse(
      data as msdyn_TelephonyPhoneNumbersDeprovisionActionResult
    );
  }
}
