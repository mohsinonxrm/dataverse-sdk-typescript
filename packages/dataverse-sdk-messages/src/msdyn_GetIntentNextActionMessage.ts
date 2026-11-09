import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_GetIntentNextAction message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetIntentNextActionRequestParameters {
  IntentNextActionRequest: string;
}

/**
 * msdyn_GetIntentNextAction request message
 *
 * Web API Action: msdyn_GetIntentNextAction
 */
export class msdyn_GetIntentNextActionRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetIntentNextActionResponse>
{
  declare readonly Parameters: Readonly<msdyn_GetIntentNextActionRequestParameters>;

  constructor(parameters: msdyn_GetIntentNextActionRequestParameters) {
    super("msdyn_GetIntentNextAction", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetIntentNextAction`;

    const body = requestBody({
      IntentNextActionRequest: this.Parameters.IntentNextActionRequest,
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

  async parseResponse(response: Response): Promise<msdyn_GetIntentNextActionResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_GetIntentNextActionResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_GetIntentNextAction action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_GetIntentNextActionResult {
  "@odata.context"?: string;
  IntentNextActionResponse: string;
}

/**
 * msdyn_GetIntentNextAction response message
 *
 * `result` is the value the msdyn_GetIntentNextAction action returns (see {@link msdyn_GetIntentNextActionResult}).
 */
export class msdyn_GetIntentNextActionResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetIntentNextActionResult) {
    super("msdyn_GetIntentNextAction");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_GetIntentNextActionResponse {
    return new msdyn_GetIntentNextActionResponse(data as msdyn_GetIntentNextActionResult);
  }
}
