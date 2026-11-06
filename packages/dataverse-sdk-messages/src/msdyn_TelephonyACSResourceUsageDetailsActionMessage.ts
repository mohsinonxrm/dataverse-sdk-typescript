import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_TelephonyACSResourceUsageDetailsAction message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_TelephonyACSResourceUsageDetailsActionRequestParameters {
  ActionRequest: string;
}

/**
 * msdyn_TelephonyACSResourceUsageDetailsAction request message
 *
 * Web API Action: msdyn_TelephonyACSResourceUsageDetailsAction
 */
export class msdyn_TelephonyACSResourceUsageDetailsActionRequest
  extends OrganizationRequest
  implements Executable<msdyn_TelephonyACSResourceUsageDetailsActionResponse>
{
  declare readonly Parameters: Readonly<msdyn_TelephonyACSResourceUsageDetailsActionRequestParameters>;

  constructor(parameters: msdyn_TelephonyACSResourceUsageDetailsActionRequestParameters) {
    super("msdyn_TelephonyACSResourceUsageDetailsAction", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_TelephonyACSResourceUsageDetailsAction`;

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
  ): Promise<msdyn_TelephonyACSResourceUsageDetailsActionResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_TelephonyACSResourceUsageDetailsActionResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_TelephonyACSResourceUsageDetailsAction action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_TelephonyACSResourceUsageDetailsActionResult {
  "@odata.context"?: string;
  ActionResult: string;
}

/**
 * msdyn_TelephonyACSResourceUsageDetailsAction response message
 *
 * `result` is the value the msdyn_TelephonyACSResourceUsageDetailsAction action returns (see {@link msdyn_TelephonyACSResourceUsageDetailsActionResult}).
 */
export class msdyn_TelephonyACSResourceUsageDetailsActionResponse extends OrganizationResponse {
  constructor(public result: msdyn_TelephonyACSResourceUsageDetailsActionResult) {
    super("msdyn_TelephonyACSResourceUsageDetailsAction");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_TelephonyACSResourceUsageDetailsActionResponse {
    return new msdyn_TelephonyACSResourceUsageDetailsActionResponse(
      data as msdyn_TelephonyACSResourceUsageDetailsActionResult
    );
  }
}
