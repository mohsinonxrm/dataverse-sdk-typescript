import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_ContinueTransformationAgent message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_ContinueTransformationAgentRequestParameters {
  msdyn_conversationid: string;
  msdyn_environmentid?: string;
}

/**
 * msdyn_ContinueTransformationAgent request message
 *
 * Web API Action: msdyn_ContinueTransformationAgent
 */
export class msdyn_ContinueTransformationAgentRequest
  extends OrganizationRequest
  implements Executable<msdyn_ContinueTransformationAgentResponse>
{
  declare readonly Parameters: Readonly<msdyn_ContinueTransformationAgentRequestParameters>;

  constructor(parameters: msdyn_ContinueTransformationAgentRequestParameters) {
    super("msdyn_ContinueTransformationAgent", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_ContinueTransformationAgent`;

    const body = requestBody({
      msdyn_conversationid: this.Parameters.msdyn_conversationid,
      msdyn_environmentid: this.Parameters.msdyn_environmentid,
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

  async parseResponse(response: Response): Promise<msdyn_ContinueTransformationAgentResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_ContinueTransformationAgentResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_ContinueTransformationAgent action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_ContinueTransformationAgentResult {
  "@odata.context"?: string;
  msdyn_action: string;
  msdyn_activities: string;
  msdyn_conversationid: string;
  msdyn_response: string;
}

/**
 * msdyn_ContinueTransformationAgent response message
 *
 * `result` is the value the msdyn_ContinueTransformationAgent action returns (see {@link msdyn_ContinueTransformationAgentResult}).
 */
export class msdyn_ContinueTransformationAgentResponse extends OrganizationResponse {
  constructor(public result: msdyn_ContinueTransformationAgentResult) {
    super("msdyn_ContinueTransformationAgent");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_ContinueTransformationAgentResponse {
    return new msdyn_ContinueTransformationAgentResponse(
      data as msdyn_ContinueTransformationAgentResult
    );
  }
}
