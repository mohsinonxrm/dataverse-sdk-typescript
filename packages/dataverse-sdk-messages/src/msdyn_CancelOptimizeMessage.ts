import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_CancelOptimize message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_CancelOptimizeRequestParameters {
  msdyn_RunId: string;
}

/**
 * msdyn_CancelOptimize request message
 *
 * Web API Action: msdyn_CancelOptimize
 */
export class msdyn_CancelOptimizeRequest
  extends OrganizationRequest
  implements Executable<msdyn_CancelOptimizeResponse>
{
  declare readonly Parameters: Readonly<msdyn_CancelOptimizeRequestParameters>;

  constructor(parameters: msdyn_CancelOptimizeRequestParameters) {
    super("msdyn_CancelOptimize", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CancelOptimize`;

    const body = requestBody({
      msdyn_RunId: this.Parameters.msdyn_RunId,
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

  async parseResponse(response: Response): Promise<msdyn_CancelOptimizeResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_CancelOptimizeResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_CancelOptimize action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_CancelOptimizeResult {
  "@odata.context"?: string;
  msdyn_Response: string;
  msdyn_Restored: string;
  msdyn_Status: string;
}

/**
 * msdyn_CancelOptimize response message
 *
 * `result` is the value the msdyn_CancelOptimize action returns (see {@link msdyn_CancelOptimizeResult}).
 */
export class msdyn_CancelOptimizeResponse extends OrganizationResponse {
  constructor(public result: msdyn_CancelOptimizeResult) {
    super("msdyn_CancelOptimize");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_CancelOptimizeResponse {
    return new msdyn_CancelOptimizeResponse(data as msdyn_CancelOptimizeResult);
  }
}
