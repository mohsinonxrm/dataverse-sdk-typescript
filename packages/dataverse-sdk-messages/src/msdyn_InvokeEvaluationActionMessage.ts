import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_InvokeEvaluationAction message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_InvokeEvaluationActionRequestParameters {
  AdditionalContext?: string;
  ActionType: string;
  ActionPayload: string;
}

/**
 * msdyn_InvokeEvaluationAction request message
 *
 * Web API Action: msdyn_InvokeEvaluationAction
 */
export class msdyn_InvokeEvaluationActionRequest
  extends OrganizationRequest
  implements Executable<msdyn_InvokeEvaluationActionResponse>
{
  declare readonly Parameters: Readonly<msdyn_InvokeEvaluationActionRequestParameters>;

  constructor(parameters: msdyn_InvokeEvaluationActionRequestParameters) {
    super("msdyn_InvokeEvaluationAction", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_InvokeEvaluationAction`;

    const body = requestBody({
      AdditionalContext: this.Parameters.AdditionalContext,
      ActionType: this.Parameters.ActionType,
      ActionPayload: this.Parameters.ActionPayload,
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

  async parseResponse(response: Response): Promise<msdyn_InvokeEvaluationActionResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_InvokeEvaluationActionResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_InvokeEvaluationAction action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_InvokeEvaluationActionResult {
  "@odata.context"?: string;
  Metadata: string;
  Result: string;
  Status: string;
}

/**
 * msdyn_InvokeEvaluationAction response message
 *
 * `result` is the value the msdyn_InvokeEvaluationAction action returns (see {@link msdyn_InvokeEvaluationActionResult}).
 */
export class msdyn_InvokeEvaluationActionResponse extends OrganizationResponse {
  constructor(public result: msdyn_InvokeEvaluationActionResult) {
    super("msdyn_InvokeEvaluationAction");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_InvokeEvaluationActionResponse {
    return new msdyn_InvokeEvaluationActionResponse(data as msdyn_InvokeEvaluationActionResult);
  }
}
