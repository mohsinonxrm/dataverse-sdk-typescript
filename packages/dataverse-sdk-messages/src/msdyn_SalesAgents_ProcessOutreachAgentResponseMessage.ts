import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_SalesAgents_ProcessOutreachAgentResponseResponse as msdyn_SalesAgents_ProcessOutreachAgentResponseResponseData } from "./types/index.js";

/**
 * msdyn_SalesAgents_ProcessOutreachAgentResponse request message
 *
 * Web API Action: msdyn_SalesAgents_ProcessOutreachAgentResponse
 */
export class msdyn_SalesAgents_ProcessOutreachAgentResponseRequest
  extends OrganizationRequest
  implements Executable<msdyn_SalesAgents_ProcessOutreachAgentResponseResponse>
{
  constructor(
    public msdyn_SalesAgentRunId: string,
    public msdyn_TrackingId: string,
    public msdyn_Email: string
  ) {
    super("msdyn_SalesAgents_ProcessOutreachAgentResponse");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SalesAgents_ProcessOutreachAgentResponse`;

    const body: Record<string, unknown> = {
      msdyn_SalesAgentRunId: this.msdyn_SalesAgentRunId,
      msdyn_TrackingId: this.msdyn_TrackingId,
      msdyn_Email: this.msdyn_Email,
    };

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
    const data = await response.json();
    return msdyn_SalesAgents_ProcessOutreachAgentResponseResponse.fromResponse(data);
  }
}

/**
 * msdyn_SalesAgents_ProcessOutreachAgentResponse response message
 */
export class msdyn_SalesAgents_ProcessOutreachAgentResponseResponse extends OrganizationResponse {
  constructor(public result: msdyn_SalesAgents_ProcessOutreachAgentResponseResponseData) {
    super("msdyn_SalesAgents_ProcessOutreachAgentResponse");
  }

  static fromResponse(data: unknown): msdyn_SalesAgents_ProcessOutreachAgentResponseResponse {
    return new msdyn_SalesAgents_ProcessOutreachAgentResponseResponse(
      responseObject<msdyn_SalesAgents_ProcessOutreachAgentResponseResponseData>(data)
    );
  }
}
