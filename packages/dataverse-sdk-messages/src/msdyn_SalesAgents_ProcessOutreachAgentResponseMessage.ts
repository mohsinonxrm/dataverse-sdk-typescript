import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_SalesAgents_ProcessOutreachAgentResponse message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_SalesAgents_ProcessOutreachAgentResponseRequestParameters {
  msdyn_TrackingId: string;
  msdyn_SalesAgentRunId: string;
  msdyn_Email: string;
}

/**
 * msdyn_SalesAgents_ProcessOutreachAgentResponse request message
 *
 * Web API Action: msdyn_SalesAgents_ProcessOutreachAgentResponse
 */
export class msdyn_SalesAgents_ProcessOutreachAgentResponseRequest
  extends OrganizationRequest
  implements Executable<msdyn_SalesAgents_ProcessOutreachAgentResponseResponse>
{
  declare readonly Parameters: Readonly<msdyn_SalesAgents_ProcessOutreachAgentResponseRequestParameters>;

  constructor(parameters: msdyn_SalesAgents_ProcessOutreachAgentResponseRequestParameters) {
    super("msdyn_SalesAgents_ProcessOutreachAgentResponse", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SalesAgents_ProcessOutreachAgentResponse`;

    const body = requestBody({
      msdyn_TrackingId: this.Parameters.msdyn_TrackingId,
      msdyn_SalesAgentRunId: this.Parameters.msdyn_SalesAgentRunId,
      msdyn_Email: this.Parameters.msdyn_Email,
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
  ): Promise<msdyn_SalesAgents_ProcessOutreachAgentResponseResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_SalesAgents_ProcessOutreachAgentResponseResponse.fromResponse(
      await response.json()
    );
  }
}

/**
 * Response from the msdyn_SalesAgents_ProcessOutreachAgentResponse action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_SalesAgents_ProcessOutreachAgentResponseResult {
  "@odata.context"?: string;
  msdyn_Response: string;
}

/**
 * msdyn_SalesAgents_ProcessOutreachAgentResponse response message
 *
 * `result` is the value the msdyn_SalesAgents_ProcessOutreachAgentResponse action returns (see {@link msdyn_SalesAgents_ProcessOutreachAgentResponseResult}).
 */
export class msdyn_SalesAgents_ProcessOutreachAgentResponseResponse extends OrganizationResponse {
  constructor(public result: msdyn_SalesAgents_ProcessOutreachAgentResponseResult) {
    super("msdyn_SalesAgents_ProcessOutreachAgentResponse");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_SalesAgents_ProcessOutreachAgentResponseResponse {
    return new msdyn_SalesAgents_ProcessOutreachAgentResponseResponse(
      data as msdyn_SalesAgents_ProcessOutreachAgentResponseResult
    );
  }
}
