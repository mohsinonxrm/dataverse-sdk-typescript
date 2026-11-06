import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_TelephonySupportedPlansAction message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_TelephonySupportedPlansActionRequestParameters {
  ActionRequest: string;
}

/**
 * msdyn_TelephonySupportedPlansAction request message
 *
 * Web API Action: msdyn_TelephonySupportedPlansAction
 */
export class msdyn_TelephonySupportedPlansActionRequest
  extends OrganizationRequest
  implements Executable<msdyn_TelephonySupportedPlansActionResponse>
{
  declare readonly Parameters: Readonly<msdyn_TelephonySupportedPlansActionRequestParameters>;

  constructor(parameters: msdyn_TelephonySupportedPlansActionRequestParameters) {
    super("msdyn_TelephonySupportedPlansAction", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_TelephonySupportedPlansAction`;

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

  async parseResponse(response: Response): Promise<msdyn_TelephonySupportedPlansActionResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_TelephonySupportedPlansActionResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_TelephonySupportedPlansAction action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_TelephonySupportedPlansActionResult {
  "@odata.context"?: string;
  ActionResult: string;
}

/**
 * msdyn_TelephonySupportedPlansAction response message
 *
 * `result` is the value the msdyn_TelephonySupportedPlansAction action returns (see {@link msdyn_TelephonySupportedPlansActionResult}).
 */
export class msdyn_TelephonySupportedPlansActionResponse extends OrganizationResponse {
  constructor(public result: msdyn_TelephonySupportedPlansActionResult) {
    super("msdyn_TelephonySupportedPlansAction");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_TelephonySupportedPlansActionResponse {
    return new msdyn_TelephonySupportedPlansActionResponse(
      data as msdyn_TelephonySupportedPlansActionResult
    );
  }
}
