import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_AcsForceSyncAction message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_AcsForceSyncActionRequestParameters {
  ActionRequest: string;
}

/**
 * msdyn_AcsForceSyncAction request message
 *
 * Web API Action: msdyn_AcsForceSyncAction
 */
export class msdyn_AcsForceSyncActionRequest
  extends OrganizationRequest
  implements Executable<msdyn_AcsForceSyncActionResponse>
{
  declare readonly Parameters: Readonly<msdyn_AcsForceSyncActionRequestParameters>;

  constructor(parameters: msdyn_AcsForceSyncActionRequestParameters) {
    super("msdyn_AcsForceSyncAction", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_AcsForceSyncAction`;

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

  async parseResponse(response: Response): Promise<msdyn_AcsForceSyncActionResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_AcsForceSyncActionResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_AcsForceSyncAction action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_AcsForceSyncActionResult {
  "@odata.context"?: string;
  ActionResult: string;
}

/**
 * msdyn_AcsForceSyncAction response message
 *
 * `result` is the value the msdyn_AcsForceSyncAction action returns (see {@link msdyn_AcsForceSyncActionResult}).
 */
export class msdyn_AcsForceSyncActionResponse extends OrganizationResponse {
  constructor(public result: msdyn_AcsForceSyncActionResult) {
    super("msdyn_AcsForceSyncAction");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_AcsForceSyncActionResponse {
    return new msdyn_AcsForceSyncActionResponse(data as msdyn_AcsForceSyncActionResult);
  }
}
