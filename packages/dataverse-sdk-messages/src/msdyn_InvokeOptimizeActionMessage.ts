import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_InvokeOptimizeAction message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_InvokeOptimizeActionRequestParameters {
  Context?: string;
  RequestPayload: string;
  ActionType: string;
}

/**
 * msdyn_InvokeOptimizeAction request message
 *
 * Web API Action: msdyn_InvokeOptimizeAction
 */
export class msdyn_InvokeOptimizeActionRequest
  extends OrganizationRequest
  implements Executable<msdyn_InvokeOptimizeActionResponse>
{
  declare readonly Parameters: Readonly<msdyn_InvokeOptimizeActionRequestParameters>;

  constructor(parameters: msdyn_InvokeOptimizeActionRequestParameters) {
    super("msdyn_InvokeOptimizeAction", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_InvokeOptimizeAction`;

    const body = requestBody({
      Context: this.Parameters.Context,
      RequestPayload: this.Parameters.RequestPayload,
      ActionType: this.Parameters.ActionType,
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

  async parseResponse(response: Response): Promise<msdyn_InvokeOptimizeActionResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_InvokeOptimizeActionResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_InvokeOptimizeAction action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_InvokeOptimizeActionResult {
  "@odata.context"?: string;
  Metadata: string;
  Result: string;
}

/**
 * msdyn_InvokeOptimizeAction response message
 *
 * `result` is the value the msdyn_InvokeOptimizeAction action returns (see {@link msdyn_InvokeOptimizeActionResult}).
 */
export class msdyn_InvokeOptimizeActionResponse extends OrganizationResponse {
  constructor(public result: msdyn_InvokeOptimizeActionResult) {
    super("msdyn_InvokeOptimizeAction");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_InvokeOptimizeActionResponse {
    return new msdyn_InvokeOptimizeActionResponse(data as msdyn_InvokeOptimizeActionResult);
  }
}
