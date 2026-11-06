import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_TelephonyPlanLocationDetailsAction message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_TelephonyPlanLocationDetailsActionRequestParameters {
  ActionRequest: string;
}

/**
 * msdyn_TelephonyPlanLocationDetailsAction request message
 *
 * Web API Action: msdyn_TelephonyPlanLocationDetailsAction
 */
export class msdyn_TelephonyPlanLocationDetailsActionRequest
  extends OrganizationRequest
  implements Executable<msdyn_TelephonyPlanLocationDetailsActionResponse>
{
  declare readonly Parameters: Readonly<msdyn_TelephonyPlanLocationDetailsActionRequestParameters>;

  constructor(parameters: msdyn_TelephonyPlanLocationDetailsActionRequestParameters) {
    super("msdyn_TelephonyPlanLocationDetailsAction", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_TelephonyPlanLocationDetailsAction`;

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
  ): Promise<msdyn_TelephonyPlanLocationDetailsActionResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_TelephonyPlanLocationDetailsActionResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_TelephonyPlanLocationDetailsAction action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_TelephonyPlanLocationDetailsActionResult {
  "@odata.context"?: string;
  ActionResult: string;
}

/**
 * msdyn_TelephonyPlanLocationDetailsAction response message
 *
 * `result` is the value the msdyn_TelephonyPlanLocationDetailsAction action returns (see {@link msdyn_TelephonyPlanLocationDetailsActionResult}).
 */
export class msdyn_TelephonyPlanLocationDetailsActionResponse extends OrganizationResponse {
  constructor(public result: msdyn_TelephonyPlanLocationDetailsActionResult) {
    super("msdyn_TelephonyPlanLocationDetailsAction");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_TelephonyPlanLocationDetailsActionResponse {
    return new msdyn_TelephonyPlanLocationDetailsActionResponse(
      data as msdyn_TelephonyPlanLocationDetailsActionResult
    );
  }
}
