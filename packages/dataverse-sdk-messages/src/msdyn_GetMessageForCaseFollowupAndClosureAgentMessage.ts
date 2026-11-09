import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_GetMessageForCaseFollowupAndClosureAgent message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetMessageForCaseFollowupAndClosureAgentRequestParameters {
  msdyn_payload: string;
}

/**
 * msdyn_GetMessageForCaseFollowupAndClosureAgent request message
 *
 * Web API Action: msdyn_GetMessageForCaseFollowupAndClosureAgent
 */
export class msdyn_GetMessageForCaseFollowupAndClosureAgentRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetMessageForCaseFollowupAndClosureAgentResponse>
{
  declare readonly Parameters: Readonly<msdyn_GetMessageForCaseFollowupAndClosureAgentRequestParameters>;

  constructor(parameters: msdyn_GetMessageForCaseFollowupAndClosureAgentRequestParameters) {
    super("msdyn_GetMessageForCaseFollowupAndClosureAgent", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetMessageForCaseFollowupAndClosureAgent`;

    const body = requestBody({
      msdyn_payload: this.Parameters.msdyn_payload,
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
  ): Promise<msdyn_GetMessageForCaseFollowupAndClosureAgentResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_GetMessageForCaseFollowupAndClosureAgentResponse.fromResponse(
      await response.json()
    );
  }
}

/**
 * Response from the msdyn_GetMessageForCaseFollowupAndClosureAgent action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_GetMessageForCaseFollowupAndClosureAgentResult {
  "@odata.context"?: string;
  msdyn_response: string;
}

/**
 * msdyn_GetMessageForCaseFollowupAndClosureAgent response message
 *
 * `result` is the value the msdyn_GetMessageForCaseFollowupAndClosureAgent action returns (see {@link msdyn_GetMessageForCaseFollowupAndClosureAgentResult}).
 */
export class msdyn_GetMessageForCaseFollowupAndClosureAgentResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetMessageForCaseFollowupAndClosureAgentResult) {
    super("msdyn_GetMessageForCaseFollowupAndClosureAgent");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_GetMessageForCaseFollowupAndClosureAgentResponse {
    return new msdyn_GetMessageForCaseFollowupAndClosureAgentResponse(
      data as msdyn_GetMessageForCaseFollowupAndClosureAgentResult
    );
  }
}
