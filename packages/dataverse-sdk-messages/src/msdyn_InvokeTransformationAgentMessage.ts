import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_InvokeTransformationAgent message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_InvokeTransformationAgentRequestParameters {
  msdyn_message?: string;
  msdyn_environmentid?: string;
  msdyn_conversationid?: string;
  msdyn_context?: string;
}

/**
 * msdyn_InvokeTransformationAgent request message
 *
 * Web API Action: msdyn_InvokeTransformationAgent
 */
export class msdyn_InvokeTransformationAgentRequest
  extends OrganizationRequest
  implements Executable<msdyn_InvokeTransformationAgentResponse>
{
  declare readonly Parameters: Readonly<msdyn_InvokeTransformationAgentRequestParameters>;

  constructor(parameters: msdyn_InvokeTransformationAgentRequestParameters = {}) {
    super("msdyn_InvokeTransformationAgent", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_InvokeTransformationAgent`;

    const body = requestBody({
      msdyn_message: this.Parameters.msdyn_message,
      msdyn_environmentid: this.Parameters.msdyn_environmentid,
      msdyn_conversationid: this.Parameters.msdyn_conversationid,
      msdyn_context: this.Parameters.msdyn_context,
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

  async parseResponse(response: Response): Promise<msdyn_InvokeTransformationAgentResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_InvokeTransformationAgentResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_InvokeTransformationAgent action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_InvokeTransformationAgentResult {
  "@odata.context"?: string;
  msdyn_action: string;
  msdyn_activities: string;
  msdyn_conversationid: string;
  msdyn_response: string;
}

/**
 * msdyn_InvokeTransformationAgent response message
 *
 * `result` is the value the msdyn_InvokeTransformationAgent action returns (see {@link msdyn_InvokeTransformationAgentResult}).
 */
export class msdyn_InvokeTransformationAgentResponse extends OrganizationResponse {
  constructor(public result: msdyn_InvokeTransformationAgentResult) {
    super("msdyn_InvokeTransformationAgent");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_InvokeTransformationAgentResponse {
    return new msdyn_InvokeTransformationAgentResponse(
      data as msdyn_InvokeTransformationAgentResult
    );
  }
}
