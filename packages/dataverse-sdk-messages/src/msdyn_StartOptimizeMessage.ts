import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_StartOptimize message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_StartOptimizeRequestParameters {
  msdyn_RunId: string;
}

/**
 * msdyn_StartOptimize request message
 *
 * Web API Action: msdyn_StartOptimize
 */
export class msdyn_StartOptimizeRequest
  extends OrganizationRequest
  implements Executable<msdyn_StartOptimizeResponse>
{
  declare readonly Parameters: Readonly<msdyn_StartOptimizeRequestParameters>;

  constructor(parameters: msdyn_StartOptimizeRequestParameters) {
    super("msdyn_StartOptimize", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_StartOptimize`;

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

  async parseResponse(response: Response): Promise<msdyn_StartOptimizeResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_StartOptimizeResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_StartOptimize action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_StartOptimizeResult {
  "@odata.context"?: string;
  msdyn_Response: string;
  msdyn_RunId: string;
  msdyn_Status: string;
}

/**
 * msdyn_StartOptimize response message
 *
 * `result` is the value the msdyn_StartOptimize action returns (see {@link msdyn_StartOptimizeResult}).
 */
export class msdyn_StartOptimizeResponse extends OrganizationResponse {
  constructor(public result: msdyn_StartOptimizeResult) {
    super("msdyn_StartOptimize");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_StartOptimizeResponse {
    return new msdyn_StartOptimizeResponse(data as msdyn_StartOptimizeResult);
  }
}
