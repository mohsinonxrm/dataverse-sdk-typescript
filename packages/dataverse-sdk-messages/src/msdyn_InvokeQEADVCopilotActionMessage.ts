import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_InvokeQEADVCopilotAction message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_InvokeQEADVCopilotActionRequestParameters {
  action: string;
}

/**
 * msdyn_InvokeQEADVCopilotAction request message
 *
 * Web API Action: msdyn_InvokeQEADVCopilotAction
 */
export class msdyn_InvokeQEADVCopilotActionRequest
  extends OrganizationRequest
  implements Executable<msdyn_InvokeQEADVCopilotActionResponse>
{
  declare readonly Parameters: Readonly<msdyn_InvokeQEADVCopilotActionRequestParameters>;

  constructor(parameters: msdyn_InvokeQEADVCopilotActionRequestParameters) {
    super("msdyn_InvokeQEADVCopilotAction", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_InvokeQEADVCopilotAction`;

    const body = requestBody({
      action: this.Parameters.action,
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

  async parseResponse(response: Response): Promise<msdyn_InvokeQEADVCopilotActionResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_InvokeQEADVCopilotActionResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_InvokeQEADVCopilotAction action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_InvokeQEADVCopilotActionResult {
  "@odata.context"?: string;
  msdyn_invokeqeadvcopilotactionresponse: string;
}

/**
 * msdyn_InvokeQEADVCopilotAction response message
 *
 * `result` is the value the msdyn_InvokeQEADVCopilotAction action returns (see {@link msdyn_InvokeQEADVCopilotActionResult}).
 */
export class msdyn_InvokeQEADVCopilotActionResponse extends OrganizationResponse {
  constructor(public result: msdyn_InvokeQEADVCopilotActionResult) {
    super("msdyn_InvokeQEADVCopilotAction");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_InvokeQEADVCopilotActionResponse {
    return new msdyn_InvokeQEADVCopilotActionResponse(data as msdyn_InvokeQEADVCopilotActionResult);
  }
}
