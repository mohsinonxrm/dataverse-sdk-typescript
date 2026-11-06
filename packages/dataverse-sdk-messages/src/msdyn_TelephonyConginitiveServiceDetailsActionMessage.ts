import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_TelephonyConginitiveServiceDetailsAction message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_TelephonyConginitiveServiceDetailsActionRequestParameters {
  ActionRequest: string;
}

/**
 * msdyn_TelephonyConginitiveServiceDetailsAction request message
 *
 * Web API Action: msdyn_TelephonyConginitiveServiceDetailsAction
 */
export class msdyn_TelephonyConginitiveServiceDetailsActionRequest
  extends OrganizationRequest
  implements Executable<msdyn_TelephonyConginitiveServiceDetailsActionResponse>
{
  declare readonly Parameters: Readonly<msdyn_TelephonyConginitiveServiceDetailsActionRequestParameters>;

  constructor(parameters: msdyn_TelephonyConginitiveServiceDetailsActionRequestParameters) {
    super("msdyn_TelephonyConginitiveServiceDetailsAction", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_TelephonyConginitiveServiceDetailsAction`;

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
  ): Promise<msdyn_TelephonyConginitiveServiceDetailsActionResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_TelephonyConginitiveServiceDetailsActionResponse.fromResponse(
      await response.json()
    );
  }
}

/**
 * Response from the msdyn_TelephonyConginitiveServiceDetailsAction action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_TelephonyConginitiveServiceDetailsActionResult {
  "@odata.context"?: string;
  ActionResult: string;
}

/**
 * msdyn_TelephonyConginitiveServiceDetailsAction response message
 *
 * `result` is the value the msdyn_TelephonyConginitiveServiceDetailsAction action returns (see {@link msdyn_TelephonyConginitiveServiceDetailsActionResult}).
 */
export class msdyn_TelephonyConginitiveServiceDetailsActionResponse extends OrganizationResponse {
  constructor(public result: msdyn_TelephonyConginitiveServiceDetailsActionResult) {
    super("msdyn_TelephonyConginitiveServiceDetailsAction");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_TelephonyConginitiveServiceDetailsActionResponse {
    return new msdyn_TelephonyConginitiveServiceDetailsActionResponse(
      data as msdyn_TelephonyConginitiveServiceDetailsActionResult
    );
  }
}
