import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_TelephonySupportedCountryAction message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_TelephonySupportedCountryActionRequestParameters {
  ActionRequest: string;
}

/**
 * msdyn_TelephonySupportedCountryAction request message
 *
 * Web API Action: msdyn_TelephonySupportedCountryAction
 */
export class msdyn_TelephonySupportedCountryActionRequest
  extends OrganizationRequest
  implements Executable<msdyn_TelephonySupportedCountryActionResponse>
{
  declare readonly Parameters: Readonly<msdyn_TelephonySupportedCountryActionRequestParameters>;

  constructor(parameters: msdyn_TelephonySupportedCountryActionRequestParameters) {
    super("msdyn_TelephonySupportedCountryAction", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_TelephonySupportedCountryAction`;

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

  async parseResponse(response: Response): Promise<msdyn_TelephonySupportedCountryActionResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_TelephonySupportedCountryActionResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_TelephonySupportedCountryAction action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_TelephonySupportedCountryActionResult {
  "@odata.context"?: string;
  ActionResult: string;
}

/**
 * msdyn_TelephonySupportedCountryAction response message
 *
 * `result` is the value the msdyn_TelephonySupportedCountryAction action returns (see {@link msdyn_TelephonySupportedCountryActionResult}).
 */
export class msdyn_TelephonySupportedCountryActionResponse extends OrganizationResponse {
  constructor(public result: msdyn_TelephonySupportedCountryActionResult) {
    super("msdyn_TelephonySupportedCountryAction");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_TelephonySupportedCountryActionResponse {
    return new msdyn_TelephonySupportedCountryActionResponse(
      data as msdyn_TelephonySupportedCountryActionResult
    );
  }
}
